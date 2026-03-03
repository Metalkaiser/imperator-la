"use client"

import { useEffect, useRef, useState } from "react";

export type FileWithPreview = {
  id: string;
  file: File | null;
  url: string;
};

function isBlobUrl(url: string) {
  return typeof url === "string" && url.startsWith("blob:");
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useFilePreviews(max?: number) {
  const [items, setItems] = useState<FileWithPreview[]>([]);
  const itemsRef = useRef<FileWithPreview[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  function addFiles(files: FileList | null) {
    if (!files) return;

    const newItems: FileWithPreview[] = Array.from(files).map((file) => ({
      id: makeId(),
      file,
      url: URL.createObjectURL(file),
    }));

    setItems((prev) => {
      const merged = [...prev, ...newItems];
      if (!max) return merged;

      const next = merged.slice(0, max);
      const removed = merged.slice(max);
      removed.forEach((item) => {
        if (isBlobUrl(item.url)) URL.revokeObjectURL(item.url);
      });
      return next;
    });
  }

  function addRemoteUrls(urls: string[]) {
    const newItems: FileWithPreview[] = urls.map((url) => ({
      id: makeId(),
      file: null,
      url,
    }));

    setItems((prev) => {
      const merged = [...prev, ...newItems];
      if (!max) return merged;
      return merged.slice(0, max);
    });
  }

  function remove(index: number) {
    setItems((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const target = prev[index];
      if (isBlobUrl(target.url)) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function move(from: number, to: number) {
    setItems((prev) => {
      if (from === to) return prev;
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;

      const next = prev.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function clear() {
    setItems((prev) => {
      prev.forEach((item) => {
        if (isBlobUrl(item.url)) URL.revokeObjectURL(item.url);
      });
      return [];
    });
  }

  // limpieza global al desmontar
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (isBlobUrl(item.url)) URL.revokeObjectURL(item.url);
      });
    };
  }, []);

  return {
    items,
    addFiles,
    addRemoteUrls,
    remove,
    move,
    clear,
  };
}
