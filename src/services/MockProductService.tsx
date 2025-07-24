import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { mockProducts as mutableProducts, mockTopProds, paymentMethods, shippingMethods } from '@/app/utils/mockinfo';
import { noProductError } from '@/app/utils/utils';

export class MockProductService implements ProductService {

  async getAllProducts(): Promise<appResponse> {
    return mutableProducts.length ?
      {code: "success", response: mutableProducts , status: 200} :
      {code: "conection-failed", response: null , status: 503}
  }

  async getActiveProducts(): Promise<appResponse> {
    const activeProds: productProps[] = [];
    mutableProducts.map((product) => {
      if (product.status === 1) {
        activeProds.push(product);
      }
    });

    return activeProds.length ?
    {code: "success", response: activeProds , status: 200} :
    {code: "conection-failed", response: null , status: 503}
  }

  async getTopProducts(): Promise<appResponse> {
    const topProducts = mockTopProds;
    return {code: "success", response: topProducts , status: 200}
  }

  async getProductById(id: string | number): Promise<appResponse> {
    const product = mutableProducts.find(p => p.id === id);
    return product ? {code: "success", response: product , status: 200} :
    noProductError;
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    return {code: "success-edit", response: product , status: 200}
  }

  async getCartConfigs(): Promise<appResponse> {
    const payment = paymentMethods;
    const shipping = shippingMethods;

    const response = {
      paymentMethods: payment,
      shippingMethods: shipping
    }

    return {code: "success", response: response , status: 200}
  }
}
