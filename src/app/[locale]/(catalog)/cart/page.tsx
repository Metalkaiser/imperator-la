import { Metadata } from "next";
import { webAppProps } from '@/app/utils/utils';
import { getTranslations } from "next-intl/server";
import CartTitle from "../components/shoppingcart/Carttitle";
import ShoppingCart from "./ShoppingCart";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("shoppingCart");
  const { locale } = await params;
  const title = `${webAppProps.name} - ${t("title")}`;
  const description = webAppProps.catalogDescription;
  const keywords = webAppProps.catalogKeywords;
  const ogImages = webAppProps.ogImages;

  // Map StaticImageData[] to OGImageDescriptor[]
  const ogImageDescriptors = ogImages.map((img: { src: string; width?: number; height?: number }) => ({
    url: img.src,
    width: img.width,
    height: img.height,
  }));

  return {
    title,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': `/${locale}`
      }
    },
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImageDescriptors
    }
  };
}

export default function CartPage () {
  return (
    <section className="w-full">
      <article className="w-full bg-gray-500 dark:bg-gray-700 flex p-5 mb-5">
        <CartTitle />
      </article>
      <article>
        <ShoppingCart />
      </article>
    </section>
  );
}