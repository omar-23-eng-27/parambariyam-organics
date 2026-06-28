'use client';
/**
 * Local data store — reads from / writes to localStorage.
 * Seeded from mock.ts on first load.
 * When Supabase is connected, swap these functions for Supabase calls.
 */
import { mockCategories, mockProducts, mockCombos } from '@/data/mock';
import type { Category, Product, Combo } from '@/types';

const KEYS = {
  categories: 'po_categories',
  products:   'po_products',
  combos:     'po_combos',
};

function load<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(raw) as T[];
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Categories ──────────────────────────────────────────────────────────────
export const getCategories  = ()                    => load<Category>(KEYS.categories, mockCategories);
export const saveCategories = (c: Category[])       => save(KEYS.categories, c);

// ── Products ─────────────────────────────────────────────────────────────────
export const getProducts    = ()                    => load<Product>(KEYS.products, mockProducts);
export const saveProducts   = (p: Product[])        => save(KEYS.products, p);

// ── Combos ───────────────────────────────────────────────────────────────────
export const getCombos      = ()                    => load<Combo>(KEYS.combos, mockCombos);
export const saveCombos     = (c: Combo[])          => save(KEYS.combos, c);

// ── Offers (products that have an offerPrice + offerEndsAt) ──────────────────
export const getActiveOffers = (): Product[] =>
  getProducts().filter(
    (p) => p.offerPrice && p.offerEndsAt && new Date(p.offerEndsAt) > new Date()
  );
