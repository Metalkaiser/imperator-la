"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCart } from "../components/context/Cartcontext";
import Cartitem from "../components/Cartitem";
import {
  getShoppingCartConfig,
  getPaymentFee,
} from "@/config/shoppingCartConfig";
import {
  cartItem,
  PaymentMethod,
  shippingMethod,
  GiftOption,
} from "@/app/utils/types";
import { fetchExchangeRate } from "@/app/utils/clientFunctions";
import { giftOptions } from "@/app/utils/mockinfo";

export default function ShoppingCart() {
  const t = useTranslations("shoppingCart");
  const locale = useLocale();
  const { purchaseOptions, cart, addOrUpdateItem, removeItem } = useCart();

  const [exchangeRate, setExchangeRate] = useState(0);
  const [formData, setFormData] = useState({ payment: 0, shipping: 0 });
  const [selectedGifts, setSelectedGifts] = useState<GiftOption[]>([]);

  const { enabled, currencyConversion } =
    getShoppingCartConfig(locale).shoppingCart;
  const mainCurrency = currencyConversion.mainCurrency;

  // Fetch exchange rate on mount
  useEffect(() => {
    if (!enabled || !currencyConversion.enabled) return;
    fetchExchangeRate(locale).then((rate) => rate && setExchangeRate(rate));
  }, [enabled, currencyConversion, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const updateCart = (item: cartItem) => {
    item.price
      ? addOrUpdateItem(item)
      : item.size
      ? removeItem(item.sku, item.size)
      : removeItem(item.sku);
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

  const translateMethodName = (name: string) =>
    name === "cash"
      ? t("cash")
      : name === "banktransfer"
      ? t("banktransfer")
      : name === "shop"
      ? t("shop")
      : name;

  const renderMethodOptions = (
    methods: (PaymentMethod | shippingMethod)[],
    name: "payment" | "shipping"
  ) =>
    methods
      .filter((m) => m.enabled)
      .sort((a, b) => a.order - b.order)
      .map((method) => (
        <label
          key={method.id}
          className="flex items-center gap-2 p-2 cursor-pointer dark:text-white active:bg-gray-300 dark:active:bg-gray-500"
        >
          <input
            type="radio"
            name={name}
            value={method.id}
            onChange={handleChange}
          />
          <Image src={method.icon} alt={method.name} width={50} height={50} />
          <h2 className="text-lg">{translateMethodName(method.name)}</h2>
          {method.fee.status && (
            <p className="text-xs">(Costo: {getPaymentFee(method.fee, mainCurrency)})</p>
          )}
          {"onlyPayOnDelivery" in method.fee &&
            method.fee.onlyPayOnDelivery && (
              <p className="text-xs">(Cobro al destino)</p>
            )}
        </label>
      ));

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
            <div className="flex flex-col gap-5 mx-5 mt-10">
              <h2 className="text-lg font-semibold">{t("giftOptionsTitle")}</h2>
              <p className="text-sm text-center">{t("giftOptionsDescription")}</p>
              <div className="flex flex-col gap-4">
                {activeGiftOptions.map((gift) => (
                  <label
                    key={gift.id}
                    className="flex gap-4 items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedGifts.find((g) => g.id === gift.id)}
                      onChange={() => toggleGift(gift)}
                      className="cursor-pointer w-5 h-5"
                    />
                    {gift.image && (
                      <Image
                        src={gift.image}
                        alt={gift.name}
                        width={100}
                        height={100}
                        className="rounded object-cover"
                      />
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-md font-medium">{gift.name}</h3>
                      {gift.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {gift.description}
                        </p>
                      )}
                      <p className="text-sm font-semibold mt-1">
                        {mainCurrency}
                        {gift.price.toFixed(2)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Métodos */}
        <div className="flex flex-col gap-5 mx-5">
          {purchaseOptions.paymentMethods.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">{t("paymentMethods")}:</h2>
              {renderMethodOptions(purchaseOptions.paymentMethods, "payment")}
            </div>
          )}
          {purchaseOptions.shippingMethods.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">{t("shippingMethods")}:</h2>
              {renderMethodOptions(purchaseOptions.shippingMethods, "shipping")}
            </div>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-center md:justify-end gap-10 items-center mx-5">
        <div className="flex flex-col gap-5 items-end">
          <div className="flex flex-col gap-1 items-end">
            <p className="text-xs font-light">
              Subtotal: {mainCurrency}
              {subtotal.toFixed(2)}
            </p>
            {paymentFee > 0 && (
              <p className="text-xs font-light">
                Comisión de pago: {mainCurrency}
                {paymentFee.toFixed(2)}
              </p>
            )}
            {shippingFee > 0 && (
              <p className="text-xs font-light">
                Costo de envío: {mainCurrency}
                {shippingFee.toFixed(2)}
              </p>
            )}
            {giftTotal > 0 && (
              <p className="text-xs font-light">
                Extras de regalo: {mainCurrency}
                {giftTotal.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <h2 className="carttitle">
              Total: {mainCurrency}
              {total.toFixed(2)}
            </h2>
            {exchangeRate > 0 && (
              <p className="text-sm font-thin">
                {currencyConversion.exchangeCurrency}.
                {(total * exchangeRate).toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <button
          className={`block text-center p-3 actionbtn rounded-xl ${
            !isPurchaseReady ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isPurchaseReady}
        >
          {t("purchase")}
        </button>
      </div>
    </div>
  );
}
