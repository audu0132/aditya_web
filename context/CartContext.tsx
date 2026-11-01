"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product, Size, Color } from "@/lib/products";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  size: Size;
  color: Color;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string; size: Size; colorName: string }
  | { type: "UPDATE_QTY"; id: string; size: Size; colorName: string; qty: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_CART"; open?: boolean }
  | { type: "HYDRATE"; items: CartItem[] };

// ─── Reducer ─────────────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD": {
      const key = (i: CartItem) =>
        `${i.product.id}-${i.size}-${i.color.name}`;
      const exists = state.items.find((i) => key(i) === key(action.item));
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            key(i) === key(action.item)
              ? { ...i, qty: i.qty + action.item.qty }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.id &&
              i.size === action.size &&
              i.color.name === action.colorName
            )
        ),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.id &&
            i.size === action.size &&
            i.color.name === action.colorName
              ? { ...i, qty: action.qty }
              : i
          )
          .filter((i) => i.qty > 0),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: action.open ?? !state.isOpen };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface CartContextValue extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: Size, colorName: string) => void;
  updateQty: (id: string, size: Size, colorName: string, qty: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce(
    (s, i) => s + i.product.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart: (item) => dispatch({ type: "ADD", item }),
        removeFromCart: (id, size, colorName) =>
          dispatch({ type: "REMOVE", id, size, colorName }),
        updateQty: (id, size, colorName, qty) =>
          dispatch({ type: "UPDATE_QTY", id, size, colorName, qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        toggleCart: (open) => dispatch({ type: "TOGGLE_CART", open }),
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

