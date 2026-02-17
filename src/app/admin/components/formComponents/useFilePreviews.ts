"use client"

import { useEffect, useState } from "react";

export type FileWithPreview = {
  file: File;
  url: string;
};

export function useFilePreviews(max?: number) {
  const [items, setItems] = useState<FileWithPreview[]>([]);

  function addFiles(files: FileList | null) {
    if (!files) return;

    const newItems = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setItems((prev) => {
      const merged = [...prev, ...newItems];
      return max ? merged.slice(0, max) : merged;
    });
  }

  function addRemoteUrls(urls: string[]) {
    const newItems = urls.map((url) => ({
      file: null as unknown as File, // marcador para diferenciar
      url,
    }));

    setItems((prev) => {
      const merged = [...prev, ...newItems];
      return max ? merged.slice(0, max) : merged;
    });
  }

  function remove(index: number) {
    setItems((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  // limpieza global al desmontar
  useEffect(() => {
    return () => {
      items.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, []);

  return {
    items,       // [{ file, url }]
    addFiles,    // para input[type=file]
    addRemoteUrls, // para agregar URLs remotas
    remove,      // para eliminar imagen
    clear: () => setItems([]),
  };
}