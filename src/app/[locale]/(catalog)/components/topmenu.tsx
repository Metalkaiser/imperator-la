import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import Topbtn from './menus/Topbtn';
import { capitalize } from "@/app/utils/functions";
import { webAppProps } from "@/app/utils/utils";
import brandLight from "@P/brand/logo_poster_light.webp";
import brandDark from "@P/brand/logo_poster_dark.webp";

export default function Topmenu({categories}: {categories:string[]}) {
  const t = useTranslations("HomePage");


  return (
    <header className="flex flex-col my-4 gap-5">
      <div className="flex justify-between mx-5">
        <Topbtn purpose='Menu' />
        <Image src={brandLight}  height={30} alt={webAppProps.name}  className="dark:hidden"></Image>
        <Image src={brandDark}  height={30} alt={webAppProps.name} className="hidden dark:block"></Image>
        <Topbtn purpose='Carrito' />
      </div>
      <nav className='flex flex-nowrap overflow-x-scroll pt-4 touch-pan-x whitespace-nowrap w-screen no-scrollbar md:justify-center'>
        <div className="flex gap-10 text-xl mx-5">
            <Link href="/">{t.has("home") ? t("home") : "Inicio"}</Link>
          {categories.map((category, index) => (
            <Link key={index} href={category.toLowerCase()}>{capitalize(category)}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}