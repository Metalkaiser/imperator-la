import { ProductService } from './ProductService';
import { appResponse, productProps, topProductsProps } from '@/app/utils/types';
import { getDb } from '@/config/mongoClient';
import { dbCollections, noProductError } from '@/app/utils/utils';

export class MongoProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const products = await collection.find({}).toArray();
    return products.length ? 
      {code: "success", response: products , status: 200} :
      {code: "conection-failed", response: null, status: 503};
  }

  async getActiveProducts(): Promise<appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const products = await collection.find({ status: 1 }).toArray();
    return products.length ? 
      {code: "success", response: products , status: 200} :
      {code: "conection-failed", response: null, status: 503};
  }


  async getTopProducts(): Promise<appResponse> {
    const db = await getDb();
    const collection = db.collection<topProductsProps>(dbCollections.topProducts);
    const topProducts = await collection.find({}).toArray();
    if (topProducts.length === 0) {
      return {code: "not-found", response: null, status: 404};
    }
    return {code: "success", response: topProducts , status: 200};
  }

  async getProductById(id: string): Promise<appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const product = await collection.findOne({ id });
    if (product) {
      return {code: "success", response: product , status: 200};
    }
    return noProductError;
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
}
