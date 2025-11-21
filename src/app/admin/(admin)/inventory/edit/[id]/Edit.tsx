"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
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
  ProdDiscount
} from "@/app/admin/components/formComponents/ProductForm";
import ProdVariant from "@/app/admin/components/formComponents/ProductForm";
import { storagePath } from "@/app/utils/utils";

// Tipos (sin cambios)
type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function EditProduct({ id }: { id?: string }) {
  const router = useRouter();
  const params = useParams(); // <- usar useParams en App Router
  const { products, refreshProducts } = useDB();

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

  // Reemplaza tu useEffect actual que actualiza variantPreviews
  useEffect(() => {
    // garantizar que los arrays tengan la misma longitud que variants
    setVariantFiles((prev) => variants.map((_, i) => prev[i] ?? null));

    setVariantPreviews((prev) => {
      // limpiar prev objectURLs que ya no usamos
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
  // Añadimos variantFiles a deps
  }, [variants]);


  // limpieza al desmontar del componente: revoke objectURLs
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

  const validate = () => {
    if (!name || name.trim().length < 2) {
      Swal.fire("Nombre inválido", "El nombre debe tener al menos 2 caracteres.", "warning");
      return false;
    }
    if (!mainSku || mainSku.trim().length === 0) {
      Swal.fire("SKU inválido", "El SKU principal no puede estar vacío.", "warning");
      return false;
    }
    if (price === "" || Number.isNaN(Number(price)) || Number(price) < 0) {
      Swal.fire("Precio inválido", "Introduce un precio válido (>= 0).", "warning");
      return false;
    }
    // validar variantes: skus únicos
    const skus = new Set<string>();
    for (const v of variants) {
      if (!v.sku || !v.sku.trim()) {
        Swal.fire("SKU variante inválido", "Cada variante debe tener un SKU.", "warning");
        return false;
      }
      if (skus.has(v.sku)) {
        Swal.fire("SKU duplicado", `El SKU ${v.sku} está repetido entre variantes.`, "warning");
        return false;
      }
      skus.add(v.sku);
    }
    return true;
  };

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
        handleVariantChange(index, { image: "" }); // limpiar image en variant
      } else {
        // si file es null, volver a imagen original en variants (si existe)
        handleVariantChange(index, { image: product?.variants[index].image });
        next[index] = variants[index]?.image ?? ""; //storagePath + (variants[index]?.image ?? "");
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
    if (!validate() || !resolvedId) return;

    const payload = {
      name: name.trim(),
      description: description,
      thumbnail: thumbnailPreview,
      images: imagesPreviews,
      mainSku: mainSku.trim(),
      price: Number(price),
      status: Number(status),
      variants: variants,
      discount: discount,
    };

    try {
      setSaving(true);
      Swal.fire({ title: "Guardando...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      // ¿Hay archivos? si al menos uno en variantFiles no es null -> usamos FormData
      const hasVariantFiles = variantFiles.some((f) => f !== null);
      const hasThumbnailFile = thumbnailFile !== null;
      const hasImagesFiles = imagesFiles.length > 0;

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
            form.append(`variant_${i}_image`, f, (f as File).name);
          }
        });
      }

      // imágenes adicionales
      if (hasImagesFiles) {
        imagesFiles.forEach((f, i) => {
          if (f) {
            form.append(`image_${i}`, f, (f as File).name);
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
