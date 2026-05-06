import { ProductService } from './ProductService';
import {v4 as uuidv4} from 'uuid';
import sharp from 'sharp';
import admin from '@/app/utils/firebaseAdmin';
import { productProps, appResponse, cartItem, saleData, NewActivityLog, NewProduct, orderNote, PaymentMethod, shippingMethod, GiftOption, sale } from '@/app/utils/types';
import { db } from '@/config/fbConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  documentId,
  doc,
  getDoc,
  addDoc,
  limit as limitFn,
  //runTransaction,
  startAfter
} from "firebase/firestore";
import { dbCollections } from '@/app/utils/utils';
import { handleFirebase } from './helpers/Firebase/firebaseWrapper';
import { removeUndefined } from '@/app/utils/functions';
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
      const snapshot = await getDocs(query(topProductsCollection, orderBy(documentId(), "asc")));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async replaceTopProducts(productIds: Array<string | number>): Promise<appResponse> {
    return handleFirebase(async () => {
      const topProductsCol = admin.firestore().collection(dbCollections.topProducts);
      const existing = await topProductsCol.get();
      const batch = admin.firestore().batch();

      existing.docs.forEach((d) => batch.delete(d.ref));

      productIds.forEach((productId, index) => {
        const ordinal = String(index + 1).padStart(2, "0");
        const ref = topProductsCol.doc(`${ordinal}_${String(productId)}`);
        batch.set(ref, {
          productId,
          updatedAt: Date.now(),
        });
      });

      await batch.commit();
      return { updatedCount: productIds.length };
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

  async updateProduct(
  id: string | number,
  product: Partial<productProps>
): Promise<appResponse> {
  return handleFirebase(async () => {
    const productsCol = admin.firestore().collection(dbCollections.products);
    const docRef = productsCol.doc(id.toString());

    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      throw new Error("Product not found");
    }

    const now = Date.now();

    const fieldsToUpdate: Record<string, any> = {
      updatedAt: now
    };

    for (const [key, value] of Object.entries(product)) {
      if (value === null) {
        fieldsToUpdate[key] = admin.firestore.FieldValue.delete();
      } else if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }

    await docRef.update(fieldsToUpdate);

    return {
      status: 200,
      response: {
        id,
        updatedAt: now
      }
    };
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

  async upsertPaymentMethod(method: PaymentMethod): Promise<appResponse> {
    return handleFirebase(async () => {
      const { id, ...data } = method;
      const docRef = admin.firestore().collection(dbCollections.payment).doc(String(id));
      await docRef.set(data, { merge: true });
      return { id, ...data };
    });
  }

  async upsertShippingMethod(method: shippingMethod): Promise<appResponse> {
    return handleFirebase(async () => {
      const { id, ...data } = method;
      const docRef = admin.firestore().collection(dbCollections.shipping).doc(String(id));
      await docRef.set(data, { merge: true });
      return { id, ...data };
    });
  }

  async upsertGiftOption(option: GiftOption): Promise<appResponse> {
    return handleFirebase(async () => {
      const { id, ...data } = option;
      const docRef = admin.firestore().collection(dbCollections.giftOptions).doc(String(id));
      await docRef.set(data, { merge: true });
      return { id, ...data };
    });
  }

  async registerSale(cart: cartItem[], clientData: saleData): Promise<appResponse> {
    return handleFirebase(async () => {
      if (!Array.isArray(cart) || cart.length === 0) throw new Error("Carrito vacío");
      //const updatedProducts: productProps[] = [];
/*
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
      }).then(() => {
        console.log("Stock actualizado correctamente");
      }).catch((error) => {
        if (error instanceof FirebaseError) {
          console.error("FirebaseError al actualizar stock:", error.code, error.message);
        } else {
          console.error("Error desconocido al actualizar stock:", error);
        }
        throw error; // Re-lanzar para que el error se propague y no se registre la venta
      });
*/
      const newOrderObject: Omit<sale, 'id'> = {
        clientName: clientData.clientName || "Sin nombre",
        clientPhone: clientData.clientPhone || "-",
        clientEmail: clientData.clientEmail,
        clientAddress: clientData.clientAddress,
        clientId: clientData.clientId,
        items: cart,
        totalAmount: clientData.totalAmount,
        status: "pending",
        createdAt: Date.now(),
        paymentMethodId: clientData.paymentMethodId,
        paymentData: clientData.paymentData,
        shippingMethod: clientData.shippingMethod,
        shippingData: clientData.shippingData,
        giftOption: clientData.giftOption
      }

      const cleanOrderObject = removeUndefined(newOrderObject);

      // Registrar la venta
      try {
        const newOrder = await addDoc(ordersCollection, cleanOrderObject);
        console.log("Venta registrada con ID:", newOrder.id);
        return newOrder.id;
      } catch (error) {
        console.error("Error al registrar la venta:", error);
        throw new Error("Error al registrar la venta");
      }
    });
  }

  async getOrders(): Promise<appResponse> {
    return handleFirebase(async () => {
      const ordersCol = admin.firestore().collection(dbCollections.orders);
      const snap = await ordersCol.get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async updateOrderStatus(id: string | number, status: string): Promise<appResponse> {
    return handleFirebase(async () => {
      const ordersCol = admin.firestore().collection(dbCollections.orders);
      const docRef = ordersCol.doc(String(id));
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        throw new Error("Order not found");
      }

      const updatedAt = Date.now();
      await docRef.update({ status, updatedAt });
      return { id: docSnap.id, ...docSnap.data(), status, updatedAt };
    });
  }

  async addOrderNote(id: string | number, note: orderNote): Promise<appResponse> {
    return handleFirebase(async () => {
      const ordersCol = admin.firestore().collection(dbCollections.orders);
      const docRef = ordersCol.doc(String(id));
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        throw new Error("Order not found");
      }

      const data = docSnap.data() as { notesHistory?: orderNote[]; notes?: string };
      const notesHistory = Array.isArray(data.notesHistory) ? [...data.notesHistory] : [];
      notesHistory.push(note);

      const updatedAt = Date.now();
      await docRef.update({ notesHistory, updatedAt });
      return { id: docSnap.id, ...docSnap.data(), notesHistory, updatedAt };
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
      //Fecha y hora independiente de zona horaria para evitar problemas con nombres duplicados
      const stamp = Date.now();
      const path = `${destPath}_${stamp}.webp`;
      // 1) convertir File -> Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const webpBuffer = await sharp(buffer)
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }) // opcional pero recomendado
        .webp({ quality: 82, effort: 4 }) // effort 4 = buen balance velocidad/calidad
        .toBuffer();
  
      // 2) obtener bucket y file handle
      const bucket = admin.storage().bucket(); // usa storageBucket configurado en admin.initializeApp
      const remoteFile = bucket.file(path); // sin slash inicial
  
      // 3) generar token para url de descarga pública estilo firebase
      const token = uuidv4();
  
      // 4) subir (save) y setear metadata con token
      await remoteFile.save(webpBuffer, {
        metadata: {
          contentType: (file as any).type || "application/octet-stream",
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        },
        resumable: false,
      });
  
      // 5) construir la URL pública con token (igual que la que genera Firebase console)

      const url = `${encodeURIComponent(path)}?alt=media&token=${token}`.replace("products", "");
  
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
      return docRef.id;
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
