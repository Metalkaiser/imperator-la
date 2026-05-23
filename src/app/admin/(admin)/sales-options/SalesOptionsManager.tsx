"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { CreditCard, Gift, PackageCheck, Pencil, Plus, Save, X } from "lucide-react";
import { useDB } from "@/app/admin/components/context/dbContext";
import { upsertGiftOptionAction, upsertPaymentMethodAction, upsertShippingMethodAction } from "@/app/actions/cartConfig";
import type { GiftOption, PaymentMethod, shippingMethod } from "@/app/utils/types";

type Tab = "payments" | "shipping" | "gifts";
type KeyValue = { key: string; value: string };

const paymentUserFields = [
  { key: "clientName", label: "Nombre" },
  { key: "clientPhone", label: "Teléfono" },
  { key: "clientEmail", label: "Correo electrónico" },
  { key: "reference", label: "Referencia de pago" },
];

const shippingDataFields = [
  { key: "clientName", label: "Nombre" },
  { key: "clientId", label: "Cédula de identidad" },
  { key: "officeName", label: "Nombre de la oficina" },
  { key: "officeAddress", label: "Dirección de la oficina" },
  { key: "Municipality", label: "Municipio" },
  { key: "Community", label: "Parroquia" },
  { key: "City", label: "Ciudad" },
  { key: "State", label: "Estado" },
  { key: "address", label: "Dirección / retiro" },
];

const giftTypes: GiftOption["type"][] = ["wrapping", "case", "card", "other"];

const emptyPayment = (): PaymentMethod => ({
  id: "",
  order: 1,
  name: "",
  enabled: true,
  data: {},
  userData: [],
  icon: "",
  fee: { status: false },
});

const emptyShipping = (): shippingMethod => ({
  id: "",
  order: 1,
  name: "",
  enabled: true,
  shipToHome: false,
  data: [],
  icon: "",
  fee: { status: false, onlyPayOnDelivery: false },
});

const emptyGift = (): GiftOption => ({
  id: "",
  name: "",
  type: "wrapping",
  price: 0,
  available: true,
});

function asKeyValues(data?: Record<string, string | number | boolean>): KeyValue[] {
  return Object.entries(data ?? {}).map(([key, value]) => ({ key, value: String(value) }));
}

function keyValuesToObject(rows: KeyValue[], booleanValues = false) {
  return rows.reduce<Record<string, string | number | boolean>>((acc, row) => {
    const key = row.key.trim();
    if (!key) return acc;
    const raw = row.value.trim();
    if (booleanValues && (raw === "true" || raw === "false")) acc[key] = raw === "true";
    else if (raw !== "" && !Number.isNaN(Number(raw))) acc[key] = Number(raw);
    else acc[key] = raw;
    return acc;
  }, {});
}

function formatError(error: unknown) {
  if (Array.isArray(error)) return error.map((issue: any) => issue.message ?? String(issue)).join("\n");
  return String(error ?? "No se pudo guardar la configuración.");
}

function getFeeLabel(fee: { status: boolean; percentage?: number; fixed?: number; onlyPayOnDelivery?: boolean }) {
  if (fee.onlyPayOnDelivery) return "Pago en destino";
  if (!fee.status) return "Sin recargo";
  const parts = [];
  if (fee.percentage !== undefined) parts.push(`${fee.percentage}%`);
  if (fee.fixed !== undefined) parts.push(`$${fee.fixed}`);
  return parts.length ? parts.join(" + ") : "Recargo activo";
}

function OptionImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <div className="h-12 w-12 rounded border bg-gray-100 dark:bg-gray-800" />;
  return <Image src={src} alt={alt} width={48} height={48} className="h-12 w-12 rounded object-contain border bg-white" />;
}

