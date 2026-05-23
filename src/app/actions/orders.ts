"use server";

import { revalidatePath } from "next/cache";
import getProductService from "@/config/productServiceInstance";
import { orderStatuses } from "@/app/utils/utils";
import type { orderNote, sale } from "@/app/utils/types";
import { getSessionUser } from "./session";

type ActionResult = {
  success: boolean;
  message?: string;
  error?: string;
  order?: sale;
};

function isCartEnabled() {
  return process.env.NEXT_PUBLIC_CART_ENABLED?.toLowerCase() === "true";
}

function getAllowedStatuses() {
  return new Set(Array.from(orderStatuses.keys()));
}

export async function updateOrderStatusAction(formData: FormData): Promise<ActionResult> {
  if (!isCartEnabled()) {
    return { success: false, error: "La sección de ventas está deshabilitada" };
  }

  const authResult = await getSessionUser(true);
  if (!authResult.success || !authResult.response) {
    return { success: false, error: authResult.error ?? "No autorizado" };
  }

  const orderId = formData.get("orderId");
  const nextStatus = formData.get("status");

  if (typeof orderId !== "string" || !orderId.trim()) {
    return { success: false, error: "ID de venta requerido" };
  }
  if (typeof nextStatus !== "string" || !getAllowedStatuses().has(nextStatus)) {
    return { success: false, error: "Estado inválido" };
  }

  const dbService = await getProductService();
  const updateRes = await dbService.updateOrderStatus(orderId, nextStatus);

  if (!updateRes || updateRes.status !== 200) {
    return { success: false, error: String(updateRes?.response ?? "No se pudo actualizar la venta") };
  }

  revalidatePath("/admin/orders");

  return {
    success: true,
    message: "Estado actualizado",
    order: updateRes.response as sale,
  };
}

export async function addOrderNoteAction(formData: FormData): Promise<ActionResult> {
  if (!isCartEnabled()) {
    return { success: false, error: "La sección de ventas está deshabilitada" };
  }

  const authResult = await getSessionUser(false);
  if (!authResult.success || !authResult.response) {
    return { success: false, error: authResult.error ?? "No autorizado" };
  }

  const orderId = formData.get("orderId");
  const noteText = formData.get("note");

  if (typeof orderId !== "string" || !orderId.trim()) {
    return { success: false, error: "ID de venta requerido" };
  }

  if (typeof noteText !== "string" || !noteText.trim()) {
    return { success: false, error: "La nota no puede estar vacía" };
  }

  const note: orderNote = {
    id: globalThis.crypto?.randomUUID?.() ?? `note_${Date.now()}`,
    text: noteText.trim(),
    authorId: authResult.response.id,
    authorName: authResult.response.username,
    authorRole: authResult.response.role,
    createdAt: Date.now(),
  };

  const dbService = await getProductService();
  const updateRes = await dbService.addOrderNote(orderId, note);

  if (!updateRes || updateRes.status !== 200) {
    return { success: false, error: String(updateRes?.response ?? "No se pudo agregar la nota") };
  }

  revalidatePath("/admin/orders");

  return {
    success: true,
    message: "Nota agregada",
    order: updateRes.response as sale,
  };
}
