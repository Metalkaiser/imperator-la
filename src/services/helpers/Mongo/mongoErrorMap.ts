export const mongoErrorMap: Record<string, { status: number; code: string }> = {
  // Validación
  "ValidationError": { status: 400, code: "validation-error" },
  "CastError": { status: 400, code: "invalid-id-format" },

  // Duplicados (índices únicos)
  "MongoServerError": { status: 409, code: "duplicate-key" }, // puedes ajustar esto por mensaje si quieres

  // Conexión
  "MongoNetworkError": { status: 503, code: "network-error" },

  // Otros
  "DocumentNotFoundError": { status: 404, code: "document-not-found" },
};