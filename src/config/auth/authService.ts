import { User } from "@/app/utils/types";

export interface AuthService {
  /**
   * Log in a user with email and password.
   * 
   * @param email The user's email address.
   * @param password The user's password.
   *
   * @returns success: true and user data if login is successful; otherwise success: false and an error message.
   * @returns user: User object on success.
   * @returns message: Error message on failure.
   */
  login(email: string, password: string): Promise<{ success: boolean; user?: User, message?: string }>;
  
  /**
   * Log out the current user by clearing session cookies or tokens.
   *
   * @returns success: true if logout is successful; otherwise success: false and an error message.
   * @returns message: Optional message indicating the result of the logout operation.
   */
  logout(): Promise<{ success: boolean; message?: string }>;

  /**
   * Get the currently authenticated user.
   *
   * @returns The User object if a user is authenticated; otherwise null.
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Add a new user to the system.
   * 
   * @param user The user data to add.
   * @param password The password for the new user.
   * @returns success: true if user is added successfully; otherwise success: false and an error message.
   * @returns message: Error message on failure.
   */
  createUser(user: User, password: string): Promise<{ success: boolean; message: string }>;
}