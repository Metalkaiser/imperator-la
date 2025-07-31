import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { appResponse } from '@/app/utils/types';
import { sqlErrorMap } from './sqlErrorMap';

export async function handleSQL<T>(
  operation: () => Promise<T>
): Promise<appResponse> {
  try {
    const result = await operation();
    return {
      code: "success",
      response: result,
      status: 200
    };
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      const code = error.code;
      const mapped = sqlErrorMap[code] || { status: 500, code: "sql-unknown" };

      console.error(`[PrismaError] ${code}: ${error.message}`);
      return {
        code: mapped.code,
        response: null,
        status: mapped.status
      };
    }

    console.error(`[UnknownSQL] ${error?.message || String(error)}`);
    return {
      code: "sql-unknown",
      response: null,
      status: 500
    };
  }
}
