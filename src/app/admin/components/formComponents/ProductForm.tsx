"use client"

import { useState } from "react";
import Swal from "sweetalert2";
import { capitalize } from "@/app/utils/functions";
import { variantsColors } from "@/app/utils/utils";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import type { productProps } from "@/app/utils/types";
import { Plus, Trash2Icon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { storagePath } from "@/app/utils/utils";
import { useFilePreviews } from "./useFilePreviews";

type useFileType = ReturnType<typeof useFilePreviews>;

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };

export const ProdThumbnail = ({
  thumbnail
}: {
  thumbnail: useFileType
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">Miniatura del producto</label>
      <div className="flex items-center gap-4">
        <div className="relative w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {thumbnail.items.length > 0 ? (
            <>
            {thumbnail.items[0].file && <ImgSizeIndicator sizeInBytes={thumbnail.items[0].file.size} />}
            <Image src={(/^%2F/i.test(thumbnail.items[0].url) ? `${storagePath}${thumbnail.items[0].url}` : thumbnail.items[0].url)} alt="Miniatura" width={112} height={112} style={{ objectFit: "cover" }} />
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
                thumbnail.clear();
                thumbnail.addFiles(e.target.files)
              }}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export const ProdName = ( {defaultName}: {defaultName?: string} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Nombre</label>
      <input
        defaultValue={defaultName ?? ""}
        type="text"
        name="name"
        required
        className="mt-1 block w-full border rounded px-3 py-2"
        placeholder="Nombre del producto" />
    </div>
  )
}

export const ProdmainSKU = ( {defaultMainSku}: {defaultMainSku?: string;} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">SKU principal</label>
      <input
        defaultValue={defaultMainSku ?? ""}
        type="text"
        name="mainSku"
        required
        className="mt-1 block w-full border rounded px-3 py-2"
        placeholder="SKU principal" />
    </div>
  )
}

export const ProdDesc = ( {defaultDescription}: {defaultDescription?: string;} ) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium">Descripción</label>
      <textarea
        defaultValue={defaultDescription ?? ""}
        name="description"
        required
        className="mt-1 block w-full border rounded px-3 py-2 h-28"
        placeholder="Descripción del producto"
      />
    </div>
  )
}

export const ProdPrice = ( {defaultPrice}: {defaultPrice?: number | string;} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Precio</label>
      <input
        defaultValue={defaultPrice ?? 0}
        type="number"
        name="price"
        required
        placeholder="Precio"
        className="mt-1 block w-full border rounded px-3 py-2"
        min={0}
        step="0.01"
      />
    </div>
  )
}

export const ProdDiscount = ( {discount, discState}: {
  discount: {type: number, value: number} | undefined;
  discState: (discount: {type: number, value: number} | undefined) => void
} ) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium">Descuento (opcional)</label>
      <div className="flex flex-col md:flex-row gap-2 items-center mt-1">
        <select
          value={discount ? String(discount.type) : ""}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") discState(undefined);
            else discState({ type: Number(v), value: discount?.value ?? 0 });
          }}
          className="border rounded px-2 py-1 w-full md:w-1/2"
        >
          <option value="">Sin descuento</option>
          <option value="0">Porcentaje (%)</option>
          <option value="1">Fijo</option>
        </select>

        {discount !== undefined && (
          <input
            type="number"
            className="border rounded px-2 py-1 w-full md:w-1/4"
            value={discount.value}
            onChange={(e) => discState({ ...(discount ?? { type: 0, value: 0 }), value: Number(e.target.value) })}
            min={0}
            step="0.01"
          />
        )}
      </div>
    </div>
  )
}

export const ProdStatus = ( {defaultStatus}: {defaultStatus?: number} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Estado</label>
      <select className="mt-1 block w-full border rounded px-3 py-2"
        defaultValue={defaultStatus ?? ""}
        name="status"
        required>
        <option value="" disabled>Seleccione el estado</option>
        <option value={1}>Disponible</option>
        <option value={0}>Agotado</option>
        <option value={2}>Eliminado</option>
      </select>
    </div>
  )
}

