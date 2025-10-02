"use client";

import React, { useMemo } from "react";
import { useDB } from "../context/dbContext";
import type { sale } from "@/app/utils/types";
import { orderStatuses } from "@/app/utils/utils";

const dateFormatter = new Intl.DateTimeFormat("es-VE", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("es-VE", {
  style: "currency",
  currency: "USD", // ajusta a la moneda real: "VES" o "USD" según tu caso
  maximumFractionDigits: 2,
});

function Row({ sale, index }: { sale: sale; index: number }) {
  const statusLabel = orderStatuses.get(sale.status) ?? String(sale.status ?? "unknown");
  const date = new Date(sale.createdAt);

  return (
    <div key={`row-${index}`} className="grid grid-cols-3 gap-2 py-2 border-b last:border-b-0">
      <div className="text-sm">
        {isFinite(date.getTime()) ? dateFormatter.format(date) : "Fecha inválida"}
      </div>
      <div className="text-sm font-medium">{currencyFormatter.format(sale.totalAmount)}</div>
      <div className="text-sm">{statusLabel}</div>
    </div>
  );
}

function TableSection({
  title,
  rows,
  loading,
}: {
  title: string;
  rows: sale[];
  loading: boolean;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      <div className="bg-white dark:bg-gray-800 rounded shadow-sm overflow-hidden">
        {/* header */}
        <div className="grid grid-cols-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-xs font-semibold text-gray-600 dark:text-gray-300">
          <div>Fecha</div>
          <div>Importe</div>
          <div>Estado</div>
        </div>

        {/* body */}
        <div className="px-4">
          {loading ? (
            // simple skeleton (puedes sustituir por Skeleton components)
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-8 my-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))
          ) : rows.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No hay registros</div>
          ) : (
            rows.map((s, i) => <Row key={s.id ?? `sale-${i}`} sale={s} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default function LatestOrders({ limit = 5 }: { limit: number }) {
  const { orders, loading } = useDB();

  // memoizar cálculos
  const { latest, pending } = useMemo(() => {
    const list = Array.isArray(orders) ? [...orders] : [];

    // ordenar por fecha descendente (asume sale.date es timestamp o ISO)
    list.sort((a, b) => {
      const ta = typeof a.createdAt === "number" ? a.createdAt : Date.parse(String(a.createdAt));
      const tb = typeof b.createdAt === "number" ? b.createdAt : Date.parse(String(b.createdAt));
      return tb - ta;
    });

    const latestList = list.slice(0, limit);
    const pendingList = list.filter((s) => s.status === "placed").slice(0, limit);

    return { latest: latestList, pending: pendingList };
  }, [orders, limit]);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
      <div className="md:w-5/12">
        <TableSection title={`Últimas ${limit} órdenes`} rows={latest} loading={loading} />
      </div>

      <div className="md:w-5/12">
        <TableSection title={`Últimas ${limit} órdenes pendientes`} rows={pending} loading={loading} />
      </div>
    </div>
  );
}
