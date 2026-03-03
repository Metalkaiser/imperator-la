/*
* Utility functions for the web application
* 
* This file contains various utility functions used throughout the web application.
* These functions include string manipulation, session management, and other helper functions.
*/

/**
* Function to capitalize the first letter of a string
* This function takes a string as input and returns the string with the first letter capitalized
* and the rest of the string in lowercase.
* 
* @param item - The string to be capitalized
* @returns {string} - The capitalized string
*/
export const capitalize = (item:string): string => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}

/**
* Function to toggle the visibility of a side menu
* This function takes a menu identifier as input and toggles the visibility of the corresponding side menu.
* The menu can be either "Menu" or another identifier.
* 
* @param menu - The identifier of the menu to toggle
*/
export const sideMenu = (menu:string) => {
  const aside = document.getElementById(`aside-${menu}`);
  if (aside) {
    if (menu === "Menu") {
      aside.classList.toggle("-left-full");
      aside.classList.toggle("left-0");
    } else {
      aside.classList.toggle("-right-full");
      aside.classList.toggle("right-0");
    }
  }
}

/**
 * Returns a new array containing a specified number of random items from the input array.
 * The original array is not modified.
 *
 * @typeParam T - The type of elements in the input array.
 * @param array - The array from which to select random items.
 * @param count - The number of random items to return.
 * @returns An array containing `count` randomly selected items from the input array.
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Calculates the discounted price based on the original price and a discount object.
 * The discount can be either a percentage or a fixed value, determined by the `type` property.
 * Returns the discounted price as a string with appropriate precision.
 *
 * @param price - The original price before discount.
 * @param discount - An object containing the discount type and value.
 *   - type: 0 for percentage discount, 1 for fixed value discount.
 *   - value: The discount amount (percentage or fixed value).
 * @returns The discounted price as a string with adjusted precision.
*/
export function getDiscountedPrice(price:number, discount:{type:number; value:number}): string {
  let discountPrice = 0;
  let priceDiscountString = "";

  if (discount.type == 0) {
    discountPrice = price * (100 - discount.value) / 100;
  } else {
    discountPrice = price - discount.value;
  }

  if (discountPrice >= 10) {
    priceDiscountString = discountPrice.toPrecision(4);
  } else {
    priceDiscountString = discountPrice.toPrecision(3);
  }

  return priceDiscountString;
}

/**
 * 
 * Capitalizes the first letter of each word in a given string.
 * 
 * @param name The string to capitalize each word
 * @returns A string with each word capitalized
 */
export function capitalizeName(name:string): string {
  return name.split(" ").map((s) => capitalize(s)).join(" ");
}

export type DiffItem = {
  item: string;      // e.g. "variants[1].stock[0].quantity"
  oldValue: any;            // valor en objeto A
  newValue: any;            // valor en objeto B
};

export type DiffOptions = {
  ignoreKeys?: string[];                     // keys a ignorar en cualquier nivel
  arrayKeyMap?: Record<string, string>;      // map: rutaBase -> keyName (p.e. { "variants": "sku" })
  maxDepth?: number;                         // opcional, para limitar recursión
};

function isPrimitive(v: any) {
  return v === null || (typeof v !== "object" && typeof v !== "function");
}

function equalPrimitives(a: any, b: any) {
  // considera NaN == NaN, y usa Object.is para distinciones (0 vs -0)
  if (typeof a === "number" && typeof b === "number") {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
  }
  return Object.is(a, b);
}

/**
 * 
 * Compares two objects and returns an array of differences between them.
 * It recursively checks properties and nested objects/arrays, and records any differences found.
 * 
 * @param a The first object to compare
 * @param b The second object to compare (new version)
 * @param opts Options for diffing
 * @returns {DiffItem[]} - An array of DiffItem representing the differences between the two objects
 */

