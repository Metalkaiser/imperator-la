"use client"

import Link from "next/link";
import { useCatalogContext } from "../context/CatalogContext";
import { getActiveCategoryWithSubcategories, getCategoryIndexes } from "@/config/websiteConfig/categoryConfig";
import { capitalize } from "@/app/utils/functions";
import { useTranslations } from "next-intl";

export default function CategoryFilter(categories: { category: string, subcategory?: string }) {
  const { subCatIndexes, locale } = useCatalogContext();
  const { category, subcategory } = categories;
  const t = useTranslations("products");
  const { categoryIndex, subcategoryIndex } = getCategoryIndexes(category, subcategory);
  const { activeCategory } = getActiveCategoryWithSubcategories(categoryIndex, locale);

  return(
    <div>
      <h1 className="m-3 dark:text-white">{subcategoryIndex !== undefined ? `${capitalize(activeCategory.label)} - ${capitalize(activeCategory.subcategories[subcategoryIndex].label)}` : capitalize(activeCategory.label)}</h1>
      <div className="flex flex-nowrap overflow-x-scroll pt-4 touch-pan-x whitespace-nowrap w-[85vw] no-scrollbar md:justify-left">
        <ul className="flex gap-5 md:gap-10 dark:text-white mx-5">
          {activeCategory.subcategories.length > 0 &&
          <Link className={subcategory == undefined ? "font-bold underline" : ""} href={"/catalog/" + category}><li>{t("allProdsFilter")}</li></Link> }
          {activeCategory.subcategories.map((sub, index) => (
            subCatIndexes[categoryIndex].includes(index) &&
            <Link key={sub.slug} className={sub.slug == subcategory ? "font-bold underline" : ""} href={"/catalog/" + category + "/" + sub.slug}><li>{sub.label.charAt(0).toUpperCase() + sub.label.slice(1)}</li></Link>
          ))}
        </ul>
      </div>
    </div>
  );
}