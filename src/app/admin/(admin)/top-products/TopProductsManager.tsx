"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useDB } from "@/app/admin/components/context/dbContext";
import { replaceTopProductsAction } from "@/app/actions/products";
import { productProps } from "@/app/utils/types";

function normalizeId(id: string | number) {
  return String(id);
}

export default function TopProductsManager() {
  const { products, topProducts, loading, refreshProducts, canEditAll } = useDB();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const initializedRef = useRef(false);

  const availableProducts = useMemo(
    () => products.filter((p) => p.status === 1 && p.isDeleted !== true),
    [products]
  );

  const productsById = useMemo(() => {
    return products.reduce<Record<string, productProps>>((acc, product) => {
      acc[normalizeId(product.id)] = product;
      return acc;
    }, {});
  }, [products]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!topProducts.length) return;

    const fromDb = topProducts
      .map((item) => normalizeId(item.productId))
      .filter((id, index, arr) => id.length > 0 && arr.indexOf(id) === index)
      .slice(0, 6);

    setSelectedIds(fromDb);
    initializedRef.current = true;
  }, [topProducts]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return availableProducts
      .filter((product) => !selectedSet.has(normalizeId(product.id)))
      .filter((product) => {
        if (!query) return true;
        return (
          product.name.toLowerCase().includes(query) ||
          String(product.mainSku ?? "").toLowerCase().includes(query)
        );
      });
  }, [availableProducts, search, selectedSet]);

  const selectedProducts = useMemo(() => {
    return selectedIds.map((id) => productsById[id] ?? null);
  }, [selectedIds, productsById]);

  const addProduct = (id: string | number) => {
    const normalized = normalizeId(id);
    setSelectedIds((prev) => {
      if (prev.includes(normalized) || prev.length >= 6) return prev;
      return [...prev, normalized];
    });
  };

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    setSelectedIds((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const handleSave = async () => {
    if (!canEditAll) {
      await Swal.fire("No autorizado", "No tienes permisos para editar productos top.", "warning");
      return;
    }

    if (selectedIds.length !== 6) {
      await Swal.fire("Selección incompleta", "Debes seleccionar exactamente 6 productos.", "info");
      return;
    }

    if (new Set(selectedIds).size !== selectedIds.length) {
      await Swal.fire("Duplicados", "No se permiten productos repetidos.", "error");
      return;
    }

    setSaving(true);
    Swal.fire({
      title: "Guardando productos top...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await replaceTopProductsAction(selectedIds);
      Swal.close();

      if (!res.success) {
        await Swal.fire("Error", res.error ?? "No se pudo guardar la lista top.", "error");
        return;
      }

      await refreshProducts();
      await Swal.fire("Guardado", res.message ?? "Productos top actualizados.", "success");
    } catch (error: any) {
      Swal.close();
      await Swal.fire("Error", error?.message ?? "Error interno al guardar productos top.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <section className="p-6">Cargando productos top...</section>;
  }

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Productos top</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Selecciona y ordena exactamente 6 productos disponibles para el carrusel principal.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o SKU"
          className="w-full md:w-96 border rounded p-2"
        />
        <div className="text-sm">
          Seleccionados: <strong>{selectedIds.length}/6</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <article className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Productos disponibles</h2>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No hay resultados disponibles.</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={String(product.id)} className="border rounded p-2 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="w-full justify-center flex mb-1">
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs opacity-80 truncate">
                      SKU: {product.mainSku} | ID: {String(product.id)}
                    </p>
                  </div>
                  {canEditAll && (
                    <button
                      type="button"
                      onClick={() => addProduct(product.id)}
                      disabled={selectedIds.length >= 6 || saving || !canEditAll}
                      className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded bg-emerald-600 text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Plus size={16} /> Agregar
                    </button>)}
                </div>
              ))
            )}
          </div>
        </article>

        <article className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-3">Seleccionados (orden actual)</h2>
          <div className="space-y-2 max-h-[500px] overflow-auto">
            {selectedIds.length === 0 ? (
              <p className="text-sm text-gray-500">Aun no has seleccionado productos top.</p>
            ) : (
              selectedProducts.map((product, index) => {
                const id = selectedIds[index];
                return (
                  <div key={`${id}_${index}`} className="border rounded p-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="w-full justify-center flex mb-1">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <p className="font-medium truncate">
                        #{index + 1} {product?.name ?? `(Producto no encontrado: ${id})`}
                      </p>
                      <p className="text-xs opacity-80 truncate">
                        SKU: {product?.mainSku ?? "-"} | ID: {id}
                      </p>
                    </div>
                    {canEditAll && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0 || saving || !canEditAll}
                          className="p-1 rounded border disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                          aria-label={`Mover producto ${index + 1} hacia arriba`}
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(index, "down")}
                          disabled={index === selectedIds.length - 1 || saving || !canEditAll}
                          className="p-1 rounded border disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                          aria-label={`Mover producto ${index + 1} hacia abajo`}
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(id)}
                          disabled={saving || !canEditAll}
                          className="p-1 rounded border text-rose-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                          aria-label={`Quitar producto ${index + 1}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>)}
                  </div>
                );
              })
            )}
          </div>
        </article>
      </div>

      <div className="flex justify-end">
        {canEditAll && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || selectedIds.length !== 6 || !canEditAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {saving ? "Guardando..." : "Guardar productos top"}
          </button>
        )}
      </div>
    </section>
  );
}

