"use client";

import GiftOptions from "./Giftoptions";
import Methodrender from "./Methodsrender";
import Carttotal from "./Carttotal";
import Image from "next/image";
import { useCartSummary } from "@/app/utils/useCartSummary";
import { cartItem, PaymentMethod, shippingMethod, GiftOption } from "@/app/utils/types";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import { useLocale } from "next-intl";
import { useCatalogContext } from "../context/CatalogContext";

type Props = {
  items: cartItem[];
  purchaseOptions: {
    paymentMethods: PaymentMethod[];
    shippingMethods: shippingMethod[];
  };
  subtotal: number;
  giftTotal: number;
  total: number;
  formData: {
    payment: number | string;
    shipping: number | string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{ payment: number | string; shipping: number | string }>>;
  selectedGifts: GiftOption[];
  toggleGift: (gift: GiftOption) => void;
  selectedPayment?: PaymentMethod;
  selectedShipping?: shippingMethod;
  exchangeRate: number;
  isPurchaseReady: boolean;
  mainCurrency: string;
  modalWidth: string;
  t: (key: string) => string;
  giftT: (key: string) => string;
  paynshipT: (key: string) => string;
  feesT: (key: string) => string;
  tPay: (key: string) => string;
  tShip: (key: string) => string;
  tModal: (key: string) => string;
  clearCart: () => void;
};

export function CartView({
  items,
  purchaseOptions,
  subtotal,
  giftTotal,
  total,
  formData,
  setFormData,
  selectedGifts,
  toggleGift,
  selectedPayment,
  selectedShipping,
  exchangeRate,
  isPurchaseReady,
  mainCurrency,
  modalWidth,
  t,
  giftT,
  paynshipT,
  feesT,
  tPay,
  tShip,
  tModal,
  clearCart
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: { payment: number | string; shipping: number | string }) => ({ ...prev, [name]: parseInt(value) }));
  };

  const { currencyConversion } = getShoppingCartConfig(useLocale()).shoppingCart;
  const { refreshProducts } = useCatalogContext();
  const { calcFees } = useCartSummary(items);

  const fees = calcFees(
    purchaseOptions.paymentMethods.find((m) => m.id === formData.payment)?.fee,
    purchaseOptions.shippingMethods.find((m) => m.id === formData.shipping)?.fee
  );

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col md:flex-row gap-10 justify-evenly w-full">
        <div className="flex flex-col gap-5 justify-around">
          {items.map((product: cartItem, idx: number) => (
            <div key={idx} className="flex gap-4 items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={120} />
              <div>
                <h2 className="text-lg">{product.name}</h2>
                <p>SKU: {product.sku}</p>
                <p>Cantidad: {product.qt}</p>
                {product.size && <p>Talla: {product.size}</p>}
                <p>Precio: ${product.price}</p>
              </div>
            </div>
          ))}

          {selectedGifts.length > 0 && (
            <GiftOptions
              giftOptionsTitle={giftT("giftOptionsTitle")}
              giftOptionsDescription={giftT("giftOptionsDescription")}
              activeGiftOptions={selectedGifts}
              selectedGifts={selectedGifts}
              toggleGift={toggleGift}
              mainCurrency={mainCurrency}
            />
          )}
        </div>

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

      <Carttotal
        title={t("purchase")}
        modalWidth={modalWidth}
        fees={{paymentFee: fees.payment, shippingFee: fees.shipping}}
        amounts={{giftTotal, subtotal, total}}
        selectedParams={{selectedPayment, selectedShipping, selectedGifts}}
        purchaseParams={{item: items, exchangeRate, isPurchaseReady}} 
        currencyConversion={currencyConversion}
        functions={{feesT, tPay, tShip, tModal, clearCartFunction: clearCart, refreshProducts}} />
    </div>
  );
}
