import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { resolveCategoryName } from "@/config/websiteConfig/categoryConfig";
import Category from "../../components/products/Category";
import { webAppProps } from "@/app/utils/utils";
import { capitalize } from "@/app/utils/functions";

type Props = {
  params: Promise<{ category: string[] }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const page = (await params).category;
  const locale = await getLocale();
  const catName = page.length === 1 ? resolveCategoryName(locale,page[0]) : resolveCategoryName(locale,page[0],page[1]);
  if (catName) {
    const subtitle = catName.subcategoryLabel ? `${capitalize(catName.categoryLabel)} - ${capitalize(catName.subcategoryLabel)}` : capitalize(catName.categoryLabel)
    const title = page === undefined ? "La página no existe" : subtitle;
    return {
      title: `${webAppProps.name} - ${title}`
    }
  } else {
    notFound();
  }
}

export default async function CategoryPage ({ params }: Props) {
  const {category} = await params;
  return (
    <Category category={category[0]} subcategory={category.length > 1 ? category[1] : undefined} />
  )
}