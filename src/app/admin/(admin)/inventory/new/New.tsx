"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDB } from "@/app/admin/components/context/dbContext";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { capitalize, checkMime } from "@/app/utils/functions";
import { storagePath } from "@/app/utils/utils";
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

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function NewProduct() {
  const router = useRouter();
  const { refreshProducts } = useDB();

  const [saving, setSaving] = useState(false);

  // Form state (defaults)
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainSku, setMainSku] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [status, setStatus] = useState<number>(1);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // manejadores de archivos
  const handleThumbnailChange = (f: File | null) => setThumbnailFile(f);

  const handleImageFilesChange = (files: FileList | null) => {
    if (!files) return setImageFiles([]);
    setImageFiles(Array.from(files));
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

  const allCategories = getCategoriesWithSubcategories("es");

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
    const checkCat = category === "" || Number(category) < 0 || Number(category) >= allCategories.length;
    const checkSubCat = subcategory === "" || Number(subcategory) < 0 || Number(subcategory) >= allCategories[Number(category)].subcategories.length
    if (checkCat) {
      Swal.fire("Seleccione una categoría válida", "La categoría es obligatoria", "warning");
      return false;
    }
    if (allCategories[Number(category)].subcategories.length > 0 && checkSubCat) {
      Swal.fire("Seleccione una subcategoría válida", `La subcategoría es obligatoria para la categoría ${capitalize(allCategories[Number(category)].label)}`, "warning");
      return false;
    }
    // validar variantes: skus únicos si hay variantes
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
      if (!v.stock.length) {
        Swal.fire("Talla o tamaño ausente", `La variante ${v.sku} no tiene tallas declaradas en stock.`, "warning");
        return false;
      }
      for (const s of v.stock) {
        if (s.name === "") {
          Swal.fire("Nombre de talla", `La variante ${v.sku} tiene tallas con formato incorrecto.`, "warning");
          return false;
        }
        if (isNaN(Number(s.quantity)) || Number(s.quantity) < 0) {
          Swal.fire("Stock incorrecto", `La variante ${v.sku} tiene tallas con stock incorrecto.`, "warning");
          return false;
        }
      }
      skus.add(v.sku);
    }

    if (!variants.length) {
      Swal.fire("Variante obligatorias", "Declara al menos una variante.", "warning");
      return false;
    }

    if (!thumbnailFile) {
      Swal.fire("Miniatura obligatoria", "Debes seleccionar una miniatura para el producto.", "warning");
      return false;
    }
    if (!imageFiles.length) {
      Swal.fire("Imágenes obligatorias", "Debes seleccionar las imágenes del producto.", "warning");
      return false;
    }
    for (let i = 0; i < variants.length; i++) {
      if (!variantFiles[i]) {
        Swal.fire("Miniatura de variante obligatoria", `La variante ${i + 1} debe tener una miniatura.`, "warning");
        return false;
      }
      if (variantFiles[i]?.type !== "image/webp") {
        Swal.fire("Formato incorrecto", `La imagen de la variante ${i + 1} debe ser WEBP.`, "warning");
        return false;
      }
    }
    if (thumbnailFile.type !== "image/webp") {
      Swal.fire("Formato inválido", `La miniatura debe estar en formato WebP. (${thumbnailFile.type})`, "warning");
      return false;
    }

    if (valImgs()) {
      Swal.fire("Formato inválido", "Las imágenes deben estar en formato WebP.", "warning");
      return false;
    }

    return true;
  };

  const valImgs = () => {
    let wrong = 0;
    for (const img of imageFiles) {
      if(checkMime(img)) {
        wrong++;
        const index = imageFiles.indexOf(img);
        const imgCopy = [ ...imageFiles ];
        const imgPrevCopy = [ ...imagePreviews ];
        imgCopy.splice(index, 1);
        imgPrevCopy.splice(index, 1);
        setImageFiles(imgCopy);
        setImagePreviews(imagePreviews);
      }
    }
    if (wrong) {
      return false;
    }
    return true;
  }

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

  const handleSave = async () => {
    if (!validate()) return;

    const form = new FormData();
    // campos JSON como string
    form.append("payload", JSON.stringify({
      name: name.trim(),
      description,
      mainSku: mainSku.trim(),
      category,
      subcategory,
      price: Number(price),
      status: Number(status),
      variants,
      discount,
    }));

    if (thumbnailFile) form.append("thumbnail", thumbnailFile, thumbnailFile.name);
    // imagenes múltiples
    imageFiles.forEach(f => form.append("images", f, f.name));
    // archivos de variantes: nombrados por índice (variant_0, variant_1, ...)
    variantFiles.forEach((f, idx) => {
      if (f) form.append(`variant_${idx}_image`, f, f.name);
    });
    try {
      setSaving(true);
      Swal.fire({ title: "Creando producto...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const res = await fetch("/api/admin/products", {
        method: "POST",
        credentials: "include",
        body: form, // no headers: el browser setea multipart/form-data
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
        console.log("create failed:", err);
        throw new Error(err.message || "Error al crear producto");
      }
      const json = await res.json().catch(() => ({} as any));
      const newId = json?.productId;
      if (json.productId) {
        const logRes = await fetch("/api/admin/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            data: {
              action: "product_created",
              target: {
                collection: "products",
                item: newId.response,
              }
            }
          }),
        });
        if (!logRes.ok) console.warn("No se pudo registrar el log de creación de producto");
        else console.log(await logRes.json());
      }
      Swal.close();
      console.log("create success:", json);
      await Swal.fire("Creado", "Producto creado correctamente.", "success");
      // refrescar / redirigir según respuesta
      await refreshProducts?.();
      if (newId) router.push(`/admin/inventory`);
    } catch (err: any) {
      console.error("create error:", err);
      Swal.fire("Error", err?.message || "No se pudo crear el producto.", "error");
    } finally {
      setSaving(false);
    }
    console.log(form.get('payload'));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Crear producto nuevo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProdThumbnail view="new" thumbnail={thumbnailPreview} setThumbnail={handleThumbnailChange} />
        <ProdName name={name} nameState={setName} />
        <ProdmainSKU mainSku={mainSku} skuState={setMainSku} />
        <ProdDesc description={description} descState={setDescription} />
        <ProdImages previews={imagePreviews} addImages={handleImageFilesChange} deleteImage={handleDeleteImage} />
        <ProdPrice price={price} priceState={setPrice} />
        <ProdStatus status={status} statusState={setStatus} />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <div className="flex flex-col md:flex-row gap-2 items-center mt-1 w-full">
            <select className="border rounded px-2 py-1 w-full md:w-1/2" onChange={(e) => {
                setSubcategory("");
                setCategory(e.target.value)}
              }
              value={category}>
              <option value="" disabled>Seleccionar categoría</option>
            {allCategories.map((cat, i) => (
              <option key={i} value={i}>{capitalize(cat.label)}</option>
            ))}
            </select>
            {(allCategories.length > Number(category) &&
              allCategories[Number(category)].subcategories.length > 0 &&
              category !== "") && (
              <select className="border rounded px-2 py-1 w-full md:w-1/2" onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
                <option value="" disabled>Seleccionar subcategoría</option>
                {allCategories[Number(category)].subcategories.map((subcat, j) => (
                  <option key={`subcat-${j}`} value={j}>{capitalize(subcat.label)}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        <ProdDiscount discount={discount} discState={setDiscount} />
        <ProdVariant
          view="new"
          variants={variants}
          variantPreviews={variantFiles}
          addVariant={handleAddVariant}
          removeVariant={handleRemoveVariant}
          variantChange={handleVariantChange}
          variantFileChange={handleVariantFileChange}
          addStock={handleAddStock}
          stockChange={handleStockChange}
          removeStock={handleRemoveStock}
        />
      </div>
      <ActionBtns view="new" saving={saving} router={router} handleSave={handleSave} />
    </div>
  );
}
