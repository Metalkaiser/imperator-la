import { ProductService } from './ProductService';
import { appResponse, productProps } from '@/app/utils/types';
import { getDb } from '@/config/mongoClient';
import { dbCollections, noProductError } from '@/app/utils/utils';

export class MongoProductService implements ProductService {
  async getAllProducts(): Promise<productProps[] | appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const products = await collection.find({}).toArray();
    return products.length ? products : {code: "conection-failed", status: 503};
  }

  async getActiveProducts(): Promise<productProps[] | appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const products = await collection.find({ status: 1 }).toArray();
    return products.length ? products : {code: "conection-failed", status: 503};
  }

  async getProductById(id: string): Promise<productProps | appResponse> {
    const db = await getDb();
    const collection = db.collection<productProps>(dbCollections.products);
    const product = await collection.findOne({ id });
    if (product) {
      return product;
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
        return { code: "not-found", status: 404 };
      }

      return { code: "success", status: 200 };
    } catch (error) {
      return {code: "unknown", status: 500};
    }
  }
}
