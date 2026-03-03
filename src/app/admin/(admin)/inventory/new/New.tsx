"use client";

import React, { useState, useEffect, useActionState, startTransition } from "react";
import { createProductAction } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDB } from "@/app/admin/components/context/dbContext";
import {
  ProdThumbnail,
  ProdName,
  ProdmainSKU,
  ProdDesc,
  ProdImages,
  ProdPrice,
  ProdStatus,
  ProdCategory,
  ProdDiscount,
  ProdVariant,
  ActionBtns
} from "@/app/admin/components/formComponents/ProductForm";
import { fileSchema } from "@/app/utils/apis/validatePayload";
import { useFilePreviews } from "@/app/admin/components/formComponents/useFilePreviews";
import { ZodError } from "zod";

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function NewProduct() {
  const router = useRouter();
  const { refreshProducts } = useDB();

  const thumbnail = useFilePreviews(1);
  const productImages = useFilePreviews(10);

  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );

  // Form state (defaults)
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [discount, setDiscount] = useState<Discount | undefined>(undefined);
  const [variants, setVariants] = useState<Variant[]>([]);

  const [variantFiles, setVariantFiles] = useState<(File | null)[]>([]);

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
      Swal.fire("Producto creado!", `Producto creado con id: ${state?.message?.response}`, "success").then(async () => {
        await refreshProducts();
        router.push("/admin/inventory");
      });
    };
  }, [state]);

  // manejadores de archivos
  const handleVariantFileChange = (index: number, f: File | null) => {
    setVariantFiles((prev) => {
      const copy = [...prev];
      copy[index] = f;
      return copy;
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

    if (thumbnail.items.length === 0) {
      showError("Miniatura requerida");
      return;
    }

    const thumb = thumbnail.items[0].file;

    if (thumb) {
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
      const f = productImages.items[index].file;
      if (!f) continue;
      try {
        fileSchema.parse(f);
      } catch (error) {
        if (error instanceof ZodError) {
          showError(`Imágenes: ${error.issues[0].message}`);
        }
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
        <ProdThumbnail thumbnail={thumbnail} />
        <ProdName />
        <ProdmainSKU defaultMainSku="" />
        <ProdDesc defaultDescription="" />
        <ProdImages images={productImages} />
        <ProdPrice />
        <ProdStatus />
        <ProdCategory setCategory={setCategory} setSubcategory={setSubcategory} category={category} subcategory={subcategory} />
        <ProdDiscount discount={discount} discState={setDiscount} />
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
        <ActionBtns view="new" saving={isPending} router={router} />
      </form>
      {state?.error && (<ul className="m-5 text-center">
        {Array.isArray(state.error) ?
          state.error.map((err, idx) => <li key={idx} style={{ color: "red" }}>{err.message}</li>) :
          <li style={{ color: "red" }}>{state.message || state.error}</li>}
      </ul>)}
    </div>
  );
}