export const ProdCategory = ( {category, subcategory, setCategory, setSubcategory}
  : {
    category: string;
    subcategory: string;
    setCategory: (cat: string) => void;
    setSubcategory: (subcat: string) => void;
  } ) => {
  const allCategories = getCategoriesWithSubcategories("es");
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-1">Categoría</label>
      <div className="flex gap-2 items-center mt-1">
        <select required name="category" className="border rounded px-2 py-1 w-2/5" onChange={(e) => {
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
          <select name="subcategory" className="border rounded px-2 py-1 w-2/5" onChange={(e) => setSubcategory(e.target.value)} value={subcategory}>
            <option value="" disabled>Seleccionar subcategoría</option>
            {allCategories[Number(category)].subcategories.map((subcat, j) => (
              <option key={`subcat-${j}`} value={j}>{capitalize(subcat.label)}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

export const ActionBtns = ({
  view,
  saving,
  router
}: {
  view: "new" | "edit";
  saving: boolean;
  router: AppRouterInstance;
}) => {
  const actionBtnText = view === "new" ? "Crear producto" : "Guardar cambios";
  return (
    <div className="mt-6 flex gap-3">
      <button onClick={(e) =>{
        e.preventDefault();
        router.back();
      }} className="px-4 py-2 rounded cursor-pointer bg-red-600">Cancelar</button>
      <button type="submit" disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 cursor-pointer">
        {saving ? "Guardando..." : actionBtnText}
      </button>
    </div>
  )
}

export const ProdImages = ({
  images
}: {
  images: useFileType
}) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDrop = (toIndex: number) => {
    if (dragIndex === null) return;
    if (toIndex < 0 || toIndex >= images.items.length) return;
    images.move(dragIndex, toIndex);
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">Imágenes del producto (máximo 10 imágenes)</label>
      <div className="flex flex-wrap gap-4 justify-center">
        {images.items.map((item, i) => {
          const src = item.url ? (/^%2F/i.test(item.url) ? `${storagePath}${item.url}` : item.url) : null;
          const isDropTarget = overIndex === i && dragIndex !== null && dragIndex !== i;
          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragEnter={() => setOverIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                if (overIndex !== i) setOverIndex(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(i);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={`size-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center transition ${isDropTarget ? "ring-2 ring-blue-500 opacity-85" : ""}`}
            >
              {src ? (
                <div className="relative w-full h-full">
                  {item.file && <ImgSizeIndicator sizeInBytes={item.file.size} />}
                  <Trash2Icon
                    className="absolute top-1 right-1 w-5 h-5 text-white bg-red-600 rounded-full p-0.5 cursor-pointer z-10"
                    onClick={() => {
                      Swal.fire({
                        title: "¿Eliminar imagen?",
                        text: "Esta acción no se puede deshacer.",
                        imageUrl: src,
                        imageWidth: 100,
                        imageHeight: 100,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar",
                      }).then((res) => {
                        if (res.isConfirmed) images.remove(i);
                      });
                    }} />
                  <Image className="hover:cursor-move" src={src} alt={`Imagen ${i + 1}`} width={96} height={96} style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className="text-xs text-gray-500">Sin imagen</div>
              )}
            </div>
          );
        })}
      </div>
      <label className="mt-5 px-3 py-2 border rounded cursor-pointer inline-block text-center text-sm">
        Agregar imágenes
        <input
          type="file"
          name="images"
          multiple
          accept="image/webp, image/jpeg, image/png, image/bmp"
          className="hidden"
          onChange={(e) => images.addFiles(e.target.files)} />
      </label>
    </div>
  )
}

export const ColorDropdown = ({
  value, variant, onChange
}: { value: string; variant: number; onChange: (index: number, patch: Partial<productProps["variants"][0]>) => void } ) => {
  const [open, setOpen] = useState(false);
  const selected = variantsColors.find((c) => c.name === value);

  return (
    <div className="relative mt-1">
      <button
        className="w-full border rounded px-2 py-1 flex items-center justify-between"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: selected?.name || "" }}
          />
          {selected?.label || "Sin color"}
        </div>
        <ChevronDown size={20} />
      </button>

      {open && (
        <div className="absolute z-10 w-full bg-white dark:bg-gray-600 border rounded mt-1 shadow">
          <div
            className="px-2 py-1 cursor-pointer flex items-center gap-2 hover:bg-gray-100 hover:dark:bg-gray-900"
            onClick={() => {
              onChange(variant, {color: ""});
              setOpen(false);
            }}
          >
            <span className="w-4 h-4 rounded-full bg-gray-200" />
            Sin color
          </div>

          {variantsColors.map((vc) => (
            <div
              key={vc.label}
              className="px-2 py-1 cursor-pointer flex items-center gap-2 hover:bg-gray-100 hover:dark:bg-gray-900"
              onClick={() => {
                onChange(variant, {color: vc.name});
                setOpen(false);
              }}
            >
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: vc.name }}
              />
              {vc.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const VariantThumbnail = ({index, variantPV}: {index: number; variantPV: File | string | null}) => {
  let varThumbUrl: string = "";
  if (typeof variantPV === "string") {
    varThumbUrl = /^%2F/i.test(variantPV) ? `${storagePath}${variantPV}` : variantPV;
  } else if (variantPV !== null && variantPV !== undefined) {
    varThumbUrl = URL.createObjectURL(variantPV as File);
  }
  return (
    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden rounded relative">
      {variantPV ? (
        <Image
          src={varThumbUrl}
          alt={`Variante ${index + 1}`}
          fill
          objectFit="cover"
          className="w-full h-full" />
      ) : (<div className="text-xs text-gray-500">Sin imagen</div>
      )}
    </div>
  )
}

export const ImgSizeIndicator = ({sizeInBytes}: {sizeInBytes:number}) => {
  const kbSize = sizeInBytes / 1024;
  let elSize = "";
  let textColor = "text-green-500";
  if (kbSize < 1024) {
    elSize = `${kbSize.toFixed(2)} KB`;
    if (kbSize > 500) textColor = "text-yellow-500";
    if (kbSize > 1024) textColor = "text-red-500";
  } else {
    const mbSize = kbSize / 1024;
    elSize = `${mbSize.toFixed(2)} MB`;
    textColor = "text-red-500";
  }
  return <p className={`absolute top-1 left-1 font-bold text-xs bg-gray-500/75 z-99 ${textColor}`}>{elSize}</p>
}

export const ProdVariant = ({
  view,
  variants,
  variantFiles,
  variantPreviews,
  addVariant,
  removeVariant,
  variantChange,
  variantFileChange,
  addStock,
  stockChange,
  removeStock
}: {
  view: "new" | "edit";
  variants: productProps["variants"];
  variantFiles?: (File | null)[];
  variantPreviews: (File | string | null)[];
  addVariant: () => void;
  removeVariant: (index: number) => void;
  variantChange: (index: number, patch: Partial<Variant>) => void;
  variantFileChange: (index: number, file: File | null) => void;
  addStock: (vIndex: number) => void;
  stockChange: (vIndex: number, sIndex: number, patch: Partial<StockItem>) => void;
  removeStock: (vIndex: number, sIndex: number) => void
}) => {
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Variantes</h2>
        <div className="flex gap-2">
          <button type="button" onClick={addVariant} className="inline-flex items-center gap-2 px-3 py-1 border rounded">
            <Plus size={16} /> Añadir variante
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
                <button type="button" onClick={() => removeVariant(vi)} className="px-2 py-1 border rounded text-sm">Eliminar</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {variants.length > 1 && (
                <div>
                  <label className="block text-xs">Color</label>
                  <ColorDropdown value={variants[vi].color} variant={vi} onChange={variantChange} />
                </div>)}
              <div>
                <label className="block text-xs">SKU</label>
                <input className="mt-1 block w-full border rounded px-2 py-1" value={v.sku} onChange={(e) => variantChange(vi, { sku: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs">Miniatura variante</label>
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden rounded relative">
                    {variantFiles && variantFiles[vi] && <ImgSizeIndicator sizeInBytes={variantFiles[vi]?.size ?? 0} />}
                    <VariantThumbnail index={vi} variantPV={variantPreviews[vi]} />
                  </div>
                  <div className="flex flex-col">
                    <label className="px-2 py-1 border rounded cursor-pointer text-sm">
                      Cambiar imagen
                      <input
                        type="file"
                        accept="image/webp, image/jpeg, image/png, image/bmp"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          variantFileChange(vi, f);
                        }}
                      />
                    </label>
                    {view === "edit" && <button
                      type="button"
                      className="mt-2 px-2 py-1 border rounded text-sm"
                      onClick={() => {
                        // quitar file seleccionado y volver a imagen original
                        variantFileChange(vi, null);
                      }}
                    >
                      Deshacer cambio
                    </button>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Tallas</div>
                <button type="button" onClick={() => addStock(vi)} className="inline-flex items-center gap-2 px-2 py-1 border rounded text-sm">
                  <Plus size={16} /> Añadir talla
                </button>
              </div>

              <div className="mt-2 space-y-2">
                {v.stock.map((st, si) => (
                  <div key={si} className="flex gap-2 items-center">
                    <input className="border rounded px-2 py-1 w-1/2" value={st.name} onChange={(e) => stockChange(vi, si, { name: e.target.value })} />
                    <input type="number" className="border rounded px-2 py-1 w-1/2" value={st.quantity} onChange={(e) => stockChange(vi, si, { quantity: Number(e.target.value) })} />
                    <button type="button" onClick={() => removeStock(vi, si)} className="px-2 py-1 border rounded text-sm">Eliminar</button>
                  </div>
                ))}
                {v.stock.length === 0 && <div className="text-xs text-gray-500">No hay tallas</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
