"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import { useDB } from "@/app/admin/components/context/dbContext";
import { productProps } from "@/app/utils/types";

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
  const [price, setPrice] = useState<number | "">("");
  const [status, setStatus] = useState<number>(1);
  const [discount, setDiscount] = useState<Discount | undefined>(undefined);
  const [variants, setVariants] = useState<Variant[]>([]);

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

  // Debug logs controlados (evitar acceder a indices fijos sin comprobar longitud)
  useEffect(() => {
    // logs de depuración útiles y seguros
    // console.log({ resolvedId, productsLength: products?.length ?? 0 });
  }, [resolvedId, products]);

  useEffect(() => {
    // esperar hasta tener id y products
    if (!resolvedId) {
      setLoading(false);
      return;
    }
    if (!products || products.length === 0) {
      // si products aún no cargó, mantener loading hasta que cambie
      setLoading(true);
      return;
    }

    const findProduct = () => {
      // búsqueda tolerante: compara strings, elimina espacios
      const idClean = String(resolvedId).trim();
      const found = products.find((item) => {
        // item.id puede venir como number o string o incluso objeto; manejarlo
        const iid = item?.id ?? item?.mainSku ?? "";
        return String(iid).trim() === idClean || iid == idClean; // second check for loose match
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
        setVariants(Array.isArray(found.variants) ? found.variants : []);
        setLoading(false);
      } else {
        // producto no encontrado (pero products está cargado)
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

  const handleAddVariant = () => {
    setVariants((s) => [...s, { color: "", sku: "", image: "", stock: [] }]);
  };
  const handleRemoveVariant = (index: number) => {
    setVariants((s) => s.filter((_, i) => i !== index));
  };
  const handleVariantChange = (index: number, patch: Partial<Variant>) => {
    setVariants((s) => s.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  };

  const handleAddStock = (vIndex: number) => {
    setVariants((s) => s.map((v, i) => (i === vIndex ? { ...v, stock: [...v.stock, { name: "default", quantity: 0 }] } : v)));
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

  const handleSave = async () => {
    if (!validate() || !resolvedId) return;

    const payload: Partial<productProps> = {
      name: name.trim(),
      description: description,
      mainSku: mainSku.trim(),
      price: Number(price),
      status: Number(status),
      variants: variants,
      discount: discount,
    };

    try {
      setSaving(true);
      Swal.fire({ title: "Guardando...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const res = await fetch(`/api/admin/products/${encodeURIComponent(String(resolvedId))}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      Swal.close();
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
        throw new Error(err.message || "Error al guardar");
      }
      //const result = await res.json();
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">SKU principal</label>
          <input
            className="mt-1 block w-full border rounded px-3 py-2"
            value={mainSku}
            onChange={(e) => setMainSku(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            className="mt-1 block w-full border rounded px-3 py-2 h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
          <label className="block text-sm font-medium">Descuento (opcional)</label>
          <div className="flex gap-2 items-center mt-1">
            <select
              value={discount ? String(discount.type) : ""
              }
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
              <button type="button" onClick={handleAddVariant} className="px-3 py-1 border rounded">Añadir variante</button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {variants.length === 0 && <div className="text-sm text-gray-500">Sin variantes</div>}
            {variants.map((v, vi) => (
              <div key={vi} className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Variante {vi + 1}</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleRemoveVariant(vi)} className="px-2 py-1 border rounded text-sm">Eliminar</button>
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
                    <label className="block text-xs">Imagen (URL)</label>
                    <input className="mt-1 block w-full border rounded px-2 py-1" value={v.image} onChange={(e) => handleVariantChange(vi, { image: e.target.value })} />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Tallas</div>
                    <button type="button" onClick={() => handleAddStock(vi)} className="px-2 py-1 border rounded text-sm">Añadir talla</button>
                  </div>

                  <div className="mt-2 space-y-2">
                    {v.stock.map((st, si) => (
                      <div key={si} className="flex gap-2 items-center">
                        <input className="border rounded px-2 py-1 w-1/2" value={st.name} onChange={(e) => handleStockChange(vi, si, { name: e.target.value })} />
                        <input type="number" className="border rounded px-2 py-1 w-1/2" value={st.quantity} onChange={(e) => handleStockChange(vi, si, { quantity: Number(e.target.value) })} />
                        <button type="button" onClick={() => handleRemoveStock(vi, si)} className="px-2 py-1 border rounded text-sm">Eliminar</button>
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
        <button onClick={() => router.back()} className="px-4 py-2 border rounded cursor-pointer">Cancelar</button>
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer">{saving ? "Guardando..." : "Guardar"}</button>
      </div>
    </div>
  );
}
