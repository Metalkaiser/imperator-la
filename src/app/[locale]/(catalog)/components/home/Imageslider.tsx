"use client";
import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { imageSliderData } from "@/config/websiteConfig/miscConfigs";

interface ImageData {
  src: StaticImageData;
}

const images: ImageData[] = imageSliderData;
const totalImgs = images.length;

// Extendemos la lista: [última, ...imágenes, primera]
const extendedImages = [
  images[totalImgs - 1],
  ...images,
  images[0],
];

export default function ImageSlider() {
  const [index, setIndex] = useState(1); // Empieza en el primer "real"
  const [isAnimating, setIsAnimating] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setIndex((prev) => prev + 1);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // Swipe izquierda → siguiente imagen
      setIndex((prev) => prev + 1);
    } else if (distance < -50) {
      // Swipe derecha → imagen anterior
      setIndex((prev) => prev - 1);
    }
  };


  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  // Efecto para rotación infinita
  useEffect(() => {
    if (!isAnimating) return;

    if (index === extendedImages.length - 1) {
      // Si llegamos al final (copia de la primera), saltamos al inicio real
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(1); // Primer "real"
      }, 700); // tiempo igual al de la transición
    }

    if (index === 0) {
      // Si llegamos al principio (copia de la última), saltamos al final real
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(totalImgs); // Último "real"
      }, 700);
    }
  }, [index]);

  // Reactivar la animación cuando el index cambie manualmente
  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    }
  }, [isAnimating]);

  return (
    <div className="w-screen overflow-hidden relative">
      <div
        ref={sliderRef}
        className={`flex transition-transform duration-700 ease-in-out`}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionDuration: isAnimating ? "700ms" : "0ms",
        }}

        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedImages.map((img, i) => (
          <div
            key={i}
            className="relative h-[30vh] md:h-[55vh] w-screen flex-shrink-0"
          >
            <Image
              src={img.src}
              alt={`Slider Image ${i}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
