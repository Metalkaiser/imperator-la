import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { webAppProps } from "@/app/utils/utils";
import ProductDetails from "./Productdetails";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");

  return {
    title: `${webAppProps.name} - ${t("productDetails")}`
  };
}

export default async function Page() {
  return <ProductDetails />;
}
