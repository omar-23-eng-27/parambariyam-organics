import { WHATSAPP_NUMBER } from './config';
import type { CartItem } from '@/types';

export function buildWhatsAppUrl(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `• ${item.qty}x ${item.name} — ₹${(item.price * item.qty).toFixed(0)}`
  );
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const message = [
    '🌿 *Parambariyam Organics — Order*',
    '',
    ...lines,
    '',
    `💰 *Total: ₹${total.toFixed(0)}*`,
    '',
    'Please confirm my order. Thank you!',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Increment the checkout counter in localStorage (demo mode).
// In Supabase mode, call the /api/checkout-ping route instead.
export function incrementCheckoutCounter(): void {
  if (typeof window === 'undefined') return;
  const current = parseInt(localStorage.getItem('po_checkout_count') ?? '0', 10);
  localStorage.setItem('po_checkout_count', String(current + 1));
}

export function getCheckoutCounter(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('po_checkout_count') ?? '0', 10);
}
