import { z } from "zod";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIMES = ["image/webp"];
const ALLOWED_EXTENSIONS = [".webp"];

const stockSchema = z.object({
  name: z.string().min(1, {error: "El nombre de la talla debe tener al menos un caracter"}),
  quantity: z.number().nonnegative("La cantidad de cada talla debe ser mayor o igual a cero")
});

const discountSchema = z.object({
  type: z.number().int().refine(v => v === 0 || v === 1, "El tipo de descuento solo puede ser Porcentaje o Valor absoluto"),
  value: z.number().nonnegative("La cantidad del descuento debe ser mayor o igual a cero")
}).optional().nullable();

const variantSchema = z.object({
  color: z.string(),
  image: z.string(),
  sku: z.string().min(1, {error: "El sku es requerido en cada variante"}),
  stock: z.array(stockSchema).min(1, {error: "Cada variante debe tener al menos una talla"})
});

export const updateProductSchema = z.object({
  name: z.string().min(2, { error: "El nombre es obligatorio y requiere más de dos caracteres" }).optional(),
  description: z.string().min(10, {error: "La descripción es obligatoria y de al menos 10 caracteres"}).optional(),
  price: z.number().nonnegative("El precio debe ser mayor o igual a cero").optional(),
  discount: discountSchema,
  category: z.number().optional(),
  subcategory: z.number().optional(),
  status: z.number().int().refine(v => [0,1,2].includes(v), "El estado solo puede ser Disponible, Agotado o Eliminado").optional(),
  thumbnail: z.string().min(1).optional(),
  images: z.array(z.string()).optional(),
  mainSku: z.string().min(2, {error: "El SKU principal es obligatorio y de al menos 2 caracteres"}).optional(),
  variants: z.array(variantSchema).optional(),
  position: z.number().optional().nullable()
});


export const fileSchema = z.instanceof(File)
  .refine((file) => {
    return ALLOWED_MIMES.includes(file.type);
  }, `Solo los siguietes tipos están permitidos: ${ALLOWED_MIMES.join(", ")}`)
  .refine((file) => {
    const name = (file as File).name || "";
    return ALLOWED_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
  }, `Solo los siguientes tipos de archivos están permitidos: ${ALLOWED_EXTENSIONS.join(", ")}`)
  .refine((file) => {
    return file.size <= MAX_IMAGE_BYTES;
  }, `La imagen debe pesar máximo ${MAX_IMAGE_BYTES / (1024 * 1024)} MB`);
