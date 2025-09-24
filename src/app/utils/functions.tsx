/*
* Utility functions for the web application
* 
* This file contains various utility functions used throughout the web application.
* These functions include string manipulation, session management, and other helper functions.
*/

/*
* Function to capitalize the first letter of a string
* This function takes a string as input and returns the string with the first letter capitalized
* and the rest of the string in lowercase.
* 
* @param item - The string to be capitalized
* @returns {string} - The capitalized string
*/
export const capitalize = (item:string) => {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}

/*
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
export function getDiscountedPrice(price:number, discount:{type:number; value:number}) {
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

export function capitalizeName(name:string) {
  return name.split(" ").map((s) => capitalize(s)).join(" ");
}

export type DiffItem = {
  path: string;      // e.g. "variants[1].stock[0].quantity"
  a: any;            // valor en objeto A
  b: any;            // valor en objeto B
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

export function diffObjects(a: any, b: any, opts: DiffOptions = {}): DiffItem[] {
  const { ignoreKeys = ["createdAt", "updatedAt", "deletedAt"], arrayKeyMap = {}, maxDepth = 50 } = opts;
  const diffs: DiffItem[] = [];
  const seen = new WeakSet<any>();

  function pushDiff(path: string, va: any, vb: any) {
    diffs.push({ path, a: va, b: vb });
  }

  function walk(va: any, vb: any, path = "", depth = 0) {
    if (depth > maxDepth) {
      pushDiff(path || ".", va, vb);
      return;
    }

    // same reference shortcut
    if (va === vb) return;

    // primitives
    if (isPrimitive(va) || isPrimitive(vb)) {
      if (!equalPrimitives(va, vb)) pushDiff(path || ".", va, vb);
      return;
    }

    // circular ref protection
    if (typeof va === "object" && va !== null) {
      if (seen.has(va)) {
        // si ambos son mismos objeto circular, nada que comparar
        if (va !== vb) pushDiff(path || ".", va, vb);
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
      const basePath = path.replace(/\[\d+\]/g, ""); // ej "variants[0].stock" -> "variants.stock"
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
          const subPath = path ? `${path}[${String(k)}]` : `[${String(k)}]`;
          if (itemA === undefined) pushDiff(subPath, undefined, itemB);
          else if (itemB === undefined) pushDiff(subPath, itemA, undefined);
          else walk(itemA, itemB, subPath, depth + 1);
        }
      } else {
        // comparar por índice
        const length = Math.max(arrA.length, arrB.length);
        for (let i = 0; i < length; i++) {
          const subPath = `${path}[${i}]`;
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
      const subPath = path ? `${path}.${key}` : key;
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
