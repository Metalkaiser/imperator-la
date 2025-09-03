"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { cartItem, PaymentMethod, shippingMethod, GiftOption } from "@/app/utils/types";
import { sessionCartName } from "@/app/utils/utils";

type purchaseOptions = {
  paymentMethods: PaymentMethod[];
  shippingMethods: shippingMethod[];
  giftOptions: GiftOption[];
}

interface CartContextType {
  cart: cartItem[];
  addOrUpdateItem: (item: cartItem) => void;
  removeItem: (sku: string, size?: string | number) => void;
  clearCart: () => void;
  purchaseOptions: purchaseOptions;
  enabled: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, purchaseOptions, enabled }:
  { children: React.ReactNode, purchaseOptions: purchaseOptions, enabled: boolean }) {
  const [cart, setCart] = useState<cartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem(sessionCartName);
        return raw ? JSON.parse(raw) : [];
      } catch {
        sessionStorage.removeItem(sessionCartName);
        return [];
      }
    }
    return [];
  });

  // on mount, load from sessionStorage
  useEffect(() => {
    const raw = sessionStorage.getItem(sessionCartName);
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem(sessionCartName);
      }
    }
  }, []);

  // whenever cart changes, write back
  useEffect(() => {
    sessionStorage.setItem(sessionCartName, JSON.stringify(cart));
  }, [cart]);

  // add new item or update existing (matching sku+size)
  // Consider a syncronization strategy among multiple tabs using debounced updates
  const addOrUpdateItem = (item: cartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (ci) => ci.sku === item.sku && ci.size === item.size
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeItem = (sku: string, size?: string | number) => {
    setCart((prev) =>
      prev.filter((ci) => !(ci.sku === sku && ci.size === size))
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem(sessionCartName);
  };

  return (
    <CartContext.Provider
      value={{ cart, addOrUpdateItem, removeItem, clearCart, purchaseOptions, enabled }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook to consume
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
