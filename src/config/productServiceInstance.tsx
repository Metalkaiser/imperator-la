// src/config/productServiceInstance.tsx

import { ProductService } from '../services/ProductService';

const provider = process.env.DATA_PROVIDER;

async function getProductService(): Promise<ProductService> {
  switch (provider) {
    case 'firebase': {
      const dbModule = await import('@/services/FirebaseProductService');
      return new dbModule.FirebaseProductService();
    }
    case 'mongo': {
      const dbModule = await import('@/services/MongoProductService');
      return new dbModule.MongoProductService();
    }
    case 'sql': {
      const dbModule = await import('@/services/SQLProductService');
      return new dbModule.SQLProductService();
    }
    case 'mock': {
      const dbModule = await import('@/services/MockProductService');
      return new dbModule.MockProductService();
    }
    default:
      throw new Error(`Data provider not supported: ${provider}`);
  }
}

export default getProductService;