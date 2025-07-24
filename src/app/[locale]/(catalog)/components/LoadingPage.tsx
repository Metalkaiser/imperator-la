"use client"

import Image from "next/image";

import logo_light from "@P/brand/logo_banner_light.webp";
import logo_dark from "@P/brand/logo_banner_dark.webp";
import { useTranslations } from "next-intl";

export default function LoadingPage() {

  const t = useTranslations("webAppProps");
  
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-pulse">
        <Image className="hidden dark:block mx-auto mb-5" src={logo_dark} width={100} height={0} alt="Imperator"></Image>
        <Image className="block dark:hidden mx-auto mb-5" src={logo_light} width={100} height={0} alt="Imperator"></Image>
        <div className='rounded-lg max-w-fit p-5 flex gap-2 mx-auto'>
          <svg className="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className='dark:text-white'>{t("loading")}...</span>
        </div>
      </div>
    </div>
  );
}