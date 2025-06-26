"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { cartItem } from "@/app/utils/types";
import { sessionCartName } from "@/app/utils/utils";

// shape of our context
interface CartContextType {
  cart: cartItem[];
  addOrUpdateItem: (item: cartItem) => void;
  removeItem: (sku: string, size?: string | number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<cartItem[]>([]);

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
  };

  return (
    <CartContext.Provider
      value={{ cart, addOrUpdateItem, removeItem, clearCart }}
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
