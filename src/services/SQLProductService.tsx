import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { prisma } from '@/config/prisma';

export class SQLProductService implements ProductService {
  async getAllProducts(): Promise<productProps[] | appResponse> {
    const products = await prisma.product.findMany();
    return products;
  }
  async getActiveProducts(): Promise<productProps[] | appResponse> {
    const products = await prisma.product.findMany({
      where: { status: 1 },
    });
    return products;
  }

  async getProductById(id: string): Promise<productProps | appResponse> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
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
      return { code: "success", status: 200 };
    } catch (error) {
      return {code: "unknown", status: 500};
    }
  }
}
