import { useTranslations } from "next-intl";
import { descriptionImages } from "@/app/utils/svgItems";

export default function Descr() {
  const t = useTranslations("homeDescription");

  return(
    <article className="h-[200px] md:h-[250px] flex justify-evenly items-center">
      {descriptionImages.map((item, index) => (
        <div key={index} className="w-3/12 md:w-4/12">
          {item.icon}
          <p className="text-md dark:text-gray-400 text-gray-500 mt-1 text-center">{t(item.name)}</p>
        </div>
      ))}
    </article>
  );
}