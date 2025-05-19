import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { mockProducts } from '@/app/utils/mockinfo';
import { noProductError } from '@/app/utils/utils';

export class MockProductService implements ProductService {
  async getAllProducts(): Promise<productProps[] | appResponse> {
    return mockProducts.length ? mockProducts : {code: "conection-failed", status: 503}
  }

  async getActiveProducts(): Promise<productProps[] | appResponse> {
    let activeProds: productProps[] = [];
    mockProducts.map((product) => {
      if (product.status === 1) {
        activeProds.push(product);
      }
    });

    return activeProds.length ? activeProds : {code: "conection-failed", status: 503}
  }

  async getProductById(id: string | number): Promise<productProps | appResponse> {
    return mockProducts.find(p => p.id === id) || noProductError;
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    return {code: "success-edit", status: 200}
  }
}
