import { z } from "zod";
import { allCategories } from "../utils";

const categoryIndices = allCategories.map((_, i) => i);

const MAX_IMAGE_BYTES = 512_000;
const ALLOWED_MIMES = ["image/webp", "image/jpeg", "image/png", "image/bmp"];

export const updateProductSchema = z.object({
  name: z.string().min(2, { error: "El nombre es obligatorio y requiere más de dos caracteres" }).trim().optional(),
  mainSku: z.string().min(2, {error: "El SKU principal es obligatorio y de al menos 2 caracteres"}).trim().optional(),
  description: z.string().min(10, {error: "La descripción es obligatoria y de al menos 10 caracteres"}).trim().optional(),
  price: z.number().gt(0, "El precio debe ser mayor a cero").optional(),
  discount: z.object({
    type: z.number().int().refine(v => v === 0 || v === 1, "El tipo de descuento solo puede ser Porcentaje o Valor absoluto"),
    value: z.number().gt(0, "La cantidad del descuento debe ser mayor a cero")
  }).optional(),
  status: z.number().int().refine(v => [0,1,2].includes(v), "El estado solo puede ser Disponible, Agotado o Eliminado").optional(),
  variants: z.array(z.object({
    color: z.string().trim(),
    sku: z.string().min(1, {error: "El sku es requerido en cada variante"}).trim(),
    stock: z.array(z.object({
      name: z.string().min(1, {error: "El nombre de la talla debe tener al menos un caracter"}).trim(),
      quantity: z.number().nonnegative("La cantidad de cada talla debe ser mayor o igual a cero")
    })).min(1, {error: "Cada variante debe tener al menos una talla"})
  })).min(1, {error: "El producto debe tener al menos una variante"}).superRefine((variants, ctx) => {
      const skus = variants.map(v => v.sku.trim());
      const uniqueSkus = new Set(skus);

      if (uniqueSkus.size !== skus.length) {
        ctx.addIssue({
          code: "custom",
          message: "SKUs duplicados entre variantes",
          path: ["variants"],
        });
      }
    }).optional()
});


export const fileSchema = z.instanceof(File, { error: "Archivo inválido" })
  .refine((file) => {
    return ALLOWED_MIMES.includes(file.type);
  }, `Solo los siguietes tipos están permitidos: ${ALLOWED_MIMES.join(", ")}`)
  .refine((file) => {
    return file.size <= MAX_IMAGE_BYTES;
  }, `La imagen debe pesar máximo ${MAX_IMAGE_BYTES / 1024} KB.`);


export const newProductSchema = z.object({
  name: z.string().min(2, { error: "El nombre es obligatorio y requiere más de dos caracteres" }).trim(),
  description: z.string().min(10, {error: "La descripción es obligatoria y de al menos 10 caracteres"}).trim(),
  price: z.number().gt(0, "El precio debe ser mayor a cero"),
  discount: z.object({
    type: z.number().int().refine(v => v === 0 || v === 1, "El tipo de descuento solo puede ser Porcentaje o Valor absoluto"),
    value: z.number().gt(0, "La cantidad del descuento debe ser mayor a cero")
  }).optional(),
  category: z.preprocess(
    (val) => {
      if (val !== "") { return Number(val) }
      return val
    },
    z.number({ error: "Seleccione una categoría válida"})
      .int({ error: "Formato de categoría inválida" })
      .refine((v) => categoryIndices.includes(v), { error: "La categoría seleccionada no es válida" })
  ),
  subcategory: z.preprocess(
    (val) => {
      if (val !== "" && val !== undefined) { return Number(val) }
      return val
    },
    z.number({ error: "Seleccione una subcategoría válida"})
      .int({ error: "Formato de subcategoría inválida" })
      .refine((v) => v === undefined || categoryIndices.includes(v), { error: "La subcategoría seleccionada no es válida" })
  ).optional(),
  mainSku: z.string().min(2, {error: "El SKU principal es obligatorio y de al menos 2 caracteres"}).trim(),
  status: z.number().int().refine(v => [0,1,2].includes(v), "El estado solo puede ser Disponible, Agotado o Eliminado"),
  variants: z.array(z.object({
    color: z.string().trim(),
    sku: z.string().min(1, {error: "El sku es requerido en cada variante"}).trim(),
    stock: z.array(z.object({
      name: z.string().min(1, {error: "El nombre de la talla debe tener al menos un caracter"}).trim(),
      quantity: z.number().nonnegative("La cantidad de cada talla debe ser mayor o igual a cero")
    })).min(1, {error: "Cada variante debe tener al menos una talla"})
  })).min(1, {error: "El producto debe tener al menos una variante"}).superRefine((variants, ctx) => {
        const skus = variants.map(v => v.sku.trim());
        const uniqueSkus = new Set(skus);

        if (uniqueSkus.size !== skus.length) {
          ctx.addIssue({
            code: "custom",
            message: "SKUs duplicados entre variantes",
            path: ["variants"],
          });
        }
      })
});

export const newProductImagesSchema = z.object({
  thumbnail: fileSchema,
  images: z.array(fileSchema).min(1, {error: "Debe subir al menos una imagen adicional"}).max(10, {error: "El máximo de imágenes adicionales es 10"})
});
