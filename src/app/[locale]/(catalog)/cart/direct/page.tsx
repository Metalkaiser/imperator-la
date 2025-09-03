import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Directcart from "./Directcart";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("shoppingCart");
  return {
    title: t("directBuyTitle"),
    description: t("directBuyDescription"),
  };
}

export default function Page() {
  return <Directcart />;
}
