import { ProductService } from './ProductService';
import { productProps, appResponse } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import { collection, getDocs, query, where, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbCollections, noProductError } from '@/app/utils/utils';

const catalogCollection = collection(db, dbCollections.products);

export class FirebaseProductService implements ProductService {
  async getAllProducts(): Promise<productProps[] | appResponse> {
    try {
      const querySnapshot = await getDocs(catalogCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as productProps));
    } catch (error) {
      return {code: "unknown", status: 500}
    }
    
  }

  async getActiveProducts(): Promise<productProps[] | appResponse> {
    try {
    const catalogSnapshot = await getDocs(query(catalogCollection, where("status", "==", 1), orderBy('mainSku', 'asc')));
    const catalogItems = catalogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as productProps));
    if (!catalogItems.length) {
      return {code: "conection-failed", status: 503}
    }

    return catalogItems;
  } catch (error) {
    return {code: "unknown", status: 500}
  }
  }

  async getProductById(id: string): Promise<productProps | appResponse> {
    const docRef = doc(db, dbCollections.products, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as productProps : noProductError;
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    try {
      const productDocRef = doc(db, (product.id as string));
      await updateDoc(productDocRef, { ...product });
      return { code: "success", status: 200 };
    } catch (error) {
      return {code: "unknown", status: 500}
    }
  }
}
