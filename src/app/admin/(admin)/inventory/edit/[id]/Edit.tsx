"use client";

import React, { useEffect, useMemo, useState, useRef, useActionState, startTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import isEqual from "fast-deep-equal";
import { useDB } from "@/app/admin/components/context/dbContext";
import { productProps } from "@/app/utils/types";
import { updateProductAction } from "@/app/actions/products";
import {
  ProdThumbnail,
  ProdName,
  ProdmainSKU,
  ProdDesc,
  ProdPrice,
  ProdStatus,
  ProdImages,
  ProdDiscount,
  ProdVariant,
  ActionBtns
} from "@/app/admin/components/formComponents/ProductForm";
import { fileSchema } from "@/app/utils/apis/validatePayload";
import { useFilePreviews } from "@/app/admin/components/formComponents/useFilePreviews";
import { ZodError } from "zod";

// Tipos (sin cambios)
type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function EditProduct({ id }: { id?: string }) {
  const router = useRouter();
  const params = useParams(); // <- usar useParams en App Router
  const { products, refreshProducts } = useDB();

  const thumbnail = useFilePreviews(1);
  const productImages = useFilePreviews(10);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<productProps | null>(null);
  const [state, formAction, isPending] = useActionState(updateProductAction, null);

  // Form state
  const [discount, setDiscount] = useState<Discount | undefined>(undefined)
  const [variants, setVariants] = useState<Variant[]>([]);

  // Estado para archivos de variantes y previews
  const [variantFiles, setVariantFiles] = useState<(File | null)[]>([]);
  const [variantPreviews, setVariantPreviews] = useState<string[]>([]);
  // refs para objectURLs previos y limpiar
  const variantPreviewUrlsRef = useRef<(string | null)[]>([]);

  // resolvedId: preferimos prop `id`, luego params, luego fallback window (solo en cliente)
  const resolvedId = useMemo(() => {
    if (id) return String(id);
    if (params && (params as any).id) return String((params as any).id);
    if (typeof window !== "undefined") {
      const last = window.location.pathname.split("/").filter(Boolean).pop();
      return last ? String(last) : undefined;
    }
    return undefined;
  }, [id, params]);

  // Sincronizar variantFiles y variantPreviews al cambiar variantes
  useEffect(() => {
    setVariantFiles((prev) => variants.map((_, i) => prev[i] ?? null));

    setVariantPreviews((prev) => {
      variantPreviewUrlsRef.current.forEach((url, idx) => {
        if (url && (!variants[idx] || prev[idx] !== url)) {
          try { URL.revokeObjectURL(url); } catch (e) { console.warn("Revoke objectURL error:", e); }
        }
      });

      const next: string[] = variants.map((v, i) => {
        const file = variantFiles[i];
        if (file) {
          const obj = URL.createObjectURL(file);
          variantPreviewUrlsRef.current[i] = obj;
          return obj;
        }
        variantPreviewUrlsRef.current[i] = null;

        // normalizar v.image
        const img = v.image ?? "";
        if (!img) return "";
        //return /^%2F/i.test(img) ? `${storagePath}${img}` : img;
        return img;
      });
      return next;
    });
  }, [variants]);

  // Limpiar objectURLs al desmontar
  useEffect(() => {
    return () => {
      variantPreviewUrlsRef.current.forEach((u) => {
        if (u) URL.revokeObjectURL(u);
      });
      variantPreviewUrlsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (state?.error) {
      let htmlError = "";
      if (Array.isArray(state.error)) {
        state.error.forEach((err) => {
          htmlError += `<p>${err.message}</p>`;
        });
      } else {
        htmlError = `<p>${state.message || state.error}</p>`;
      }
      Swal.fire({
        icon: "error",
        html: htmlError || "Error inesperado."
      });
    } else if (state?.success) {
      Swal.fire("Guardado", "Producto actualizado correctamente.", "success").then(async () => {
        await refreshProducts();
        router.push("/admin/inventory");
      });
    }
  }, [state]);

  // Obtener producto desde contexto products
  useEffect(() => {
    if (!resolvedId) {
      setLoading(false);
      return;
    }
    if (!products || products.length === 0) {
      setLoading(true);
      return;
    }

    const findProduct = () => {
      const idClean = String(resolvedId).trim();
      const found = products.find((item) => {
        const iid = item?.id ?? item?.mainSku ?? "";
        return String(iid).trim() === idClean || iid == idClean;
      });

      setProduct(found ?? null);

      if (found) {
        setDiscount(found.discount ?? undefined);
        const vars = Array.isArray(found.variants) ? found.variants : [];
        setVariants(vars);
        setVariantFiles(vars.map(() => null));
        setVariantPreviews(vars.map((v) => {
          if (!v.image) return "";
          //return /^%2F/i.test(v.image) ? `${storagePath}${v.image}` : v.image;
          return v.image;
        }));

        const imgs = Array.isArray(found.images) ? found.images.map((img: string) => {
          if (!img) return "";
          return img;
        }) : [];

        thumbnail.clear();
        productImages.clear();

        thumbnail.addRemoteUrls(found.thumbnail ? [found.thumbnail] : []);
        productImages.addRemoteUrls(imgs);

        variantPreviewUrlsRef.current = vars.map(() => null);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    try {
      findProduct();
    } catch (err) {
      console.error("fetchProduct error:", err);
      Swal.fire("Error", "No se pudo cargar el producto.", "error");
      setLoading(false);
    }
  }, [resolvedId, products]);

  // Manejo de archivos de variante
  const handleVariantFileChange = (index: number, file: File | null) => {
    setVariantFiles((prev) => {
      const next = prev.slice();
      next[index] = file;
      return next;
    });

    // crear preview immediate y limpiar la anterior objectURL si existía
    setVariantPreviews((prev) => {
      const next = prev.slice();
      // revocar previa si era objectURL
      const prevUrl = variantPreviewUrlsRef.current[index];
      if (prevUrl) {
        try {
          URL.revokeObjectURL(prevUrl);
        } catch (e) { console.warn("Revoke objectURL error:", e); }
        variantPreviewUrlsRef.current[index] = null;
      }

      if (file) {
        const obj = URL.createObjectURL(file);
        variantPreviewUrlsRef.current[index] = obj;
        next[index] = obj;
        //handleVariantChange(index, { image: "" }); // limpiar image en variant
      } else {
        // si file es null, volver a imagen original en variants (si existe)
        if (variants[index]?.image) {
          handleVariantChange(index, { image: product?.variants[index].image });
          next[index] = variants[index]?.image ?? ""; //storagePath + (variants[index]?.image ?? "");
        }
      }
      return next;
    });
  };

  // Control de variantes (añadir/quitar) — sincronizar files/previews
  const handleAddVariant = () => {
    setVariants((s) => [...s, { color: "", sku: "", image: "", stock: [] }]);
    setVariantFiles((s) => [...s, null]);
    setVariantPreviews((s) => [...s, ""]);
    variantPreviewUrlsRef.current.push(null);
  };
  const handleRemoveVariant = (index: number) => {
    setVariants((s) => s.filter((_, i) => i !== index));
    setVariantFiles((s) => {
      const next = s.slice();
      // revoke objectURL if present
      const curUrl = variantPreviewUrlsRef.current[index];
      if (curUrl) {
        try { URL.revokeObjectURL(curUrl); } catch (e) { console.warn("Revoke objectURL error:", e); }
      }
      next.splice(index, 1);
      variantPreviewUrlsRef.current.splice(index, 1);
      return next;
    });
    setVariantPreviews((s) => {
      const next = s.slice();
      next.splice(index, 1);
      return next;
    });
  };
  const handleVariantChange = (index: number, patch: Partial<Variant>) => {
    setVariants((s) => s.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  };
  const handleAddStock = (vIndex: number) => {
    setVariants((s) => s.map((v, i) => (i === vIndex ? { ...v, stock: [...v.stock, { name: "", quantity: 0 }] } : v)));
  };
  const handleRemoveStock = (vIndex: number, sIndex: number) => {
    setVariants((s) => s.map((v, i) => (i === vIndex ? { ...v, stock: v.stock.filter((_, j) => j !== sIndex) } : v)));
  };
  const handleStockChange = (vIndex: number, sIndex: number, patch: Partial<StockItem>) => {
    setVariants((s) =>
      s.map((v, i) =>
        i === vIndex
          ? { ...v, stock: v.stock.map((st, j) => (j === sIndex ? { ...st, ...patch } : st)) }
          : v
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!product) {
      showError("Producto no cargado");
      return;
    }
    if (!resolvedId) {
      showError("ID inválido");
      return;
    }
    const original = product;
    const payload:any = {};

    if (original.name !== formData.get("name")?.toString().trim()) payload.name = formData.get("name")?.toString().trim();
    if (original.mainSku !== formData.get("mainSku")?.toString().trim()) payload.mainSku = formData.get("mainSku")?.toString().trim();
    if (original.description !== formData.get("description")?.toString()) payload.description = formData.get("description")?.toString();
    if (Number(original.price) !== Number(formData.get("price"))) payload.price = Number(formData.get("price"));
    if (Number(original.status) !== Number(formData.get("status"))) payload.status = Number(formData.get("status"));

    // comparar discount (puede ser undefined)
    if (JSON.stringify(original.discount) !== JSON.stringify(discount)) payload.discount = discount;

    if (!isEqual(variants, original.variants)) {
      payload.variants = variants;
    }

    const cleanImages = productImages.items.filter(i => !i.file).map(i => i.url);
    if (!isEqual(cleanImages, original.images)) {
      payload.images = cleanImages;
    }

    formData.append("payload", JSON.stringify(payload));

    formData.delete("thumbnail");
    formData.delete("images");
    formData.forEach((_f, i) => {
      if(i.includes("variant")) formData.delete(i);
    });

    if (thumbnail.items.length === 0 && !product?.thumbnail) {
      showError("Miniatura requerida");
      return;
    }

    if (thumbnail.items[0]?.file) {
      const thumb = thumbnail.items[0].file;
      try {
        fileSchema.parse(thumb)
      } catch (error) {
        if (error instanceof ZodError) showError(`Miniatura: ${error.issues[0].message}`);
        else showError("Error inesperado");
        return;
      }
      formData.append("thumbnail", thumb);
    }

    for (let index = 0; index < productImages.items.length; index++) {
      if (productImages.items[index].file) {
        const f = productImages.items[index].file;
        try {
          fileSchema.parse(f);
        } catch (error) {
          if (error instanceof ZodError) {
            console.log(`Error en imagen adicional ${index + 1}:`, error.issues);
            showError(`Imágenes: ${error.issues[0].message}`);
          }
          else showError("Error inesperado");
          return;
        }
        formData.append("images", f);
      }
    }

    for (let index = 0; index < variantFiles.length; index++) {
      const f = variantFiles[index];
      if (!f) continue; // solo validar y adjuntar si hay un nuevo archivo para la variante
      try {
        fileSchema.parse(f);
      } catch (error) {
        if (error instanceof ZodError) showError(`Miniatura de variante ${variants[index].sku}: ${error.issues[0].message}`);
        else showError("Error inesperado");
        return;
      }
      if (f) formData.append(`variant_${variants[index].sku}_image`, f);
    }

    if (Object.keys(payload).length === 0 &&
      !thumbnail.items.some(i => i.file) &&
      !variantFiles.some(Boolean) &&
      !productImages.items.some(i => i.file)) {
      Swal.fire("Sin cambios", "No se han realizado modificaciones.", "info");
      return;
    }

    formData.append("id", String(resolvedId));

    startTransition(() => {
      formAction(formData);
    });
  }

  function showError(message: string) {
    Swal.fire({
      icon: "error",
      text: message
    });
  }

  if (loading) return <div className="p-6">Cargando producto...</div>;

  if (!product) return <div className="p-6">No se encontró el producto.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Editar producto: {product.name} (SKU: {product.mainSku})</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProdThumbnail thumbnail={thumbnail} />
        <ProdName defaultName={product.name} />
        <ProdmainSKU defaultMainSku={product.mainSku} />
        <ProdDesc defaultDescription={product.description} />
        <ProdImages images={productImages} />
        <ProdPrice defaultPrice={product.price} />
        <ProdStatus defaultStatus={product.status} />
        <ProdDiscount discount={discount} discState={setDiscount} />
        <ProdVariant
          view="edit"
          variants={variants}
          variantPreviews={variantPreviews}
          addVariant={handleAddVariant}
          removeVariant={handleRemoveVariant}
          variantChange={handleVariantChange}
          variantFileChange={handleVariantFileChange}
          addStock={handleAddStock}
          stockChange={handleStockChange}
          removeStock={handleRemoveStock}
        />
        <ActionBtns view="edit" saving={isPending} router={router} />
      </form>
    </div>
  );
}
