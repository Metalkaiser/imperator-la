import { ProductService } from '../services/ProductService';

type Provider = 'firebase' | 'mongo' | 'sql' | 'mock';

// Caching: podemos guardar la instancia o la promesa de la instancia para evitar múltiples imports/conexiones
let instancePromise: Promise<ProductService> | null = null;

function getProviderName(): Provider {
  const raw = (process.env.DATA_PROVIDER ?? 'mock').toString().trim().toLowerCase();
  if (raw === 'firebase' || raw === 'mongo' || raw === 'sql' || raw === 'mock') {
    return raw as Provider;
  }
  throw new Error(`DATA_PROVIDER inválido: "${process.env.DATA_PROVIDER}". Valores válidos: firebase | mongo | sql | mock`);
}

const provider = process.env.DATA_PROVIDER?.toLowerCase();

async function getProductService(): Promise<ProductService> {
  // Si ya estamos inicializando/tenemos la instancia, devolverla (evita race conditions)
  if (instancePromise) return instancePromise;

  instancePromise = (async () => {
    const provider = getProviderName();

    switch (provider) {
      case 'firebase': {
        const dbModule = await import('@/services/FirebaseProductService');
        return new dbModule.FirebaseProductService() as ProductService;
      }
      case 'mongo': {
        const dbModule = await import('@/services/MongoProductService');
        return new dbModule.MongoProductService() as ProductService;
      }
      case 'sql': {
        const dbModule = await import('@/services/SQLProductService');
        return new dbModule.SQLProductService() as ProductService;
      }
      case 'mock': {
        const dbModule = await import('@/services/MockProductService');
        return new dbModule.MockProductService() as ProductService;
      }
    }
  })();

  return instancePromise;
}

// opcional: helper para tests / reiniciar (dev hot-reload)
export function resetProductServiceInstance() {
  instancePromise = null;
}

export default getProductService;