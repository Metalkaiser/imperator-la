// src/services/helpers/Mongo/mongoWrapper.ts
import { appResponse } from '@/app/utils/types';
import { mongoErrorMap } from './mongoErrorMap';

function extractErrorInfo(err: unknown): { name: string; message: string } {
  // Caso común: Error nativo o subclase de Error
  if (err instanceof Error) {
    return {
      name: err.name ?? 'UnknownMongoError',
      message: err.message ?? String(err)
    };
  }

  // Si es un objeto (no null), tratar de leer propiedades con seguridad
  if (typeof err === 'object' && err !== null) {
    const obj = err as Record<string, unknown>;
    const name = typeof obj.name === 'string' ? obj.name : 'UnknownMongoError';
    const message = typeof obj.message === 'string' ? obj.message : JSON.stringify(obj);
    return { name, message };
  }

  // Otros tipos primitivos (string, number, etc.)
  return { name: 'UnknownMongoError', message: typeof err === 'string' ? err : String(err) };
}

export async function handleMongo<T>(
  operation: () => Promise<T>
): Promise<appResponse> {
  try {
    const result = await operation();
    return {
      code: 'success',
      response: result,
      status: 200
    };
  } catch (error: unknown) {
    const { name, message } = extractErrorInfo(error);

    const mapped = (mongoErrorMap as Record<string, { status: number; code: string }>)[name] || { status: 500, code: 'mongo-unknown' };

    // Imprimir información segura del error
    console.error(`[MongoError] ${name}: ${message}`);

    return {
      code: mapped.code,
      response: null,
      status: mapped.status
    };
  }
}
