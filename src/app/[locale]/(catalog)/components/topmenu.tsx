import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import Topbtn from './menus/Topbtn';
import { capitalize } from "@/app/utils/functions";
import { webAppProps, allCategories } from "@/app/utils/utils";
import brandLight from "@P/brand/logo_poster_light.webp";
import brandDark from "@P/brand/logo_poster_dark.webp";

export default function Topmenu({catIndexes}: {catIndexes:number[]}) {
  const home = useTranslations("home");
  const cats = useTranslations("categories");

  const categories = Array.from(new Set(catIndexes.map((index) => cats(allCategories[index]))));
  const categoryLinks = Array.from(new Set(catIndexes.map((index) => allCategories[index])));

  return (
    <header className="flex flex-col my-4 gap-5">
      <div className="flex justify-between mx-5">
        <Topbtn purpose='Menu' />
        <Image src={brandLight}  height={30} alt={webAppProps.name}  className="dark:hidden"></Image>
        <Image src={brandDark}  height={30} alt={webAppProps.name} className="hidden w-auto dark:block"></Image>
        <Topbtn purpose='Carrito' />
      </div>
      <nav className='flex flex-nowrap overflow-x-scroll pt-4 touch-pan-x whitespace-nowrap w-screen no-scrollbar md:justify-center'>
        <div className="flex gap-10 text-xl mx-5">
          <Link href="/">{home("title")}</Link>
          {categories.map((category, index) => (
            <Link key={index} href={categoryLinks[index].toLowerCase()}>{capitalize(category)}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}