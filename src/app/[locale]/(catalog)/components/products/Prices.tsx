"use client"

import { getDiscountedPrice } from "@/app/utils/functions";
import { useCatalogContext } from "../context/CatalogContext";

type prices = {
  price:number;
  currency:string;
  discount?:{
    type: number;
    value: number;
  };
}

export default function Prices({prices, view}: {prices: prices, view: string}) {
  const { price, currency, discount } = prices;
  const { exchangeRate, cartConfig } = useCatalogContext();
  const exchCurrency = cartConfig.currencyConversion.exchangeCurrency;
  let priceString = "";
  let priceDiscountString = "";
  let textmid = "";
  let textsm = "";

  textmid = view == "list" ? "text-sm md: text-md" : "text-3xl";
  textsm = view == "list" ? "text-xs text-neutral-500" : "text-lg text-neutral-500";

  const exchPrice = (price * exchangeRate).toFixed(2);
  const exchPriceArr = exchPrice.split(".");

  if (price >= 10) {
    priceString = price.toPrecision(4);
  } else {
    priceString = price.toPrecision(3);
  }
  const priceArr = priceString.split(".");
  const priceInteger = priceArr[0];
  const priceDecimal = priceArr[1];

  let render = (<></>);

  if (discount && discount.value) {
    priceDiscountString = getDiscountedPrice(price,discount);
    const exchDiscountArr = (Number(priceDiscountString) * exchangeRate).toFixed(2).split(".");
    const discountPriceArr = priceDiscountString.split(".");
    const discountPriceInteger = discountPriceArr[0];
    const discountPriceDecimal = discountPriceArr[1];

    render = <div className='flex gap-3'>
      {discount && (
        <div className="flex-flex-col gap-5">
          <div className='flex w-fit justify-center text-red-600 font-bold'>
            <p className={textmid}>{`${exchCurrency} ${exchDiscountArr.join(".")}`}</p>
          </div>
          <div className='flex w-fit justify-center text-neutral-600 font-bold'>
            <p className={textsm}>{`${currency} ${discountPriceInteger}`}</p>
            <p className={textsm}>.{discountPriceDecimal}</p>
          </div>
        </div>
      )}
      <div className="flex-flex-col gap-5">
        <div className='flex w-fit content-center dark:text-white line-through'>
          <p className={textmid}>{`${exchCurrency} ${exchPriceArr.join(".")}`}</p>
        </div>
        <div className='flex w-fit content-center dark:text-white line-through'>
          <p className={textsm}>{`${currency} ${priceInteger}`}</p>
          <p className={textsm}>.{priceDecimal}</p>
        </div>
      </div>
    </div>
  } else {
    render = <div className="flex-flex-col gap-5">
      <div className='flex w-fit justify-center dark:text-white'>
        <p className={textmid}>{`${exchCurrency} ${exchPriceArr.join(".")}`}</p>
      </div>
      <div className='flex w-fit justify-center dark:text-white'>
        <p className={textsm}>{`${currency} ${priceInteger}`}</p>
        <p className={textsm}>.{priceDecimal}</p>
      </div>
    </div>
  }
  return render;
}