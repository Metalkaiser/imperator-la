"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { productProps, topProductsProps } from "@/app/utils/types";
import { fetchExchangeRate } from "@/app/utils/clientFunctions";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig";
import type { ShoppingCartConfig } from "@/config/shoppingCartConfig";

interface CatalogContextType {
  catIndexes: number[];
  subCatIndexes: number[][];
  products: productProps[];
  topProducts: productProps[];
  exchangeRate: number;
  cartConfig: ShoppingCartConfig;
  loading: boolean;
  refreshProducts: () => Promise<void>;
}

type CatalogProviderProps = {
  children: React.ReactNode;
  catIndexes: number[];
  subCatIndexes: number[][];
  products: productProps[];
  topProducts?: productProps[];
  locale: string;
};

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

export const CatalogContext = createContext<CatalogContextType>({
  catIndexes: [],
  subCatIndexes: [],
  products: [],
  topProducts: [],
  exchangeRate: 0,
  cartConfig: emptyCartConfig,
  loading: true,
  refreshProducts: async () => {}
});

export default function CatalogProvider({
  children,
  catIndexes: initialCatIndexes,
  subCatIndexes: initialSubCatIndexes,
  products: initialProducts,
  topProducts: initialTopProducts,
  locale
}: CatalogProviderProps) {
  const [catIndexes, setCatIndexes] = useState<number[]>(initialCatIndexes);
  const [subCatIndexes, setSubCatIndexes] = useState<number[][]>(initialSubCatIndexes);
  const [products, setProducts] = useState<productProps[]>(initialProducts);
  const [topProducts, setTopProducts] = useState<productProps[]>(initialTopProducts ?? []);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(0);

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
        try {
          const rate = await fetchExchangeRate(locale);
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

        // cargar productos
        await fetchProducts();
      } finally {
        if (mounted) setLoading(false);
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
      cartConfig: getShoppingCartConfig(locale).shoppingCart,
      exchangeRate,
      refreshProducts: fetchProducts
    }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  return useContext(CatalogContext);
}