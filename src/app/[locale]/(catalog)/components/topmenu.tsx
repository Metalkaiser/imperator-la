"use client"

import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import Topbtn from './menus/Topbtn';
import { capitalize } from "@/app/utils/functions";
import { webAppProps } from "@/app/utils/utils";
import { useCatalogContext } from './context/CatalogContext';
import { getActiveCategory } from '@/config/websiteConfig/categoryConfig';
import brandLight from "@P/brand/logo_poster_light.webp";
import brandDark from "@P/brand/logo_poster_dark.webp";

import RouterLogger from './test/RouterLogger';

export default function Topmenu() {
  const home = useTranslations("home");
  const { cartSettings, locale, catIndexes } = useCatalogContext();
  const { categories, categoryLinks } = getActiveCategory(catIndexes, locale);

  const imgBannerClass = " w-auto max-w-1/2 md:max-w-auto h-[30px]";

  return (
    <header className="flex flex-col my-4 gap-5">
      <RouterLogger />
      <div className="flex justify-between items-center mx-5">
        <Topbtn purpose='Menu' />
        <Image src={brandLight}  height={30} alt={webAppProps.name}  className={`dark:hidden ${imgBannerClass}`}></Image>
        <Image src={brandDark} alt={webAppProps.name} className={`hidden dark:block ${imgBannerClass}`}></Image>
        {cartSettings.enabled ? <Topbtn purpose='Carrito' /> : <div className="w-[30px]"></div>}
      </div>
      <nav className='flex flex-nowrap overflow-x-scroll pt-4 touch-pan-x whitespace-nowrap w-screen no-scrollbar md:justify-center'>
        <div className="flex gap-10 mx-5">
          <Link href="/">{home("title")}</Link>
          {categories.map((category, index) => (
            <Link key={index} href={`/catalog/${categoryLinks[index].toLowerCase()}`}>{capitalize(category)}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}