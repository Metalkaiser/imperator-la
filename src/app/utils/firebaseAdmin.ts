/*import admin from "firebase-admin";

if (!admin.apps.length) {
  let credential = undefined;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      credential = admin.credential.cert(parsed);
    } catch (e) {
      console.warn(e);
      credential = admin.credential.applicationDefault();
    }
  } else {
    credential = admin.credential.applicationDefault();
  }

  admin.initializeApp({ credential });
}

export default admin;
*/

// src/app/utils/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
  let credential: admin.credential.Credential | undefined;
  let projectId: string | undefined;
  let storageBucket: string | undefined;

  // Preferir FIREBASE_SERVICE_ACCOUNT_KEY (JSON en env)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      if (!parsed || !parsed.project_id) {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY presente pero sin project_id en el JSON.");
      } else {
        projectId = String(parsed.project_id);
      }
      credential = admin.credential.cert(parsed);
      // Si no se pasó explicitamente storage bucket, intentar inferirlo
      storageBucket = process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`;
    } catch (err) {
      console.warn("FIREBASE_SERVICE_ACCOUNT_KEY no es JSON válido. Intentando applicationDefault()", err);
      // fallback a applicationDefault (usa GOOGLE_APPLICATION_CREDENTIALS)
      credential = admin.credential.applicationDefault();
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Si se indicó ruta a fichero de credenciales
    credential = admin.credential.applicationDefault();
    // intentar tomar projectId / storageBucket de env explícitas
    projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    storageBucket = process.env.FIREBASE_STORAGE_BUCKET ?? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  } else {
    // No hay credenciales encontradas -> lanzar para detectar fallo temprano
    throw new Error(
      "No se encontraron credenciales de Firebase. Debes setear FIREBASE_SERVICE_ACCOUNT_KEY (JSON) o GOOGLE_APPLICATION_CREDENTIALS (path)."
    );
  }

  // Si hay envs específicas, respetarlas (útil en despliegues)
  projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? projectId;
  storageBucket = process.env.FIREBASE_STORAGE_BUCKET ?? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? storageBucket;

  // Normalizar projectId a string en minúsculas (si existe)
  if (projectId) {
    projectId = String(projectId).trim();
  }
  if (storageBucket) {
    storageBucket = String(storageBucket).trim();
  }

  // Inicializar con opciones explícitas (mejor para evitar invalid-argument)
  const initOptions: admin.AppOptions = { credential };
  if (projectId) initOptions.projectId = projectId;
  if (storageBucket) initOptions.storageBucket = storageBucket;

  admin.initializeApp(initOptions);

  // Log de depuración (remove/ajusta en producción)
  console.info("Firebase Admin initialized. projectId:", admin.app().options.projectId, "storageBucket:", admin.app().options.storageBucket);
}

export default admin;
