import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import notFoundLight from "@P/brand/logo_banner_light.webp";
import notFountDark from "@P/brand/logo_banner_dark.webp"

export const metadata: Metadata = {
  title: "Imperator - La página no existe"
};

export default function Custom404({context}:{context:string}) {
  const t = useTranslations("errors");

  let errDefault = "";

  switch (context) {
    case "products":
      errDefault = "Error: No pudieron cargarse los productos";
      break;
    default:
      errDefault = "Error: La página no existe.";
      break;
  }

  const errMessage = t.has(context) ? t(context) : errDefault;

  return(
    <body className="flex flex-col justify-center items-center h-screen">
      <main>
        <Image className="hidden dark:block mx-auto mb-5" src={notFountDark} width={100} height={0} alt="Imperator"></Image>
        <Image className="block dark:hidden mx-auto mb-5" src={notFoundLight} width={100} height={0} alt="Imperator"></Image>
        <h1 className="m-0 p-0 text-center dark:text-white">{errMessage}</h1>
      </main>
    </body>
  );
}