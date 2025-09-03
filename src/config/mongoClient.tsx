// src/config/mongoClient.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

if (!uri) throw new Error('Falta MONGODB_URI en el archivo .env');
if (!dbName) throw new Error('Falta MONGODB_DB en el archivo .env');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// 👇 Declaramos el tipo para evitar any
declare global {
  // `var` porque `global` es un objeto en Node.js, no un módulo con `let`/`const`
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // Usar instancia global en desarrollo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción: nueva conexión
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}