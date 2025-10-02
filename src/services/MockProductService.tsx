import { ProductService } from './ProductService';
import { productProps, appResponse, cartItem, saleData, sale, activity_logs, NewActivityLog } from '@/app/utils/types';
import { 
  firebaseProductsList as mutableProducts,
  mockTopProds as mutableTop,
  mockSales as mutableSales,
  paymentMethods as mutablePays,
  shippingMethods as mutableShips,
} from '@/app/utils/mockinfo';
import { noProductError } from '@/app/utils/utils';

const notImplemented = {code: "not-implemented", response: null , status: 403}

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
    const topProducts = mutableTop;
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
    const payment = mutablePays;
    const shipping = mutableShips;

    const response = {
      paymentMethods: payment,
      shippingMethods: shipping
    }

    return {code: "success", response: response , status: 200}
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    try {
      const updatedProducts: productProps[] = [];

      for (const item of cart) {
        const product = mutableProducts.find(p => p.id === item.id);
        if (!product) {
          return { code: "product-not-found", response: { id: item.id }, status: 404 };
        }

        const variant = product.variants.find(v => v.sku === item.sku);
        if (!variant) {
          return { code: "variant-not-found", response: { sku: item.sku }, status: 404 };
        }

        const stockItem = variant.stock.find(s => s.name === item.size);
        if (!stockItem) {
          return { code: "size-not-found", response: { size: item.size }, status: 404 };
        }

        if (stockItem.quantity < item.qt) {
          return {
            code: "insufficient-stock",
            response: {
              sku: item.sku,
              size: item.size,
              available: stockItem.quantity
            },
            status: 409
          };
        }

        /* Descontar del stock
        stockItem.quantity -= item.qt;
        updatedProducts.push(product);*/
      }

      // Registrar la venta
      const newSale:sale = {
        id: mutableSales.length + 1,
        clientName: clientData.clientName || "",
        clientId: clientData.clientId,
        clientPhone: clientData.clientPhone || "",
        clientEmail: clientData.clientEmail || "",
        clientAddress: clientData.clientAddress,
        paymentMethodId: clientData.paymentMethodId,
        paymentData: clientData.paymentData,
        shippingMethod: clientData.shippingMethod,
        shippingData: clientData.shippingData || {},
        giftOption: clientData.giftOption || [],
        totalAmount: clientData.totalAmount,
        items: cart,
        status: "placed",
        notes: clientData.notes || "",
        createdAt: new Date().toISOString()
      };

      mutableSales.push(newSale);

      return {
        code: "success",
        response: {
          updatedProducts: updatedProducts.map(p => p.id),
          totalItems: cart.length
        },
        status: 200
      };
    } catch (err) {
      return { code: "mock-error", response: err, status: 500 };
    }
  }
  
  async deleteProduct(id: string | number): Promise<appResponse> {
    console.log(id);
    return notImplemented;
  }

  async getOrders(): Promise<appResponse> {
    return notImplemented;
  }

  async getUsers(): Promise<appResponse> {
    return notImplemented;
  }

  async getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number; }): Promise<appResponse> {
    console.log(options);
    return notImplemented;
  }

  async setActivityLog(data: NewActivityLog): Promise<activity_logs> {
    console.log(data)
    return {} as activity_logs;
  }
}
