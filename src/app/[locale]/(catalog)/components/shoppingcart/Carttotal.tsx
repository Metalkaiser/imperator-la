"use client"

import Swal from "sweetalert2";
import showCheckoutModal from "../../cart/checkoutModal";
import { useCatalogContext } from "../context/CatalogContext";
import { PaymentMethod, shippingMethod, GiftOption, cartItem, saleData } from "@/app/utils/types";
import { useMetaPixel } from "../meta_ads/useMetaPixel";

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
  functions
}: Props) {
  const { cartSettings } = useCatalogContext();
  const { track } = useMetaPixel();
  const handleClick = async () => {
    const cartFinal = purchaseParams.item.filter(item => item.qt > 0 );
    track('InitiateCheckout', {
      value: amounts.total,
      currency: cartSettings.mainCurrency,
      content_name: 'Checkout',
      content_category: 'Checkout',
      content_ids: cartFinal.map(item => item.sku),
      num_ids: cartFinal.reduce((total, item) => total + item.qt, 0)
    });
    const wasConfirmed = await showCheckoutModal({
      cart: cartFinal,
      payment: selectedParams.selectedPayment!,
      shipping: selectedParams.selectedShipping!,
      modalWidth: modalWidth,
      exchangeRate: purchaseParams.exchangeRate,
      total: Number(amounts.total.toFixed(2)),
      selectedGifts: selectedParams.selectedGifts,
      mainCurrency: cartSettings.mainCurrency,
      exchangeCurrency: cartSettings.exchangeCurrency,
      tPay: functions.tPay,
      tShip: functions.tShip,
      tModal: functions.tModal,
    });

    if (wasConfirmed.status == 200 && wasConfirmed.response) {
      const clientData: saleData = wasConfirmed.response.inputs;
      track('Purchase', {
        value: amounts.total,
        currency: cartSettings.mainCurrency,
        content_name: 'Purchase',
        content_category: 'Checkout',
        content_ids: cartFinal.map(item => item.sku),
        num_ids: cartFinal.reduce((total, item) => total + item.qt, 0)
      });

      const response = await fetch(`/api/registerSale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: purchaseParams.item,
          clientData: clientData,
        }),
      });
      if (response.status === 200) {
        const resData = await response.json();
        console.log("✅ Venta registrada con éxito:", resData);
        functions.clearCartFunction();
      } else {
        console.error("❌ Error al registrar la venta:", response.statusText);
      }
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
      console.log(selectedParams.selectedPayment)
      console.log("❌ El usuario canceló o no llenó todos los campos");
    }
  }

  return (
    <div className="flex justify-center md:justify-end gap-10 items-center mx-5">
      <div className="flex flex-col gap-5 items-end">
        <div className="flex flex-col gap-1 items-end">
          <p className="text-xs font-light">
            Subtotal: {cartSettings.mainCurrency}
            {amounts.subtotal.toFixed(2)}
          </p>
          {fees.paymentFee > 0 && (
            feeComp(functions.feesT("paymentFee"), fees.paymentFee, cartSettings.mainCurrency)
          )}
          {fees.shippingFee > 0 && (
            feeComp(functions.feesT("shippingFee"), fees.shippingFee, cartSettings.mainCurrency)
          )}
          {amounts.giftTotal > 0 && (
            feeComp(functions.feesT("giftFee"), amounts.giftTotal, cartSettings.mainCurrency)
          )}
          {selectedParams.selectedPayment?.discount && (
            <p className="text-xs font-light text-green-600">
              {selectedParams.selectedPayment.discount.type === "percentage"
                ? `Descuento por pago: ${cartSettings.mainCurrency}${(amounts.total * (selectedParams.selectedPayment.discount.value)/100).toFixed(2)}`
                : `Descuento por pago: ${cartSettings.mainCurrency}${selectedParams.selectedPayment.discount.value.toFixed(2)}`
              }
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <h2 className="carttitle">
            Total: {cartSettings.mainCurrency}
            {amounts.total.toFixed(2)}
          </h2>
          {purchaseParams.exchangeRate > 0 && (
            <p className="text-sm font-thin">
              {cartSettings.exchangeCurrency}.
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