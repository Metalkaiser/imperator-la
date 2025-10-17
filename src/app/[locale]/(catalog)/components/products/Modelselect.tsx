"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Swal from "sweetalert2";
import { productProps, cartItem } from "@/app/utils/types";
import { QuantitySelector } from "../Quantityselector";
import { plusIcon, minusIcon, getShoppingCartIcon } from "@/app/utils/svgItems";
import { getDiscountedPrice } from "@/app/utils/functions";
import { useCart } from "../context/Cartcontext";
import { useCatalogContext } from "../context/CatalogContext";
import { storagePath } from "@/app/utils/utils";
import unavailableImage from "@P/misc/other/forbidden.png";

export default function Modelselect ({product}:{product:productProps}) {
  const { locale } = useCatalogContext();
  const { addOrUpdateItem, enabled } = useCart();
  const currentPrice = product.discount ? parseFloat(getDiscountedPrice(product.price,product.discount)) : product.price;
  const defaultItemProps = {
    id: product.id,
    name: product.name,
    mainSku: product.mainSku,
    sku: (product.variants && product.variants.length === 1) ? product.mainSku : "",
    image: (product.variants && product.variants.length === 1) ? product.variants[0].image : "",
    qt: 0,
    max: 1,
    price: currentPrice
  };
  const [selectedItem, setSelectedItem] = useState<cartItem>(defaultItemProps);

  const t = useTranslations("products");
  const cartTranslations = useTranslations("shoppingCart");

  const changeItemProps = (prop:string, value: string | number, max?: number) => {
    let item:cartItem = { ...selectedItem };
    switch(prop) {
      case "sku":
        item = { ...defaultItemProps };
        item.sku = String(value);
        item.image = product.variants.find(variant => variant.sku === String(value))?.image || "";
        break;
      case "qt":
        item.qt = Number(value);
        break;
      case "size":
        item.size = value;
        item.qt = 1;
        item.max = max ? max : 1;
        break;
      default:
        break;
    }
    setSelectedItem(item);
  }
  const newQt = (newqt: number) => {
    changeItemProps("qt", newqt);
  }

  const addToCart = () => {
    if (!selectedItem.qt || !selectedItem.sku) return;

    addOrUpdateItem(selectedItem);
    Swal.fire({
      text: `${selectedItem.name} (${selectedItem.sku}) ${cartTranslations("itemadded")}`,
      theme: "auto",
      icon: "success",
      timer: 2500,
      timerProgressBar: true,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: cartTranslations("confirmBtn"),
      showCancelButton: true,
      cancelButtonText: cartTranslations("closeBtn")
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.href = `/${locale}/cart`;
      }
    });
  }

  const buyProduct = () => {
    if (!selectedItem || !selectedItem.sku) return;

    sessionStorage.setItem("directBuyProduct", JSON.stringify(selectedItem));
    window.location.href = `/${locale}/cart/direct`;
  }

  const iconSize = 40;

  return (
  <>
  <div className={`${product.variants.length > 1 ? "" : "hidden"} flex flex-col md:flex-row items-center gap-5 my-5`}>
    {product.variants && (<p className="text-center dark:text-white">{t("models")}:</p>)}
    <div className="flex gap-5 justify-center items-center">
    {product.variants && (
      Object.values(product.variants).map((variant) => (
        <label key={variant.sku} className={!variant.stock.reduce((sum, v) => sum + v.quantity, 0) ? "cursor-not-allowed" : "cursor-pointer"}>
          <input
            defaultChecked={product.variants.length > 1 ? false : true}
            type="radio"
            name="model"
            className="peer hidden"
            onClick={() => changeItemProps("sku", variant.sku)}
            disabled={!variant.stock.reduce((sum, v) => sum + v.quantity, 0)} />
          <div
            id={variant.sku}
            style={{background: variant.color}}
            className={`relative border-gray-500 dark:border-white border-solid border-2 size-[${iconSize}px] rounded-full peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline-gray-700 peer-checked:dark:outline-gray-200`}
          >
            <Image 
              unoptimized
              src={unavailableImage}
              alt={variant.sku}
              width={iconSize}
              height={iconSize}
              className={`rounded-full object-cover absolute top-0 left-0 ${!variant.stock.reduce((sum, v) => sum + v.quantity, 0) ? "opacity-80" : "opacity-0"}`}
            />
            <Image
              unoptimized
              src={`${storagePath}${variant.image}`}
              alt={variant.sku}
              width={iconSize}
              height={iconSize}
              className="rounded-full object-cover"
            />
          </div>
        </label>
      ))
    )}
    </div>
  </div>
  <div>
    {(selectedItem.sku && product.variants.find(variant => variant.sku === selectedItem.sku)) && (
      <div>
        {(() => {
          const variant = product.variants.find(variant => variant.sku === selectedItem.sku);
          
          if (variant) {
            const skuText = `SKU: ${variant.sku}`;
            const sizes = variant.stock;
            const selector = sizes.map(size => (
              <label key={size.name} className={!size.quantity ? "hidden" : ""}>
                <input
                  type="radio"
                  name="size"
                  className="peer hidden"
                  onChange={() => {return;}}
                  onClick={() => changeItemProps("size", size.name, size.quantity)}
                  checked={selectedItem.size == size.name} />
                <div className="flex flex-col justify-center border-gray-700/50 dark:border-gray-200/50 border-solid border-2 min-w-[40px] min-h-[40px] cursor-pointer peer-checked:outline-2 peer-checked:outline-offset-2 peer-checked:outline-gray-700 peer-checked:dark:outline-gray-200">
                  <h2 className="flex justify-center">{size.name}</h2>
                </div>
              </label>
            ))
            return (
            <div className="flex flex-col gap-5">
              <div id={!enabled ? "onlysku" : ""}>{skuText}</div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <h2 className="text-sm">{cartTranslations("size")}s:</h2>
                <div className="flex gap-2">{selector}</div>
              </div>
              {selectedItem.size && (
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h2 className="text-sm">{cartTranslations("quantity")}:</h2>
                  <div className="flex gap-5">
                    <QuantitySelector
                      value={selectedItem.qt ? selectedItem.qt : 1}
                      max={variant.stock.find(s => s.name === selectedItem.size)?.quantity || 1}
                      minusIcon={minusIcon}
                      plusIcon={plusIcon}
                      onChange={newQt} />
                    <p>{cartTranslations("qtRemaining")}: {variant.stock.find(s => s.name === selectedItem.size)?.quantity}</p>
                  </div>
                </div>
              )}
            </div>)
          } else {
            return "";
          }
        })()}
      </div>
    )}
  </div>
  <div className={`flex flex-col gap-2 mt-5 ${!enabled ? "hidden" : ""}`}>
    <button
      onClick={addToCart}
      disabled={!selectedItem.qt}>
      <div className={`${selectedItem.qt ? "addtocart cursor-pointer" : "disabledcart cursor-not-allowed"} flex relative justify-evenly justify-items-stretch items-center w-5/6 p-5 rounded-lg shadow-lg text-center mx-auto`}>
        <p className="text-white text-md md:text-lg">{cartTranslations("addToCart")}</p>
        {getShoppingCartIcon("white")}
      </div>
    </button>
    <button
      onClick={buyProduct}
      disabled={!selectedItem.qt}>
      <div className={`${selectedItem.qt ? "purchase cursor-pointer" : "disabledcart cursor-not-allowed"} flex relative justify-evenly justify-items-stretch items-center w-5/6 p-5 rounded-lg shadow-lg text-center mx-auto`}>
        <p className="text-white text-md md:text-lg">{cartTranslations("purchase")}</p>
      </div>
    </button>
  </div>
  </>
  )
}