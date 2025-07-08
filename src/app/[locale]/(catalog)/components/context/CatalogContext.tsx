"use client";
import { createContext, useContext } from "react";
import { productProps } from "@/app/utils/types";

interface CatalogContextType {
  catIndexes: number[];
  subCatIndexes: number[][];
  products: productProps[];
  topProducts: productProps[];
}

// Puedes ajustar el valor por defecto si lo deseas
export const CatalogContext = createContext<CatalogContextType>({
  catIndexes: [],
  subCatIndexes: [],
  products: [],
  topProducts: []
});

export default function CatalogProvider({
  children, catIndexes, subCatIndexes, products, topProducts = []
}: {
  children: React.ReactNode, catIndexes: number[], subCatIndexes: number[][], products: productProps[], topProducts: productProps[]
}) {
  return (
    <CatalogContext.Provider value={{ catIndexes, subCatIndexes, products, topProducts }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext() {
  return useContext(CatalogContext);
}