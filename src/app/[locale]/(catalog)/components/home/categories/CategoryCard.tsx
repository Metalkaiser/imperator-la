import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/app/utils/functions";

interface CategoryCardProps {
  label: string;
  slug: string;
}

export default function CategoryCard({ label, slug }: CategoryCardProps) {
  return (
    <Link href={`/catalog/${slug}`} className="group w-full sm:w-auto">
      <div className="flex flex-col items-center text-center transition hover:scale-105">
        {/* Imagen */}
        <div className="
          overflow-hidden 
          rounded-full sm:rounded-xl 
          w-20 h-20 sm:w-48 sm:h-48 
          relative
        ">
          <Image
            src={`/misc/menu/categories/${slug}.webp`}
            alt={label}
            fill
            className="object-cover"
          />
        </div>

        {/* Título */}
        <div className="mt-2 sm:mt-4">
          <p className="text-sm sm:text-lg font-semibold">
            {capitalize(label)}
          </p>
        </div>
      </div>
    </Link>
  );
}