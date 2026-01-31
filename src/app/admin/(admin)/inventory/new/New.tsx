"use client";

import React, { useState, useEffect, useActionState, startTransition } from "react";
import Image from "next/image";
import { createProductAction } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDB } from "@/app/admin/components/context/dbContext";
import { storagePath } from "@/app/utils/utils";
import { Trash2Icon } from "lucide-react";
import {
  ProdCategory,
  ProdVariant,
  ImgSizeIndicator
} from "@/app/admin/components/formComponents/ProductForm";
import { fileSchema } from "@/app/utils/apis/validatePayload";
import { ZodError } from "zod";

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function NewProduct() {
  const router = useRouter();
  const { refreshProducts } = useDB();

  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );

  // Form state (defaults)
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [discount, setDiscount] = useState<Discount | undefined>(undefined);
  const [variants, setVariants] = useState<Variant[]>([]);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [variantFiles, setVariantFiles] = useState<(File | null)[]>([]);

  useEffect(() => {
    // thumbnail preview
    if (!thumbnailFile) {
      setThumbnailPreview(null);
      return;
    }
    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnailFile]);

  useEffect(() => {
    // image files previews múltiples
    const urls = imageFiles.map((f) => URL.createObjectURL(f));
    // limpiar previos
    imagePreviews.forEach((u) => URL.revokeObjectURL(u));
    setImagePreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [imageFiles]);

  // mantener variantFiles alineado con variants length
  useEffect(() => {
    setVariantFiles((cur) => {
      const copy = [...cur];
      while (copy.length < variants.length) copy.push(null);
      if (copy.length > variants.length) copy.length = variants.length;
      return copy;
    });
  }, [variants]);

  useEffect(() => {
    if (state?.error) {
      let htmlError = "";
      if (Array.isArray(state.error)) {
        state.error.forEach((err) => {
          htmlError += `<p>${err.message}</p>`
        })
      } else {
        htmlError = `<p>${state.message || state.error}</p>`;
        Swal.fire({
          icon: "error",
          html: htmlError
        });
      }
    } else if (state?.success) {
      console.log(state);
      Swal.fire("Producto creado!", `Producto creado con id: ${state?.message?.response}`, "success").then(async () => {
        await refreshProducts();
        router.push("/admin/inventory");
      });
    };
  }, [state]);

  // manejadores de archivos
  const handleImageFilesChange = (files: FileList | null) => {
    if (!files) return setImageFiles([]);
    setImageFiles(imageFiles.concat(Array.from(files)).slice(0,10));
  };

  const handleVariantFileChange = (index: number, f: File | null) => {
    setVariantFiles((prev) => {
      const copy = [...prev];
      copy[index] = f;
      return copy;
    });
  };

  const handleDeleteImage = (index: number) => {
      Swal.fire({
        title: "¿Eliminar imagen?",
        text: "Esta acción no se puede deshacer.",
        imageUrl: /^%2F/i.test(imagePreviews[index]) ? `${storagePath}${imagePreviews[index]}` : imagePreviews[index],
        imageWidth: 100,
        imageHeight: 100,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setImagePreviews((prev) => prev.filter((_, i) => i !== index));
          setImageFiles((prev) => prev.filter((_, i) => i !== (index - (imagePreviews.length - imageFiles.length))));
        }
      });
    };

  // Variants helpers
  const handleAddVariant = () => setVariants((s) => [...s, { color: "", sku: "", image: "", stock: [] }]);
  const handleRemoveVariant = (index: number) => setVariants((s) => s.filter((_, i) => i !== index));
  const handleVariantChange = (index: number, patch: Partial<Variant>) =>
    setVariants((s) => s.map((v, i) => (i === index ? { ...v, ...patch } : v)));

  const handleAddStock = (vIndex: number) =>
    setVariants((s) => s.map((v, i) => (i === vIndex ? { ...v, stock: [...v.stock, { name: "", quantity: 0 }] } : v)));

  const handleRemoveStock = (vIndex: number, sIndex: number) =>
    setVariants((s) => s.map((v, i) => (i === vIndex ? { ...v, stock: v.stock.filter((_, j) => j !== sIndex) } : v)));

  const handleStockChange = (vIndex: number, sIndex: number, patch: Partial<StockItem>) =>
    setVariants((s) =>
      s.map((v, i) =>
        i === vIndex ? { ...v, stock: v.stock.map((st, j) => (j === sIndex ? { ...st, ...patch } : st)) } : v
      )
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name")?.toString().trim(),
      description: formData.get("description")?.toString(),
      mainSku: formData.get("mainSku")?.toString().trim(),
      price: Number(formData.get("price")),
      status: Number(formData.get("status")),
      category: Number(formData.get("category")),
      subcategory: formData.get("subcategory") ? Number(formData.get("subcategory")) : undefined,
      discount: discount,
      variants,
    };

    formData.append("payload", JSON.stringify(payload));

    formData.delete("thumbnail");
    formData.delete("images");
    formData.forEach((_f, i) => {
      if(i.includes("variant")) formData.delete(i);
    });

    if (thumbnailFile) {
      try {
        fileSchema.parse(thumbnailFile)
      } catch (error) {
        if (error instanceof ZodError) showError(`Miniatura: ${error.issues[0].message}`);
        else showError("Error inesperado");
        return;
      }
      formData.append("thumbnail", thumbnailFile);
    }
    
    for (let index = 0; index < imageFiles.length; index++) {
      const f = imageFiles[index];
      try {
        fileSchema.parse(f);
      } catch (error) {
        if (error instanceof ZodError) showError(`Imágenes: ${error.issues[0].message}`);
        else showError("Error inesperado");
        return;
      }
      formData.append("images", f);
    }

    for (let index = 0; index < variantFiles.length; index++) {
      const f = variantFiles[index];
      try {
        fileSchema.parse(f);
      } catch (error) {
        if (error instanceof ZodError) showError(`Miniatura de variante ${variants[index].sku}: ${error.issues[0].message}`);
        else showError("Error inesperado");
        return;
      }
      if (f) formData.append(`variant_${variants[index].sku}_image`, f);
    }

    startTransition(() => {
      formAction(formData)
    });
  }

  function showError(message: string) {
    Swal.fire({
      icon: "error",
      text: message
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Crear producto nuevo</h1>
      <form id="new-prod" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Miniatura del producto</label>
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {thumbnailPreview && thumbnailFile ? (
                <>
                <ImgSizeIndicator sizeInBytes={thumbnailFile.size} />
                <Image src={thumbnailPreview} alt="Miniatura" width={112} height={112} style={{ objectFit: "cover" }} />
                </>
              ) : (
                <div className="text-xs text-gray-500">Sin miniatura</div>
              )}
            </div>
    
            <div className="flex flex-col gap-2">
              <label className="px-3 py-2 border rounded cursor-pointer inline-block text-center text-sm">
                Seleccionar miniatura
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/webp, image/jpeg, image/png, image/bmp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setThumbnailFile(f);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="Nombre del producto" />
        </div>
        <div>
          <label className="block text-sm font-medium">SKU principal</label>
          <input
            type="text"
            name="mainSku"
            required
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="SKU principal" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            required
            className="mt-1 block w-full border rounded px-3 py-2 h-28"
            placeholder="Descripción del producto"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Imágenes del producto (máximo 10 imágenes)</label>
          <div className="flex flex-wrap gap-4 justify-center">
            {imagePreviews.map((imgSrc, i) => (
              <div key={i} className="size-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {imgSrc ? (
                  <div className="relative w-full h-full">
                    <ImgSizeIndicator sizeInBytes={imageFiles[i]?.size ?? 0} />
                    <Trash2Icon
                      className="absolute top-1 right-1 w-5 h-5 text-white bg-red-600 rounded-full p-0.5 cursor-pointer z-10"
                      onClick={() => handleDeleteImage(i)}></Trash2Icon>
                    <Image src={/^%2F/i.test(imgSrc) ? `${storagePath}${imgSrc}` : imgSrc} alt={`Imagen ${i + 1}`} width={96} height={96} style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">Sin imagen</div>
                )}
              </div>
            ))}
          </div>
          <label className="mt-5 px-3 py-2 border rounded cursor-pointer inline-block text-center text-sm">
            Agregar imágenes
            <input
              type="file"
              name="images"
              multiple
              accept="image/webp, image/jpeg, image/png, image/bmp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files ?? null;
                handleImageFilesChange(f);
              }} />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            name="price"
            required
            placeholder="Precio"
            className="mt-1 block w-full border rounded px-3 py-2"
            min={0}
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select className="mt-1 block w-full border rounded px-3 py-2" defaultValue={""} name="status" required>
            <option value="" disabled>Seleccione el estado</option>
            <option value={1}>Disponible</option>
            <option value={0}>Agotado</option>
            <option value={2}>Eliminado</option>
          </select>
        </div>
        <ProdCategory setCategory={setCategory} setSubcategory={setSubcategory} category={category} subcategory={subcategory} />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Descuento (opcional)</label>
          <div className="flex flex-col md:flex-row gap-2 items-center mt-1">
            <select
              value={discount ? String(discount.type) : ""}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") setDiscount(undefined);
                else setDiscount({ type: Number(v), value: discount?.value ?? 0 });
              }}
              className="border rounded px-2 py-1 w-full md:w-1/2"
            >
              <option value="">Sin descuento</option>
              <option value={0}>Porcentaje (%)</option>
              <option value={1}>Fijo</option>
            </select>

            {discount !== undefined && (
              <input
                type="number"
                className="border rounded px-2 py-1 w-full md:w-1/4"
                value={discount.value}
                onChange={(e) => setDiscount({ ...(discount ?? { type: 0, value: 0 }), value: Number(e.target.value) })}
                min={0}
                step="0.01"
              />
            )}
          </div>
        </div>
        <ProdVariant
          view="new"
          variants={variants}
          variantFiles={variantFiles}
          variantPreviews={variantFiles}
          addVariant={handleAddVariant}
          removeVariant={handleRemoveVariant}
          variantChange={handleVariantChange}
          variantFileChange={handleVariantFileChange}
          addStock={handleAddStock}
          stockChange={handleStockChange}
          removeStock={handleRemoveStock}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Crear producto"}
        </button>
      </form>
      {state?.error && (<ul className="m-5 text-center">
        {Array.isArray(state.error) ?
          state.error.map((err, idx) => <li key={idx} style={{ color: "red" }}>{err.message}</li>) :
          <li style={{ color: "red" }}>{state.message || state.error}</li>}
      </ul>)}
    </div>
  );
}
