import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import banner_light from "@P/brand/logo_poster_light.webp";
import banner_dark from "@P/brand/logo_poster_dark.webp";
import { webAppProps } from "@/app/utils/utils";
import { footerLinks, socialLinks } from "@/config/websiteConfig/miscConfigs";
import { footerIconsMap } from "@/app/utils/svgItems";

export default function Footer(){
  const t = useTranslations("footer");
  return(
    <footer className="bg-stone-300 p-5 flex flex-col items-center dark:text-white dark:bg-stone-950">
      <div className="h-10"></div>
      <div className="mb-5">
        <Image className="dark:hidden" src={banner_light} alt="Logo" height={30}></Image>
        <Image className="hidden dark:block" src={banner_dark} alt="Logo" height={30}></Image>
      </div>
      <div className="h-10"></div>
      <div className="flex flex-col md:flex-row gap-10 md:justify-evenly w-screen mb-5 text-center">
        {footerLinks.map((link) => (
          <Link key={link.href} href={`/${link.href}`}>
            {t(link.href)}
          </Link>
        ))}
      </div>
      <div className="h-10"></div>
      <div className="grid grid-cols-3 gap-10 mb-5">
        {socialLinks.map(({ href, icon }) => (
          <Link key={href} href={href} target="_blank">
            {footerIconsMap.get(icon)}
          </Link>
        ))}
      </div>
      <div className="h-10"></div>
      <div className="text-center"><p>{webAppProps.name}@{new Date().getFullYear()}. {t("copyright")}.</p></div>
    </footer>
  );
}