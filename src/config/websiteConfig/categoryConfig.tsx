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

const defaultLocale = "es"; // Default locale for fallback

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

export function getAllCategories(locale: string) {
  const labels = catalogLabels[locale] || catalogLabels[defaultLocale];

  return baseCatalogStructure.map(cat => ({
    slug: cat.slug,
    label: labels.categories[cat.slug] || cat.slug
  }));
}

export const getActiveCategory = (catIndexes:number[], locale:string) => {
  const allCategories = getAllCategories(locale);

  const categories = Array.from(new Set(catIndexes.map((index) => allCategories[index].label)));
  const categoryLinks = Array.from(new Set(catIndexes.map((index) => allCategories[index].slug)));

  return { categories, categoryLinks };
}

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

export const getActiveCategoryWithSubcategories = (catIndex:number, locale:string) => {
  const allCategories = getCategoriesWithSubcategories(locale);
  const activeCategory = allCategories[catIndex];

  return { activeCategory };
}

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