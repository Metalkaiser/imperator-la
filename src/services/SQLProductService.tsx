import { ProductService } from './ProductService';
import { productProps, appResponse, cartItem, saleData, NewActivityLog, NewProduct } from '@/app/utils/types';
import { prisma } from '@/config/prisma';

const notImplemented = {code: "not-implemented", response: null , status: 403}

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

  async updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse> {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: id },
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

  async getItemById(id: string, collection: string): Promise<appResponse> {
    const item = await prisma[collection as keyof typeof prisma].findUnique({ where: { id } });
    return {code: "success", response: item , status: 200};
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

  async deleteProduct(id: string | number): Promise<appResponse> {
    try {
      await prisma.product.update({
        where: { id: id },
        data: { 
          status: 2,
          isDeleted: true
        }
      });
      return {code: "success", response: null , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    console.log(cart, clientData);
    return notImplemented;
  }

  async getOrders(): Promise<appResponse> {
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: true,
        },
      });
      return {code: "success", response: orders , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getUsers(): Promise<appResponse> {
    try {
      const users = await prisma.user.findMany();
      return {code: "success", response: users , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    } 
  }

  async uploadImage(file: File, folder: string): Promise<{ ok: boolean; url?: string; error?: string; }> {
    console.log(file, folder);
    return { ok: false, error: "Not implemented" };
  }

  async createProduct(product: NewProduct): Promise<appResponse> {
    try {
      const newProduct = await prisma.product.create({
        data: product,
      });
      return {code: "success", response: newProduct , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number; }): Promise<appResponse> {
    try {
      const { limit = 50, startAfterId, from, to } = options || {};
      const whereClause: any = {};

      if (from || to) {
        whereClause.timestamp = {};
        if (from) whereClause.timestamp.gte = new Date(from);
        if (to) whereClause.timestamp.lte = new Date(to);
      }

      if (startAfterId) {
        const startAfterLog = await prisma.activity_logs.findUnique({ where: { id: startAfterId } });
        if (startAfterLog) {
          whereClause.timestamp = {
            ...whereClause.timestamp,
            gt: startAfterLog.timestamp,
          };
        }
      }

      const logs = await prisma.activity_logs.findMany({
        where: whereClause,
        orderBy: { timestamp: 'desc' },
        take: limit,
      });

      return {code: "success", response: logs , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }

  async setActivityLog(data: NewActivityLog): Promise<appResponse> {
    try {
      const newLog = await prisma.activity_logs.create({
        data: {
          userId: data.userId,
          action: data.action,
          target: data.target,
          timestamp: new Date(),
        },
      });
      return {code: "success", response: newLog , status: 200};
    } catch (error) {
      console.error(error)
      return {code: "unknown", response: null, status: 500};
    }
  }
}
