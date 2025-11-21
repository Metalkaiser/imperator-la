"use client"

import { useState } from "react";
import { capitalize } from "@/app/utils/functions";
import { variantsColors } from "@/app/utils/utils";
import { getCategoriesWithSubcategories } from "@/config/websiteConfig/categoryConfig";
import type { productProps } from "@/app/utils/types";
import { Plus, Trash2Icon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { storagePath } from "@/app/utils/utils";

type StockItem = { name: string; quantity: number };
type Variant = { color: string; sku: string; image: string; stock: StockItem[] };

export const ProdName = ( {name, nameState}: {name: string; nameState: (name: string) => void} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Nombre</label>
      <input
        className="mt-1 block w-full border rounded px-3 py-2"
        value={name}
        placeholder="Nombre del producto"
        onChange={(e) => nameState(e.target.value)} />
    </div>
  )
}

export const ProdmainSKU = ( {mainSku, skuState}: {mainSku: string; skuState: (mainSku: string) => void} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">SKU principal</label>
      <input
        className="mt-1 block w-full border rounded px-3 py-2"
        value={mainSku}
        placeholder="SKU principal"
        onChange={(e) => skuState(e.target.value)} />
    </div>
  )
}

export const ProdDesc = ( {description, descState}: {description: string; descState: (description: string) => void} ) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium">Descripción</label>
      <textarea
        className="mt-1 block w-full border rounded px-3 py-2 h-28"
        value={description}
        placeholder="Descripción del producto"
        onChange={(e) => descState(e.target.value)}
      />
    </div>
  )
}

export const ProdPrice = ( {price, priceState}: {price: number | string; priceState: (price: number | string) => void} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Precio</label>
      <input
        type="number"
        className="mt-1 block w-full border rounded px-3 py-2"
        value={price}
        onChange={(e) => priceState(e.target.value === "" ? "" : Number(e.target.value))}
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

export const ProdStatus = ( {status, statusState}: {status: number; statusState: (status: number) => void} ) => {
  return (
    <div>
      <label className="block text-sm font-medium">Estado</label>
      <select value={String(status)} onChange={(e) => statusState(Number(e.target.value))} className="mt-1 block w-full border rounded px-3 py-2">
        <option value={1}>Disponible</option>
        <option value={0}>Agotado</option>
        <option value={2}>Eliminado</option>
      </select>
    </div>
  )
}

export const ProdCategory = ( {category, subcategory, setCategory, setSubcategory}
  : {
    category: number | string;
    subcategory: number;
    setCategory: (cat: number) => void;
    setSubcategory: (subcat: number | string) => void;
  } ) => {
  const allCategories = getCategoriesWithSubcategories("es");
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-1">Categoría</label>
      <div className="flex gap-2 items-center mt-1">
        <select className="border rounded px-2 py-1 w-2/5" onChange={(e) => {
            setSubcategory("");
            setCategory(Number(e.target.value))}
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
  )
}

export const ActionBtns = ({
  view,
  saving,
  router,
  handleSave,
}: {
  view: "new" | "edit";
  saving: boolean;
  router: AppRouterInstance;
  handleSave: () => void;
}) => {
  const actionBtnText = view === "new" ? "Crear producto" : "Guardar cambios";
  const savingText = view === "new" ? "Creando..." : "Guardando...";
  return (
    <div className="mt-6 flex gap-3">
      <button onClick={() => router.back()} className="px-4 py-2 rounded cursor-pointer bg-red-600">Cancelar</button>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 cursor-pointer">{saving ? savingText : actionBtnText}</button>
    </div>
  )
}

export const ProdImages = ({
  previews, deleteImage, addImages
}: {
  previews: string[]; deleteImage: (index: number) => void; addImages: (files: FileList | null) => void
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">Imágenes del producto (puedes seleccionar varias)</label>
      <div className="flex flex-wrap gap-4 justify-center">
        {previews.map((imgSrc, i) => (
          <div key={i} className="size-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            {imgSrc ? (
              <div className="relative w-full h-full">
                <Trash2Icon
                  className="absolute top-1 right-1 w-5 h-5 text-white bg-red-600 rounded-full p-0.5 cursor-pointer z-10"
                  onClick={() => deleteImage(i)}></Trash2Icon>
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
          multiple
          accept="image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files ?? null;
            addImages(f);
          }} />
      </label>
    </div>
  )
}

export const ProdThumbnail = ({
  view,
  thumbnail,
  setThumbnail
}: {
  view: "new" | "edit";
  thumbnail: string | null;
  setThumbnail: (file: File | null) => void;
}) => {
  const imgBtn = view === "new" ? "Seleccionar miniatura" : "Cambiar miniatura";
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">Miniatura del producto</label>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {thumbnail ? (
            <Image src={/^%2F/i.test(thumbnail) ? `${storagePath}${thumbnail}` : thumbnail} alt="Miniatura" width={112} height={112} style={{ objectFit: "cover" }} />
          ) : (
            <div className="text-xs text-gray-500">Sin miniatura</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="px-3 py-2 border rounded cursor-pointer inline-block text-center text-sm">
            {imgBtn}
            <input
              type="file"
              accept="image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setThumbnail(f);
              }}
            />
          </label>
          {view === "edit" && (
            <button
              type="button"
              className="px-3 py-2 border rounded text-sm"
              onClick={() => setThumbnail(null)}
            >
              Deshacer cambio
            </button>
          )}
        </div>
      </div>
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

export default function ProdVariant({
  view,
  variants,
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
  variantPreviews: (File | string | null)[];
  addVariant: () => void;
  removeVariant: (index: number) => void;
  variantChange: (index: number, patch: Partial<Variant>) => void;
  variantFileChange: (index: number, file: File | null) => void;
  addStock: (vIndex: number) => void;
  stockChange: (vIndex: number, sIndex: number, patch: Partial<StockItem>) => void;
  removeStock: (vIndex: number, sIndex: number) => void
}) {
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
                    <VariantThumbnail index={vi} variantPV={variantPreviews[vi]} />
                  </div>
                  <div className="flex flex-col">
                    <label className="px-2 py-1 border rounded cursor-pointer text-sm">
                      Cambiar imagen
                      <input
                        type="file"
                        accept="image/webp"
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
