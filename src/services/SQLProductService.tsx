import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { prisma } from '@/config/prisma';

export class SQLProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    const products = await prisma.product.findMany();
    return {code: "success", response: products , status: 200};
  }
  async getActiveProducts(): Promise<appResponse> {
    const products = await prisma.product.findMany({
      where: { status: 1 },
    });
    return {code: "success", response: products , status: 200};
  }

  async getTopProducts(): Promise<appResponse> {
    const topProducts = await prisma.topProducts.findMany();
    return {code: "success", response: topProducts , status: 200};
  }

  async getProductById(id: string): Promise<appResponse> {
    const product = await prisma.product.findUnique({ where: { id } });
    return {code: "success", response: product , status: 200};
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: {
          name: product.name,
          price: product.price,
          status: product.status,
          description: product.description,
          // Add other fields as necessary
        },
      });
      return {code: "success", response: updatedProduct , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getCartConfigs(): Promise<appResponse> {
    const payment = await prisma.payment.findMany();
    const shipping = await prisma.shipping.findMany();

    const response = {
      paymentMethods: payment,
      shippingMethods: shipping
    }

    return {code: "success", response: response , status: 200};
  }
}
