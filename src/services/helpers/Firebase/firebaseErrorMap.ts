export const firebaseErrorMap: Record<string, { status: number; code: string }> = {
  // Autentication y autorization
  "permission-denied": { status: 403, code: "permission-denied" },
  "unauthenticated": { status: 401, code: "unauthenticated" },

  // Documents
  "not-found": { status: 404, code: "not-found" },
  "already-exists": { status: 409, code: "already-exists" },

  // Conectivity
  "unavailable": { status: 503, code: "service-unavailable" },
  "deadline-exceeded": { status: 504, code: "timeout" },

  // Validations
  "invalid-argument": { status: 400, code: "invalid-argument" },
  "failed-precondition": { status: 412, code: "precondition-failed" },

  // Other
  "internal": { status: 500, code: "internal-error" },
  "unknown": { status: 500, code: "unknown" },
};
