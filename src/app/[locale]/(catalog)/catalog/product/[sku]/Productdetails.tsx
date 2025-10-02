"use client"

import { notFound } from "next/navigation";
import { useCatalogContext } from "../../../components/context/CatalogContext";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Prices from "../../../components/products/Prices";
import ProductCarousel from "../../../components/home/ProductCarousel";
import Modelselect from "../../../components/products/Modelselect";
import ImageComponent from "../../../components/products/Imagecomponent";
import WaProduct from "../../../components/products/Waproduct";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";


export default function ProductDetails() {
  const nav = usePathname();
  const sku = nav.split("/").at(-1);
  
  const { products } = useCatalogContext();
  const product = products.find(item => item.mainSku === sku);
  const t = useTranslations("products");
  const locale = useLocale();
  if (!product) {
    return notFound();
  }
  const cartConfig = getShoppingCartConfig(locale);
  const currency = cartConfig.shoppingCart.currencyConversion.mainCurrency;

  return (
    <section className="m-5">
      <article>
        <h2 className="mb-5 underline text-sm dark:text-white">{product.name} - {t("productDetails")}</h2>
      </article>
      <article className="flex flex-col md:flex-row justify-evenly min-h-[80vh]">
        <ImageComponent product={product} />
        <div className="flex flex-col justify-between md:w-2/6">
          <div>
            <h3 className="text-lg mb-2 dark:text-white">{product.name}</h3>
            <Prices prices={{price: product.price, currency: currency, discount: product.discount}} view="product"/>
            <p className="text-sm mb-4 dark:text-white">{product.description}</p>
            <Modelselect product={product} />
          </div>
          <WaProduct link={product.waLink} price={product.price} discount={product.discount} currency={currency} />
          <div></div>
        </div>
      </article>
      <ProductCarousel title="product" type={product.subcategory !== undefined ? [product.category, product.subcategory] : [product.category]} />
    </section>
  )
}