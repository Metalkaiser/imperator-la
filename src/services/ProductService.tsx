import { productProps, appResponse, movementsProps } from "@/app/utils/types";

export interface ProductService {
  getAllProducts(): Promise<productProps[] | appResponse>;
  getActiveProducts(): Promise<productProps[] | appResponse>;
  getProductById(id: string): Promise<productProps | appResponse>;
  updateProduct(product: productProps): Promise<appResponse>;
}
