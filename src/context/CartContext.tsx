'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from '@/types';

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartCtx>({
  items: [], add: () => {}, remove: () => {}, setQty: () => {}, clear: () => {},
  total: 0, count: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('po_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('po_cart', JSON.stringify(items));
  }, [items]);

  const add = (item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const remove  = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty  = (id: string, qty: number) => {
    if (qty < 1) return remove(id);
    setItems((p) => p.map((i) => i.id === id ? { ...i, qty } : i));
  };
  const clear   = () => setItems([]);
  const total   = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count   = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
