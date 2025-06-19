"use client";
import { createContext, useContext } from "react";

interface CategoryContextType {
  catIndexes: number[];
  subCatIndexes: number[][];
}

// Puedes ajustar el valor por defecto si lo deseas
export const CategoryContext = createContext<CategoryContextType>({
  catIndexes: [],
  subCatIndexes: [],
});

export default function CategoryProvider({
  children, catIndexes, subCatIndexes
}: {
  children: React.ReactNode, catIndexes: number[], subCatIndexes: number[][]
}) {
  return (
    <CategoryContext.Provider value={{ catIndexes, subCatIndexes }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}