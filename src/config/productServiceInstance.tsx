// src/config/productServiceInstance.tsx

import { ProductService } from '../services/ProductService';

const provider = process.env.DATA_PROVIDER;

async function getProductService(): Promise<ProductService> {
  switch (provider) {
    case 'firebase': {
      const module = await import('@/services/FirebaseProductService');
      return new module.FirebaseProductService();
    }
    case 'mongo': {
      const module = await import('@/services/MongoProductService');
      return new module.MongoProductService();
    }
    case 'sql': {
      const module = await import('@/services/SQLProductService');
      return new module.SQLProductService();
    }
    case 'mock': {
      const module = await import('@/services/MockProductService');
      return new module.MockProductService();
    }
    default:
      throw new Error(`Data provider not supported: ${provider}`);
  }
}

export default getProductService;