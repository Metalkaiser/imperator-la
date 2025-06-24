"use client"

import ProductList from "./Productlist";
import CategoryFilter from "../menus/Filter";

export default function Category (categories: { category: string, subcategory?: string }) {
  const { category, subcategory } = categories;

  return (
    <>
      <CategoryFilter category={category} subcategory={subcategory} />
      <ProductList
        name={category}
        items={subcategory ? [category, subcategory] : [category]}
        loadSub={false}
      />
    </>
  );
}