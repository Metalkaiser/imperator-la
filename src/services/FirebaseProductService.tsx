import { ProductService } from './ProductService';
import {v4 as uuidv4} from 'uuid';
import admin from '@/app/utils/firebaseAdmin';
import { productProps, appResponse, cartItem, saleData, NewActivityLog, NewProduct } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  addDoc,
  limit as limitFn,
  runTransaction,
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

  async getItemById(id: string, collection: string): Promise<appResponse> {
    return handleFirebase(async () => {
      const col = admin.firestore().collection(collection);
      const docRef = col.doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) throw new Error("Item not found");
      return { id: docSnap.id, ...docSnap.data() };
    });
  }

  async updateProduct(id: string | number, product: Partial<productProps>): Promise<appResponse> {
    return handleFirebase(async () => {
      const productsCol = admin.firestore().collection(dbCollections.products);
      const docRef = productsCol.doc(id.toString());
      const docSnap = await docRef.get();
      const now = Date.now();
      if (!docSnap.exists) throw new Error("Product not found");
      await docRef.set({ ...product, updatedAt: now });
      return { id: docSnap.id, ...docSnap.data() };
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
      const ordersCol = admin.firestore().collection(dbCollections.orders);
      const snap = await ordersCol.get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async getUsers(): Promise<appResponse> {
    return handleFirebase(async () => {
      const usersCol = admin.firestore().collection(dbCollections.users);
      const snap = await usersCol.get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  async setActivityLog(data: NewActivityLog): Promise<appResponse> {
    const timestamp = Date.now();
    const newLog = { ...data, timestamp: timestamp };

    return handleFirebase(async () => {
      const logsCol = admin.firestore().collection(dbCollections.activity_logs);
      const docRef = await logsCol.add({
        ...newLog
      });
      return { id: docRef.id, ...newLog };
    });
  }

  async deleteProduct(id: string): Promise<appResponse> {
    return handleFirebase(async () => {
      const productsCol = admin.firestore().collection(dbCollections.products);
      const docRef = productsCol.doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) throw new Error("Product not found");
      await docRef.update({ isDeleted: true, status: 2 });
      return { id: docSnap.id, ...docSnap.data() };
    });
  }

  async uploadImage(file: File, destPath: string): Promise<{ok: boolean; url?: string; error?: string}> {
    try {
      // 1) convertir File -> Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      // 2) obtener bucket y file handle
      const bucket = admin.storage().bucket(); // usa storageBucket configurado en admin.initializeApp
      const remoteFile = bucket.file(destPath); // sin slash inicial
  
      // 3) generar token para url de descarga pública estilo firebase
      const token = uuidv4();
  
      // 4) subir (save) y setear metadata con token
      await remoteFile.save(buffer, {
        metadata: {
          contentType: (file as any).type || "application/octet-stream",
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        },
        // opcional: gzip: true
      });
  
      // 5) construir la URL pública con token (igual que la que genera Firebase console)
      const url = `${encodeURIComponent(destPath)}?alt=media&token=${token}`.replace("products", "");
  
      return { ok: true, url };
    } catch (err: any) {
      console.error("processAndUploadServer error:", err);
      return { ok: false, error: String(err?.message ?? err) };
    }
  }

  async deleteImage(url: string): Promise<{ ok: boolean; message: string; }> {
    try {
      const bucket = admin.storage().bucket();
      // extraer el path del archivo de la URL
      const decodedUrl = decodeURIComponent(url);
      const startEndIndex = decodedUrl.indexOf("/") === 0 ? 1 : 0;
      const pathEndIndex = decodedUrl.indexOf("?alt=media");
      const filePath = decodedUrl.substring(startEndIndex, pathEndIndex);
  
      const remoteFile = bucket.file(`products/${filePath}`);
      const deleteResult = await remoteFile.delete();

      if (deleteResult[0].statusCode !== 200 && deleteResult[0].statusCode !== 204) {
        return { ok: false, message: deleteResult[0].statusMessage || `Failed to delete image at ${url}` };
      }
        
      return { ok: true, message: `Image at ${url} deleted successfully.` };
    }
    catch (err: any) {
      console.error("deleteImage error:", err);
      return { ok: false, message: `Error deleting image at ${url}: ${String(err?.message ?? err)}` };
    }
  }

  async createProduct(product: NewProduct): Promise<appResponse> {
    return handleFirebase(async () => {
      const col = admin.firestore().collection(dbCollections.products);
      const docRef = await col.add(product);
      return { response: docRef.id };
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