function KeyValueEditor({
  rows,
  onChange,
  valuePlaceholder = "Valor",
}: {
  rows: KeyValue[];
  onChange: (rows: KeyValue[]) => void;
  valuePlaceholder?: string;
}) {
  const updateRow = (index: number, field: keyof KeyValue, value: string) => {
    onChange(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            value={row.key}
            onChange={(event) => updateRow(index, "key", event.target.value)}
            placeholder="Campo"
            className="border rounded px-2 py-1 dark:bg-gray-900"
          />
          <input
            value={row.value}
            onChange={(event) => updateRow(index, "value", event.target.value)}
            placeholder={valuePlaceholder}
            className="border rounded px-2 py-1 dark:bg-gray-900"
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, i) => i !== index))}
            className="p-2 rounded border text-rose-600"
            aria-label="Quitar campo"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, { key: "", value: "" }])}
        className="inline-flex items-center gap-2 rounded border px-3 py-1 text-sm"
      >
        <Plus size={16} />
        Agregar campo
      </button>
    </div>
  );
}

export default function SalesOptionsManager() {
  const { cart, loading, refreshOrders, canEditAll } = useDB();
  const [tab, setTab] = useState<Tab>("payments");
  const [paymentForm, setPaymentForm] = useState<PaymentMethod>(emptyPayment);
  const [shippingForm, setShippingForm] = useState<shippingMethod>(emptyShipping);
  const [giftForm, setGiftForm] = useState<GiftOption>(emptyGift);
  const [paymentDataRows, setPaymentDataRows] = useState<KeyValue[]>([]);
  const [giftDataRows, setGiftDataRows] = useState<KeyValue[]>([]);
  const [exclusiveSkus, setExclusiveSkus] = useState("");
  const [saving, setSaving] = useState(false);

  const payments = useMemo(() => [...cart.paymentMethods].sort((a, b) => a.order - b.order), [cart.paymentMethods]);
  const shippings = useMemo(() => [...cart.shippingMethods].sort((a, b) => a.order - b.order), [cart.shippingMethods]);
  const gifts = useMemo(() => [...cart.giftOptions].sort((a, b) => String(a.name).localeCompare(String(b.name))), [cart.giftOptions]);

  const startNew = (nextTab: Tab) => {
    setTab(nextTab);
    if (nextTab === "payments") {
      setPaymentForm({ ...emptyPayment(), order: payments.length + 1 });
      setPaymentDataRows([]);
    }
    if (nextTab === "shipping") {
      setShippingForm({ ...emptyShipping(), order: shippings.length + 1 });
    }
    if (nextTab === "gifts") {
      setGiftForm(emptyGift());
      setGiftDataRows([]);
      setExclusiveSkus("");
    }
  };

  const editPayment = (method: PaymentMethod) => {
    setTab("payments");
    setPaymentForm({ ...method, data: { ...method.data }, userData: [...method.userData], fee: { ...method.fee } });
    setPaymentDataRows(asKeyValues(method.data));
  };

  const editShipping = (method: shippingMethod) => {
    setTab("shipping");
    setShippingForm({ ...method, data: [...method.data], fee: { ...method.fee } });
  };

  const editGift = (option: GiftOption) => {
    setTab("gifts");
    setGiftForm({ ...option, exclusiveToProducts: option.exclusiveToProducts ? [...option.exclusiveToProducts] : undefined, data: option.data ? { ...option.data } : undefined });
    setGiftDataRows(asKeyValues(option.data));
    setExclusiveSkus(option.exclusiveToProducts?.join(", ") ?? "");
  };

  const toggleArrayValue = (values: string[], value: string) => {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  };

  const savePayment = async () => {
    const payload: PaymentMethod = { ...paymentForm, data: keyValuesToObject(paymentDataRows) as PaymentMethod["data"] };
    await save(() => upsertPaymentMethodAction(payload));
  };

  const saveShipping = async () => {
    await save(() => upsertShippingMethodAction(shippingForm));
  };

  const saveGift = async () => {
    const skus = exclusiveSkus.split(",").map((sku) => sku.trim()).filter(Boolean);
    const payload: GiftOption = {
      ...giftForm,
      exclusiveToProducts: skus.length ? skus : undefined,
      data: giftDataRows.length ? keyValuesToObject(giftDataRows, true) : undefined,
    };
    await save(() => upsertGiftOptionAction(payload));
  };

  const save = async (action: () => Promise<{ success: boolean; message?: string; error?: unknown }>) => {
    if (!canEditAll) {
      await Swal.fire("No autorizado", "Solo administradores pueden editar opciones de ventas.", "warning");
      return;
    }

    setSaving(true);
    Swal.fire({ title: "Guardando...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      const result = await action();
      Swal.close();
      if (!result.success) {
        await Swal.fire("Error", formatError(result.error), "error");
        return;
      }
      await refreshOrders();
      await Swal.fire("Guardado", result.message ?? "Configuración actualizada.", "success");
    } catch (error: any) {
      Swal.close();
      await Swal.fire("Error", error?.message ?? "Error interno al guardar.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <section className="p-6">Cargando opciones de ventas...</section>;

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Opciones de ventas</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Administra pagos, envíos y regalos disponibles en el carrito de compra.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: "payments" as const, label: "Pagos", icon: CreditCard },
          { id: "shipping" as const, label: "Envíos", icon: PackageCheck },
          { id: "gifts" as const, label: "Regalos", icon: Gift },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 border-b-2 ${
                tab === item.id ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "payments" && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
          <OptionList
            title="Métodos de pago"
            emptyText="No hay métodos de pago configurados."
            onNew={() => startNew("payments")}
            items={payments.map((method) => ({
              id: method.id,
              name: method.name,
              enabled: method.enabled,
              media: method.icon,
              meta: `Orden ${method.order} | ${getFeeLabel(method.fee)}`,
              onEdit: () => editPayment(method),
            }))}
            canEdit={canEditAll}
          />
          <FormPanel title={paymentForm.id ? "Editar pago" : "Nuevo pago"} onSave={savePayment} saving={saving} canEdit={canEditAll}>
            <BaseFields
              name={paymentForm.name}
              order={paymentForm.order}
              enabled={paymentForm.enabled}
              media={paymentForm.icon}
              mediaLabel="Icono"
              statusLabel="Activo"
              onChange={(changes) => setPaymentForm((prev) => ({
                ...prev,
                name: changes.name ?? prev.name,
                order: changes.order ?? prev.order,
                enabled: changes.enabled ?? prev.enabled,
                icon: changes.media ?? prev.icon,
              }))}
            />
            <FieldGroup title="Datos del comercio">
              <KeyValueEditor rows={paymentDataRows} onChange={setPaymentDataRows} />
            </FieldGroup>
            <FieldGroup title="Datos solicitados al cliente">
              <CheckboxGrid
                options={paymentUserFields}
                values={paymentForm.userData}
                onToggle={(value) => setPaymentForm((prev) => ({ ...prev, userData: toggleArrayValue(prev.userData, value) }))}
              />
            </FieldGroup>
            <FeeFields
              fee={paymentForm.fee}
              onChange={(fee) => setPaymentForm((prev) => ({ ...prev, fee }))}
            />
          </FormPanel>
        </div>
      )}

      {tab === "shipping" && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
          <OptionList
            title="Métodos de envío"
            emptyText="No hay métodos de envío configurados."
            onNew={() => startNew("shipping")}
            items={shippings.map((method) => ({
              id: method.id,
              name: method.name,
              enabled: method.enabled,
              media: method.icon,
              meta: `Orden ${method.order} | ${getFeeLabel(method.fee)}`,
              onEdit: () => editShipping(method),
            }))}
            canEdit={canEditAll}
          />
          <FormPanel title={shippingForm.id ? "Editar envío" : "Nuevo envío"} onSave={saveShipping} saving={saving} canEdit={canEditAll}>
            <BaseFields
              name={shippingForm.name}
              order={shippingForm.order}
              enabled={shippingForm.enabled}
              media={shippingForm.icon}
              mediaLabel="Icono"
              statusLabel="Activo"
              onChange={(changes) => setShippingForm((prev) => ({
                ...prev,
                name: changes.name ?? prev.name,
                order: changes.order ?? prev.order,
                enabled: changes.enabled ?? prev.enabled,
                icon: changes.media ?? prev.icon,
              }))}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shippingForm.shipToHome}
                onChange={(event) => setShippingForm((prev) => ({ ...prev, shipToHome: event.target.checked }))}
              />
              Permite entrega a domicilio
            </label>
            <FieldGroup title="Datos solicitados para envío">
              <CheckboxGrid
                options={shippingDataFields}
                values={shippingForm.data}
                onToggle={(value) => setShippingForm((prev) => ({ ...prev, data: toggleArrayValue(prev.data, value) }))}
              />
            </FieldGroup>
            <FeeFields
              fee={shippingForm.fee}
              showPayOnDelivery
              onChange={(fee) => setShippingForm((prev) => ({ ...prev, fee: { onlyPayOnDelivery: false, ...fee } }))}
            />
          </FormPanel>
        </div>
      )}

      {tab === "gifts" && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
          <OptionList
            title="Opciones de regalo"
            emptyText="No hay regalos configurados."
            onNew={() => startNew("gifts")}
            items={gifts.map((option) => ({
              id: option.id,
              name: option.name,
              enabled: option.available,
              media: option.image,
              meta: `${option.type} | $${option.price.toFixed(2)}`,
              onEdit: () => editGift(option),
            }))}
            canEdit={canEditAll}
          />
          <FormPanel title={giftForm.id ? "Editar regalo" : "Nuevo regalo"} onSave={saveGift} saving={saving} canEdit={canEditAll}>
            <BaseFields
              name={giftForm.name}
              order={0}
              enabled={giftForm.available}
              media={giftForm.image ?? ""}
              mediaLabel="Imagen"
              statusLabel="Disponible"
              hideOrder
              onChange={(changes) => setGiftForm((prev) => ({
                ...prev,
                name: changes.name ?? prev.name,
                available: changes.enabled ?? prev.available,
                image: changes.media ?? prev.image,
              }))}
            />
            <label className="flex flex-col gap-1 text-sm">
              Tipo
              <select
                value={giftForm.type}
                onChange={(event) => setGiftForm((prev) => ({ ...prev, type: event.target.value as GiftOption["type"] }))}
                className="border rounded px-2 py-2 dark:bg-gray-900"
              >
                {giftTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Precio
              <input
                type="number"
                min="0"
                step="0.01"
                value={giftForm.price}
                onChange={(event) => setGiftForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
                className="border rounded px-2 py-2 dark:bg-gray-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Descripción opcional
              <textarea
                value={giftForm.description ?? ""}
                onChange={(event) => setGiftForm((prev) => ({ ...prev, description: event.target.value }))}
                className="border rounded px-2 py-2 dark:bg-gray-900"
                rows={3}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              SKUs exclusivos
              <input
                value={exclusiveSkus}
                onChange={(event) => setExclusiveSkus(event.target.value)}
                placeholder="AAI-0010, AAI-0020"
                className="border rounded px-2 py-2 dark:bg-gray-900"
              />
            </label>
            <FieldGroup title="Datos extra">
              <KeyValueEditor rows={giftDataRows} onChange={setGiftDataRows} valuePlaceholder="Valor, true o false" />
            </FieldGroup>
          </FormPanel>
        </div>
      )}
    </section>
  );
}

