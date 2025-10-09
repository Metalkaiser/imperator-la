"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useCatalogContext } from "../components/context/CatalogContext";
import { useCart } from "../components/context/Cartcontext";
import { cartItem, GiftOption, } from "@/app/utils/types";
import Methodrender from "../components/shoppingcart/Methodsrender";
import GiftOptions from "../components/shoppingcart/Giftoptions";
import Carttotal from "../components/shoppingcart/Carttotal";
import Cartitem from "../components/Cartitem";
import { shoppingCartImg } from "@/app/utils/svgItems";

export default function ShoppingCart() {
  const t = useTranslations("shoppingCart");
  const giftT = useTranslations("gifts");
  const paynshipT = useTranslations("paynship");
  const feesT = useTranslations("fees");
  const tPay = useTranslations("paydata");
  const tShip = useTranslations("shipdata");
  const tModal = useTranslations("modal");
  
  const [formData, setFormData] = useState({ payment: 0, shipping: 0 });
  const [selectedGifts, setSelectedGifts] = useState<GiftOption[]>([]);

  const { purchaseOptions, cart, addOrUpdateItem, removeItem, clearCart } = useCart();
  const [modalWidth, setWidth] = useState('60vw'); // valor por defecto para escritorio

  const { cartSettings, exchangeRate } = useCatalogContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleGift = (gift: GiftOption) => {
    setSelectedGifts((prev) =>
      prev.find((g) => g.id === gift.id)
        ? prev.filter((g) => g.id !== gift.id)
        : [...prev, gift]
    );
  };

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 768) {
        setWidth('90vw'); // móvil
      } else {
        setWidth('60vw'); // escritorio
      }
    };

    // Ejecutar al montar
    updateWidth();

    // Opcional: actualizar en resize
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const updateCart = (item: cartItem) => {
    if (item.price) {
      addOrUpdateItem(item);
    } else if (item.size) {
      removeItem(item.sku, item.size);
    } else {
      removeItem(item.sku);
    }
  };

  const getFeeValue = (
    fee: { status: boolean; percentage?: number; fixed?: number },
    base: number
  ) => {
    if (!fee.status) return 0;
    const fixed = fee.fixed ?? 0;
    const percent = fee.percentage ? (fee.percentage / 100) * base : 0;
    return parseFloat((fixed + percent).toFixed(2));
  };

  const getActiveGiftOptions = (): GiftOption[] => {
    if (!Array.isArray(purchaseOptions.giftOptions)) return [];
    return purchaseOptions.giftOptions.filter((gift) => {
      if (!gift.available) return false;
      if (!gift.exclusiveToProducts?.length) return true;
      return cart.some((item) =>
        gift.exclusiveToProducts?.includes(item.sku)
      );
    });
  };

  // Calculos
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qt, 0),
    [cart]
  );
  const giftTotal = useMemo(
    () => selectedGifts.reduce((sum, g) => sum + g.price, 0),
    [selectedGifts]
  );
  const selectedPayment = purchaseOptions.paymentMethods.find(
    (m) => m.id === formData.payment
  );
  const selectedShipping = purchaseOptions.shippingMethods.find(
    (m) => m.id === formData.shipping
  );
  const shippingFee = useMemo(
    () =>
      selectedShipping && !selectedShipping.fee.onlyPayOnDelivery
        ? getFeeValue(selectedShipping.fee, subtotal)
        : 0,
    [selectedShipping, subtotal]
  );
  const paymentFee = useMemo(
    () =>
      selectedPayment
        ? getFeeValue(selectedPayment.fee, subtotal + giftTotal + shippingFee)
        : 0,
    [selectedPayment, subtotal, giftTotal, shippingFee]
  );

  const total = subtotal + giftTotal + shippingFee + paymentFee;
  const isPurchaseReady =
    total > 0 && formData.payment && formData.shipping;

  const activeGiftOptions = getActiveGiftOptions();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-1/4 flex flex-col items-center justify-center">
        {shoppingCartImg}
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          {t("noItem_1")}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          {t("noItem_2")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col md:flex-row gap-10 justify-evenly w-full">
        {/* Carrito + Opciones regalo */}
        <div className="flex flex-col gap-5 justify-around">
          <div className="flex flex-col gap-5 mx-5 max-w-screen overflow-auto touch-auto justify-center">
            {cart.map((item, idx) => (
              <Cartitem
                key={idx}
                item={item}
                index={idx}
                mainCurrency={cartSettings.mainCurrency}
                updateCart={updateCart}
              />
            ))}
          </div>
          {activeGiftOptions.length > 0 && (
            <GiftOptions
              giftOptionsTitle={giftT("giftOptionsTitle")}
              giftOptionsDescription={giftT("giftOptionsDescription")}
              activeGiftOptions={activeGiftOptions}
              selectedGifts={selectedGifts}
              toggleGift={toggleGift}
              mainCurrency={cartSettings.mainCurrency}
            />
          )}
        </div>

        {/* Métodos */}
        <div className="flex flex-col gap-10 mx-5">
          {purchaseOptions.paymentMethods.length > 0 && (
            <Methodrender
              method="payment"
              mainCurrency={cartSettings.mainCurrency}
              paynshipT={paynshipT}
              feesT={feesT}
              handleChange={handleChange} />
          )}
          {purchaseOptions.shippingMethods.length > 0 && (
            <Methodrender
              method="shipping"
              mainCurrency={cartSettings.mainCurrency}
              paynshipT={paynshipT}
              feesT={feesT}
              handleChange={handleChange} />
          )}
        </div>
      </div>

      {/* Total */}
      <Carttotal
        title={t("purchase")}
        modalWidth={modalWidth}
        fees={{paymentFee, shippingFee}}
        amounts={{giftTotal, subtotal, total}}
        selectedParams={{selectedPayment, selectedShipping, selectedGifts}}
        purchaseParams={{item: cart, exchangeRate, isPurchaseReady: !!isPurchaseReady}}
        functions={{feesT, tPay, tShip, tModal, clearCartFunction: clearCart}} />
    </div>
  );
}