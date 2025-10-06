"use client";

import { createContext, useContext, useState, useEffect } from "react";
import LoadingPage from "../LoadingPage";
import { productProps, topProductsProps } from "@/app/utils/types";
import { fetchExchangeRate } from "@/app/utils/clientFunctions";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import type { ShoppingCartConfig } from "@/config/shoppingCartConfig";
import { useLocale } from "next-intl";

interface shoppinCartSettings {
  enabled: boolean;
  expirationDays: string;
  sessionName: string;
  mainCurrency: string;
  exchangeCurrency: string;
  exchangeRateEnabled: boolean;
  exchangeRateType: string;
}

interface CatalogContextType {
  catIndexes: number[];
  subCatIndexes: number[][];
  products: productProps[];
  topProducts: productProps[];
  exchangeRate: number;
  cartConfig: ShoppingCartConfig;
  cartSettings: shoppinCartSettings;
  loading: boolean;
  locale: string;
  refreshProducts: () => Promise<void>;
}

interface providerProps {
  children: React.ReactNode;
  shoppinCartSettings: shoppinCartSettings;
}

const emptyCartConfig: ShoppingCartConfig = {
  enabled: false,
  currencyConversion: {
    enabled: false,
    type: "fixed",
    fixedRate: 0,
    mainCurrency: "",
    exchangeCurrency: "",
    targetExchangeCurrency: "",
    apiUrl: "",
    exchangeExpirationTime: 24,
  }
}

const initCartSettings: shoppinCartSettings = {
  enabled: false,
  expirationDays: "",
  sessionName: "",
  mainCurrency: "",
  exchangeCurrency: "",
  exchangeRateEnabled: false,
  exchangeRateType: ""
}

export const CatalogContext = createContext<CatalogContextType>({
  catIndexes: [],
  subCatIndexes: [],
  products: [],
  topProducts: [],
  exchangeRate: 0,
  cartConfig: emptyCartConfig,
  cartSettings: initCartSettings,
  loading: true,
  locale: "",
  refreshProducts: async () => {}
});

export default function CatalogProvider({ children, shoppinCartSettings }: providerProps) {
  const [catIndexes, setCatIndexes] = useState<number[]>([]);
  const [subCatIndexes, setSubCatIndexes] = useState<number[][]>([]);
  const [products, setProducts] = useState<productProps[]>([]);
  const [topProducts, setTopProducts] = useState<productProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [render, setRender] = useState<React.ReactNode>(<LoadingPage />)

  const locale = useLocale();

  const cartConfig = getShoppingCartConfig(locale);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?locale=${locale}`, {
        cache: "no-store"
      });
      const body = await res.json();

      if (body.products?.status === 200) {
        const productos = body.products.response as productProps[];
        const prods: productProps[] = [...productos].sort((a, b) => a.category - b.category);
        setProducts(prods);

        // recalcular catIndexes y subCatIndexes
        const newCatIndexes = Array.from(new Set(prods.map(p => p.category)));
        setCatIndexes(newCatIndexes);

        const newSubCatIndexes = newCatIndexes.map(index => {
          const subcategories = prods
            .filter(item => item.category === index)
            .map(item => item.subcategory)
            .filter((subcat): subcat is number => typeof subcat === "number")
            .sort((a, b) => a - b);
          return Array.from(new Set(subcategories));
        });
        setSubCatIndexes(newSubCatIndexes);

        // recomponer topProducts igual que en layout
        const topProductsIds = body.topProductsIds?.response ?? [];
        const newTopProducts = topProductsIds.map((item: topProductsProps) => {
          const product = prods.find(p => p.id === item.productId);
          return product ? { ...item, ...product } : item;
        });
        setTopProducts(newTopProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setLoading(true);
        // obtener tasa de cambio
        if (shoppinCartSettings.exchangeRateEnabled && shoppinCartSettings.exchangeRateType) {
          try {
            const rate = await fetchExchangeRate(locale, shoppinCartSettings.exchangeRateType);
            if (mounted && typeof rate === "number" && !Number.isNaN(rate)) {
              setExchangeRate(rate);
            } else {
              // fallback si fetchExchangeRate devuelve algo inesperado
              if (mounted) setExchangeRate(0);
            }
          } catch (err) {
            console.error("fetchExchangeRate error:", err);
            if (mounted) setExchangeRate(0); // fallback
          }
        }

        // cargar productos
        await fetchProducts();
      } finally {
        if (mounted) {
          setLoading(false);
          setRender(children)
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]); // re-run if locale cambia

  return (
    <CatalogContext.Provider value={{
      catIndexes,
      subCatIndexes,
      products,
      topProducts,
      loading,
      cartConfig: cartConfig.shoppingCart,
      cartSettings: shoppinCartSettings,
      exchangeRate,
      locale,
      refreshProducts: fetchProducts
    }}>
      {render}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  return useContext(CatalogContext);
}