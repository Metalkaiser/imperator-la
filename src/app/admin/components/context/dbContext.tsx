"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef, useCallback } from "react";
import type {
  productProps,
  topProductsProps,
  User,
  activity_logs,
  sale,
  PaymentMethod,
  shippingMethod,
  GiftOption,
  appResponse,
} from "@/app/utils/types";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../context/authContext";
import { getShoppingCartConfig } from "@/config/shoppingCartConfig"; // ajusta import si tu ruta es distinta

interface AdminData {
  products: productProps[];
  topProducts: topProductsProps[];
  users: User[];
  logs: activity_logs[];
  orders: sale[];
  cart: {
    paymentMethods: PaymentMethod[];
    shippingMethods: shippingMethod[];
    giftOptions: GiftOption[];
  };
  // estados útiles
  loading: boolean;
  error?: string | null;
  ready: boolean;

  // flags/permits
  canViewUsersLogs: boolean;
  canEditAll: boolean;
  cartEnabled: boolean;

  // refrescos puntuales
  refreshAll: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshUsersAndLogs: () => Promise<void>;
}

const DBContext = createContext<AdminData | undefined>(undefined);

export const useDB = (): AdminData => {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error("useDB must be used within a DBProvider");
  return ctx;
};

interface DBProviderProps {
  children: ReactNode;
  locale?: string; // para decidir config de carrito,
}

/** Genéricos para respuestas de tu API */
type ApiResponse<T> = { status: number; response: T };
type ProductsEndpointResponse = {
  products: ApiResponse<productProps[]>;
  topProductsIds: ApiResponse<topProductsProps[]>;
};

