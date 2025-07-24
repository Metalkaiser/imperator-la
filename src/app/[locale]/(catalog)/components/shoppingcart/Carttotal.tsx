"use client"

import Swal from "sweetalert2";
import showCheckoutModal from "../../cart/checkoutModal";
import { PaymentMethod, shippingMethod, GiftOption, cartItem } from "@/app/utils/types";

interface Props {
  title: string;
  modalWidth: string;
  fees: {
    paymentFee: number;
    shippingFee: number;
  }
  amounts: {
    giftTotal: number;
    subtotal: number;
    total: number;
  }
  selectedParams: {
    selectedPayment: PaymentMethod | undefined;
    selectedShipping: shippingMethod | undefined;
    selectedGifts: GiftOption[];
  }
  purchaseParams: {
    item: cartItem[];
    exchangeRate: number;
    isPurchaseReady: boolean;
  }
  currencyConversion: {
    enabled: boolean;
    type: "api" | "fixed";
    fixedRate: number;
    mainCurrency: string;
    exchangeCurrency: string;
    targetExchangeCurrency: string;
    apiUrl: string;
    exchangeExpirationTime: number;
  }
  functions: {
    feesT: (key: string) => string;
    tPay: (key: string) => string;
    tShip: (key: string) => string;
    tModal: (key: string) => string;
    clearCartFunction: () => void;
  }
}

const feeComp = (element:string, value:number, currency:string) => (
  <p className="text-xs font-light">
    {element}: {currency}
    {value.toFixed(2)}
  </p>
);

export default function Carttotal ({
  title,
  modalWidth,
  amounts,
  fees,
  selectedParams,
  purchaseParams,
  currencyConversion,
  functions
}: Props) {
  const handleClick = async () => {
    const wasConfirmed = await showCheckoutModal({
      payment: selectedParams.selectedPayment!,
      shipping: selectedParams.selectedShipping!,
      cart: purchaseParams.item,
      modalWidth: modalWidth,
      mainCurrency: currencyConversion.mainCurrency,
      exchangeCurrency: currencyConversion.exchangeCurrency,
      exchangeRate: purchaseParams.exchangeRate,
      total: amounts.total,
      selectedGifts: selectedParams.selectedGifts,
      tPay: functions.tPay,
      tShip: functions.tShip,
      tModal: functions.tModal,
    });

    if (wasConfirmed) {
      functions.clearCartFunction();
      Swal.fire({
        text: functions.tModal("purchaseFinish"),
        icon: "success",
        theme: "auto",
        confirmButtonText: functions.tModal("confirmBtn"),
        timer: 3000,
        timerProgressBar: true,
      }).finally(() => {
        console.log("✅ El usuario completó la compra y el carrito fue limpiado.");
        window.open("/", "_self");
      });
    } else {
      console.log("❌ El usuario canceló o no llenó todos los campos");
    }
  }

  return (
    <div className="flex justify-center md:justify-end gap-10 items-center mx-5">
      <div className="flex flex-col gap-5 items-end">
        <div className="flex flex-col gap-1 items-end">
          <p className="text-xs font-light">
            Subtotal: {currencyConversion.mainCurrency}
            {amounts.subtotal.toFixed(2)}
          </p>
          {fees.paymentFee > 0 && (
            feeComp(functions.feesT("paymentFee"), fees.paymentFee, currencyConversion.mainCurrency)
          )}
          {fees.shippingFee > 0 && (
            feeComp(functions.feesT("shippingFee"), fees.shippingFee, currencyConversion.mainCurrency)
          )}
          {amounts.giftTotal > 0 && (
            feeComp(functions.feesT("giftFee"), amounts.giftTotal, currencyConversion.mainCurrency)
          )}
        </div>
        <div className="flex flex-col items-end">
          <h2 className="carttitle">
            Total: {currencyConversion.mainCurrency}
            {amounts.total.toFixed(2)}
          </h2>
          {purchaseParams.exchangeRate > 0 && (
            <p className="text-sm font-thin">
              {currencyConversion.exchangeCurrency}.
              {(amounts.total * purchaseParams.exchangeRate).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <button
        className={`block text-center p-3 actionbtn rounded-xl ${
          !purchaseParams.isPurchaseReady ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={!purchaseParams.isPurchaseReady}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  )
}