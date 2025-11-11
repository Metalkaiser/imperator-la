import { ProductService } from './ProductService';
import { appResponse, productProps, topProductsProps, PaymentMethod, cartItem, saleData, NewActivityLog, activity_logs, NewProduct } from '@/app/utils/types';
import { getDb } from '@/config/mongoClient';
import { dbCollections, noProductError } from '@/app/utils/utils';
import { MongoError } from 'mongodb';

const notImplemented = {code: "not-implemented", response: null , status: 403}

export class MongoProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const products = await collection.find({}).toArray();
      return products.length ? 
        {code: "success", response: products , status: 200} :
        {code: "conection-failed", response: null, status: 503};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getActiveProducts(): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const products = await collection.find({ status: 1 }).toArray();
      return products.length ? 
        {code: "success", response: products , status: 200} :
        {code: "conection-failed", response: null, status: 503};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }


  async getTopProducts(): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<topProductsProps>(dbCollections.topProducts);
      const topProducts = await collection.find({}).toArray();
      if (topProducts.length === 0) {
        return {code: "not-found", response: null, status: 404};
      }
      return {code: "success", response: topProducts , status: 200};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getProductById(id: string): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const product = await collection.findOne({ id });
      if (product) {
        return {code: "success", response: product , status: 200};
      }
      return noProductError;
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getItemById(id: string, collection: string): Promise<appResponse> {
    try {
      const db = await getDb();
      const dbCollection = db.collection(collection);
      const item = await dbCollection.findOne({ id });
      if (item) {
        return {code: "success", response: item , status: 200};
      }
      return { code: "not-found", response: null, status: 404 };
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const result = await collection.updateOne(
        { id: id },
        { $set: product }
      );

      if (result.matchedCount === 0) {
        return { code: "not-found", response: null, status: 404 };
      }

      return {code: "success", response: product , status: 200};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async uploadImage(file: File, folder: string): Promise<{ ok: boolean; url?: string; error?: string; }> {
    console.log(file, folder);
    return { ok: false, error: "Not implemented" };
  }

  async deleteImage(url: string): Promise<{ ok: boolean; message: string; }> {
    console.log(url);
    return { ok: false, message: "Not implemented" };
  }

  async getCartConfigs(): Promise<appResponse> {
    try {
      const db = await getDb();
      const paymentCollection = db.collection<PaymentMethod>(dbCollections.payment);
      const shippingCollection = db.collection<PaymentMethod>(dbCollections.shipping);
      const paymentMethods = await paymentCollection.find({}).toArray();
      const shippingMethods = await shippingCollection.find({}).toArray();

      const response = {
        paymentMethods: paymentMethods,
        shippingMethods: shippingMethods
      }

      return {code: "success", response: response , status: 200};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async deleteProduct(id: string | number): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const result = await collection.deleteOne({ id });

      if (result.deletedCount === 0) {
        return { code: "not-found", response: null, status: 404 };
      }

      return {code: "success", response: null , status: 200};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    console.log(cart, clientData)
    return notImplemented;
  }

  async getOrders(): Promise<appResponse> {
    return notImplemented;
  }

  async getUsers(): Promise<appResponse> {
    return notImplemented;
  }

  async createProduct(product: NewProduct): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection(dbCollections.products);
      const result = await collection.insertOne(product);

      if (result.insertedId) {
        return {code: "success", response: { productId: result.insertedId.toString() } , status: 200};
      }

      return {code: "insertion-failed", response: null, status: 500};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number; }): Promise<appResponse> {
    console.log(options);
    return notImplemented;
  }

  async setActivityLog(data: NewActivityLog): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection(dbCollections.activity_logs);
      const result = await collection.insertOne({
        ...data,
        timestamp: Date.now()
      });

      if (result.insertedId) {
        return {code: "success", response: { logId: result.insertedId.toString() } , status: 200};
      }

      return {code: "insertion-failed", response: null, status: 500};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }

  async migrateDB(): Promise<appResponse> {
    try {
      const db = await getDb();
      // Example migration: ensure indexes
      const productCollection = db.collection(dbCollections.products);
      await productCollection.createIndex({ id: 1 }, { unique: true });

      const logsCollection = db.collection<activity_logs>(dbCollections.activity_logs);
      await logsCollection.createIndex({ timestamp: -1 });

      return {code: "success", response: null , status: 200};
    } catch (error) {
      console.error((error as MongoError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }
}
