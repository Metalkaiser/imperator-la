"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
//import { useDB } from "@/app/admin/components/context/dbContext";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import { capitalize, checkMime } from "@/app/utils/functions";

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };
type Discount = { type: number; value: number };

export default function NewProduct() {
  const router = useRouter();
  //const { refreshProducts } = useDB();

  const [saving, setSaving] = useState(false);

  // Form state (defaults)
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainSku, setMainSku] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
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
    if (checkMime(thumbnailFile)) {
      Swal.fire("Formato inválido", "La miniatura debe estar en formato WebP.", "warning");
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
      Swal.close();
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
        throw new Error(err.message || "Error al crear producto");
      }
      const json = await res.json().catch(() => ({} as any));
      console.log(json);
      await Swal.fire("Creado", "Producto creado correctamente.", "success");
      // refrescar / redirigir según respuesta
      //await refreshProducts?.();
      //const newId = json?.id ?? json?._id;
      //if (newId) router.push(`/admin/inventory/edit/${newId}`);
      //else router.push("/admin/inventory");
    } catch (err: any) {
      console.error("create error:", err);
      Swal.fire("Error", err?.message || "No se pudo crear el producto.", "error");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Crear producto nuevo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">SKU principal</label>
          <input className="mt-1 block w-full border rounded px-3 py-2" value={mainSku} onChange={(e) => setMainSku(e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Miniatura del producto (WEBP preferido)</label>
          <div className="flex items-center gap-3 mt-2">
            <input
              className="mt-1 block w-1/2 md:w-1/3 border rounded px-3 py-2"
              type="file"
              accept="image/*"
              onChange={(e) => handleThumbnailChange(e.target.files?.[0] ?? null)}
            />
            {thumbnailPreview && (
              <Image
                src={thumbnailPreview}
                alt="thumbnail preview"
                className="w-20 h-20 object-cover rounded"
                width={0}
                height={0}
                ></Image>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Descripción</label>
          <textarea className="mt-1 block w-full border rounded px-3 py-2 h-28" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            min={0}
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select value={String(status)} onChange={(e) => setStatus(Number(e.target.value))} className="mt-1 block w-full border rounded px-3 py-2">
            <option value={1}>Disponible</option>
            <option value={0}>Agotado</option>
            <option value={2}>Eliminado</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <div className="flex gap-2 items-center mt-1">
            <select className="border rounded px-2 py-1 w-2/5" onChange={(e) => {
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
              <select className="border rounded px-2 py-1 w-2/5" onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
                <option value="" disabled>Seleccionar subcategoría</option>
                {allCategories[Number(category)].subcategories.map((subcat, j) => (
                  <option key={`subcat-${j}`} value={j}>{capitalize(subcat.label)}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Imágenes adicionales (puedes seleccionar varias)</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-1/2 md:w-1/3 border rounded px-3 py-2"
            multiple
            onChange={(e) => handleImageFilesChange(e.target.files)} />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {imagePreviews.map((u, i) => (
              <Image key={i} src={u} alt={`img-${i}`} className="w-20 h-20 object-cover rounded" width={0} height={0}></Image>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Descuento (opcional)</label>
          <div className="flex gap-2 items-center mt-1">
            <select
              value={discount ? String(discount.type) : ""}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") setDiscount(undefined);
                else setDiscount({ type: Number(v), value: discount?.value ?? 0 });
              }}
              className="border rounded px-2 py-1 w-3/5 md:w-40"
            >
              <option value="">Sin descuento</option>
              <option value="0">Porcentaje (%)</option>
              <option value="1">Fijo</option>
            </select>

            {discount !== undefined && (
              <input
                type="number"
                className="border rounded px-2 py-1 w-2/5 md:w-40"
                value={discount.value}
                onChange={(e) => setDiscount({ ...(discount ?? { type: 0, value: 0 }), value: Number(e.target.value) })}
                min={0}
                step="0.01"
              />
            )}
          </div>
        </div>

        {/* Variantes */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Variantes</h2>
            <div className="flex gap-2">
              <button type="button" onClick={handleAddVariant} className="px-3 py-1 border rounded">
                Añadir variante
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {variants.length === 0 && <div className="text-sm text-gray-500">Sin variantes</div>}
            {variants.map((v, vi) => (
              <div key={vi} className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Variante {vi + 1}</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleRemoveVariant(vi)} className="px-2 py-1 border rounded text-sm">
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs">Color</label>
                    <input className="mt-1 block w-full border rounded px-2 py-1" value={v.color} onChange={(e) => handleVariantChange(vi, { color: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs">SKU</label>
                    <input className="mt-1 block w-full border rounded px-2 py-1" value={v.sku} onChange={(e) => handleVariantChange(vi, { sku: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs">Miniatura variante</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-1/2 md:w-1/3 border rounded px-3 py-2"
                      onChange={(e) => handleVariantFileChange(vi, e.target.files?.[0] ?? null)}
                    />
                    {variantFiles[vi] && (
                      <Image src={URL.createObjectURL(variantFiles[vi] as File)} alt={`var-${vi}`} className="w-16 h-16 object-cover rounded mt-1" width={0} height={0}></Image>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Tallas / Stock</div>
                    <button type="button" onClick={() => handleAddStock(vi)} className="px-2 py-1 border rounded text-sm">
                      Añadir talla
                    </button>
                  </div>

                  <div className="mt-2 space-y-2">
                    {v.stock.map((st, si) => (
                      <div key={si} className="flex gap-2 items-center">
                        <input className="border rounded px-2 py-1 w-1/2" value={st.name} onChange={(e) => handleStockChange(vi, si, { name: e.target.value })} placeholder="Talla" />
                        <input type="number" className="border rounded px-2 py-1 w-1/2" value={st.quantity} onChange={(e) => handleStockChange(vi, si, { quantity: Number(e.target.value) })} />
                        <button type="button" onClick={() => handleRemoveStock(vi, si)} className="px-2 py-1 border rounded text-sm">
                          Eliminar
                        </button>
                      </div>
                    ))}
                    {v.stock.length === 0 && <div className="text-xs text-gray-500">No hay tallas</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* acciones */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => router.push("/admin/inventory")} className="px-4 py-2 border rounded">
          Cancelar
        </button>
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
          {saving ? "Creando..." : "Crear producto"}
        </button>
      </div>
    </div>
  );
}
