'use client';
import Image from 'next/image';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { t } from '@/lib/translations';
import { getProducts, getCategories } from '@/lib/store';

export default function ProductPageClient({ id }: { id: string }) {
  const { lang } = useLang();
  const { add } = useCart();
  const tr = t(lang).product;
  const sht = t(lang).shop;

  const product = getProducts().find((p) => p.id === id);
  if (!product) return <div className="p-20 text-center text-gray-400">Product not found.</div>;

  const category = getCategories().find((c) => c.id === product.categoryId);
  const offerActive = !!(
    product.offerPrice &&
    product.offerEndsAt &&
    new Date(product.offerEndsAt) > new Date()
  );
  const price = offerActive ? product.offerPrice! : product.mrp;
  const outOfStock = product.stock === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/shop" className="text-leaf text-sm font-medium hover:underline inline-flex items-center gap-1 mb-8">
        {tr.back}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream border border-lime/20">
          <Image src={product.image} alt={product.name[lang]} fill className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw" />
        </div>

        <div className="flex flex-col gap-4">
          {category && (
            <span className="text-xs text-leaf font-semibold uppercase tracking-wider">
              {category.name[lang]}
            </span>
          )}
          <h1 className="font-serif text-3xl text-forest font-semibold leading-snug">
            {product.name[lang]}
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm">{product.description[lang]}</p>

          <div className="flex items-baseline gap-3 py-2 border-y border-lime/20">
            <span className="text-3xl font-bold text-leaf">₹{price}</span>
            {offerActive && (
              <span className="text-gray-400 line-through text-lg">₹{product.mrp}</span>
            )}
            {!offerActive && (
              <span className="text-xs text-gray-400">{tr.mrp}: ₹{product.mrp}</span>
            )}
          </div>

          {offerActive && product.offerEndsAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{tr.endsIn}:</span>
              <CountdownTimer endsAt={product.offerEndsAt} expiredLabel={t(lang).offers.expired} />
            </div>
          )}

          <p className={`text-sm font-medium ${outOfStock ? 'text-red-500' : 'text-green-700'}`}>
            {outOfStock ? sht.outOfStock : `${product.stock} ${tr.stockLeft}`}
          </p>

          <div className="bg-cream rounded-xl p-4 border border-lime/20">
            <p className="text-xs font-semibold text-forest/60 uppercase tracking-wider mb-1">
              {tr.contains}
            </p>
            <p className="text-sm text-forest/80">{product.contains[lang]}</p>
          </div>

          <button
            disabled={outOfStock}
            onClick={() => add({ id: product.id, type: 'product', name: product.name[lang], price, image: product.image })}
            className="mt-2 bg-leaf text-white font-semibold py-3.5 rounded-xl
              hover:bg-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {outOfStock ? sht.outOfStock : sht.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
