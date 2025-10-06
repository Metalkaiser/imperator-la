"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useCatalogContext } from "../../components/context/CatalogContext";
import { useCart } from "../../components/context/Cartcontext";
import { cartItem, GiftOption, } from "@/app/utils/types";
import { storagePath } from "@/app/utils/utils";
import { fetchExchangeRate } from "@/app/utils/clientFunctions";
import Methodrender from "../../components/shoppingcart/Methodsrender";
import GiftOptions from "../../components/shoppingcart/Giftoptions";
import Carttotal from "../../components/shoppingcart/Carttotal";
import Image from "next/image";

import { useRouter } from "next/navigation";
import LoadingPage from "../../components/LoadingPage";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import { getActiveGiftOptions } from "@/app/utils/clientFunctions";

export default function DirectBuyPage() {
  const t = useTranslations("shoppingCart");
  const giftT = useTranslations("gifts");
  const paynshipT = useTranslations("paynship");
  const feesT = useTranslations("fees");
  const tPay = useTranslations("paydata");
  const tShip = useTranslations("shipdata");
  const tModal = useTranslations("modal");

  const { cartSettings, locale } = useCatalogContext();

  const [exchangeRate, setExchangeRate] = useState(0);
  const [formData, setFormData] = useState({ payment: 0, shipping: 0 });
  const [selectedGifts, setSelectedGifts] = useState<GiftOption[]>([]);

  const [product, setProduct] = useState<cartItem | null>(null);
  const { purchaseOptions, clearCart } = useCart();
  const router = useRouter();

  const { currencyConversion } = getShoppingCartConfig(locale).shoppingCart;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(selectedPayment, selectedShipping);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!cartSettings.enabled || !currencyConversion.enabled) return;
    fetchExchangeRate(locale,cartSettings.exchangeRateType).then((rate) => rate && setExchangeRate(rate));
  }, [cartSettings.enabled, currencyConversion, locale]);

  const toggleGift = (gift: GiftOption) => {
    setSelectedGifts((prev) =>
      prev.find((g) => g.id === gift.id)
        ? prev.filter((g) => g.id !== gift.id)
        : [...prev, gift]
    );
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("directBuyProduct");
    if (!stored) {
      router.push("/");
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      setProduct(parsed);
    } catch {
      router.push("/");
    }
  }, []);

  const activeGiftOptions = getActiveGiftOptions(
    purchaseOptions.giftOptions,
    product ? [product] : []
  );
  const subtotal = product ? product.price * product.qt : 0;
  const giftTotal = selectedGifts.reduce(
    (total, gift) => total + gift.price,
    0
  );

  const selectedPayment = purchaseOptions.paymentMethods.find(
    (m) => m.id === formData.payment
  );
  const selectedShipping = purchaseOptions.shippingMethods.find(
    (m) => m.id === formData.shipping
  );
  const shippingFee = useMemo(() => {
    if (!selectedShipping || !selectedShipping.fee.status) return 0;
    const fee = selectedShipping.fee;
    if (fee.percentage && fee.fixed) {
      return subtotal * (fee.percentage / 100) + fee.fixed;
    } else if (fee.percentage) {
      return subtotal * (fee.percentage / 100);
    } else if (fee.fixed) {
      return fee.fixed;
    }
    return 0;
  }, [selectedShipping, subtotal]);

  const paymentFee = useMemo(() => {
    if (!selectedPayment || !selectedPayment.fee.status) return 0;
    const fee = selectedPayment.fee;
    const base = subtotal + giftTotal + shippingFee;
    if (fee.percentage && fee.fixed) {
      return ((base * fee.percentage) + (fee.fixed * 100)) / (100 - fee.percentage);
    } else if (fee.percentage) {
      return base * (fee.percentage / 100);
    } else if (fee.fixed) {
      return fee.fixed;
    }
    return 0;
  }, [selectedPayment, subtotal, giftTotal, shippingFee]);

  const total = useMemo(() => {
    return subtotal + giftTotal + paymentFee + shippingFee;
  }, [subtotal, giftTotal, paymentFee, shippingFee]);

  const isPurchaseReady =
    total > 0 && formData.payment && formData.shipping;

  if (!product) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-20">
        <div className="flex flex-col md:flex-row gap-10 justify-evenly w-full">
        <div className="flex flex-col gap-5 justify-around">
          <div className="flex gap-4 items-center">
            <Image
              src={`${storagePath}${product.image}`}
              alt={product.name}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg">{product.name}</h2>
              <p>SKU: {product.sku}</p>
              <p>Cantidad: {product.qt}</p>
              {product.size && <p>Talla: {product.size}</p>}
              <p>Precio: ${product.price}</p>
            </div>
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
      <Carttotal
        title={t("purchase")}
        modalWidth="90vw"
        fees={{paymentFee, shippingFee}}
        amounts={{giftTotal, subtotal, total}}
        selectedParams={{selectedPayment, selectedShipping, selectedGifts}}
        purchaseParams={{item: [product], exchangeRate, isPurchaseReady: !!isPurchaseReady}}
        functions={{feesT, tPay, tShip, tModal, clearCartFunction: clearCart }} />
    </div>
  );
}