import { SQLProductService } from '@/services/SQLProductService';
import { FirebaseProductService } from '../services/FirebaseProductService';
import { ProductService } from '../services/ProductService';
import { MongoProductService } from '@/services/MongoProductService';
import { MockProductService } from '@/services/MockProductService';

const provider = process.env.DATA_PROVIDER;

let productService: ProductService;

switch (provider) {
  case 'firebase':
    productService = new FirebaseProductService();
    break;
  case 'mongo':
    productService = new MongoProductService();
    break;
  case 'sql':
    productService = new SQLProductService();
    break;
  case 'mock':
    productService = new MockProductService();
    break;
  default:
    throw new Error(`Data provider not supported: ${provider}`);
}

export default productService;