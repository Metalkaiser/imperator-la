import { ProductService } from './ProductService';
import { productProps, appResponse, cartItem, saleData } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import { collection, getDocs, query, where, orderBy, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { dbCollections } from '@/app/utils/utils';
import { handleFirebase } from './helpers/Firebase/firebaseWrapper';
import { firebaseProductsList, mockTopProds, paymentMethods, shippingMethods, giftOptions } from '@/app/utils/mockinfo';

const catalogCollection = collection(db, dbCollections.products);
const topProductsCollection = collection(db, dbCollections.topProducts);
const paymentCollection = collection(db, dbCollections.payment);
const shippingCollection = collection(db, dbCollections.shipping);
const ordersCollection = collection(db, dbCollections.orders);
const giftOptionsCollection = collection(db, dbCollections.giftOptions);

export class FirebaseProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    return handleFirebase(async () => {
      const querySnapshot = await getDocs(catalogCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  }

  async getActiveProducts(): Promise<appResponse> {
    return handleFirebase(async () => {
      const snapshot = await getDocs(query(catalogCollection, where("status", "==", 1), orderBy('mainSku', 'asc')));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async getTopProducts(): Promise<appResponse> {
    return handleFirebase(async () => {
      const snapshot = await getDocs(query(topProductsCollection));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async getProductById(id: string): Promise<appResponse> {
    return handleFirebase(async () => {
      const docRef = doc(db, dbCollections.products, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Product not found");
      return { id: docSnap.id, ...docSnap.data() };
    });
  }

  async updateProduct(product: productProps): Promise<appResponse> {
    return handleFirebase(async () => {
      const productDocRef = doc(db, dbCollections.products, product.id as string);
      await updateDoc(productDocRef, { ...product });
      return product;
    });
  }

  async getCartConfigs(): Promise<appResponse> {
    return handleFirebase(async () => {
      const paymentSnapshot = await getDocs(paymentCollection);
      const shippingSnapshot = await getDocs(shippingCollection);
      const giftSnapshot = await getDocs(giftOptionsCollection);
      return {
        paymentMethods: paymentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        shippingMethods: shippingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        giftOptions: giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      };
    });
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    return handleFirebase(async () => {
      //const updatedProducts: productProps[] = [];

      for (const item of cart) {
        const productRef = doc(db, dbCollections.products, item.id.toString());
        const productSnap = await getDoc(productRef);
        if (!productSnap.exists()) throw new Error(`Producto ${item.name} no encontrado`);

        const product = productSnap.data() as productProps;
        const variantIndex = product.variants.findIndex(v => v.sku === item.sku);
        if (variantIndex === -1) throw new Error(`SKU ${item.sku} no encontrado`);

        const sizeIndex = product.variants[variantIndex].stock.findIndex(s => s.name === item.size);
        if (sizeIndex === -1) throw new Error(`Talla ${item.size} no encontrada`);

        const stock = product.variants[variantIndex].stock[sizeIndex];
        if (stock.quantity < item.qt) throw new Error(`Stock insuficiente para ${item.name}, talla ${item.size}`);

        /*
        // Descontar del stock
        product.variants[variantIndex].stock[sizeIndex].quantity -= item.qt;

        // Guardar el producto actualizado
        await updateDoc(productRef, { variants: product.variants });
        const { id, ...productWithoutId } = product;
        updatedProducts.push({ id: id, ...productWithoutId });
        */
      }

      // Registrar la venta
      const newOrder = await addDoc(ordersCollection, {
        cart,
        clientData,
        status: "placed",
        createdAt: new Date().toISOString()
      });

      return newOrder.id;
    });
  }

  async migrateDB(): Promise<appResponse> {
    return handleFirebase(async () => {
      firebaseProductsList.forEach( async (product) => {
        let { id, ...productNoId } = product;
        await addDoc(catalogCollection, productNoId);
      });
      mockTopProds.forEach( async (topProd) => {
        let { id, ...top } = topProd;
        await addDoc(topProductsCollection, top);
      });
      paymentMethods.forEach( async (pay) => {
        let { id, ...payNoId } = pay;
        await addDoc(paymentCollection, payNoId);
      });
      shippingMethods.forEach( async (ship) => {
        let { id, ...shipNoId } = ship;
        await addDoc(shippingCollection, shipNoId);
      });
      giftOptions.forEach( async (gift) => {
        let { id, ...giftNoId } = gift;
        await addDoc(collection(db, dbCollections.giftOptions), giftNoId);
      });

      return { message: "Database migration completed" };
    });
  }
}
