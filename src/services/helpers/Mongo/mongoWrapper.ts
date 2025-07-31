import { appResponse } from '@/app/utils/types';
import { mongoErrorMap } from './mongoErrorMap';

export async function handleMongo<T>(
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
    const name = error?.name || "UnknownMongoError";
    const mapped = mongoErrorMap[name] || { status: 500, code: "mongo-unknown" };

    console.error(`[MongoError] ${name}: ${error?.message}`);
    return {
      code: mapped.code,
      response: null,
      status: mapped.status
    };
  }
}