export const DBProvider: React.FC<DBProviderProps> = ({ children, locale = "default" }) => {
  const [products, setProducts] = useState<productProps[]>([]);
  const [topProducts, setTopProducts] = useState<topProductsProps[]>([]);
  const [orders, setOrders] = useState<sale[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<activity_logs[]>([]);
  const [cart, setCart] = useState<AdminData["cart"]>({
    paymentMethods: [],
    shippingMethods: [],
    giftOptions: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const mountedRef = useRef(true);

  const { user } = useAuth(); // asumimos que useAuth está disponible y provee role
  const userRole = user?.role ?? null;

  // permisos/flags basados en tus reglas:
  const canViewUsersLogs = userRole === "admin" || userRole === "viewer";
  const canEditAll = userRole === "admin";

  // chequear si el carrito está activado por config
  const cartEnabled = (() => {
    try {
      const cfg = getShoppingCartConfig(locale);
      return Boolean(cfg?.shoppingCart?.enabled);
    } catch {
      return false;
    }
  })();

  // helper fetch genérico (usa rutas relativas)
  const fetchJson = useCallback(async <T,>(path: string): Promise<T> => {
    const res = await fetch(path, { credentials: "include" });
    // No forzamos throw en res.ok: confiamos en la estructura body.status
    return (await res.json()) as T;
  }, []);

  // fetch helpers (memoizados)
  const fetchProducts = useCallback(async (): Promise<ProductsEndpointResponse> => {
    return fetchJson<ProductsEndpointResponse>("/api/all-products");
  }, [fetchJson]);

  const fetchCart = useCallback(async (): Promise<appResponse> => {
    return fetchJson<appResponse>("/api/cart-config");
  }, [fetchJson]);

  const fetchOrders = useCallback(async (): Promise<appResponse> => {
    return fetchJson<appResponse>("/api/admin/orders");
  }, [fetchJson]);

  const fetchUsers = useCallback(async (): Promise<appResponse> => {
    return fetchJson<appResponse>("/api/admin/users");
  }, [fetchJson]);

  const fetchLogs = useCallback(async (): Promise<appResponse> => {
    return fetchJson<appResponse>("/api/admin/logs");
  }, [fetchJson]);

  const refreshProducts = useCallback(async () => {
    try {
      const productsRes = await fetchProducts();
      if (!mountedRef.current) return;

      if (productsRes.products?.status === 200) {
        setProducts(productsRes.products.response ?? []);
      }
      if (productsRes.topProductsIds?.status === 200) {
        setTopProducts(productsRes.topProductsIds.response ?? []);
      }

    } catch (err) {
      console.error("refreshProducts error:", err);
      if (mountedRef.current) setError(String((err as FirebaseError)?.message ?? err));
    }
  }, [fetchProducts]);

  const refreshOrders = useCallback(async () => {
    if (!cartEnabled) {
      if (mountedRef.current) {
        setOrders([]);
        setCart({ paymentMethods: [], shippingMethods: [], giftOptions: [] });
      }
      return;
    }

    try {
      const [cartRes, ordersRes] = await Promise.all([fetchCart(), fetchOrders()]);

      if (!mountedRef.current) return;

      if (ordersRes?.status === 200 && ordersRes.response) {
        setOrders(ordersRes.response);
      }
      if (cartRes?.status === 200 && cartRes.response && canEditAll) {
        setCart(cartRes.response);
      }
    } catch (err) {
      console.error("refreshOrders error:", err);
      if (mountedRef.current) setError(String((err as FirebaseError)?.message ?? err));
    }
  }, [cartEnabled, canEditAll, fetchCart, fetchOrders]);

  // refreshUsersAndLogs: separado, evita duplicar llamadas
  const refreshUsersAndLogs = useCallback(async () => {
    if (!canViewUsersLogs) {
      if (mountedRef.current) {
        setUsers([]);
        setLogs([]);
      }
      return;
    }

    try {
      // Si es viewer (no admin) solo pedimos logs; si es admin pedimos ambos
      if (canEditAll) {
        // admin -> pedir ambos en paralelo
        const [usersRes, logsRes] = await Promise.all([fetchUsers(), fetchLogs()]);
        if (!mountedRef.current) return;
        if (usersRes?.status === 200 && usersRes.response) setUsers(usersRes.response);
        if (logsRes?.status === 200 && logsRes.response) setLogs(logsRes.response);
      } else {
        // viewer -> solo logs
        const logsRes = await fetchLogs();
        if (!mountedRef.current) return;
        if (logsRes?.status === 200 && logsRes.response) setLogs(logsRes.response);
      }
    } catch (err) {
      console.error("refreshUsersAndLogs error:", err);
      if (mountedRef.current) setError(String((err as FirebaseError)?.message ?? err));
    }
  }, [canViewUsersLogs, canEditAll, fetchUsers, fetchLogs]);

  // refreshAll: ejecuta las tareas relevantes en paralelo, resiliente con allSettled
  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // construir lista de promesas condicional
      const tasks: Promise<any>[] = [];

      // siempre refresh products
      tasks.push(fetchProducts());

      // orders/cart si cartEnabled
      if (cartEnabled) {
        tasks.push(fetchOrders());
        tasks.push(fetchCart());
      }

      // users/logs según permisos
      if (canViewUsersLogs) {
        tasks.push(fetchLogs());
        if (canEditAll) tasks.push(fetchUsers());
      }

      const results = await Promise.allSettled(tasks);

      // Iterar results en el mismo orden de push() para asignar
      let idx = 0;

      // products (siempre)
      const prodSett = results[idx++];
      if (prodSett.status === "fulfilled") {
        const productsRes = prodSett.value as ProductsEndpointResponse;

        if (mountedRef.current && productsRes.products?.status === 200) {
          setProducts(productsRes.products.response ?? []);
        }
        if (mountedRef.current && productsRes.topProductsIds?.status === 200) {
          setTopProducts(productsRes.topProductsIds.response ?? []);
        }

      } else {
        console.warn("refreshAll - products failed", prodSett.reason);
      }

      // orders + cart
      if (cartEnabled) {
        const ordersSett = results[idx++];
        const cartSett = results[idx++];

        if (ordersSett?.status === "fulfilled") {
          const ordersRes = ordersSett.value as {orders:appResponse};

          if (ordersRes.orders.status === 200 && mountedRef.current) setOrders(ordersRes.orders.response ?? []);
        } else {
          console.warn("refreshAll - orders failed", ordersSett?.reason);
        }

        if (cartSett?.status === "fulfilled") {
          setCart(cartSett.value);
        } else {
          console.warn("refreshAll - cart failed", cartSett?.reason);
        }
      }

      // logs (+ users if admin)
      if (canViewUsersLogs) {
        const logsSett = results[idx++];
        if (logsSett?.status === "fulfilled") {
          const logsRes = logsSett.value as {logs: appResponse};
          if (mountedRef.current && logsRes.logs.status === 200) setLogs(logsRes.logs.response);
        } else {
          console.warn("refreshAll - logs failed", logsSett?.reason);
        }

        if (canEditAll) {
          const usersSett = results[idx++];
          if (usersSett?.status === "fulfilled") {
            const usersRes = usersSett.value as {users: appResponse};
            if (usersRes.users.status === 200 && mountedRef.current) setUsers(usersRes.users.response ?? []);
          } else {
            console.warn("refreshAll - users failed", usersSett?.reason);
          }
        }
      }

      if (mountedRef.current) setReady(true);
    } catch (err) {
      console.error("refreshAll error:", err);
      if (mountedRef.current) setError(String((err as FirebaseError)?.message ?? err));
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [cartEnabled, canViewUsersLogs, canEditAll, fetchProducts, fetchOrders, fetchCart, fetchLogs, fetchUsers]);


  useEffect(() => {
    mountedRef.current = true;
    void refreshAll();
    return () => {
      mountedRef.current = false;
    };
  }, [user?.uid, userRole, locale, refreshAll]);

  // Exponer context value
  const value: AdminData = {
    products,
    topProducts,
    users,
    logs,
    orders,
    cart,
    loading,
    error,
    ready,
    canViewUsersLogs,
    canEditAll,
    cartEnabled,
    refreshAll,
    refreshProducts,
    refreshOrders,
    refreshUsersAndLogs,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};