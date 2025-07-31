import { FirebaseError } from 'firebase/app';
import { appResponse } from '@/app/utils/types';
import { firebaseErrorMap } from './firebaseErrorMap';

export async function handleFirebase<T>(
  operation: () => Promise<T>
): Promise<appResponse> {
  try {
    const result = await operation();
    return {
      code: "success",
      response: result,
      status: 200
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { code } = error;
      const mapped = firebaseErrorMap[code] || { status: 500, code: "firebase-unknown" };

      console.error(`[FirebaseError] ${code}: ${error.message}`);
      return {
        code: mapped.code,
        response: null,
        status: mapped.status
      };
    }

    console.error(`[UnknownError] ${String(error)}`);
    return {
      code: "internal-error",
      response: null,
      status: 500
    };
  }
}
