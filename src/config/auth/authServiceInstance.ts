import { authConfigs } from "../websiteConfig/authConfig";
import { AuthService } from "./authService";
import { User } from "@/app/utils/types";

const authSource = authConfigs.source || 'mock';

let authServiceInstance: AuthService;

class UnsupportedAuthService implements AuthService {
  async login(_email: string, _password: string): Promise<{ success: boolean; message?: string }> {
    void _email;
    void _password;
    return { success: false, message: "Proveedor no implementado" };
  }

  async logout(): Promise<{ success: boolean; message?: string }> {
    return { success: false, message: "Proveedor no implementado" };
  }

  async getCurrentUser() {
    return null;
  }

  async createUser(_user: User, _password: string): Promise<{ success: boolean; message: string }> {
    void _user;
    void _password;
    return { success: false, message: "Proveedor no implementado" };
  }

  async changePassword(_currentPassword: string, _newPassword: string): Promise<{ success: boolean; message: string }> {
    void _currentPassword;
    void _newPassword;
    return { success: false, message: "Proveedor no implementado" };
  }

  validateNewPassword(_newPassword: string) {
    void _newPassword;
    return { ok: false, message: "Proveedor no implementado" };
  }
}

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
      authServiceInstance = new UnsupportedAuthService();
      break;
    }
  }

  return authServiceInstance;
}
