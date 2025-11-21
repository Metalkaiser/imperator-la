type FirebaseAuthError = {
  fberror: string;
  message: string;
}[];

const firebaseAuthErrors: FirebaseAuthError = [
  { fberror: "auth/claims-too-large", message: "Los datos personalizados son demasiado grandes. Intenta con menos información." },
  { fberror: "auth/email-already-exists", message: "El correo ya está en uso. Por favor usa otro." },
  { fberror: "auth/id-token-expired", message: "Tu sesión ha expirado. Por favor vuelve a iniciar sesión." },
  { fberror: "auth/id-token-revoked", message: "Tu sesión ha sido revocada. Inicia sesión nuevamente." },
  { fberror: "auth/insufficient-permission", message: "No tienes permisos para realizar esta acción." },
  { fberror: "auth/internal-error", message: "Ocurrió un error interno. Inténtalo de nuevo más tarde." },
  { fberror: "auth/invalid-argument", message: "Se proporcionó un argumento inválido. Revisa los datos ingresados." },
  { fberror: "auth/invalid-claims", message: "Los datos personalizados contienen valores inválidos." },
  { fberror: "auth/invalid-continue-uri", message: "La URL de continuación no es válida." },
  { fberror: "auth/invalid-creation-time", message: "La fecha de creación proporcionada no es válida." },
  { fberror: "auth/invalid-credential", message: "Las credenciales proporcionadas no son correctas." },
  { fberror: "auth/invalid-disabled-field", message: "El campo de “deshabilitado” tiene un valor inválido." },
  { fberror: "auth/invalid-display-name", message: "El nombre de usuario no es válido. Usa un nombre diferente." },
  { fberror: "auth/invalid-dynamic-link-domain", message: "El dominio del enlace dinámico no está configurado o autorizado." },
  { fberror: "auth/invalid-email", message: "El correo electrónico ingresado no es válido." },
  { fberror: "auth/invalid-email-verified", message: "El indicador de correo verificado tiene un valor inválido." },
  { fberror: "auth/invalid-hash-algorithm", message: "El algoritmo de hash proporcionado no es compatible." },
  { fberror: "auth/invalid-hash-block-size", message: "El tamaño del bloque en el hash no es válido." },
  { fberror: "auth/invalid-hash-derived-key-length", message: "La longitud de la clave derivada no es válida." },
  { fberror: "auth/invalid-hash-key", message: "La clave de hash proporcionada no es válida." },
  { fberror: "auth/invalid-identifier", message: "El identificador del usuario no es válido." },
  { fberror: "auth/invalid-instance-id", message: "El ID de instancia de la aplicación no es válido." },
  { fberror: "auth/invalid-uid", message: "El identificador del usuario (UID) no es válido." },
  { fberror: "auth/maximum-user-count-exceeded", message: "Se ha alcanzado el número máximo de usuarios permitidos." },
  { fberror: "auth/operation-not-allowed", message: "Esta operación no está permitida. Contacta al administrador." },
  { fberror: "auth/phone-number-already-exists", message: "El número de teléfono ya está en uso." },
  { fberror: "auth/project-not-found", message: "El proyecto de Firebase no se encontró." },
  { fberror: "auth/reserved-claims", message: "Se están usando atributos reservados no permitidos." },
  { fberror: "auth/session-cookie-expired", message: "La cookie de sesión ha expirado. Inicia sesión nuevamente." },
  { fberror: "auth/session-cookie-revoked", message: "La cookie de sesión ha sido revocada. Vuelve a autenticarte." },
  { fberror: "auth/uid-already-exists", message: "El identificador de usuario (UID) ya está en uso." },
  { fberror: "auth/user-not-found", message: "No se encontró el usuario. Verifica los datos o regístrate primero." }
];

export function getFirebaseAuthErrorMessage(fbErrorCode: string): string {
  // Buscar si contiene el código de error en el string
  const errorEntry = firebaseAuthErrors.find(entry => fbErrorCode.includes(entry.fberror));
  return errorEntry ? errorEntry.message : "Ocurrió un error desconocido. Inténtalo de nuevo.";
}
