import type { ProductService } from "@/services/ProductService";
import type { productProps } from "../types";
import { buildUploadPlan, executeUploadPlan } from "../functions";

/**
 * Maneja todas las operaciones de archivos:
 * - thumbnail
 * - variants
 * - additional images
 */
export async function buildUploads({
  form,
  existing,
  body,
  dbService
}: {
  form: FormData,
  existing: productProps,
  body: Partial<productProps>,
  dbService: ProductService
}) {
  const plan = buildUploadPlan({ form, existing, body });
  const execResult = await executeUploadPlan(plan, dbService);

  return {
    ok: execResult.errors.length === 0,
    updates: execResult.updates,
    errors: execResult.errors
  };
}