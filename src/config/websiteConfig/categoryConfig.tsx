type LabelMap = {
  [slug: string]: string;
};

export type SubcategoryDefinition = {
  slug: string;
};

export type CategoryDefinition = {
  slug: string;
  subcategories?: SubcategoryDefinition[];
};

export const defaultLocale = "es"; // Default locale for fallback

/**
 * The base structure of the product catalog, defining all available categories and their subcategories.
 * 
 * Each category is represented by a unique `slug` and may optionally include an array of subcategories,
 * each with its own `slug`. This structure serves as the foundation for catalog navigation, label resolution,
 * and category-related operations throughout the application.
 *
 * Example:
 * [
 *   {
 *     slug: "rings",
 *     subcategories: [
 *       { slug: "elegant" },
 *       { slug: "masonic" },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */
export const baseCatalogStructure: CategoryDefinition[] = [
  {
    slug: "rings",
    subcategories: [
      { slug: "elegant" },
      { slug: "masonic" },
      { slug: "rock" },
      { slug: "viking" }
    ]
  },
  {
    slug: "necklaces",
    subcategories: [
      { slug: "elegant" },
      { slug: "masonic" },
      { slug: "rock" },
      { slug: "viking" }
    ]
  },
  {
    slug: "bracelets",
    subcategories: [
      { slug: "elegant" },
      { slug: "masonic" },
      { slug: "rock"},
      { slug: "viking" }
    ]
  },
  { slug: "watches" },
  { slug: "earrings" }
];

export const catalogLabels: {
  [locale: string]: {
    categories: LabelMap;
    subcategories: LabelMap;
  };
} = {
  es: {
    categories: {
      rings: "anillos",
      necklaces: "collares",
      bracelets: "brazaletes",
      watches: "relojes",
      earrings: "zarcillos"
    },
    subcategories: {
      elegant: "elegantes",
      masonic: "masónicos",
      rock: "rockeros",
      viking: "vikingos"
    }
  }
};

/**
 * Resolves and returns the display labels for a given category and optional subcategory, 
 * based on the provided locale. If the specified locale is not available, it falls back 
 * to the default locale. If the category or subcategory does not exist in the catalog 
 * structure, the function returns `null`.
 *
 * @param locale - The locale code (e.g., "es") used to resolve the category and subcategory labels.
 * @param categorySlug - The slug identifier for the category to resolve.
 * @param subcategorySlug - (Optional) The slug identifier for the subcategory to resolve.
 * @returns An object containing the slugs and their corresponding labels for the category and 
 *          subcategory, or `null` if the category or subcategory does not exist.
 */
export function resolveCategoryName(locale: string, categorySlug: string, subcategorySlug?: string) {
  const labels = catalogLabels[locale] || catalogLabels[defaultLocale];

  const categoryExists = baseCatalogStructure.some(cat => cat.slug === categorySlug);
  if (!categoryExists) {
    return null;
  }
  if (subcategorySlug) {
    const category = baseCatalogStructure.find(cat => cat.slug === categorySlug);
    const subcategoryExists = category?.subcategories?.some(sub => sub.slug === subcategorySlug);
    if (!subcategoryExists) {
      return null;
    }
  }

  return {
    categorySlug,
    categoryLabel: labels.categories[categorySlug] || categorySlug,
    subcategorySlug,
    subcategoryLabel: subcategorySlug ? labels.subcategories[subcategorySlug] || subcategorySlug : undefined
  };
}

/**
 * Retrieves all categories from the base catalog structure, resolving their display labels
 * according to the specified locale. If the provided locale is not available, it falls back
 * to the default locale.
 *
 * Each returned category object contains the category's slug and its corresponding localized label.
 *
 * @param locale - The locale code (e.g., "es") used to resolve the category labels.
 * @returns An array of objects, each containing the `slug` and localized `label` for a category.
 */
export function getAllCategories(locale: string) {
  const labels = catalogLabels[locale] || catalogLabels[defaultLocale];

  return baseCatalogStructure.map(cat => ({
    slug: cat.slug,
    label: labels.categories[cat.slug] || cat.slug
  }));
}

/**
 * Retrieves the active category labels and their corresponding slugs based on the provided indexes and locale.
 *
 * @param catIndexes - An array of indexes representing the selected categories.
 * @param locale - The locale string used to fetch localized category data.
 * @returns An object containing two arrays: `categories` (unique category labels) and `categoryLinks` (unique category slugs).
 */
export const getActiveCategory = (catIndexes:number[], locale:string) => {
  const allCategories = getAllCategories(locale);

  const categories = Array.from(new Set(catIndexes.map((index) => allCategories[index].label)));
  const categoryLinks = Array.from(new Set(catIndexes.map((index) => allCategories[index].slug)));

  return { categories, categoryLinks };
}


/**
 * Retrieves the list of categories along with their subcategories, providing localized labels
 * based on the specified locale. If the given locale is not available, it falls back to the default locale.
 *
 * @param locale - The locale code used to select the appropriate labels for categories and subcategories.
 * @returns An array of category objects, each containing a slug, a localized label, and an array of subcategory objects with their respective slugs and labels.
 */
export function getCategoriesWithSubcategories(locale: string) {
  const labels = catalogLabels[locale] || catalogLabels[defaultLocale];

  return baseCatalogStructure.map(cat => ({
    slug: cat.slug,
    label: labels.categories[cat.slug] || cat.slug,
    subcategories: cat.subcategories?.map(sub => ({
      slug: sub.slug,
      label: labels.subcategories[sub.slug] || sub.slug
    })) || []
  }));
}

/**
 * Retrieves the active category and its subcategories, providing localized labels based on the specified locale.
 *
 * This function selects a category from the catalog structure using the provided index and returns an object containing
 * the active category's slug, localized label, and its subcategories (each with their own slug and localized label).
 * If the locale is not available, it falls back to the default locale.
 *
 * @param catIndex - The index of the category to retrieve from the catalog structure.
 * @param locale - The locale code (e.g., "es") used to resolve the category and subcategory labels.
 * @returns An object with the `activeCategory`, which includes the category's slug, label, and an array of subcategories with their respective slugs and labels.
 */

export const getActiveCategoryWithSubcategories = (catIndex:number, locale:string) => {
  const allCategories = getCategoriesWithSubcategories(locale);
  const activeCategory = allCategories[catIndex];

  return { activeCategory };
}

/**
 * Retrieves the index of a category and optionally its subcategory within the base catalog structure.
 *
 * Given a category slug and an optional subcategory slug, this function returns the index of the category
 * in the `baseCatalogStructure` array, and if a subcategory is provided, the index of the subcategory within
 * the category's `subcategories` array. If the category or subcategory is not found, their respective indexes
 * will be `undefined`.
 *
 * @param category - The slug identifier of the category to search for.
 * @param subcategory - (Optional) The slug identifier of the subcategory to search for within the category.
 * @returns An object containing the `categoryIndex` and, if a subcategory is provided, the `subcategoryIndex`.
 */
export const getCategoryIndexes = (category:string, subcategory?: string) => {
  const categoryIndex = baseCatalogStructure.map((cat, index) => {
    if (cat.slug === category) {
      return index;
    }
    return -1;
  }).filter(index => index !== -1)[0];

  if (subcategory) {
    const subcategoryIndex = baseCatalogStructure[categoryIndex].subcategories?.map((sub, index) => {
      if (sub.slug === subcategory) {
        return index;
      }
      return -1;
    }).filter(index => index !== -1)[0];
    return { categoryIndex: categoryIndex, subcategoryIndex: subcategoryIndex };
  }

  return { categoryIndex: categoryIndex };
}