export function diffObjects(a: any, b: any, opts: DiffOptions = {}): DiffItem[] {
  if (a === b) return []; // shortcut
  const { ignoreKeys = ["createdAt", "updatedAt", "deletedAt"], arrayKeyMap = {}, maxDepth = 50 } = opts;
  const diffs: DiffItem[] = [];
  const seen = new WeakSet<any>();

  function pushDiff(item: string, va: any, vb: any) {
    const oldVal = va === undefined ? "undefined" : va;
    const newVal = vb === undefined ? "undefined" : vb;
    diffs.push({ item, oldValue: oldVal, newValue: newVal });
  }

  function walk(va: any, vb: any, item = "", depth = 0) {
    if (depth > maxDepth) {
      pushDiff(item || ".", va, vb);
      return;
    }

    // same reference shortcut
    if (va === vb) return;

    // primitives
    if (isPrimitive(va) || isPrimitive(vb)) {
      if (!equalPrimitives(va, vb)) pushDiff(item || ".", va, vb);
      return;
    }

    // circular ref protection
    if (typeof va === "object" && va !== null) {
      if (seen.has(va)) {
        // si ambos son mismos objeto circular, nada que comparar
        if (va !== vb) pushDiff(item || ".", va, vb);
        return;
      }
      seen.add(va);
    }

    // arrays
    if (Array.isArray(va) || Array.isArray(vb)) {
      const arrA = Array.isArray(va) ? va : [];
      const arrB = Array.isArray(vb) ? vb : [];

      // decide si hay key-based matching para esta ruta (path puede contener prefijo)
      // buscaremos la coincidencia por la "ruta base" (sin indices)
      const basePath = item.replace(/\[\d+\]/g, ""); // ej "variants[0].stock" -> "variants.stock"
      const keyForThis = Object.entries(arrayKeyMap).find(([k]) => basePath.endsWith(k))?.[1];

      if (keyForThis) {
        // indexar por key
        const mapA = new Map<string|number, any>();
        const mapB = new Map<string|number, any>();
        for (const item of arrA) if (item && (item[keyForThis] !== undefined)) mapA.set(String(item[keyForThis]), item);
        for (const item of arrB) if (item && (item[keyForThis] !== undefined)) mapB.set(String(item[keyForThis]), item);

        // keys union
        const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);
        for (const k of allKeys) {
          const itemA = mapA.get(k);
          const itemB = mapB.get(k);
          const subPath = item ? `${item}[${String(k)}]` : `[${String(k)}]`;
          if (itemA === undefined) pushDiff(subPath, undefined, itemB);
          else if (itemB === undefined) pushDiff(subPath, itemA, undefined);
          else walk(itemA, itemB, subPath, depth + 1);
        }
      } else {
        // comparar por índice
        const length = Math.max(arrA.length, arrB.length);
        for (let i = 0; i < length; i++) {
          const subPath = `${item}[${i}]`;
          if (i >= arrA.length) pushDiff(subPath, undefined, arrB[i]);
          else if (i >= arrB.length) pushDiff(subPath, arrA[i], undefined);
          else walk(arrA[i], arrB[i], subPath, depth + 1);
        }
      }
      return;
    }

    // objetos normales: recorrer keys union
    const keys = new Set<string>([...Object.keys(va ?? {}), ...Object.keys(vb ?? {})]);
    for (const key of keys) {
      if (ignoreKeys.includes(key)) continue;
      const subPath = item ? `${item}.${key}` : key;
      const hasA = va !== undefined && Object.prototype.hasOwnProperty.call(va, key);
      const hasB = vb !== undefined && Object.prototype.hasOwnProperty.call(vb, key);

      if (!hasA) {
        pushDiff(subPath, undefined, vb[key]);
        continue;
      }
      if (!hasB) {
        pushDiff(subPath, va[key], undefined);
        continue;
      }

      // ambos tienen la key -> recursar
      walk(va[key], vb[key], subPath, depth + 1);
    }
  }

  walk(a, b, "", 0);
  return diffs;
}

/**
 * 
 * Retrieves the value of a specified cookie from the provided cookie header string.
 * @param cookieHeader The cookie header string
 * @param name The name of the cookie to retrieve
 * @returns The value of the specified cookie, or null if not found
 */
export function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// uploadPlan.ts
export type UploadTask =
  | { type: "upload"; file: File; path: string; target: "thumbnail" }
  | { type: "upload"; file: File; path: string; target: "variant"; index: number; sku: string }
  | { type: "upload"; file: File; path: string; target: "image"; newIndex: number }
  | { type: "delete"; url: string };

type ImageOrderToken =
  | { type: "remote"; url: string }
  | { type: "new"; newIndex: number };

