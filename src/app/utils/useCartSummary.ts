"use client";

import { useMemo, useState } from "react";
import { useCatalogContext } from "../[locale]/(catalog)/components/context/CatalogContext";
import { cartItem, GiftOption, PaymentMethod, shippingMethod } from "@/app/utils/types";

export function useCartSummary(cart: cartItem[]) {

  const { exchangeRate, cartSettings } = useCatalogContext();
  const mainCurrency = cartSettings.mainCurrency;

  const [formData, setFormData] = useState({ payment: 0, shipping: 0 });
  const [selectedGifts, setSelectedGifts] = useState<GiftOption[]>([]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qt, 0),
    [cart]
  );

  const giftTotal = useMemo(
    () => selectedGifts.reduce((sum, g) => sum + g.price, 0),
    [selectedGifts]
  );

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

  const calcFees = (paymentFee?: PaymentMethod["fee"], shippingFee?: shippingMethod["fee"]) => {
    const shipping = shippingFee?.status
      ? getFeeValue(shippingFee, subtotal)
      : 0;
    const payment = paymentFee?.status
      ? getFeeValue(paymentFee, subtotal + giftTotal + shipping)
      : 0;
    return { shipping, payment };
  };

  const total = subtotal + giftTotal;
  const isPurchaseReady = total > 0 && formData.payment > 0 && formData.shipping > 0;

  return {
    formData, setFormData,
    subtotal, giftTotal, total,
    selectedGifts, toggleGift,
    exchangeRate, mainCurrency,
    calcFees, isPurchaseReady
  };
}
