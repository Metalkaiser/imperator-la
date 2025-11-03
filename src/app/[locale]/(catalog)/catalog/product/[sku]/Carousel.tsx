"use client"

import { TouchEvent, useState } from 'react';
import Image from 'next/image';
import { storagePath } from '@/app/utils/utils';

export default function Carousel({ images } : {images:string[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  // Función para manejar el deslizamiento
  const handleTouchStart = (e:TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const touchEndX = (e: (globalThis.TouchEvent)) => {
      const difference = touchStartX - e.changedTouches[0].clientX;
      if (difference > 50) {
        nextImage();
      } else if (difference < -50) {
        prevImage();
      }
      document.removeEventListener('touchend', touchEndX);
    };
    document.addEventListener('touchend', touchEndX);
  };


  return (
    <div className="relative w-full overflow-hidden md:hidden justify-center items-center">
      <p className={images.length > 1 ? "absolute text-xs bg-neutral-900 text-white m-1 py-1 px-2 rounded-xl right-0 z-[55]" : "hidden"}>{currentIndex + 1}/{images.length}</p>
      <div
        className={`h-full flex transition-transform duration-300`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 text-white">
            <Image
              unoptimized
              key={`Image ${index + 1}`}
              src={storagePath + image}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full"
              height={0} width={500}></Image>
          </div>
        ))}
      </div>
      <div className={images.length > 1 ? "flex gap-2 justify-center my-5 items-center" : "hidden"}>
        {images.map((img,imgIndex) => (
          <div key={"model-" + imgIndex} className={imgIndex == currentIndex ? "w-3 h-3 rounded-full bg-neutral-700" : "w-2 h-2 rounded-full bg-neutral-500"}></div>
        ))}
      </div>
    </div>
  );
};