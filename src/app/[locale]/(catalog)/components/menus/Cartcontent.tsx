"use client"

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { shoppingCartImg } from "@/app/utils/svgItems";
import { cartItem } from "@/app/utils/types";
import { sessionCartName } from "@/app/utils/utils";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import Cartitem from "../Cartitem";
import { cartItems } from "@/app/utils/mockinfo"; //Cart mock info

export default function Cartcontent () {
  const locale = useLocale();
  const cartConfig = getShoppingCartConfig(locale);
  const { enabled, currencyConversion } = cartConfig.shoppingCart;
  const [cart, setCart] = useState<cartItem[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const t = useTranslations("shoppingCart");

  const updateCart = (item: cartItem) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(ci => ci.id === item.id);

    if (index > -1) {
      if (item.price <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index] = item;
      }
    } else if (item.qt > 0) {
      updatedCart.push(item);
    }

    setCart(updatedCart);
  };

  const fetchExchangeRate = async () => {
    if (!currencyConversion.enabled) return;

    if (currencyConversion.type === "fixed") {
      setExchangeRate(currencyConversion.fixedRate);
      return;
    }

    const cached = sessionStorage.getItem("ExchangeRate");
    const now = Date.now();
    const expirationMs = currencyConversion.exchangeExpirationTime * 3600000;

    if (cached) {
      const { exchangeRate, timestamp } = JSON.parse(cached);
      if (now - timestamp < expirationMs) {
        setExchangeRate(exchangeRate);
        return;
      }
    }

    try {
      const response = await fetch(currencyConversion.apiUrl);
      const data = await response.json();
      const rate = Math.round((Number(data[currencyConversion.targetExchangeCurrency]) + 0.01) * 100) / 100;
      setExchangeRate(rate);
      sessionStorage.setItem("ExchangeRate", JSON.stringify({ exchangeRate: rate, timestamp: now }));
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setExchangeRate(0);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.stringify(cartItems); // Replace with sessionStorage.getItem(sessionCartName) if needed
      //const storedCart = sessionStorage.getItem(sessionCartName);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
        fetchExchangeRate();
      }
    }
  }, []);

  useEffect(() => {
    if (cart !== null) {
      sessionStorage.setItem(sessionCartName, JSON.stringify(cart));
    }
  }, [cart]);

  const total = useMemo(() => (
    cart.reduce((sum, item) => sum + item.price * item.qt, 0)
  ), [cart]);

  if (!enabled) return null;

  return (
    <div className="flex flex-col my-5 justify-between items-center h-full w-full">
      <h1 className="text-xl font-bold">{t("title")}</h1>

      {cart.length > 0 ? (
        <>
          <p>{cart.length} items</p>
          <hr className="h-[2px] my-5 bg-gray-200 border-0 dark:bg-gray-700 w-full" />

          <div className="overflow-auto touch-auto max-w-full max-h-[40dvh] pb-5">
            <div className="flex flex-col gap-5 items-center w-max">
              {cart.map((item, index) => (
                <Cartitem
                  key={item.id}
                  item={item}
                  index={index}
                  mainCurrency={currencyConversion.mainCurrency}
                  updateCart={updateCart}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-xl font-bold">
                Total: {currencyConversion.mainCurrency}{total}
              </h2>
              {exchangeRate > 0 && (
                <p className="text-sm font-thin">
                  {currencyConversion.exchangeCurrency}.{(total * exchangeRate).toFixed(2)}
                </p>
              )}
            </div>
            {total > 0 ? (
              <Link href="#" className="block text-center p-3 actionbtn rounded-xl">
                {t("actionBtnOrder")}
              </Link>
            ) : (
              <button disabled className="block text-center p-3 actionbtn rounded-xl opacity-50 cursor-not-allowed">
                {t("actionBtnOrder")}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-center">
            {shoppingCartImg}
            <h2 className="text-center">{t("noItem_1")}</h2>
            <h2 className="text-center">{t("noItem_2")}</h2>
          </div>
          <div></div>
        </>
      )}
    </div>
  )
}