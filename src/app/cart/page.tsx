'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { t } from '@/lib/translations';
import { buildWhatsAppUrl, incrementCheckoutCounter } from '@/lib/whatsapp';

export default function CartPage() {
  const { lang } = useLang();
  const tr = t(lang).cart;
  const { items, remove, setQty, total } = useCart();

  const handleCheckout = () => {
    // Counts checkout clicks, NOT confirmed orders
    incrementCheckoutCounter();
    window.open(buildWhatsAppUrl(items), '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="font-serif text-2xl text-forest mb-3">{tr.title}</h1>
        <p className="text-gray-500 mb-6">{tr.empty}</p>
        <Link href="/shop"
          className="inline-block bg-leaf text-white font-semibold px-6 py-3 rounded-xl hover:bg-forest transition-colors">
          {tr.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-forest mb-8">{tr.title}</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id}
            className="bg-white rounded-2xl border border-lime/20 p-4 flex gap-4 items-center">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-cream">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-forest font-semibold text-sm leading-snug line-clamp-2">
                {item.name}
              </p>
              <p className="text-leaf font-bold mt-1">₹{item.price} × {item.qty} = ₹{(item.price * item.qty).toFixed(0)}</p>
            </div>
            {/* Qty controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setQty(item.id, item.qty - 1)}
                className="w-7 h-7 rounded-full border border-leaf/40 flex items-center justify-center hover:bg-leaf/10 transition-colors">
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
              <button onClick={() => setQty(item.id, item.qty + 1)}
                className="w-7 h-7 rounded-full border border-leaf/40 flex items-center justify-center hover:bg-leaf/10 transition-colors">
                <Plus size={12} />
              </button>
            </div>
            <button onClick={() => remove(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors ml-2 shrink-0">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white rounded-2xl border border-lime/20 p-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{tr.subtotal}</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
        <div className="flex justify-between font-bold text-forest text-lg border-t border-lime/20 pt-3">
          <span>{tr.total}</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-5 w-full bg-green-600 text-white font-semibold py-3.5 rounded-xl
            hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {tr.checkout}
        </button>
        <Link href="/shop"
          className="mt-3 block text-center text-leaf text-sm font-medium hover:underline">
          {tr.continueShopping}
        </Link>
      </div>
    </div>
  );
}
