"use client"

import { useCatalogContext } from "../../context/CatalogContext";
import CategoryCard from "./CategoryCard";
import { getAllCategories } from "@/config/websiteConfig/categoryConfig";
import { useLocale } from "next-intl";

export default function CategoryGrid() {
  const locale = useLocale();
  const categories = getAllCategories(locale);
  const { catIndexes, subCatIndexes } = useCatalogContext();
  return (
    <section className={`grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-${catIndexes.length} gap-6 justify-items-center p-4`}>
      {categories.map((cat, index) => (
        catIndexes.includes(index) && (
        <CategoryCard key={cat.slug} {...cat} />)
      ))}
    </section>
  );
}
