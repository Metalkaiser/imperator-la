import { ProductService } from './ProductService';
import { productProps, appResponse, cartItem, saleData, activity_logs, NewActivityLog } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  limit as limitFn,
  runTransaction,
  serverTimestamp,
  startAfter
} from "firebase/firestore";
import { dbCollections } from '@/app/utils/utils';
import { handleFirebase } from './helpers/Firebase/firebaseWrapper';
//import { firebaseProductsList, mockTopProds, paymentMethods, shippingMethods, giftOptions } from '@/app/utils/mockinfo';

const catalogCollection = collection(db, dbCollections.products);
const topProductsCollection = collection(db, dbCollections.topProducts);
const paymentCollection = collection(db, dbCollections.payment);
const shippingCollection = collection(db, dbCollections.shipping);
const ordersCollection = collection(db, dbCollections.orders);
const giftOptionsCollection = collection(db, dbCollections.giftOptions);
const usersCollection = collection(db, dbCollections.users);
const logsCollection = collection(db, dbCollections.activity_logs);

export class FirebaseProductService implements ProductService {
  async getAllProducts(): Promise<appResponse> {
    return handleFirebase(async () => {
      const querySnapshot = await getDocs(query(catalogCollection, orderBy("mainSku", "asc")));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
      const [paymentSnap, shippingSnap, giftSnap] = await Promise.all([
        getDocs(paymentCollection),
        getDocs(shippingCollection),
        getDocs(giftOptionsCollection),
      ]);
      return {
        paymentMethods: paymentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        shippingMethods: shippingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        giftOptions: giftSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      };
    });
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    return handleFirebase(async () => {
      if (!Array.isArray(cart) || cart.length === 0) throw new Error("Carrito vacío");
      //const updatedProducts: productProps[] = [];

      const newOrderId = runTransaction(db, async (tx) => {
        for (const item of cart) {
          const productRef = doc(db, dbCollections.products, item.id.toString());
          //const productSnap = await getDoc(productRef);
          const productSnap = await tx.get(productRef);
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

          const newQty = stock.quantity - item.qt;
          const updatedVariants = [...product.variants];
          updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            stock: [...updatedVariants[variantIndex].stock],
          };
          updatedVariants[variantIndex].stock[sizeIndex] = {
            ...updatedVariants[variantIndex].stock[sizeIndex],
            quantity: newQty,
          };

          // Escribir doc actualizado dentro de la transacción
          tx.update(productRef, { variants: updatedVariants });
        }
      })

      console.log(newOrderId);

      // Registrar la venta
      const newOrder = await addDoc(ordersCollection, {
        cart,
        clientData,
        totalAmount: clientData.totalAmount.toFixed(2),
        status: "placed",
        createdAt: new Date().toISOString()
      });

      return newOrder.id;
    });
  }

  async getOrders(): Promise<appResponse> {
    return handleFirebase(async () => {
      const querySnapshot = await getDocs(ordersCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async getUsers(): Promise<appResponse> {
    return handleFirebase(async () => {
      const querySnapshot = await getDocs(usersCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async getActivityLogs(options?: { limit?: number; startAfterId?: string; from?: number; to?: number }): Promise<appResponse> {
    return handleFirebase(async () => {
      const lim = options?.limit ?? 50;
      // IMPORTANT: asegura que en Firestore el campo 'timestamp' sea Number (epoch ms) o Timestamp
      let q = query(logsCollection, orderBy("timestamp", "desc"), limitFn(lim));

      if (typeof options?.from === "number") {
        // si timestamp es number, se puede where >= from
        q = query(q, where("timestamp", ">=", options!.from));
      }
      if (typeof options?.to === "number") {
        q = query(q, where("timestamp", "<=", options!.to));
      }

      if (options?.startAfterId) {
        const startDoc = await getDoc(doc(db, dbCollections.activity_logs, options.startAfterId));
        if (startDoc.exists()) q = query(q, startAfter(startDoc));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async setActivityLog(data: NewActivityLog): Promise<activity_logs> {
    const timestamp = Date.now();

    const colRef = collection(db, dbCollections.activity_logs);
    const docRef = await addDoc(colRef, {
      ...data,
      timestamp,                  // epoch ms
      serverTimestamp: serverTimestamp(), // opcional
    });

    return {
      id: docRef.id,
      ...data,
      timestamp,
    };
  }

  async deleteProduct(id: string): Promise<appResponse> {
    return handleFirebase(async () => {
      const docRef = doc(db, dbCollections.products, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Product not found");
      updateDoc(docRef, {isDeleted: true, status: 2});
      return { id: docSnap.id, ...docSnap.data() };
    });
  }

  /*async migrateDB(): Promise<appResponse> {
    return handleFirebase(async () => {
      firebaseProductsList.forEach( async (product) => {
        const { id, ...productNoId } = product;
        await addDoc(catalogCollection, productNoId);
      });
      mockTopProds.forEach( async (topProd) => {
        const { id, ...top } = topProd;
        await addDoc(topProductsCollection, top);
      });
      paymentMethods.forEach( async (pay) => {
        const { id, ...payNoId } = pay;
        await addDoc(paymentCollection, payNoId);
      });
      shippingMethods.forEach( async (ship) => {
        const { id, ...shipNoId } = ship;
        await addDoc(shippingCollection, shipNoId);
      });
      giftOptions.forEach( async (gift) => {
        const { id, ...giftNoId } = gift;
        await addDoc(collection(db, dbCollections.giftOptions), giftNoId);
      });

      return { message: "Database migration completed" };
    });
  }*/
}
