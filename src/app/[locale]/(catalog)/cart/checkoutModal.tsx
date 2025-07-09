"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PaymentMethod, shippingMethod, cartItem, GiftOption } from "@/app/utils/types";
import { phoneNumber } from "@/app/utils/utils";

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
    //Aquí irá un llamado a base de datos para descontar lo vendido del inventario, limpiar el carrito de compras, y enviar al usuario a la página de inicio
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  }
}
