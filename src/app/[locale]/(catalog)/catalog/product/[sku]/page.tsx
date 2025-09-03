import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { webAppProps } from "@/app/utils/utils";
import ProductDetails from "./Productdetails";

type Props = { 
  params: { sku: string } 
};

export async function generateMetadata(): Promise<Metadata> {
  const tPromise = await getTranslations("products");
  return {
    title: `${webAppProps.name} - ${tPromise("productDetails")}`
  }
}

export default async function Page({ params }: Props) {
  const { sku } = await params;
  return (
    <ProductDetails sku={sku} />
  )
}