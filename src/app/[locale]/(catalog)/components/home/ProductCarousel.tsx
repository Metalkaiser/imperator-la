'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCatalogContext } from '../context/CatalogContext';
import { storagePath } from '@/app/utils/utils';
import { productProps } from '@/app/utils/types';
import { getRandomItems } from '@/app/utils/functions';

export default function ProductCarousel({ title, type }: { title: string; type?: number[] }) {
  const t = useTranslations('productCarousel');
  const { products, topProducts } = useCatalogContext();

  // store your actual products here
  const [renderArray, setRenderArray] = useState<productProps[]>([]);

  // first pick deterministically on server (e.g. in order),
  // then on client replace with a randomized slice
  useEffect(() => {
    let base: productProps[];

    if (title === 'home') {
      base = topProducts;
    } else if (type && type.length > 0) {
      const [cat, sub] = type;
      base = products.filter(p =>
        sub !== undefined ? p.category === cat && p.subcategory === sub
                           : p.category === cat
      );
    } else {
      base = products;
    }

    // now that we're *on the client*, we can safely shuffle
    setRenderArray(getRandomItems(base, 6));
  }, [title, type, products, topProducts]);

  // …the rest remains exactly the same…
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-6 relative">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">{t(title)}</h2>

      <div className="hidden md:flex justify-between items-center absolute inset-y-0 mx-auto w-11/12 px-2 z-10 pointer-events-none">
        <button onClick={() => scroll('left')} className="bg-white dark:bg-gray-800 shadow-md rounded-full p-3 pointer-events-auto">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => scroll('right')} className="bg-white dark:bg-gray-800 shadow-md rounded-full p-3 pointer-events-auto">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div ref={containerRef} className="overflow-x-auto scroll-smooth whitespace-nowrap flex gap-5 md:gap-10 py-2">
        {renderArray.map(product => (
          <Link
            key={product.mainSku}
            href={`/catalog/product/${product.mainSku}`}
            className="min-w-[180px] max-w-[200px] md:min-w-[220px] md:max-w-[240px] topproduct rounded-md shadow-md flex flex-col items-center flex-shrink-0"
          >
            <Image
              src={storagePath + product.images[0]}
              alt={product.name}
              width={240}
              height={180}
              className="w-full h-[160px] object-cover rounded-t-md"
            />
            <div className="px-2 py-2 w-full text-center text-sm truncate">
              {product.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}