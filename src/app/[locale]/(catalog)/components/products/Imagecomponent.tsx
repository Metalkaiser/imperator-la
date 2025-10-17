"use client"

import { useState } from "react"
import Image from "next/image";
import { productProps } from "@/app/utils/types";
import { storagePath } from "@/app/utils/utils";
import { useCatalogContext } from "../context/CatalogContext";
import Carousel from "../../catalog/product/[sku]/Carousel";
import logo_image_light from "@P/brand/logo_loading_image_light.webp";
import logo_image_dark from "@P/brand/logo_loading_image_dark.webp";

interface ImageItem {
  src: string,
}

export default function ImageComponent ({product}:{product:productProps}) {
  const [activeImg, setImage] = useState(product.images[0]);
  const { cartSettings } = useCatalogContext();

  const hideLoadingImage = () => {
    const  loadingImages = document.getElementsByClassName("loadingImage") as HTMLCollectionOf<HTMLElement>;
    loadingImages[0].style.display = "none";
    loadingImages[1].style.display = "none";
  }

  const ChangeMainImage = ({src}:ImageItem) => (
    <Image unoptimized onLoad={hideLoadingImage} className="w-5/6 max-w-[500px] max-h-[500px]" src={storagePath + src} alt="Imagen grande" height={0} width={500}></Image>
  );
  return (
    <>
    <div className="flex flex-col md:w-1/6 items-center">
      <div className="hidden md:flex flex-col">
      {product.images.map((image,i) => (
        <div key={product.mainSku + "-" + i} className={image === activeImg ? "mb-3 hover:cursor-pointer border-gray dark:border-white border-solid border-2" : "mb-3 hover:cursor-pointer"} onClick={() => setImage(image)}><Image src={storagePath + image} width={100} height={0} alt={product.name}></Image></div>
      ))}
      </div>
      {product.discount && (<p className={`${product.discount.value ? '' : 'hidden'} absolute md:hidden z-50 py-1 px-2 m-2 text-white font-bold bg-gray-700/25 rounded-3xl text-center w-2/6 left-5`}>-{`${product.discount.value}${product.discount.type === 0 ? "%" : cartSettings.mainCurrency}`}</p>)}
      <Carousel images={product.images}></Carousel>
    </div>
    <div className="hidden md:flex justify-center relative md:w-3/6">
      {product.discount && (<p className={`${product.discount.value ? '' : 'hidden'} absolute py-2 px-4 text-white font-bold bg-gray-700/25 rounded-3xl text-center w-2/6 right-[18%]`}>-{`${product.discount.type === 0 ? `${product.discount.value}%` : `${cartSettings.mainCurrency}. ${product.discount.value}`}`}</p>)}
      <Image className="block dark:hidden absolute w-5/6 max-w-[500px] max-h-[500px] m-auto loadingImage" src={logo_image_light} alt="Cargando imagen" height={0} width={500}></Image>
      <Image className="hidden dark:block absolute w-5/6 max-w-[500px] max-h-[500px] m-auto loadingImage" src={logo_image_dark} alt="Cargando imagen" height={0} width={500}></Image>
      <ChangeMainImage src={activeImg} />
    </div>
    </>
  )
}