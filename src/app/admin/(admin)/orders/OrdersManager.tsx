"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, FilePenLine, Lock, MessageSquarePlus } from "lucide-react";
import { useAuth } from "@/app/admin/components/context/authContext";
import { addOrderNoteAction, updateOrderStatusAction } from "@/app/actions/orders";
import { orderStatuses } from "@/app/utils/utils";
import { capitalizeName } from "@/app/utils/functions";
import type { sale, orderNote } from "@/app/utils/types";
import { useDB } from "../../components/context/dbContext";

const dateFormatter = new Intl.DateTimeFormat("es-VE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const localizedAddressFields: Record<string, string> = {
  street: "Calle",
  city: "Ciudad",
  state: "Estado",
  postalCode: "Código postal",
  country: "País",
};

const localizedPaymentDataFields: Record<string, string> = {
  reference: "Referencia",
  clientEmail: "Email del cliente",
  phoneNumber: "Número de teléfono",
  bank: "Banco",
  id: "Cédula de identidad"
};

const localizedShippingDataFields: Record<string, string> = {
  officeName: "Oficina de envío",
  officeAddress: "Dirección",
  Municipality: "Municipio",
  Community: "Parroquia",
  City: "Ciudad",
  State: "Estado",
  Country: "País",
};

function toDate(value: string | number) {
  const timestamp = typeof value === "number" ? value : Date.parse(String(value));
  return new Date(Number.isFinite(timestamp) ? timestamp : Date.now());
}

function buildNoteHistory(order: sale): orderNote[] {
  const history = Array.isArray(order.notesHistory) ? [...order.notesHistory] : [];
  if (order.notes && order.notes.trim().length > 0 && history.length === 0) {
    history.unshift({
      id: `legacy-${order.id}`,
      text: order.notes,
      authorId: "system",
      authorName: "Sistema",
      authorRole: "viewer",
      createdAt: order.createdAt,
    });
  }
  return history.sort((a, b) => {
    const ta = typeof a.createdAt === "number" ? a.createdAt : Date.parse(String(a.createdAt));
    const tb = typeof b.createdAt === "number" ? b.createdAt : Date.parse(String(b.createdAt));
    return tb - ta;
  }).slice(0, 5);
}