export type UploadPlan = {
  uploads: UploadTask[];
  deletes: UploadTask[];
  updates: any;
  errors: string[];
};

import { ProductService } from "@/services/ProductService";
import { fileSchema } from "./apis/validatePayload";
import type { productProps } from "./types";

function parseImagesOrder(raw: FormDataEntryValue | null): ImageOrderToken[] | null {
  if (typeof raw !== "string") return null;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const tokens: ImageOrderToken[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") return null;

      if (
        item.type === "remote" &&
        typeof item.url === "string" &&
        item.url.trim().length > 0
      ) {
        tokens.push({ type: "remote", url: item.url });
        continue;
      }

      if (
        item.type === "new" &&
        Number.isInteger(item.newIndex) &&
        Number(item.newIndex) >= 0
      ) {
        tokens.push({ type: "new", newIndex: Number(item.newIndex) });
        continue;
      }

      return null;
    }

    return tokens;
  } catch {
    return null;
  }
}


/**
 * 
 * Builds an upload plan for product images based on form data and existing product data.
 * @param form  The form data containing files and fields
 * @param existing The existing product data
 * @param body The parsed body data
 * @returns An UploadPlan detailing the upload and delete tasks
 */
export function buildUploadPlan({
  form,
  existing,
  body
}: {
  form: FormData;
  existing: productProps;
  body: Partial<productProps>;
}): UploadPlan {

  const plan: UploadPlan = {
    uploads: [],
    deletes: [],
    updates: {},
    errors: []
  };

  const isValidFile = (f: any) => fileSchema.safeParse(f).success;

  // ---------------- THUMBNAIL ----------------
  const thumb = form.get("thumbnail");
  if (thumb instanceof File) {
    if (!isValidFile(thumb)) {
      plan.errors.push("Invalid thumbnail file");
    } else {
      plan.uploads.push({
        type: "upload",
        file: thumb,
        path: `products/thumbnails/${body.mainSku ?? existing.mainSku}`,
        target: "thumbnail"
      });

      if (existing.thumbnail) {
        plan.deletes.push({ type: "delete", url: existing.thumbnail });
      }
    }
  }

  // ---------------- VARIANTS ----------------
  const baseVariants =
    Array.isArray(body.variants)
      ? body.variants
      : existing.variants;

  const updatedVariants = structuredClone(baseVariants);
  plan.updates.variants = updatedVariants;

  baseVariants.forEach((v, i) => {
    const sku = String(v.sku).trim();
    const file =
      form.get(`variant_${sku}_image`) ??
      form.get(`variant_${i}_image`);

    if (file instanceof File) {
      if (!isValidFile(file)) {
        plan.errors.push(`Invalid variant image at index ${v.sku}`);
        return;
      }

      plan.uploads.push({
        type: "upload",
        file,
        path: `products/skus/${sku}`,
        target: "variant",
        index: i,
        sku
      });

      const old = existing.variants?.find(ev => ev.sku === sku);
      if (old?.image) {
        plan.deletes.push({ type: "delete", url: old.image });
      }
    }
  });

  plan.updates.variants = updatedVariants;

  // ---------------- ADDITIONAL IMAGES ----------------
  let hasNew = false;
  const parsedImagesOrder = parseImagesOrder(form.get("imagesOrder"));
  const additionalImages = form.getAll("images");
  additionalImages.forEach((file, index) => {
    if (!(file instanceof File)) return;
    if (!isValidFile(file)) {
      plan.errors.push(`Invalid image file: images[${index}]`);
      return;
    }

    hasNew = true;
    plan.uploads.push({
      type: "upload",
      file,
      path: `products/images/${existing.name}_images_${index}`,
      target: "image",
      newIndex: index
    });
  });

  if (body.images && Array.isArray(body.images)) {
    const kept = body.images.filter(x => typeof x === "string" && !x.startsWith("blob:"));

    if (!kept.length && !hasNew) {
      plan.errors.push("At least one product image is required.");
    } else {
      plan.updates.images = [...kept];
      existing.images
        .filter(img => !kept.includes(img))
        .forEach(url => plan.deletes.push({ type: "delete", url }));

      if (parsedImagesOrder) {
        plan.updates.__imagesOrder = parsedImagesOrder;
        plan.updates.__keptImages = [...kept];
      }
    }
  } else {
    if (hasNew) {
      plan.updates.images = existing.images;
      if (parsedImagesOrder) {
        plan.updates.__imagesOrder = parsedImagesOrder;
        plan.updates.__keptImages = Array.isArray(existing.images) ? [...existing.images] : [];
      }
    }
  }

  return plan;
}

