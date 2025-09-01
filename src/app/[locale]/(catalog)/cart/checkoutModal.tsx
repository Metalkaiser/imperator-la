"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PaymentMethod, shippingMethod, cartItem, GiftOption, saleData } from "@/app/utils/types";
import { phoneNumber } from "@/app/utils/utils";
import { giftOptions } from "@/app/utils/mockinfo";

const MySwal = withReactContent(Swal);

interface Props {
  payment: PaymentMethod;
  shipping: shippingMethod;
  cart: cartItem[];
  modalWidth: string;
  mainCurrency: string;
  total: number;
  exchangeCurrency?: string;
  exchangeRate?: number;
  selectedGifts: GiftOption[];
  tPay: (key: string) => string;
  tShip: (key: string) => string;
  tModal: (key: string) => string;
}

export default async function showCheckoutModal({
  payment,
  shipping,
  cart,
  modalWidth,
  mainCurrency,
  total,
  exchangeCurrency,
  exchangeRate,
  selectedGifts,
  tPay,
  tShip,
  tModal
}: Props) {

  // Traducir campos que el usuario debe llenar
  const userDataLabels = (payment.userData ?? []).map(k => tPay(k));
  const shippingLabels = (shipping.data ?? []).map(k => tShip(k));
  const allInputLabels = [...userDataLabels, ...shippingLabels];

  // Mostrar datos informativos del método de pago
  const paymentInfo = Object.entries(payment.data ?? {})
    .map(([key, val]) => `<li>${tPay(key)}: ${val}</li>`)
    .join("");

  // HTML inputs
  const inputHtml = allInputLabels
    .map(
      (label, i) =>
        `<div class="flex flex-col gap-1">
        <label for="input-${i}" class="text-left">${label}</label>
        <input id="input-${i}" class="h-[2.5em] p-2 border-1 border-solid rounded-md border-gray-500/50" placeholder="${label}" />
        </div>`
    )
    .join("");

  const { value: formValues } = await MySwal.fire({
    title: tPay("modalTitle"),
    width: modalWidth,
    theme: "auto",
    html: `
      <div class="flex flex-col gap-5">
        <p><strong>Datos:</strong></p>
        <ul class="flex flex-col gap-2">${paymentInfo}</ul>
        <p><strong>Total:</strong> ${mainCurrency}${total.toFixed(2)} ${exchangeRate ? "(" + exchangeCurrency + ". " + (total * exchangeRate).toFixed(2) + ")" : ""}</p>
        <hr/>
        <p><strong>Ingresa los siguientes datos después de pagar:</strong></p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        ${inputHtml}
      </div>
    `,
    focusConfirm: false,
    confirmButtonText: tPay("actionBtn"),
    showCancelButton: true,
    cancelButtonText: tPay("cancelBtn"),
    cancelButtonColor: "#992222",
    preConfirm: () => {
      const checkInputs = allInputLabels
        .map((_, i) => {
          const el = document.getElementById(`input-${i}`) as HTMLInputElement;
          return el?.value.trim();
        })
        .filter(val => val === "");
      if (checkInputs.length) {
        Swal.showValidationMessage(tPay("modalInputError"));
      } else {
        return allInputLabels.map((_, i) => {
          const el = document.getElementById(`input-${i}`) as HTMLInputElement;
          return el?.value.trim();
        });
      }
    }
  });

  if (formValues) {
    const productList = cart
      .map(
        item =>
          `• SKU: ${item.sku}, ${tModal("size")}: ${item.size || "N/A"}, ${tModal("quantity")}: ${
            item.qt
          }, ${tModal("price")}: ${mainCurrency}${item.price.toFixed(2)}`
      )
      .join("\n");

    const gifts = selectedGifts.length
      ? selectedGifts
          .map(g => `• ${g.name} (${mainCurrency}${g.price.toFixed(2)})`)
          .join("\n")
      : tModal("noGift");

    const userInputs = allInputLabels
      .map((label, i) => `${label}: ${formValues[i]}`)
      .join("\n");

    const msg = encodeURIComponent(
      `🛒 ${tModal("newPurchase")}:\n\n${tModal("products")}:\n${productList}\n\n${tModal("payment")}: ${payment.name}\n${tModal("shipping")}: ${shipping.name}\n${tModal("gift")}: ${gifts}\nTotal: ${mainCurrency}${total.toFixed(2)}\n\n${tModal("clientData")}:\n${userInputs}`
    );
    sessionStorage.removeItem("directBuyProduct");
    //window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
    const clientDataPayment = payment.userData?.reduce((acc: Record<string, any>, field: string, index: number) => {
      acc[field] = formValues[index];
      return acc;
    }, {}) || {};

    const clientDataShipping = shipping.data?.reduce((acc: Record<string, any>, field: string, index: number) => {
      acc[field] = formValues[index + (payment.userData?.length || 0)];
      return acc;
    }, {}) || {};

    const sale: saleData = {
      paymentMethodId: payment.id,
      paymentData: clientDataPayment,
      shippingMethod: shipping.id,
      shippingData: clientDataShipping,
      totalAmount: total,
    };

    // Intentamos “mapear” campos comunes si están presentes
    if (clientDataShipping.clientName) sale.clientName = String(clientDataShipping.clientName);
    if (clientDataShipping.clientId) sale.clientId = clientDataShipping.clientId;
    if (clientDataPayment.clientPhone || clientDataShipping.clientPhone) {
      sale.clientPhone = String(clientDataPayment.clientPhone || clientDataShipping.clientPhone);
    }
    if (clientDataPayment.clientEmail) sale.clientEmail = String(clientDataPayment.clientEmail);
    if (clientDataShipping.address) sale.clientAddress = { address: clientDataShipping.address };

    if (selectedGifts.length) {
      sale.giftOption = selectedGifts.map(g => g.id);
    }


    return { code: "purchase-complete", response: { data: formValues, inputs: sale }, status: 200 };
  } else {
    console.log("❌ El usuario canceló o no llenó todos los campos");
    return { code: "purchase-canceled", response: null, status: 400 };
  }
}