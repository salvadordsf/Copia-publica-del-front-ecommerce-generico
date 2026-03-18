"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getItemQuantity: (productId: string) => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, quantity = 1) => {
        if (quantity <= 0 || !Number.isInteger(quantity)) return;

        const items = get().items;

        const existing = items.find(
          (i) => i.productId === productId
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { productId, quantity }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(
            (i) => i.productId !== productId
          ),
        });
      },

      setQuantity: (productId, quantity) => {
        if (!Number.isInteger(quantity)) return;

        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemQuantity: (productId) => {
        return (
          get().items.find(
            (i) => i.productId === productId
          )?.quantity ?? 0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);