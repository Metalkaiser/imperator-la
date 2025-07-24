"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCart } from "../components/context/Cartcontext";
import Cartitem from "../components/Cartitem";
import Methodrender from "../components/shoppingcart/Methodsrender";
import Carttotal from "../components/shoppingcart/Carttotal";
import GiftOptions from "../components/shoppingcart/Giftoptions";
import LoadingPage from "../components/LoadingPage";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import { cartItem, GiftOption, } from "@/app/utils/types";
import { fetchExchangeRate } from "@/app/utils/clientFunctions";
import { shoppingCartImg } from "@/app/utils/svgItems";
import { giftOptions } from "@/app/utils/mockinfo";

export default function ShoppingCart() {
  const t = useTranslations("shoppingCart");
  const giftT = useTranslations("gifts");
  const paynshipT = useTranslations("paynship");
  const feesT = useTranslations("fees");
  const tPay = useTranslations("paydata");
  const tShip = useTranslations("shipdata");
  const tModal = useTranslations("modal");

  const locale = useLocale();
  const { purchaseOptions, cart, addOrUpdateItem, removeItem, clearCart } = useCart();

  const [exchangeRate, setExchangeRate] = useState(0);
  const [formData, setFormData] = useState({ payment: 0, shipping: 0 });
  const [selectedGifts, setSelectedGifts] = useState<GiftOption[]>([]);
  const [modalWidth, setWidth] = useState('60vw'); // valor por defecto para escritorio

  const { enabled, currencyConversion } =
    getShoppingCartConfig(locale).shoppingCart;
  const mainCurrency = currencyConversion.mainCurrency;

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

  useEffect(() => {
    if (!enabled || !currencyConversion.enabled) return;
    fetchExchangeRate(locale).then((rate) => rate && setExchangeRate(rate));
  }, [enabled, currencyConversion, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const updateCart = (item: cartItem) => {
    if (item.price) {
      addOrUpdateItem(item);
    } else if (item.size) {
      removeItem(item.sku, item.size);
    } else {
      removeItem(item.sku);
    }
  };

  const toggleGift = (gift: GiftOption) => {
    setSelectedGifts((prev) =>
      prev.find((g) => g.id === gift.id)
        ? prev.filter((g) => g.id !== gift.id)
        : [...prev, gift]
    );
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
    if (!Array.isArray(giftOptions)) return [];
    return giftOptions.filter((gift) => {
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
    total > 0 && formData.payment > 0 && formData.shipping > 0;

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
                mainCurrency={mainCurrency}
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
              mainCurrency={mainCurrency}
            />
          )}
        </div>

        {/* Métodos */}
        <div className="flex flex-col gap-10 mx-5">
          {purchaseOptions.paymentMethods.length > 0 && (
            <Methodrender
              method="payment"
              mainCurrency={mainCurrency}
              paynshipT={paynshipT}
              feesT={feesT}
              handleChange={handleChange} />
          )}
          {purchaseOptions.shippingMethods.length > 0 && (
            <Methodrender
              method="shipping"
              mainCurrency={mainCurrency}
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
        purchaseParams={{item: cart, exchangeRate, isPurchaseReady}} 
        currencyConversion={currencyConversion}
        functions={{feesT, tPay, tShip, tModal, clearCartFunction: clearCart}} />
    </div>
  );
}