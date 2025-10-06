"use client";
import { useEffect, useState, useCallback, JSX } from 'react';
import Link from "next/link";
import Image from "next/image";
import Prices from './Prices';
import { useTranslations } from 'next-intl';
import { storagePath } from '@/app/utils/utils';
import { useCatalogContext } from '../context/CatalogContext';
import { getCategoryIndexes } from "@/config/websiteConfig/categoryConfig";

interface viewData {
  name:string,
  items:string[],
  loadSub:boolean
}


export default function ProductList(props:viewData){
  
  const [currentproducts, setProducts] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsToLoad, setProductsToLoad] = useState(0);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const t = useTranslations("products");
  const { products, cartSettings } = useCatalogContext();

  const determineProductsToLoad = useCallback(() => {
    const width = window.innerWidth;
    if (width <= 767) return 7;
    if (width <= 1023) return 11;
    if (width <= 1279) return 14;
    if (width <= 1535) return 17;
    return 20;
  }, []);

  useEffect(() => {
    setProductsToLoad(determineProductsToLoad());
  }, [determineProductsToLoad]);

  useEffect(() => {
    if (props.loadSub) loadMoreProducts();
  }, [props.loadSub]);

  useEffect(() => {
    if (productsToLoad > 0) {
      loadMoreProducts();
    }
  }, [productsToLoad]);


  const loadMoreProducts = async () => {
    if (hasMoreProducts && !isLoading) {
      let prodList = [];
      const { categoryIndex, subcategoryIndex } = getCategoryIndexes(props.items[0], props.items[1]);
      switch (props.items.length) {
        case 1:
          prodList = products.filter((prod) => prod.category === categoryIndex);
          break;
        case 2:
          prodList = products.filter((prod) => prod.category === categoryIndex && prod.subcategory === subcategoryIndex);
            break;
        default:
          prodList = products;
          break;
      }
      const nextProducts = prodList.slice(currentIndex, currentIndex + productsToLoad);
      setIsLoading(true);
      setTimeout(() => {
        if (nextProducts.length > 0 && hasMoreProducts || currentIndex == 0) {
          const initProducts = nextProducts.map((product) => (
            <div key={"product-" + product.mainSku} className='flex flex-col items-center gap-2 size-full'>
              <Link href={"/catalog/product/" + product.mainSku} className="m-1 pb-3 size-11/12">
                <div className='relative grow-1'>
                  {product.discount && (<p className={`${product.discount.value ? '' : 'hidden'} absolute py-1 px-2 m-2 text-white font-bold right-0 discount-indicator-list z-10`}>-{`${product.discount.type === 0 ? `${product.discount.value}%` : `${cartSettings.mainCurrency}. ${product.discount.value}`}`}</p>)}
                  <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={storagePath + product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={Object.hasOwn(product, "variants") ? "absolute bottom-1 right-1 space-y-2" : "hidden"}>
                    {(product.variants && product.variants.length > 1) ? Object.values(product.variants).map((variant) => (<div key={variant.sku} style={{backgroundColor: variant.color}} className='border-white border-solid border-2 w-[20px] h-[20px] rounded-full'></div>))
                    : ""}
                  </div>
                </div>
                <h2 className="max-w-full name-list mt-1 truncate dark:text-white">{product.name}</h2>
                <Prices prices={{price: product.price, discount: product.discount}} view='list'/>
              </Link>
            </div>
          ));
          
          setProducts(previous => [...previous, ...initProducts]);
          setCurrentIndex(prev => prev + productsToLoad);
        } else {
          setHasMoreProducts(false);
        }
        setIsLoading(false);
      }, 500); // Retraso simulado para la carga de datos 
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const footerHeight = document.getElementsByTagName("footer")[0].scrollHeight;
    if (!isLoading && (scrollTop + clientHeight + footerHeight - 50 >= scrollHeight)) {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return(
    <section className="px-2 py-5">
      {props.name == "allProds" && (<h2 className="sectiontitle text-center dark:text-white">{t(props.name)}</h2>)}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {currentproducts}
      </div>
      {isLoading && (
      <div className='rounded-lg max-w-fit p-5 flex gap-2 mx-auto'>
        <svg className="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className='dark:text-white'>{t("loading")}...</span>
      </div>
      )}
    </section>
  );
}