export const sqlErrorMap: Record<string, { status: number; code: string }> = {
  // Constraint violations
  "P2002": { status: 409, code: "unique-constraint-failed" },   // Duplicado
  "P2003": { status: 400, code: "foreign-key-violation" },
  "P2004": { status: 400, code: "constraint-failed" },

  // Not found
  "P2025": { status: 404, code: "record-not-found" },

  // Connection
  "P1001": { status: 503, code: "db-not-connected" },

  // Others
  "P2000": { status: 400, code: "value-too-large" },
};
