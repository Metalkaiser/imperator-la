import admin from "firebase-admin";

if (!admin.apps.length) {
  let credential = undefined;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // si llegara el JSON en la variable de entorno, se parsea (ver Opción B)
    try {
      const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      credential = admin.credential.cert(parsed);
    } catch (e) {
      // si no es JSON, fallback a applicationDefault (usará GOOGLE_APPLICATION_CREDENTIALS)
      credential = admin.credential.applicationDefault();
    }
  } else {
    credential = admin.credential.applicationDefault(); // usa GOOGLE_APPLICATION_CREDENTIALS si está set
  }

  admin.initializeApp({ credential });
}

export default admin;
