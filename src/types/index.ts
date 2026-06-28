export type Lang = 'en' | 'ta';

export interface BiText {
  en: string;
  ta: string;
}

export interface Category {
  id: string;
  name: BiText;
  slug: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: BiText;
  description: BiText;
  contains: BiText;
  weight?: string;          // e.g. "1 kg", "500 ml", "250 g"
  mrp: number;
  offerPrice?: number;
  offerEndsAt?: string;     // ISO date string
  stock: number;
  image: string;
  isBestseller?: boolean;   // admin-toggled "Popular / Bestseller" badge
}

export interface Combo {
  id: string;
  name: BiText;
  description: BiText;
  productIds: string[];
  comboPrice: number;
  image: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'combo';
  name: string;
  price: number;
  qty: number;
  image: string;
}
