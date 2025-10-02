"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { storagePath } from "@/app/utils/utils";
import { allCategories } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import { resolveCategoryName } from "@/config/websiteConfig/categoryConfig";
import Swal from "sweetalert2";
import { Pen, Trash2, Plus } from "lucide-react";
import { useDB } from "../../components/context/dbContext";
import { capitalize } from "@/app/utils/functions";
import { pdfIcon, csvIcon, xlsIcon } from "@/app/utils/svgItems";

/**
 * Tabla de productos con:
 * - selección por checkbox (página actual)
 * - filtro / búsqueda / paginación
 * - acciones por fila: editar, borrar (según canEditAll)
 * - acciones masivas: borrar seleccionados
 * - export: CSV (Excel-friendly) y "PDF" via ventana de impresión
 *
 * Observaciones de implementación:
 * - Eliminación llama a DELETE /api/admin/products/:id (tú debes implementar ese endpoint).
 * - Las acciones se validan en servidor (no confiar en canEditAll del cliente).
 */

function formatPrice(price: number) {
  // asume USD; ajusta si usas otra moneda
  const nf = new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  return nf.format(price);
}

function calcDiscountedPrice(price: number, discount?: { type: number; value: number } | undefined) {
  if (!discount) return price;
  if (discount.type === 0) {
    // porcentaje
    return Math.max(0, price * (1 - discount.value / 100));
  } else {
    // fijo
    return Math.max(0, price - discount.value);
  }
}

