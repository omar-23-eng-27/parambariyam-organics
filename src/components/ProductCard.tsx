'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { t } from '@/lib/translations';
import { getCategories } from '@/lib/store';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();
  const { add } = useCart();
  const tr  = t(lang).shop;
  const ptr = t(lang).product;
  const [qty, setQty] = useState(1);

  const offerActive = !!(
    product.offerPrice &&
    product.offerEndsAt &&
    new Date(product.offerEndsAt) > new Date()
  );
  const price      = offerActive ? product.offerPrice! : product.mrp;
  const outOfStock = product.stock === 0;
  const category   = getCategories().find((c) => c.id === product.categoryId);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({ id: product.id, type: 'product', name: product.name[lang], price, image: product.image });
    }
    setQty(1);
  };

  return (
    <div className="card-lift bg-white rounded-2xl overflow-hidden border border-lime/20 flex flex-col h-full">
      {/* Image — fixed height */}
      <Link href={`/shop/${product.id}`} className="block relative h-48 bg-cream overflow-hidden shrink-0">
        <Image
          src={product.image} alt={product.name[lang]} fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width:768px) 100vw, 33vw"
        />

        {/* Category badge — top-left */}
        {category && (
          <span className="absolute top-2 left-2 bg-forest/80 backdrop-blur-sm text-white
            text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {category.name[lang]}
          </span>
        )}

        {/* SALE badge — top-right */}
        {offerActive && (
          <span className="absolute top-2 right-2 bg-lime text-forest text-[10px] font-bold px-2 py-0.5 rounded-full">
            SALE
          </span>
        )}

        {/* Bestseller badge — top-right (only if no sale) */}
        {product.isBestseller && !offerActive && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ⭐ {tr.bestseller}
          </span>
        )}

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
              {tr.outOfStock}
            </span>
          </div>
        )}
      </Link>

      {/* Body — flex column, grows to fill card height */}
      <div className="p-4 flex flex-col flex-1">

        {/* Name — fixed 2-line height so all cards reserve the same space */}
        <Link href={`/shop/${product.id}`} className="block mb-2">
          <h3 className="font-serif text-forest font-semibold text-base leading-snug
            hover:text-leaf transition-colors line-clamp-2 min-h-[2.75rem]">
            {product.name[lang]}
          </h3>
        </Link>

        {/* Price row — always one line */}
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className="text-leaf font-bold text-lg">₹{price}</span>
          {offerActive && (
            <span className="text-gray-400 line-through text-sm">₹{product.mrp}</span>
          )}
          {product.weight && (
            <span className="text-xs text-gray-400">/ {product.weight}</span>
          )}
        </div>

        {/* Offer / low-stock zone — fixed height so all cards align below it */}
        <div className="h-6 mb-1 flex items-center">
          {offerActive && product.offerEndsAt ? (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{ptr.endsIn}:</span>
              <CountdownTimer endsAt={product.offerEndsAt} expiredLabel={t(lang).offers.expired} />
            </div>
          ) : (!outOfStock && product.stock <= 10) ? (
            <p className="text-xs text-orange-600 font-medium">
              {product.stock} {ptr.stockLeft}
            </p>
          ) : null}
        </div>

        {/* Stepper + Add to Cart — pinned to bottom */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <div className="flex items-center border border-lime/40 rounded-xl overflow-hidden shrink-0">
            <button
              disabled={outOfStock || qty <= 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-9 flex items-center justify-center text-leaf hover:bg-lime/10
                transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus size={12} />
            </button>
            <span className="w-7 text-center text-sm font-semibold text-forest select-none">{qty}</span>
            <button
              disabled={outOfStock || qty >= product.stock}
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-9 flex items-center justify-center text-leaf hover:bg-lime/10
                transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            disabled={outOfStock}
            onClick={handleAdd}
            className="flex-1 bg-leaf text-white text-sm font-semibold py-2.5 rounded-xl
              hover:bg-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {outOfStock ? tr.outOfStock : tr.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
