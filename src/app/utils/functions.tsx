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
    diffs.push({ item, oldValue: va, newValue: vb });
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
 * Checks if the MIME type of a given file is "image/webp".
 * @param file The file to check the MIME property
 * @returns {boolean} - True if MIME is webp. False otherwise.
 */
export function checkMime(file: File): boolean {
  return file.type === "image/webp";
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

type VariantInput = {
  color?: string;
  sku?: string;
  image?: string | null;
  stock?: { name?: string; quantity?: number | string }[];
};

/**
 * 
 * Validates an array of product variants against specific rules.
 * @param variants The array of variant objects to validate
 * @param mainSku The main SKU to compare against
 * @param opts Optional settings for validation
 * @returns An object indicating whether validation passed and the parsed variants or an error message
 */
export function validateVariants(
  variants: VariantInput[] | null | undefined,
  mainSku: string,
  opts?: {
    skuDiffChars?: number; // cuántos chars finales pueden diferir (por defecto 1)
    requireNonEmptyImage?: boolean; // exige image no vacío
    disallowSuffixEqualMain?: boolean; // evita suffix igual al mainSku suffix
  }
): { ok: true; parsed: { color: string; sku: string; image: string | null; stock: { name: string; quantity: number }[] }[] }
  | { ok: false; message: string } {
  const skuDiffChars = Math.max(0, Math.floor(opts?.skuDiffChars ?? 1));
  const requireNonEmptyImage = opts?.requireNonEmptyImage ?? true;
  const disallowSuffixEqualMain = opts?.disallowSuffixEqualMain ?? true;

  if (!mainSku || typeof mainSku !== "string" || !mainSku.trim()) {
    return { ok: false, message: "mainSku inválido" };
  }
  const main = mainSku.trim();

  // permitir null/undefined si no quieres obligarlo
  if (variants === null || variants === undefined) {
    return { ok: false, message: "Las variantes son obligatorias" };
  }

  if (!Array.isArray(variants)) {
    return { ok: false, message: "variants debe ser un array" };
  }

  if (main.length <= skuDiffChars) {
    return { ok: false, message: `mainSku debe tener más de ${skuDiffChars} caracteres` };
  }
  const prefix = main.slice(0, main.length - skuDiffChars);
  const mainSuffix = main.slice(main.length - skuDiffChars);

  const seenSuffix = new Set<string>();
  const parsed: { color: string; sku: string; image: string | null; stock: { name: string; quantity: number }[] }[] = [];

  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (typeof v !== "object" || v === null) {
      return { ok: false, message: `La variante en índice ${i} debe ser un objeto` };
    }

    const rawSku = String(v.sku ?? "").trim();
    if (!rawSku) return { ok: false, message: `La variante ${i} no tiene sku` };

    // verificar longitud y prefijo/suffix según regla
    if (rawSku.length !== main.length) {
      return { ok: false, message: `La variante ${i} sku debe tener la misma longitud que el mainSku (${main.length} caracteres)` };
    }
    const skuPrefix = rawSku.slice(0, rawSku.length - skuDiffChars);
    const skuSuffix = rawSku.slice(rawSku.length - skuDiffChars);

    if (skuPrefix !== prefix) {
      return { ok: false, message: `La variante ${i} tiene prefijo distinto. Se esperaba prefijo "${prefix}"` };
    }

    // patrón simple para suffix (alfanumérico). Ajusta si necesitas solo dígitos u otro patrón.
    if (!/^[A-Za-z0-9]+$/.test(skuSuffix)) {
      return { ok: false, message: `La variante ${i} suffix "${skuSuffix}" no cumple el patrón permitido` };
    }

    if (disallowSuffixEqualMain && skuSuffix === mainSuffix && variants.length > 1) {
      return { ok: false, message: `La variante ${i} no puede tener el mismo suffix que el mainSku` };
    }
    if (seenSuffix.has(skuSuffix)) {
      return { ok: false, message: `Suffix duplicado "${skuSuffix}" en variante ${i}` };
    }
    seenSuffix.add(skuSuffix);

    // image (si debe ser no vacío)
    const image = v.image === null ? null : String(v.image ?? "");
    if (requireNonEmptyImage && (!image || image.trim() === "")) {
      return { ok: false, message: `La variante ${i} debe tener una miniatura (image)` };
    }

    // stock: debe ser array no vacío (según tu regla) y cada item válido
    if (!Array.isArray(v.stock) || v.stock.length === 0) {
      return { ok: false, message: `La variante ${i} debe tener stock declarado` };
    }
    const stockNormalized: { name: string; quantity: number }[] = [];
    for (let j = 0; j < v.stock.length; j++) {
      const st = v.stock[j] as any;
      if (typeof st !== "object" || st === null) {
        return { ok: false, message: `Stock inválido en variante ${i} índice ${j}` };
      }
      const name = String(st.name ?? "").trim();
      if (!name) return { ok: false, message: `La variante ${i} stock[${j}] debe tener un nombre` };
      const q = Number(st.quantity);
      if (!Number.isFinite(q) || q < 0 || !Number.isInteger(q)) {
        return { ok: false, message: `Formato de stock incorrecto en variante ${i} stock[${j}]` };
      }
      stockNormalized.push({ name, quantity: q });
    }

    // color: normalizar a string (puede quedar vacío si lo permites)
    const color = String(v.color ?? "").trim();

    parsed.push({ color, sku: rawSku, image: image === "" ? null : image, stock: stockNormalized });
  }

  return { ok: true, parsed };
}