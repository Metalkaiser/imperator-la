import { ProductService } from './ProductService';
import { productProps, appResponse, cartItem, saleData, sale, NewActivityLog, NewProduct, orderNote, PaymentMethod, shippingMethod, GiftOption } from '@/app/utils/types';
import { 
  mockProductList as mutableProducts,
  mockTopProds as mutableTop,
  mockSales as mutableSales,
  paymentMethods as mutablePays,
  shippingMethods as mutableShips,
  giftOptions as mutableGifts,
  mockActivity as mutableActivity
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

  async replaceTopProducts(productIds: Array<string | number>): Promise<appResponse> {
    mutableTop.splice(0, mutableTop.length);
    productIds.forEach((productId, index) => {
      mutableTop.push({
        id: `top_${index + 1}`,
        productId: String(productId),
      });
    });

    return { code: "success", response: mutableTop, status: 200 };
  }

  async getItemById(id: string, collection: string): Promise<appResponse> {
    switch (collection) {
      case "products":
        const product = mutableProducts.find(prod => String(prod.id) === id);
        if (!product) return noProductError;
        return {code: "success", response: product , status: 200}
      default:
        return {code: "invalid-collection", response: null , status: 400}
    }
  }

  async updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse> {
    const existingProduct = mutableProducts.find(p => p.id === id);
    //const copyProduct = { ...existingProduct };
    if (existingProduct === undefined) return {code: "product-not-found", response: null, status: 404}
    
    const index = mutableProducts.indexOf(existingProduct);
    product.updatedAt = Date.now();
    const updatedProduct = { ...existingProduct, ...product };
    if (updatedProduct.status !== 2) {
      delete updatedProduct.isDeleted;
    }
    if (product.discount === null) {
      delete updatedProduct.discount;
    }
    mutableProducts[index] = updatedProduct;
    return {code: "success", response: updatedProduct , status: 200}
  }

  async getCartConfigs(): Promise<appResponse> {

    const response = {
      paymentMethods: mutablePays,
      shippingMethods: mutableShips,
      giftOptions: mutableGifts
    }

    return {code: "success", response: response , status: 200}
  }

  async upsertPaymentMethod(method: PaymentMethod): Promise<appResponse> {
    const index = mutablePays.findIndex((item) => String(item.id) === String(method.id));
    const updated = { ...method };
    if (index >= 0) mutablePays[index] = updated;
    else mutablePays.push(updated);
    return { code: "success", response: updated, status: 200 };
  }

  async upsertShippingMethod(method: shippingMethod): Promise<appResponse> {
    const index = mutableShips.findIndex((item) => String(item.id) === String(method.id));
    const updated = { ...method };
    if (index >= 0) mutableShips[index] = updated;
    else mutableShips.push(updated);
    return { code: "success", response: updated, status: 200 };
  }

  async upsertGiftOption(option: GiftOption): Promise<appResponse> {
    const index = mutableGifts.findIndex((item) => String(item.id) === String(option.id));
    const updated = { ...option };
    if (index >= 0) mutableGifts[index] = updated;
    else mutableGifts.push(updated);
    return { code: "success", response: updated, status: 200 };
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
    const product = mutableProducts.find(p => p.id === id);
    if (product === undefined) return {code: "product-not-found", response: null, status: 404}
    
    product.status = 2;
    product.isDeleted = true;
    const index = mutableProducts.indexOf(product);
    mutableProducts[index] = product;

    return {code: "success", response: product, status: 200}
  }

  async getOrders(): Promise<appResponse> {
    const orders = [...mutableSales].sort((a, b) => {
      const ta = typeof a.createdAt === "number" ? a.createdAt : Date.parse(String(a.createdAt));
      const tb = typeof b.createdAt === "number" ? b.createdAt : Date.parse(String(b.createdAt));
      return tb - ta;
    });
    return { code: "success", response: orders, status: 200 };
  }

  async updateOrderStatus(id: string | number, status: string): Promise<appResponse> {
    const existing = mutableSales.find((sale) => String(sale.id) === String(id));
    if (!existing) return { code: "not-found", response: null, status: 404 };

    existing.status = status;
    existing.updatedAt = Date.now();
    return { code: "success", response: existing, status: 200 };
  }

  async addOrderNote(id: string | number, note: orderNote): Promise<appResponse> {
    const existing = mutableSales.find((sale) => String(sale.id) === String(id));
    if (!existing) return { code: "not-found", response: null, status: 404 };

    const notesHistory = Array.isArray(existing.notesHistory) ? [...existing.notesHistory] : [];
    notesHistory.push(note);
    existing.notesHistory = notesHistory;
    existing.updatedAt = Date.now();

    console.log(`Note added to order ${id}: ${note.text}. By ${note.authorName} at ${new Date(note.createdAt).toLocaleString()}`);

    return { code: "success", response: existing, status: 200 };
  }

  async uploadImage(file: File, destPath: string): Promise<{ ok: boolean; url?: string; error?: string; }> {
    const stamp = Date.now();
    const mockUrl = `https://mockstorage.com/${destPath}_${stamp}.${file.name.split('.').pop()}`;
    return { ok: true, url: mockUrl };
  }

  async deleteImage(url: string): Promise<{ ok: boolean; message: string; }> {
    return { ok: true, message: `Image at ${url} deleted successfully.` };
  }

  async createProduct(product: NewProduct): Promise<appResponse> {
    const newId = mutableProducts.length + 1;
    const timestamp = Date.now();

    const newProduct: productProps = { id: newId, ...product, createdAt: timestamp, updatedAt: timestamp };

    mutableProducts.push(newProduct);

    return {code: "success", response: newProduct.id , status: 200}
  }

  async getUsers(): Promise<appResponse> {
    return notImplemented;
  }

  async getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number; }): Promise<appResponse> {
    let logs = mutableActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (options) {
      const { limit, startAfterId, from, to } = options;

      if (from !== undefined) {
        logs = logs.filter(log => new Date(log.timestamp).getTime() >= from);
      }
      if (to !== undefined) {
        logs = logs.filter(log => new Date(log.timestamp).getTime() <= to);
      }
      if (startAfterId) {
        const startIndex = logs.findIndex(log => log.id === startAfterId);
        if (startIndex !== -1) {
          logs = logs.slice(startIndex + 1);
        }
      }
      if (limit !== undefined && limit > 0) {
        logs = logs.slice(0, limit);
      }
    }

    return { code: "success", response: logs, status: 200 };
  }

  async setActivityLog(data: NewActivityLog): Promise<appResponse> {
    try {
      const timestamp = Date.now();
      const id = `log_${mutableActivity.length + 1}`;

      const newLog = { ...data, timestamp: timestamp, id };

      mutableActivity.push(newLog);

      return {code: "success", response: newLog, status: 200}
    } catch (error) {
      return {code: "error", response: error, status: 500}
    }
  }
}