function StatusBadge({ status }: { status: string }) {
  const label = orderStatuses.get(status) ?? status;
  const tone =
    status === "completed"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
      : status === "shipped"
        ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200"
        : status === "canceled"
          ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
          : status === "reviewed"
            ? "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200"
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";

  return <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ${tone}`}>{label}</span>;
}

function OrderRow({
  order,
  expanded,
  onToggle
}: {
  order: sale;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { cartSettings, cart, canEditAll } = useDB();
  const { user } = useAuth();
  const createdAt = toDate(order.createdAt);
  const mainCurrency = cartSettings.mainCurrency || "USD";
  const paymentMethodName = cart.paymentMethods.find(payment => payment.id === order.paymentMethodId)?.name || "-";
  const paymentMethodIcon = cart.paymentMethods.find(payment => payment.id === order.paymentMethodId)?.icon || "";
  const localizedShippingMethod = order.shippingMethod ? cart.shippingMethods.find(shipping => shipping.id === order.shippingMethod)?.name || order.shippingMethod : "-";
  const shippingMethodIcon = order.shippingMethod ? cart.shippingMethods.find(shipping => shipping.id === order.shippingMethod)?.icon || "" : "";

  return (
    <>
      <tr className="border-b border-slate-200/80 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
        <td className="px-3 py-3 text-sm whitespace-nowrap">{dateFormatter.format(createdAt)}</td>
        <td className="px-3 py-3 text-sm font-medium">{capitalizeName(order.clientName || "Sin nombre")}</td>
        <td className="px-3 py-3 text-sm whitespace-nowrap">{order.clientPhone || "-"}</td>
        <td className="px-3 py-3 text-sm whitespace-nowrap">{mainCurrency} {order.totalAmount}</td>
        <td className="px-3 py-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <StatusBadge status={String(order.status)} />
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-expanded={expanded}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? "Ocultar" : "Ver"}
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-slate-50/80 dark:bg-slate-900/40">
          <td colSpan={5} className="px-3 pb-4 pt-2">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  Detalles de la venta
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                      <article key={item.id} className="rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={32}
                              height={32}
                              className="rounded object-cover"
                            ></Image>
                          </span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200 w-[100px]">
                            <h4 className="max-w-full truncate">{capitalizeName(item.name)}</h4>
                          </span>
                          <span>·</span>
                          <span>{item.sku}</span>
                          <span>·</span>
                          <span>{mainCurrency} {item.price}</span>
                          <span>·</span>
                          <span>Cantidad: {item.qt}</span>
                          {item.size && (
                            <>
                              <span>·</span>
                              <span>Talla: {item.size}</span>
                            </>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm">

                        </div>
                      </article>
                    ))
                  }
                </div>

                <div className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <h3 className="mb-2 font-medium">Información del cliente</h3>
                  <p><span className="font-semibold">Nombre:</span> {order.clientName || "-"}</p>
                  <p><span className="font-semibold">Teléfono:</span> {order.clientPhone || "-"}</p>
                  <p><span className="font-semibold">Email:</span> {order.clientEmail || "-"}</p>
                  {order.clientAddress && (Object.keys(order.clientAddress).length > 0) && (
                    <div className="mt-2">
                      <p className="font-semibold">Dirección:</p>
                      <ul className="ml-4 list-disc">
                        {Object.entries(order.clientAddress).map(([key, value]) => (
                          <li key={key}>
                            <span className="capitalize">{localizedAddressFields[key]}:</span> {String(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <div className="max-w-1/2">
                    <h3 className="mb-2 mt-4 font-medium">Detalles de pago</h3>
                    <p><span className="font-semibold">Método de pago:</span>
                      {paymentMethodIcon && (
                        <Image
                          src={paymentMethodIcon}
                          alt=""
                          width={20}
                          height={20}
                          className="inline-block mx-1 rounded object-cover"
                        ></Image>
                      )}
                      {paymentMethodName}
                    </p>
                    {order.paymentData && (Object.keys(order.paymentData).length > 0) && (
                      <div className="mt-2">
                        <p className="font-semibold">Datos de pago:</p>
                        <ul className="ml-4 list-disc">
                          {Object.entries(order.paymentData).map(([key, value]) => (
                            <li key={key}>
                              <span className="capitalize">{localizedPaymentDataFields[key]}:</span> {String(value)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="max-w-1/2">
                    <h3 className="mb-2 mt-4 font-medium">Detalles de envío</h3>
                    <p><span className="font-semibold">Método de envío:</span>
                      {shippingMethodIcon && (
                        <Image
                          src={shippingMethodIcon}
                          alt=""
                          width={20}
                          height={20}
                          className="inline-block mx-1 rounded object-cover"
                        ></Image>
                      )}
                      {localizedShippingMethod}
                    </p>
                    {order.shippingData && (Object.keys(order.shippingData).length > 0) && (
                      <div className="mt-2">
                        <p className="font-semibold">Datos de envío:</p>
                        <ul className="ml-4 list-disc">
                          {Object.entries(order.shippingData).map(([key, value]) => (
                            <li key={key}>
                              <span className="capitalize">{localizedShippingDataFields[key] || key}:</span> {String(value)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <h3 className="mb-2 font-medium">Historial de notas</h3>
                  {buildNoteHistory(order).length === 0 ? (
                    <p className="text-sm italic text-slate-500">No hay notas para esta venta.</p>
                  ) : (
                    buildNoteHistory(order).map((note) => (
                      <div key={note.id} className="mb-3 rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                        <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{note.authorName}</span>
                          <span>·</span>
                          <span>{dateFormatter.format(toDate(note.createdAt))}</span>
                          <span>·</span>
                          <span className="capitalize">{note.authorRole}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{note.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <FilePenLine size={16} />
                  Acciones
                </div>

                <form
                  action={(formData) => {
                    void updateOrderStatusAction(formData);
                  }}
                  className="space-y-3"
                >
                  <input type="hidden" name="orderId" value={String(order.id)} />
                  <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Estado</label>
                  {canEditAll ? (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <select
                        name="status"
                        defaultValue={String(order.status)}
                        className="min-w-0 rounded border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                      >
                        {Array.from(orderStatuses.entries()).map(([value, label]) => (
                          <option key={value} value={value} disabled={value === "placed"}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-950"
                      >
                        Guardar estado
                      </button>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      <Lock size={14} />
                      Sólo administrador
                    </div>
                  )}
                </form>

                <form
                  action={(formData) => {
                    void addOrderNoteAction(formData);
                  }}
                  className="mt-5 space-y-3"
                  onSubmit={(e) => {
                    const form = e.currentTarget;
                    requestAnimationFrame(() => form.reset());
                  }}
                >
                  <input type="hidden" name="orderId" value={String(order.id)} />
                  <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Nueva nota</label>
                  {user?.role === "admin" || user?.role === "editor" ? (
                    <>
                      <textarea
                        name="note"
                        rows={4}
                        placeholder="Escribe una nota para esta venta"
                        className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                        >
                          <MessageSquarePlus size={14} />
                          Agregar nota
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      <Lock size={14} />
                      No disponible para este rol
                    </div>
                  )}
                </form>
              </section>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function OrdersManager({ orders }: { orders: sale[] }) {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  return (
    <section className="p-4">
      <div className="mb-4 flex flex-col gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tabla ordenada de la venta más reciente a la más antigua. Las notas se guardan como historial.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-3 py-3">Fecha</th>
                <th className="px-3 py-3">Nombre</th>
                <th className="px-3 py-3">Teléfono</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-sm text-slate-500">
                    No hay ventas registradas.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                <OrderRow
                    key={`${String(order.id)}-${String(order.updatedAt ?? order.createdAt)}`}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() => setExpandedId((current) => (current === order.id ? null : order.id))}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
