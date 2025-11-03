import { productProps, appResponse, cartItem, saleData, NewActivityLog, NewProduct } from "@/app/utils/types";

export interface ProductService {
  getAllProducts(): Promise<appResponse>;
  getActiveProducts(): Promise<appResponse>;
  getTopProducts(): Promise<appResponse>;
  getItemById(id: string, collection: string): Promise<appResponse>;
  updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse>;
  deleteProduct(id: string | number): Promise<appResponse>;
  getCartConfigs(): Promise<appResponse>;
  registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse>;
  getOrders(): Promise<appResponse>;
  getUsers(): Promise<appResponse>;
  getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number }): Promise<appResponse>;
  setActivityLog(data: NewActivityLog): Promise<appResponse>
  uploadImage(file: File, folder: string): Promise<{ok: boolean; url?: string; error?: string}>;
  createProduct(product: NewProduct): Promise<appResponse>;
  migrateDB?(): Promise<appResponse>; // Optional method for debugging purposes
}