/**
 * 
 * Executes the upload plan by performing uploads and deletions using the provided ProductService.
 * @param plan  The UploadPlan containing upload and delete tasks
 * @param dbService The ProductService to handle uploads and deletions
 * @returns An object with updates and errors after executing the upload plan
 */
export async function executeUploadPlan(
  plan: UploadPlan,
  dbService: ProductService
) {
  const baseImages = Array.isArray(plan.updates.images) ? [...plan.updates.images] : [];
  const results = {
    updates: { ...plan.updates },
    errors: [...plan.errors]
  };
  const uploadedByIndex = new Map<number, string>();

  for (const task of plan.uploads) {
    if (task.type !== "upload") continue;
    const up = await dbService.uploadImage(task.file, task.path);
    if (!up.ok || !up.url) {
      results.errors.push(`Upload failed: ${task.path}`);
      continue;
    }

    if (task.target === "thumbnail") {
      results.updates.thumbnail = up.url;
    }

    if (task.target === "variant" && task.index !== undefined) {
      results.updates.variants[task.index].image = up.url;
    }

    if (task.target === "image") {
      uploadedByIndex.set(task.newIndex, up.url);
    }
  }

  const imagesOrder = Array.isArray(results.updates.__imagesOrder)
    ? (results.updates.__imagesOrder as ImageOrderToken[])
    : null;
  const keptImages = Array.isArray(results.updates.__keptImages)
    ? (results.updates.__keptImages as string[])
    : baseImages;

  let canUseCustomOrder = Boolean(imagesOrder && imagesOrder.length > 0);
  if (canUseCustomOrder && imagesOrder) {
    const orderRemotes = imagesOrder
      .filter((token) => token.type === "remote")
      .map((token) => token.url);
    const orderNewIndexes = new Set(
      imagesOrder
        .filter((token) => token.type === "new")
        .map((token) => token.newIndex)
    );

    const hasAllKeptRemotes = keptImages.every((url) => orderRemotes.includes(url));
    const hasAllUploadedIndexes = Array.from(uploadedByIndex.keys()).every((idx) => orderNewIndexes.has(idx));
    canUseCustomOrder = hasAllKeptRemotes && hasAllUploadedIndexes;
  }

  if (canUseCustomOrder && imagesOrder) {
    const keptSet = new Set(keptImages);
    const finalImages: string[] = [];
    imagesOrder.forEach((token) => {
      if (token.type === "remote") {
        if (keptSet.has(token.url)) finalImages.push(token.url);
        return;
      }

      const uploadedUrl = uploadedByIndex.get(token.newIndex);
      if (uploadedUrl) finalImages.push(uploadedUrl);
    });
    results.updates.images = finalImages;
  } else if (uploadedByIndex.size > 0) {
    const uploadedOrdered = Array.from(uploadedByIndex.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, url]) => url);
    results.updates.images = [...baseImages, ...uploadedOrdered];
  }

  delete results.updates.__imagesOrder;
  delete results.updates.__keptImages;

  for (const del of plan.deletes) {
    if (del.type !== "delete") continue;
    try {
      await dbService.deleteImage(del.url);
    } catch {
      console.warn("Delete failed:", del.url);
    }
  }
  return results;
}

/**
 * 
 * @param s The string to sanitize
 * @returns A sanitized string safe for file names
 */
export function sanitizeFileName(s: string) {
  return String(s)
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "") // quitar caracteres raros
    .trim()
    .replace(/\s+/g, "_"); // espacios -> _
}

/**
 * 
 * @param obj The object to remove undefined values from
 * @returns A new object with all undefined values removed, including nested objects
 */
export function removeUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(value => value[1] !== undefined)
      .map(([key, value]) => [
        key,
        value && typeof value === 'object' && !Array.isArray(value)
          ? removeUndefined(value)  // recursivo para objetos anidados
          : value
      ])
  );
}
