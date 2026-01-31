"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import isEqual from "fast-deep-equal";
import { useDB } from "@/app/admin/components/context/dbContext";
import { productProps } from "@/app/utils/types";
import {
  ActionBtns,
  ProdName,
  ProdmainSKU,
  ProdThumbnail,
  ProdDesc,
  ProdImages,
  ProdPrice,
  ProdStatus,
  ProdDiscount,
  ProdVariant
} from "@/app/admin/components/formComponents/ProductForm";
import { updateProductSchema } from "@/app/utils/apis/validatePayload";
import { storagePath } from "@/app/utils/utils";
import { validateVariants } from "@/app/utils/clientFunctions";
import z from "zod";
import { es } from "zod/locales"
z.config(es());

// Tipos (sin cambios)
type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function EditProduct({ id }: { id?: string }) {
  const router = useRouter();
  const params = useParams(); // <- usar useParams en App Router
  const { products, refreshProducts } = useDB();
  const originalRef = useRef<productProps | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<productProps | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mainSku, setMainSku] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [status, setStatus] = useState<number>(1);
  const [discount, setDiscount] = useState<Discount | undefined>(undefined)
  const [variants, setVariants] = useState<Variant[]>([]);

  // Thumbnail state
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  //Images state
  const [imagesFiles, setImagesFiles] = useState<(File | null)[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

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
        originalRef.current = structuredClone(found);
        // inicializar formulario aquí
        setName(found.name ?? "");
        setDescription(found.description ?? "");
        setMainSku(found.mainSku ?? "");
        setPrice(typeof found.price !== "undefined" ? Number(found.price) : "");
        setStatus(typeof found.status !== "undefined" ? Number(found.status) : 1);
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
          //return /^%2F/i.test(img) ? `${storagePath}${img}` : img;
          return img;
        }) : [];

        setImagesPreviews(imgs);
        setImagesFiles(imgs.map(() => null));
        // thumbnail
        const thumb = found.thumbnail ?? "";
        //const thumbUrl = /^%2F/i.test(thumb) ? `${storagePath}${thumb}` : thumb;
        setThumbnailPreview(thumb);

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

  const handleThumbnailFileChange = (file: File | null) => {
    // limpiar previa blob URL si existe
    if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
      try { URL.revokeObjectURL(thumbnailPreview); } catch (e) { console.warn("Revoke objectURL error:", e);}
    }

    setThumbnailFile(file);
    if (file) {
      const obj = URL.createObjectURL(file);
      setThumbnailPreview(obj);
    } else {
      // si se deshace, restaurar desde product.thumbnail si existe
      const foundThumb = product?.thumbnail ?? "";
      if (foundThumb) {
        setThumbnailPreview(foundThumb);
      } else {
        setThumbnailPreview("");
      }
    }
  };
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
  const handleDeleteImage = (index: number) => {
    Swal.fire({
      title: "¿Eliminar imagen?",
      text: "Esta acción no se puede deshacer.",
      imageUrl: /^%2F/i.test(imagesPreviews[index]) ? `${storagePath}${imagesPreviews[index]}` : imagesPreviews[index],
      imageWidth: 100,
      imageHeight: 100,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
        setImagesFiles((prev) => prev.filter((_, i) => i !== (index - (imagesPreviews.length - imagesFiles.length))));
      }
    });
  };
  const handleAddImages = (file: FileList| null) => {
    if (!file) return;
    const newFiles: (File | null)[] = [];
    const newPreviews: string[] = [];
    Array.from(file).forEach((f) => {
      newFiles.push(f);
      const obj = URL.createObjectURL(f);
      newPreviews.push(obj);
    });
    setImagesFiles((prev) => [...prev, ...newFiles]);
    setImagesPreviews((prev) => [...prev, ...newPreviews]);
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

  // Guardar: si hay archivos, envio FormData con payload + variant_{i}_image
  const handleSave = async () => {
    if (!resolvedId) return;

    const payload: any = {};
    const original = originalRef.current!;

    // construir payload solo con campos modificados
    if (name.trim() !== original.name) payload.name = name.trim();
    if (description !== original.description) payload.description = description;
    if (mainSku.trim() !== original.mainSku) payload.mainSku = mainSku.trim();
    if (Number(price) !== Number(original.price)) payload.price = Number(price);
    if (Number(status) !== Number(original.status)) payload.status = Number(status);
    // comparar discount (puede ser undefined)
    if (JSON.stringify(discount) !== JSON.stringify(original.discount)) {
      if (discount === undefined) {
        payload.discount = null; // eliminar descuento
      } else {
        payload.discount = discount;
      }
    }
    const cleanImages = imagesPreviews.filter((img) => img && !img.startsWith("blob:"));
    if (!isEqual(cleanImages, original.images)) {  // comparar imágenes
      payload.images = cleanImages;
    }
    if (!isEqual(variants, original.variants)) {
      payload.variants = variants;
    }

    if (Object.keys(payload).length === 0 &&
      !thumbnailFile &&
      !variantFiles.some(Boolean) &&
      !imagesFiles.some(f => f instanceof File)) {
      Swal.fire("Sin cambios", "No se han realizado modificaciones.", "info");
      return;
    }

    const parsed = updateProductSchema.safeParse(payload);
    
    if (!parsed.success) {
      const errors = z.flattenError(parsed.error);
      const errorArray = Object.values(errors.fieldErrors);
      Swal.fire({
        title: "Error de validación",
        html: errorArray.flat().map((e, i) => `<div key=${i}>- ${e}</div>`).join("") || "Datos inválidos.",
        icon: "error"
      });
      return;
    }

    if (payload.variants || payload.mainSku) {
      const variantErrors = validateVariants({
        variants: payload.variants ?? originalRef.current!.variants,
        mainSku: payload.mainSku ?? originalRef.current!.mainSku,
        variantFiles,
      });
      if (variantErrors.length > 0) {
        Swal.fire({
          title: "Errores en variantes",
          html: variantErrors
            .map(e => `• ${e.message}`)
            .join("<br />"),
          icon: "warning",
        });
        return;
      }
    }

    try {
      setSaving(true);
      Swal.fire({ title: "Guardando...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      // ¿Hay archivos? si al menos uno en variantFiles no es null -> usamos FormData
      const hasVariantFiles = variantFiles.some((f) => f !== null);
      const hasThumbnailFile = thumbnailFile !== null;
      const hasImagesFiles = imagesFiles.some(f => f instanceof File);


      const form = new FormData();
      form.append("payload", JSON.stringify(payload));

      // thumbnail
      if (hasThumbnailFile && thumbnailFile) {
        form.append("thumbnail", thumbnailFile, thumbnailFile.name);
      }

      // Adjuntar cada file con nombre variant_{index}_image
      if (hasVariantFiles) {
        variantFiles.forEach((f, i) => {
          if (f) {
            form.append(`variant_${variants[i].sku}_image`, f, (f as File).name);
          }
        });
      }

      // imágenes adicionales
      if (hasImagesFiles) {
        let indexOffset = 0;
        imagesFiles.forEach((f) => {
          if (f) {
            form.append(`image_${indexOffset}`, f, (f as File).name);
            indexOffset += 1;
          }
        });
      }

      const res = await fetch(`/api/admin/products/${encodeURIComponent(String(resolvedId))}`, {
        method: "PATCH",
        credentials: "include",
        body: form,
      });


      Swal.close();

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
        throw new Error(err.message || "Error al guardar");
      }

      console.log(await res.json());

      await Swal.fire("Guardado", "Producto actualizado correctamente.", "success");
      await refreshProducts();
      router.push("/admin/inventory");

      Swal.close();
    } catch (err: any) {
      console.error("save error", err);
      Swal.fire("Error", err?.message || "No se pudo guardar el producto.", "error");
    } finally {
      setSaving(false);
    }

  };

  if (loading) return <div className="p-6">Cargando producto...</div>;

  if (!product) return <div className="p-6">No se encontró el producto.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Editar producto: {product.name} (SKU: {product.mainSku})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProdThumbnail view="new" thumbnail={thumbnailPreview} setThumbnail={handleThumbnailFileChange} />
        <ProdName name={name} nameState={setName} />
        <ProdmainSKU mainSku={mainSku} skuState={setMainSku} />
        <ProdDesc description={description} descState={setDescription} />
        <ProdImages previews={imagesPreviews} addImages={handleAddImages} deleteImage={handleDeleteImage} />
        <ProdPrice price={price} priceState={setPrice} />
        <ProdStatus status={status} statusState={setStatus} />
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
      </div>
      <ActionBtns view="edit" saving={saving} router={router} handleSave={handleSave} />
    </div>
  );
}
