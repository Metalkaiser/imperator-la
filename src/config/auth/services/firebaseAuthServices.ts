import { AuthService } from "../authService";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "@/config/fbConfig";
import { ref, uploadBytes, getDownloadURL, StorageError } from "firebase/storage";
import { User } from "@/app/utils/types";
import { dbCollections } from "@/app/utils/utils";
import { 
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  DocumentReference,
  QueryDocumentSnapshot
 } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "../errorMessages/FirebaseErrors";

const usersCollection = dbCollections.users;

function extractErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) return getFirebaseAuthErrorMessage(err.message) ?? String(err);
  if (err instanceof StorageError) return err.message ?? String(err);
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

async function findUserDocByUid(uid: string): Promise<{
  docId: string;
  ref: DocumentReference;
  data: User | null;
} | null> {
  const q = query(collection(db, usersCollection), where("uid", "==", uid), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0] as QueryDocumentSnapshot;
  return { docId: docSnap.id, ref: doc(db, usersCollection, docSnap.id), data: docSnap.data() as User };
}

export class FirebaseAuthService implements AuthService {

  async login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.uid;
      const idToken = await userCredential.user.getIdToken();

      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        credentials: 'include'
      });

      if (!r.ok) {
        // Si el servidor rechazó el token, cerramos sesión localmente por seguridad
        await this.logout();
        console.error(r.statusText);
        const errJson = await r.json().catch(() => ({ message: 'Server login failed' }));
        return { success: false, message: errJson.message || 'Server login failed' };
      }

      
      /*if (!user.emailVerified) {
        await signOut(auth);
        return { success: false, message: "Email not verified" };
      }*/
      const userData = await findUserDocByUid(user);
      if (!userData) {
        await this.logout();
        return { success: false, message: "User data not found" };
      }
      if (userData.data && userData.data.isDeleted) {
        await this.logout();
        return { success: false, message: "User account is deleted" };
      }
      const userRef = await findUserDocByUid(user);
      if (!userRef) return { success: false, message: "User not found" };
      await updateDoc(userRef.ref, { lastLogin: Date.now() });
      return { success: true, user: userData.data! };
    } catch (error: unknown) {
      return { success: false, message: extractErrorMessage(error) || "Login failed" };
    }
  }

  async logout(): Promise<{ success: boolean; message?: string }> {
    await signOut(auth);
    const r = await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    if (!r.ok) {
      console.error('Server logout failed:', r.statusText);
      const errJson = await r.json().catch(() => ({ message: 'Server logout failed' }));
      return { success: false, message: errJson.message || 'Server logout failed' };
    }
    return { success: true, message: 'Logout successful' };
  }

  async getCurrentUser(): Promise<User | null> {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const userDoc = await getDoc(doc(db, usersCollection, currentUser.uid));
    if (!userDoc.exists()) return null;

    const userData = userDoc.data();
    return {
      uid: currentUser.uid,
      email: currentUser.email || "",
      image: currentUser.photoURL || "",
      name: userData.name || "",
      role: userData.role || "user",
      isDeleted: userData.isDeleted || false,
      createdAt: userData.createdAt || null,
      updatedAt: userData.updatedAt || null,
      deletedAt: userData.deletedAt || null,
    };
  }

  async addUser(user: User, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);
      const newUser = userCredential.user;
      await setDoc(doc(db, usersCollection), {
        uid: newUser.uid,
        email: newUser.email,
        image: newUser.photoURL || "",
        name: user.name,
        role: user.role,
        isDeleted: false,
        createdAt: Date.now(),
        updatedAt: null,
        deletedAt: null,
      });
      return { success: true, message: "User added successfully" };
    } catch (error: unknown) {
      return { success: false, message: extractErrorMessage(error) || "Add user failed" };
    }
  }

  async updateUser(user: User, file?:File): Promise<{ success: boolean; message: string }> {
    try {
      if (!user.uid) return { success: false, message: "User ID is required" };
      const userRef = await findUserDocByUid(String(user.uid));
      if (!userRef) return { success: false, message: "User not found" };
      await updateDoc(userRef.ref, user);
      const filePath = `users/${user.uid}/profile.jpg`;
      if (file) {
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        await updateDoc(userRef.ref, { image: photoURL, updatedAt: Date.now() });
        user.image = photoURL;
      }
      if (auth.currentUser && auth.currentUser.uid === user.uid) {
        await updateProfile(auth.currentUser, {
        displayName: user.name,
        photoURL: user.image
      });
      }
      return { success: true, message: "User updated successfully" };
    } catch (error: unknown) {
      return { success: false, message: extractErrorMessage(error) || "Update user failed" };
    }
  }

  async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!userId) return { success: false, message: "User ID is required" };
      const userRef = await findUserDocByUid(userId);
      if (!userRef) return { success: false, message: "User not found" };
      await updateDoc(userRef.ref, { isDeleted: true, deletedAt: Date.now() });
      // Note: Deleting from Firebase Auth requires admin privileges and is not handled here
      return { success: true, message: "User deleted successfully" };
    } catch (error: unknown) {
      return { success: false, message: extractErrorMessage(error) || "Delete user failed" };
    }
  }
}