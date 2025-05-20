import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { mockProducts } from '@/app/utils/mockinfo';
import { noProductError } from '@/app/utils/utils';

export class MockProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    return mockProducts.length ?
      {code: "success", response: mockProducts , status: 200} :
      {code: "conection-failed", response: null , status: 503}
  }

  async getActiveProducts(): Promise<appResponse> {
    let activeProds: productProps[] = [];
    mockProducts.map((product) => {
      if (product.status === 1) {
        activeProds.push(product);
      }
    });

    return activeProds.length ?
    {code: "success", response: activeProds , status: 200} :
    {code: "conection-failed", response: null , status: 503}
  }

  async getProductById(id: string | number): Promise<appResponse> {
    const product = mockProducts.find(p => p.id === id);
    return product ? {code: "success", response: product , status: 200} :
    noProductError;
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    return {code: "success-edit", response: product , status: 200}
  }
}
