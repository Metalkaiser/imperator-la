// src/services/helpers/SQL/sqlWrapper.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { appResponse } from '@/app/utils/types';
import { sqlErrorMap } from './sqlErrorMap';

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message ?? String(err);
  if (typeof err === 'object' && err !== null) {
    try {
      const obj = err as Record<string, unknown>;
      if (typeof obj.message === 'string') return obj.message;
      return JSON.stringify(obj);
    } catch {
      return String(err);
    }
  }
  return typeof err === 'string' ? err : String(err);
}

export async function handleSQL<T>(
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
    // Manejo específico para errores conocidos de Prisma
    if (error instanceof PrismaClientKnownRequestError) {
      const code = error.code;
      const mapped = (sqlErrorMap as Record<string, { status: number; code: string }>)[code] || { status: 500, code: 'sql-unknown' };

      console.error(`[PrismaError] ${code}: ${error.message}`);
      return {
        code: mapped.code,
        response: null,
        status: mapped.status
      };
    }

    // Manejo genérico de otros errores
    const message = extractErrorMessage(error);
    console.error(`[UnknownSQL] ${message}`);

    return {
      code: 'sql-unknown',
      response: null,
      status: 500
    };
  }
}
