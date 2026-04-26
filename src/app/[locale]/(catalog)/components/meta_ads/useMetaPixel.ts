'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: Function;
  }
}

export function useMetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const isEnabled = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED?.toLocaleLowerCase() === "true";

  useEffect(() => {
    if (typeof window === 'undefined' || !window.fbq || !pixelId || !isEnabled) return;

    // Inicialización (por si no se hizo en el layout)
    if (!window.fbq('getState')) {
      window.fbq('init', pixelId);
    }
  }, [pixelId]);

  const track = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window === 'undefined' || !window.fbq) {
      console.warn('Meta Pixel no está cargado aún');
      return;
    }
    console.log(`Trackeando evento: ${eventName}`, parameters);
    window.fbq('track', eventName, parameters);
  };

  const trackCustom = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window === 'undefined' || !window.fbq) return;
    window.fbq('trackCustom', eventName, parameters);
  };

  return { track, trackCustom };
}