export default function Table() {
  const { products = [], loading = false, canEditAll = false, refreshProducts } = useDB();
  const router = useRouter();

  // filtros / UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | "all">("all");
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [bulkEdit, setBulkEdit] = useState<string>("");

  // selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // derivadas
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      // filtro por status
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      // búsqueda: nombre, sku, variants.sku
      if (!q) return true;
      const inName = p.name?.toLowerCase().includes(q);
      const inMainSku = String(p.mainSku ?? "").toLowerCase().includes(q);
      const inVariants = Array.isArray(p.variants)
        ? p.variants.some((v) => String(v.sku ?? "").toLowerCase().includes(q))
        : false;
      return inName || inMainSku || inVariants;
    });
  }, [products, search, statusFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageClamped = Math.min(Math.max(1, page), totalPages);

  const paginated = useMemo(() => {
    const start = (pageClamped - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, pageClamped, perPage]);

  useEffect(() => {
    // cuando cambie la página o perPage, limpiar selección de página anterior
    setSelectedIds(new Set());
  }, [pageClamped, perPage]);

  // helpers selección
  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev) => {
      const s = new Set(prev);
      const key = String(id);
      if (s.has(key)) s.delete(key);
      else s.add(key);
      return s;
    });
  };

  const selectAllOnPage = () => {
    const s = new Set(selectedIds);
    paginated.forEach((p) => s.add(String(p.id)));
    setSelectedIds(s);
  };
  const clearSelection = () => setSelectedIds(new Set());

  // acciones
  const handleEdit = (id: string | number) => {
    // navega a ruta de edición; ajusta ruta según tu app
    router.push(`/admin/inventory/edit/${id}`);
  };

  const handleBulkEdit = async (action: string) => {
    setBulkEdit(action);
    if (!canEditAll) {
      Swal.fire("No autorizado", "No tienes permisos para editar productos.", "warning");
      return;
    }
    if (selectedIds.size === 0) {
      Swal.fire("Nada seleccionado", "Selecciona productos para editar.", "info");
      return;
    }

    // Confirmación inicial
    const confirm = await Swal.fire({
      title: "Editar productos seleccionados",
      text:
        action === "price"
          ? `Vas a cambiar el precio de ${selectedIds.size} producto(s). ¿Continuar?`
          : `Vas a actualizar el descuento de ${selectedIds.size} producto(s). ¿Continuar?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;

    // Pedimos los datos según acción
    let payloadPartial: Record<string, any> | null = null;

    if (action === "price") {
      const { value: newPrice } = await Swal.fire({
        title: "Nuevo precio",
        input: "text",
        inputLabel: "Introduce el nuevo precio (ej: 19.99)",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (val) => {
          if (!val) return "Debes introducir un precio";
          const n = Number(String(val).replace(",", "."));
          if (Number.isNaN(n) || !isFinite(n) || n < 0) return "Precio inválido";
          return null;
        },
      });
      if (newPrice === undefined) return; // cancelado
      const normalized = Number(String(newPrice).replace(",", "."));
      payloadPartial = { price: normalized };
    } else if (action === "discount") {
      // pedir tipo y valor
      const { value: discountType } = await Swal.fire({
        title: "Tipo de descuento",
        input: "select",
        inputOptions: {
          0: "Porcentaje (%)",
          1: "Fijo (monto)",
        },
        inputPlaceholder: "Selecciona tipo",
        showCancelButton: true,
      });
      if (discountType === undefined) return;

      const { value: discountValue } = await Swal.fire({
        title: "Valor del descuento",
        input: "text",
        inputLabel: discountType === "0" ? "Introduce porcentaje (ej: 10 para 10%)" : "Introduce monto fijo (ej: 5.00)",
        inputValidator: (val) => {
          if (!val) return "Debes introducir un valor";
          const n = Number(String(val).replace(",", "."));
          if (Number.isNaN(n) || !isFinite(n) || n < 0) return "Valor inválido";
          if (discountType === "0" && n > 100) return "Porcentaje no puede ser mayor a 100";
          return null;
        },
        showCancelButton: true,
      });
      if (discountValue === undefined) return;

      const normalizedVal = Number(String(discountValue).replace(",", "."));
      payloadPartial = { discount: { type: Number(discountType), value: normalizedVal } };
    } else if (action === "status") {
      // pedir nuevo estado
      const { value: statusChoice } = await Swal.fire({
        title: "Selecciona nuevo estado",
        input: "select",
        inputOptions: {
          "1": "Disponible",
          "0": "Agotado",
          "2": "Eliminar (marcar eliminado)",
          "restore": "Restaurar",
        },
        inputPlaceholder: "Selecciona estado",
        showCancelButton: true,
      });

      if (statusChoice === undefined) return; // cancelado

      // si eligió 'Eliminar', pedir confirmación extra
      if (statusChoice === "2") {
        const confirmDelete = await Swal.fire({
          title: "Confirmar eliminación",
          text: `Vas a marcar ${selectedIds.size} producto(s) como eliminados. Esta acción marcará isDeleted = true. ¿Continuar?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        });
        if (!confirmDelete.isConfirmed) return;
        payloadPartial = { status: 2, isDeleted: true };
      } else if (statusChoice === "restore") {
        // Restaurar: quitar isDeleted y poner status disponible (1)
        payloadPartial = { status: 1, isDeleted: false };
      } else {
        // Disponible (1) o Agotado (0)
        const s = Number(statusChoice);
        if (!Number.isFinite(s) || (s !== 0 && s !== 1)) {
          Swal.fire("Valor inválido", "Estado seleccionado inválido.", "error");
          return;
        }
        payloadPartial = { status: s, isDeleted: false };
      }
    } else {
      Swal.fire("Acción no soportada", "La acción seleccionada no está implementada.", "error");
      return;
    }

    // Mostramos loading
    Swal.fire({
      title: "Actualizando productos",
      text: "Se están aplicando los cambios. Esto puede tardar unos instantes...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Ejecutar llamadas (por cada id, hacemos PATCH /api/admin/products/:id con payloadPartial)
    const ids = Array.from(selectedIds);
    const promises = ids.map((id) =>
      fetch(`/api/admin/products/${id}`, {  //encodeURIComponent(String(id))
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadPartial),
      })
    );

    const results = await Promise.allSettled(promises);

    // Analizar resultados
    let successCount = 0;
    const failedItems: { id: string | number; reason?: any; status?: number }[] = [];

    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const id = ids[i];
      if (r.status === "fulfilled") {
        const res = r.value as Response;
        if (res.ok) {
          const test = await res.json();
          console.log(test);
          successCount++;
        } else {
          let reasonMsg = undefined;
          try {
            const json = await res.json();
            reasonMsg = json?.message ?? JSON.stringify(json);
          } catch {
            reasonMsg = `HTTP ${res.status}`;
          }
          failedItems.push({ id, reason: reasonMsg, status: res.status });
        }
      } else {
        failedItems.push({ id, reason: r.reason });
      }
    }

    Swal.close();

    // Mostrar resumen
    if (failedItems.length === 0) {
      await Swal.fire("Actualizado", `${successCount} producto(s) actualizados correctamente.`, "success");
      setBulkEdit("");
      clearSelection();
      await refreshProducts();
    } else {
      // mostrar resumen y log de fallos (si hay muchos, sólo mostrar primeros 10)
      const firstFailures = failedItems.slice(0, 10).map((f) => `<li>${String(f.id)} — ${String(f.reason)}</li>`).join("");
      const more = failedItems.length > 10 ? `<p>...y ${failedItems.length - 10} más</p>` : "";
      await Swal.fire({
        title: "Resultados parciales",
        html: `<p>${successCount} actualizados correctamente. ${failedItems.length} fallaron:</p><ul style="text-align:left;">${firstFailures}</ul>${more}`,
        icon: "warning",
        width: "600px",
      });
      // intentar refrescar los que fallaron o refrescar todo
      await refreshProducts();
      // no limpiamos selección para que el usuario pueda reintentar (opcional)
    }
  };


  const handleDelete = async (id: string | number, name: string) => {
    if (!canEditAll) {
      Swal.fire("No autorizado", "No tienes permisos para eliminar productos.", "warning");
      return;
    }

    console.log(id);

    const confirmed = await Swal.fire({
      title: "Eliminar producto",
      text: `¿Deseas eliminar ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmed.isConfirmed) return;

    Swal.fire({
      title: "Actualizando producto",
      text: "Se están aplicando los cambios. Esto puede tardar unos instantes...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const payloadPartial = { status: 2, isDeleted: true };
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadPartial),
      });

      Swal.close();

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Error" }));
        throw new Error(err.message || "Error al eliminar");
      }
      await Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
      await refreshProducts();
    } catch (err: any) {
      console.error(err);
      Swal.fire("Error", err.message || "No se pudo eliminar el producto", "error");
    }
  };

  // export CSV (Excel friendly)
  const exportCSV = () => {
    if (!paginated || paginated.length === 0) {
      Swal.fire("Sin datos", "No hay productos para exportar.", "info");
      return;
    }
    console.log(paginated.length);
    const rows = paginated.map((p) => {
      const price = p.price ?? 0;
      const discounted = calcDiscountedPrice(price, p.discount);
      return {
        id: p.id,
        name: p.name,
        sku: p.mainSku,
        price: price,
        discountedPrice: discounted,
        category: p.category,
        status: p.status,
      };
    });

    // CSV header
    const header = ["id", "name", "sku", "price", "discountedPrice", "category", "status"];
    const csv = [header.join(",")]
      .concat(rows.map((r) => header.map((h) => JSON.stringify((r as any)[h] ?? "")).join(",")))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // export Excel (simple trick: MS Excel reads CSV with .xls extension in some setups)
  const exportExcel = () => {
    if (!paginated || paginated.length === 0) {
      Swal.fire("Sin datos", "No hay productos para exportar.", "info");
      return;
    }
    // reuse CSV generation
    const header = ["id", "name", "sku", "price", "discountedPrice", "category", "status"];
    const rows = paginated.map((p) => {
      const price = p.price ?? 0;
      const discounted = calcDiscountedPrice(price, p.discount);
      return [p.id, p.name, p.mainSku, price, discounted, p.category, p.status];
    });

    const csv = [header.join("\t")]
      .concat(rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join("\t")))
      .join("\n");

    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export_${new Date().toISOString()}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF via window.print: abrimos una nueva ventana con la tabla simplificada y llamamos print().
  // exportPDF usando iframe (recomendado)
const exportPDF = () => {
  if (!paginated || paginated.length === 0) {
    Swal.fire("Sin datos", "No hay productos para exportar.", "info");
    return;
  }

  const esc = (v: any) =>
    String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  console.log(paginated.length);
  const rowsHtml = paginated
    .map((p) => {
      const price = p.price ?? 0;
      const discounted = calcDiscountedPrice(price, p.discount);
      return `<tr>
        <td>${esc(p.id)}</td>
        <td>${esc(p.name)}</td>
        <td>${esc(p.mainSku)}</td>
        <td>${esc(price)}</td>
        <td>${esc(discounted)}</td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Productos</title>
      <style>
        @media print { @page { margin: 12mm; } }
        body { font-family: Arial, Helvetica, sans-serif; margin: 10px; color:#111; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { padding: 6px; border: 1px solid #ddd; text-align: left; }
        th { background: #f2f2f2; }
      </style>
    </head>
    <body>
      <h2>Export - Productos</h2>
      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>SKU</th><th>Precio</th><th>Precio oferta</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </body>
  </html>`;

  try {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.setAttribute("aria-hidden", "true");

    // Prefer srcdoc
    if ("srcdoc" in iframe) {
      (iframe as HTMLIFrameElement).srcdoc = html;
      document.body.appendChild(iframe);

      iframe.addEventListener(
        "load",
        () => {
          const win = (iframe as HTMLIFrameElement).contentWindow;
          if (!win) {
            Swal.fire("Error", "No se pudo acceder al iframe para imprimir.", "error");
            document.body.removeChild(iframe);
            return;
          }
          // Asegurar renderizado antes de print
          win.requestAnimationFrame(() => {
            try {
              win.focus?.();
              win.print();
            } catch (err) {
              console.error(err);
              Swal.fire("Error", "No se pudo iniciar la impresión. Intente otro navegador.", "error");
            } finally {
              setTimeout(() => document.body.removeChild(iframe), 500);
            }
          });
        },
        { once: true }
      );
    } else {
      // Fallback
      document.body.appendChild(iframe);
      const doc = (iframe as HTMLIFrameElement).contentWindow?.document;
      if (!doc) {
        document.body.removeChild(iframe);
        Swal.fire("Error", "No se pudo crear el iframe para imprimir.", "error");
        return;
      }
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          (iframe as HTMLIFrameElement).contentWindow?.focus();
          (iframe as HTMLIFrameElement).contentWindow?.print();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo iniciar la impresión. Intente otro navegador.", "error");
        } finally {
          setTimeout(() => document.body.removeChild(iframe), 500);
        }
      }, 300);
    }
  } catch (err) {
    console.error("exportPDF error:", err);
    Swal.fire("Error", "Ocurrió un error al generar el PDF.", "error");
  }
};


  // UI render
  return (
    <div className="flex flex-col gap-4">
      {/* toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md::gap-3">
        {canEditAll && (
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <button
              onClick={() => router.push("/admin/inventory/new")}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              <Plus size={16} /> Nuevo producto
            </button>

            <select 
              className="px-3 py-1 border rounded" 
              onChange={(e) => handleBulkEdit(e.target.value)}
              value={bulkEdit}
              disabled={!selectedIds.size}>
              <option value="" disabled>Editar seleccionados</option>
              <option value="price">Cambiar precios</option>
              <option value="discount">Cambiar descuentos</option>
              <option value="status">Cambiar estados</option>
            </select>
          </div>
        )}
        

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1 border rounded md:w-64"
          />

          <select
            value={String(statusFilter)}
            onChange={(e) => {
              const v = e.target.value;
              setStatusFilter(v === "all" ? "all" : Number(v));
              setPage(1);
            }}
            className="px-3 py-1 border rounded"
          >
            <option value="all">Todos</option>
            <option value="1">Disponible</option>
            <option value="0">Agotado</option>
            <option value="2">Eliminado</option>
          </select>

          <select
            value={String(perPage)}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-1 border rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value={products.length.toString()}>Todos</option>
          </select>

          <div className="flex items-center justify-center gap-2">
            <button onClick={exportCSV} title="Exportar CSV" className="px-2 py-1 border rounded">
              {csvIcon}
            </button>
            <button onClick={exportExcel} title="Exportar Excel" className="px-2 py-1 border rounded">
              {xlsIcon}
            </button>
            <button onClick={exportPDF} title="Exportar PDF" className="px-2 py-1 border rounded">
              {pdfIcon}
            </button>
          </div>
        </div>
      </div>

      {/* tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={paginated.every((p) => selectedIds.has(String(p.id))) && paginated.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) selectAllOnPage();
                    else {
                      // quitar ids de la página actual
                      setSelectedIds((prev) => {
                        const s = new Set(prev);
                        paginated.forEach((p) => s.delete(String(p.id)));
                        return s;
                      });
                    }
                  }}
                />
              </th>
              <th className="p-2">Imagen</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">SKU</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Estado</th>
              {canEditAll && (<th className="p-2">Acciones</th>)}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-sm text-gray-500">
                  {loading ? "Cargando..." : "No hay productos"}
                </td>
              </tr>
            ) : (
              paginated.map((p) => {
                const discounted = calcDiscountedPrice(p.price ?? 0, p.discount);
                const hasDiscount = (p.discount !== undefined && discounted < (p.price ?? 0));
                const catName = resolveCategoryName("es", allCategories[p.category])?.categoryLabel
                const statusCol = p.isDeleted ? { text:"Eliminado", classText: "red" } : 
                  p.status ? { text:"Disponible", classText: "green" } : { text:"Agotado", classText: "orange" };
                return (
                  <tr key={String(p.id)} className="border-t">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(String(p.id))}
                        onChange={() => toggleSelect(p.id)}
                      />
                    </td>
                    <td className="p-2 w-20 h-20">
                      <div className="w-12 h-12 relative rounded overflow-hidden">
                        {p.thumbnail ? (
                          // use Image if thumbnail is an URL; else show placeholder
                          // next/image requires known domains in next.config
                          // fallback: img tag if next/image gives issues
                          // eslint-disable-next-line @next/next/no-img-element
                          <Image src={storagePath + p.thumbnail} alt={p.name} width={0} height={0} className="object-cover w-full h-full"></Image>
                        ) : (
                          <div className="bg-gray-100 dark:bg-gray-800 w-full h-full flex items-center justify-center text-xs text-gray-600">No image</div>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{catName ? capitalize(catName) : ""}</div>
                    </td>
                    <td className="p-2 text-sm">{p.mainSku}</td>
                    <td className="p-2">
                      <div>
                        {hasDiscount ? (
                          <div className="flex flex-col">
                            <span className="text-sm text-red-600 line-through">{formatPrice(p.price ?? 0)}</span>
                            <span className="text-sm font-semibold">{formatPrice(discounted)}</span>
                          </div>
                        ) : (
                          <div className="text-sm font-semibold">{formatPrice(p.price ?? 0)}</div>
                        )}
                      </div>
                    </td>
                    <td className={`p-2 font-bold`} style={{color: statusCol.classText}}>{statusCol.text}</td>
                      {canEditAll && (
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <button
                            className={`p-2 rounded hover:bg-gray-100 ${!canEditAll ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => handleEdit(p.id)}
                            disabled={!canEditAll}
                            title="Editar"
                          >
                            <Pen size={16} />
                          </button>
                          <button
                            className={`p-2 rounded hover:bg-gray-100 ${!canEditAll ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => handleDelete(p.id, p.name)}
                            disabled={!canEditAll}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* paginación */}
      <footer className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando {Math.min((pageClamped - 1) * perPage + 1, total)} - {Math.min(pageClamped * perPage, total)} de {total}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={pageClamped === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            disabled={pageClamped === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          <span className="px-3 py-1 border rounded">{pageClamped}</span>

          <button
            onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
            disabled={pageClamped === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={pageClamped === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
      </footer>
    </div>
  );
}
