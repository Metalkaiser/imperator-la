import { authConfigs } from "../websiteConfig/authConfig";
import { AuthService } from "./authService";

const authSource = authConfigs.source || 'mock';

let authServiceInstance: AuthService;

export async function getAuthService(): Promise<AuthService> {
  if (authServiceInstance) return authServiceInstance;

  switch (authSource) {
    case 'firebase': {
      const { FirebaseAuthService } = await import('./services/firebaseAuthServices');
      authServiceInstance = new FirebaseAuthService();
      break;
    }
    case 'mock':
    default: {
      break;
    }
  }

  return authServiceInstance;
}