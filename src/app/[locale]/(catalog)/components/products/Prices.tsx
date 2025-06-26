import { getDiscountedPrice } from "@/app/utils/functions";

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
  let priceString = "";
  let priceDiscountString = "";
  let textmid = "";
  let textsm = "";

  textmid = view == "list" ? "text-md" : "text-3xl";
  textsm = view == "list" ? "text-sm" : "text-xl";

  if (price >= 10) {
    priceString = price.toPrecision(4);
  } else {
    priceString = price.toPrecision(3);
  }
  const priceArr = priceString.split(".");
  const priceInteger = priceArr[0];
  const priceDecimal = priceArr[1];

  let render = (<></>);

  if (discount) {
    priceDiscountString = getDiscountedPrice(price,discount)
    const discountPriceArr = priceDiscountString.split(".");
    const discountPriceInteger = discountPriceArr[0];
    const discountPriceDecimal = discountPriceArr[1];

    render = <div className='flex gap-3'>
      {discount && (
        <div className='flex w-fit justify-center text-red-600 line-through'>
          <p className={textmid}>{`${currency} ${priceInteger}`}</p>
          {priceDecimal !== "00" && (
            <p className={textsm}>.{priceDecimal}</p>
          )}
        </div>
      )}
      <div className='flex w-fit content-center dark:text-white'>
        <p className={textmid}>{`${currency} ${discountPriceInteger}`}</p>
        {discountPriceDecimal !== "00" && (
          <p className={textsm}>.{discountPriceDecimal}</p>
        )}
      </div>
    </div>
  } else {
    render = <div className='flex w-fit content-center dark:text-white'>
      <p className={textmid}>{`${currency} ${priceInteger}`}</p>
      {priceDecimal !== "00" && (
        <p className={textsm}>.{priceDecimal}</p>
      )}
    </div>
  }
  return render;
}