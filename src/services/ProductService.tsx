import { productProps, appResponse, cartItem, saleData, activity_logs, NewActivityLog } from "@/app/utils/types";

export interface ProductService {
  getAllProducts(): Promise<appResponse>;
  getActiveProducts(): Promise<appResponse>;
  getTopProducts(): Promise<appResponse>;
  getProductById(id: string): Promise<appResponse>;
  updateProduct(product: productProps): Promise<appResponse>;
  deleteProduct(id: string | number): Promise<appResponse>;
  getCartConfigs(): Promise<appResponse>;
  registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse>;
  getOrders(): Promise<appResponse>;
  getUsers(): Promise<appResponse>;
  getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number }): Promise<appResponse>;
  setActivityLog(data: NewActivityLog): Promise<activity_logs>
  migrateDB?(): Promise<appResponse>; // Optional method for debugging purposes
}