function OptionList({
  title,
  emptyText,
  items,
  onNew,
  canEdit,
}: {
  title: string;
  emptyText: string;
  items: Array<{ id: string | number; name: string; enabled: boolean; media?: string; meta: string; onEdit: () => void }>;
  onNew: () => void;
  canEdit: boolean;
}) {
  return (
    <article className="border rounded p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {canEdit && (
          <button type="button" onClick={onNew} className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm text-white">
            <Plus size={16} />
            Nuevo
          </button>
        )}
      </div>
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">{emptyText}</p>
        ) : items.map((item) => (
          <div key={String(item.id)} className="flex items-center justify-between gap-3 rounded border p-3">
            <div className="flex min-w-0 items-center gap-3">
              <OptionImage src={item.media} alt={item.name} />
              <div className="min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300 truncate">{item.meta}</p>
                <span className={`inline-flex mt-1 rounded px-2 py-0.5 text-xs ${item.enabled ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}`}>
                  {item.enabled ? "Visible" : "Oculto"}
                </span>
              </div>
            </div>
            {canEdit && (
              <button type="button" onClick={item.onEdit} className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm">
                <Pencil size={16} />
                Editar
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function FormPanel({ title, children, onSave, saving, canEdit }: { title: string; children: ReactNode; onSave: () => void; saving: boolean; canEdit: boolean }) {
  return (
    <aside className="border rounded p-4 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
      {canEdit ? (
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "Guardando..." : "Guardar"}
        </button>
      ) : (
        <p className="text-sm text-gray-500">Solo administradores pueden editar estas opciones.</p>
      )}
    </aside>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function BaseFields({
  name,
  order,
  enabled,
  media,
  mediaLabel,
  statusLabel,
  hideOrder,
  onChange,
}: {
  name: string;
  order: number;
  enabled: boolean;
  media: string;
  mediaLabel: string;
  statusLabel: string;
  hideOrder?: boolean;
  onChange: (changes: { name?: string; order?: number; enabled?: boolean; media?: string }) => void;
}) {
  return (
    <>
      <label className="flex flex-col gap-1 text-sm">
        Nombre
        <input value={name} onChange={(event) => onChange({ name: event.target.value })} className="border rounded px-2 py-2 dark:bg-gray-900" />
      </label>
      {!hideOrder && (
        <label className="flex flex-col gap-1 text-sm">
          Orden
          <input type="number" min="0" value={order} onChange={(event) => onChange({ order: Number(event.target.value) })} className="border rounded px-2 py-2 dark:bg-gray-900" />
        </label>
      )}
      <label className="flex flex-col gap-1 text-sm">
        {mediaLabel}
        <input value={media} onChange={(event) => onChange({ media: event.target.value })} className="border rounded px-2 py-2 dark:bg-gray-900" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={enabled} onChange={(event) => onChange({ enabled: event.target.checked })} />
        {statusLabel}
      </label>
    </>
  );
}

function CheckboxGrid({ options, values, onToggle }: { options: Array<{ key: string; label: string }>; values: string[]; onToggle: (value: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option.key} className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.includes(option.key)} onChange={() => onToggle(option.key)} />
          {option.label}
        </label>
      ))}
    </div>
  );
}

function FeeFields({
  fee,
  onChange,
  showPayOnDelivery,
}: {
  fee: { status: boolean; percentage?: number; fixed?: number; onlyPayOnDelivery?: boolean };
  onChange: (fee: any) => void;
  showPayOnDelivery?: boolean;
}) {
  return (
    <FieldGroup title="Costo adicional">
      {showPayOnDelivery && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!fee.onlyPayOnDelivery}
            onChange={(event) => onChange({ ...fee, onlyPayOnDelivery: event.target.checked })}
          />
          Se paga al recibir
        </label>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={fee.status} onChange={(event) => onChange({ ...fee, status: event.target.checked })} />
        Agregar recargo
      </label>
      {fee.status && (
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1 text-sm">
            Porcentaje
            <input
              type="number"
              min="0"
              step="0.01"
              value={fee.percentage ?? ""}
              onChange={(event) => onChange({ ...fee, percentage: event.target.value === "" ? undefined : Number(event.target.value) })}
              className="border rounded px-2 py-2 dark:bg-gray-900"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Fijo
            <input
              type="number"
              min="0"
              step="0.01"
              value={fee.fixed ?? ""}
              onChange={(event) => onChange({ ...fee, fixed: event.target.value === "" ? undefined : Number(event.target.value) })}
              className="border rounded px-2 py-2 dark:bg-gray-900"
            />
          </label>
        </div>
      )}
    </FieldGroup>
  );
}
