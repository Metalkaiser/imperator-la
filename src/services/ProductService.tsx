import { productProps, appResponse, cartItem, saleData } from "@/app/utils/types";

export interface ProductService {
  getAllProducts(): Promise<appResponse>;
  getActiveProducts(): Promise<appResponse>;
  getTopProducts(): Promise<appResponse>;
  getProductById(id: string): Promise<appResponse>;
  updateProduct(product: productProps): Promise<appResponse>;
  getCartConfigs(): Promise<appResponse>;
  registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse>;
  migrateDB?(): Promise<appResponse>; // Optional method for debugging purposes
}
