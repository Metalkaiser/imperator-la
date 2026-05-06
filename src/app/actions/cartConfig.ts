"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import getProductService from "@/config/productServiceInstance";
import { giftOptionSchema, paymentMethodSchema, shippingMethodSchema } from "@/app/utils/apis/validatePayload";
import { dbCollections } from "@/app/utils/utils";
import type { GiftOption, NewActivityLog, PaymentMethod, shippingMethod } from "@/app/utils/types";
import { getSessionUser } from "./session";

type ActionResult = {
  success: boolean;
  message?: string;
  error?: string | ZodError["issues"];
};

function normalizeId(id?: string | number | null) {
  const raw = String(id ?? "").trim();
  return raw.length ? raw : crypto.randomUUID();
}

function cleanFee<T extends { status: boolean; percentage?: number; fixed?: number }>(fee: T): T {
  if (!fee.status) {
    const rest = { ...fee };
    delete rest.percentage;
    delete rest.fixed;
    return rest;
  }

  const cleaned = { ...fee };
  if (cleaned.percentage === undefined) delete cleaned.percentage;
  if (cleaned.fixed === undefined) delete cleaned.fixed;
  return cleaned;
}

function cleanOptionalStrings<T extends Record<string, any>>(data: T, fields: string[]) {
  const clean = { ...data };
  fields.forEach((field) => {
    if (typeof clean[field] === "string" && clean[field].trim() === "") {
      delete clean[field];
    }
  });
  return clean;
}

async function afterCartConfigChange(logData: NewActivityLog) {
  const dbService = await getProductService();
  const logRes = await dbService.setActivityLog(logData);
  if (logRes.status !== 200) console.warn("Cart config activity log not saved");

  revalidatePath("/admin/sales-options");
  revalidatePath("/api/cart-config");
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/cart");
}

export async function upsertPaymentMethodAction(input: PaymentMethod): Promise<ActionResult> {
  try {
    const authResult = await getSessionUser(true);
    if (!authResult.success) return { success: false, error: authResult.error ?? "No autorizado" };
    const adminUser = authResult.response!;

    const payload = paymentMethodSchema.parse({
      ...input,
      id: normalizeId(input?.id),
      fee: cleanFee(input.fee),
    }) as PaymentMethod;

    const dbService = await getProductService();
    const res = await dbService.upsertPaymentMethod(payload);
    if (res.status !== 200) return { success: false, error: String(res.response ?? "No se pudo guardar el método de pago") };

    await afterCartConfigChange({
      action: "payment_edited",
      userId: adminUser.id,
      username: adminUser.username.toLowerCase(),
      target: { collection: dbCollections.payment, item: payload.id },
    });

    return { success: true, message: "Método de pago guardado correctamente" };
  } catch (error: any) {
    if (error instanceof ZodError) return { success: false, error: error.issues };
    return { success: false, error: error?.message ?? "Error interno al guardar método de pago" };
  }
}

export async function upsertShippingMethodAction(input: shippingMethod): Promise<ActionResult> {
  try {
    const authResult = await getSessionUser(true);
    if (!authResult.success) return { success: false, error: authResult.error ?? "No autorizado" };
    const adminUser = authResult.response!;

    const payload = shippingMethodSchema.parse({
      ...input,
      id: normalizeId(input?.id),
      fee: cleanFee(input.fee),
    }) as shippingMethod;

    const dbService = await getProductService();
    const res = await dbService.upsertShippingMethod(payload);
    if (res.status !== 200) return { success: false, error: String(res.response ?? "No se pudo guardar el método de envío") };

    await afterCartConfigChange({
      action: "shipping_edited",
      userId: adminUser.id,
      username: adminUser.username.toLowerCase(),
      target: { collection: dbCollections.shipping, item: payload.id },
    });

    return { success: true, message: "Método de envío guardado correctamente" };
  } catch (error: any) {
    if (error instanceof ZodError) return { success: false, error: error.issues };
    return { success: false, error: error?.message ?? "Error interno al guardar método de envío" };
  }
}

export async function upsertGiftOptionAction(input: GiftOption): Promise<ActionResult> {
  try {
    const authResult = await getSessionUser(true);
    if (!authResult.success) return { success: false, error: authResult.error ?? "No autorizado" };
    const adminUser = authResult.response!;

    const cleaned = cleanOptionalStrings(
      {
        ...input,
        id: normalizeId(input?.id),
      },
      ["description", "image"]
    );
    if (Array.isArray(cleaned.exclusiveToProducts) && cleaned.exclusiveToProducts.length === 0) {
      delete cleaned.exclusiveToProducts;
    }
    if (cleaned.data && Object.keys(cleaned.data).length === 0) {
      delete cleaned.data;
    }

    const payload = giftOptionSchema.parse(cleaned) as GiftOption;

    const dbService = await getProductService();
    const res = await dbService.upsertGiftOption(payload);
    if (res.status !== 200) return { success: false, error: String(res.response ?? "No se pudo guardar la opción de regalo") };

    await afterCartConfigChange({
      action: "gift_edited",
      userId: adminUser.id,
      username: adminUser.username.toLowerCase(),
      target: { collection: dbCollections.giftOptions, item: payload.id },
    });

    return { success: true, message: "Opción de regalo guardada correctamente" };
  } catch (error: any) {
    if (error instanceof ZodError) return { success: false, error: error.issues };
    return { success: false, error: error?.message ?? "Error interno al guardar opción de regalo" };
  }
}
