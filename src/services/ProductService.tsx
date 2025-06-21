import { productProps, appResponse } from "@/app/utils/types";

export interface ProductService {
  getAllProducts(): Promise<appResponse>;
  getActiveProducts(): Promise<appResponse>;
  getTopProducts(): Promise<appResponse>;
  getProductById(id: string): Promise<appResponse>;
  updateProduct(product: productProps): Promise<appResponse>;
}
