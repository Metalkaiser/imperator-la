"use client";
import { createContext, useContext, useState } from "react";
import { productProps, topProductsProps } from "@/app/utils/types";

interface CatalogContextType {
  catIndexes: number[];
  subCatIndexes: number[][];
  products: productProps[];
  topProducts: productProps[];
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

export const CatalogContext = createContext<CatalogContextType>({
  catIndexes: [],
  subCatIndexes: [],
  products: [],
  topProducts: [],
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

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?locale=${locale}`, {
        cache: "no-store"
      });
      const body = await res.json();

      if (body.products?.status === 200) {
        const prods = body.products.response as productProps[];
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

  return (
    <CatalogContext.Provider value={{
      catIndexes,
      subCatIndexes,
      products,
      topProducts,
      refreshProducts: fetchProducts
    }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  return useContext(CatalogContext);
}