import { ProductService } from './ProductService';
import { appResponse, productProps, topProductsProps, PaymentMethod, shippingMethod } from '@/app/utils/types';
import { getDb } from '@/config/mongoClient';
import { dbCollections, noProductError } from '@/app/utils/utils';

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
      return {code: "unknown", response: null, status: 500};
    }
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    try {
      const db = await getDb();
      const collection = db.collection<productProps>(dbCollections.products);
      const result = await collection.updateOne(
        { id: product.id },
        { $set: product }
      );

      if (result.matchedCount === 0) {
        return { code: "not-found", response: null, status: 404 };
      }

      return {code: "success", response: product , status: 200};
    } catch (error) {
      return {code: "unknown", response: null, status: 500};
    }
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
      return {code: "unknown", response: null, status: 500};
    }
  }
}
