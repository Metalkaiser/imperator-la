"use client"

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { capitalize } from "@/app/utils/functions";
import { useState } from "react";

interface CatmenuProps {
  catIndexes: number[];
  subCatIndexes?: number[][];
}

export default function Catmenu({ catIndexes, subCatIndexes }: CatmenuProps) {
  const locale = useLocale();
  const t = useTranslations("sidemenu");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const allCategories = useMemo(() => getCategoriesWithSubcategories(locale), [locale]);
  const categories = useMemo(() => catIndexes.map(index => allCategories[index]), [catIndexes, allCategories]);

  const hoverClass = "flex items-center";

  const toggleMenu = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-2 mt-4 overflow-y-scroll">
      <ul className="flex flex-col justify-center grow-1 list-none gap-10">
        {categories.map((category, index) => {
          const hasSubs = subCatIndexes && subCatIndexes[index] && subCatIndexes[index].length > 0;

          return (
            <li key={index} className="py-1">
              {hasSubs ? (
                <button
                  onClick={() => toggleMenu(index)}
                  className={`w-full text-left px-2 sidemenu-category justify-between ${hoverClass}`}
                  aria-expanded={openIndex === index}
                  aria-controls={`submenu-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/misc/menu/categories/${category.slug}.webp`}
                      alt={category.label}
                      height={70}
                      width={70}
                      className="rounded-full"
                    />
                    {capitalize(category.label)}
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={`/catalog/${category.slug}`}
                  className={`block px-2 sidemenu-category justify-between ${hoverClass}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/misc/menu/categories/${category.slug}.webp`}
                      alt={category.label}
                      height={70}
                      width={70}
                      className="rounded-full"
                    />
                    {capitalize(category.label)}
                  </div>
                  <div className="w-5 h-5"></div>
                </Link>
              )}

              {hasSubs && openIndex === index && (
                <ul className={`pl-6 mt-3 flex flex-col gap-2 transition-all duration-300 ease-in-out
                  ${openIndex === index ? 'h-auto' : 'h-0'}
                `}
                >
                  {subCatIndexes![index].map(subIndex => {
                    const sub = category.subcategories[subIndex];
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={`/catalog/${category.slug}/${sub.slug}`}
                          className={`block px-2 sidemenu-subcategory gap-4 ${hoverClass}`}
                        >
                          <Image
                            src={`/misc/menu/subcategories/${category.slug}-${sub.slug}.webp`}
                            alt={sub.label}
                            height={50}
                            width={50}
                            className="rounded-full"
                          />
                          {capitalize(sub.label)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
