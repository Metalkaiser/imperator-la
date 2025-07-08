import { ProductService } from './ProductService';
import { productProps, appResponse, topProductsProps, PaymentMethod, shippingMethod } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import { collection, getDocs, query, where, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbCollections, noProductError } from '@/app/utils/utils';
import { FirebaseError } from 'firebase/app';

const catalogCollection = collection(db, dbCollections.products);
const topProductsCollection = collection(db, dbCollections.topProducts);
const paymentCollection = collection(db, dbCollections.payment);
const shippingCollection = collection(db, dbCollections.shipping);

export class FirebaseProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    try {
      const querySnapshot = await getDocs(catalogCollection);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as productProps));
      return {code: "success", response: products , status: 200}
    } catch (error) {
      console.error((error as FirebaseError).message);
      return {code: "unknown", response: null, status: 500}
    }
    
  }

  async getActiveProducts(): Promise<appResponse> {
    try {
      const catalogSnapshot = await getDocs(query(catalogCollection, where("status", "==", 1), orderBy('mainSku', 'asc')));
      const catalogItems = catalogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as productProps));
      if (!catalogItems.length) {
        return {code: "conection-failed", response: null, status: 503}
      }
      return {code: "success", response: catalogItems , status: 200};
    } catch (error) {
      console.error((error as FirebaseError).message);
      return {code: "unknown", response: null, status: 500}
    }
  }

  async getTopProducts(): Promise<appResponse> {
    try {
      const topProductsSnapshot = await getDocs(query(topProductsCollection));
      const topProducts = topProductsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as topProductsProps));
      if (!topProducts.length) {
        return {code: "conection-failed", response: null, status: 503}
      }
      return {code: "success", response: topProducts , status: 200};
    } catch (error) {
      console.error((error as FirebaseError).message);
      return {code: "unknown", response: null, status: 500}
    }
  }

  async getProductById(id: string): Promise<appResponse> {
    const docRef = doc(db, dbCollections.products, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? 
      {code: "success", response: { id: docSnap.id, ...docSnap.data() } as productProps , status: 200} :
      noProductError;
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    try {
      const productDocRef = doc(db, (product.id as string));
      await updateDoc(productDocRef, { ...product });
      return { code: "success", response: product, status: 200 };
    } catch (error) {
      console.error((error as FirebaseError).message);
      return {code: "unknown", response: null, status: 500}
    }
  }

  async getCartConfigs(): Promise<appResponse> {
    try {
      const paymentSnapshot = await getDocs(query(paymentCollection));
      const shippingSnapshot = await getDocs(query(shippingCollection));

      const paymentMethods = paymentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaymentMethod));
      const shippingMethods = shippingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as shippingMethod));

      const response = {
        paymentMethods: paymentMethods,
        shippingMethods: shippingMethods
      }

      return {code: "success", response: response , status: 200};
    } catch (error) {
      console.error((error as FirebaseError).message);
      return {code: "unknown", response: null, status: 500};
    }
  }
}
