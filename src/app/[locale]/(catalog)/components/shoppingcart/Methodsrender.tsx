"use client"

import Image from "next/image";
import { PaymentMethod, shippingMethod } from "@/app/utils/types";
import { getPaymentFee } from "@/config/shoppingCartConfig";
import { useCart } from "../context/Cartcontext";

interface Props {
  method: "payment" | "shipping";
  mainCurrency: string;
  paynshipT: (key: string) => string;
  feesT: (key: string) => string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Methodrender ({
  method,
  mainCurrency,
  paynshipT,
  feesT,
  handleChange
}: Props) {

  const { purchaseOptions } = useCart();
  const selectedOptions = method === "payment" ? purchaseOptions.paymentMethods : purchaseOptions.shippingMethods;
  const titleString = method === "payment" ? paynshipT("paymentMethods") : paynshipT("shippingMethods");

  const translateMethodName = (name: string) =>
    name === "cash"
      ? paynshipT("cash")
      : name === "banktransfer"
      ? paynshipT("banktransfer")
      : name === "shop"
      ? paynshipT("shop")
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
              <p className="text-xs">({feesT("cost")}: {getPaymentFee(method.fee, mainCurrency)})</p>
            )}
            {"onlyPayOnDelivery" in method.fee &&
              method.fee.onlyPayOnDelivery && (
                <p className="text-xs">({feesT("shippingOnArrival")})</p>
              )}
          </label>
        ));

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">{titleString}:</h2>
      {renderMethodOptions(selectedOptions, method)}
    </div>
  )
}