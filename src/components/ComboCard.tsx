'use client';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { t } from '@/lib/translations';
import { getProducts } from '@/lib/store';
import type { Combo } from '@/types';

export default function ComboCard({ combo }: { combo: Combo }) {
  const { lang } = useLang();
  const { add } = useCart();
  const tr = t(lang).combos;
  const products = getProducts().filter((p) => combo.productIds.includes(p.id));

  return (
    <div className="card-lift bg-white rounded-2xl overflow-hidden border border-lime/20">
      <div className="relative h-52">
        <Image src={combo.image} alt={combo.name[lang]} fill
          className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-serif text-white text-xl font-semibold">{combo.name[lang]}</h3>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">{combo.description[lang]}</p>

        {/* Included products */}
        <div>
          <p className="text-xs font-semibold text-forest/60 uppercase tracking-wider mb-1.5">
            {tr.includes}
          </p>
          <ul className="space-y-0.5">
            {products.map((p) => (
              <li key={p.id} className="text-sm text-forest flex justify-between">
                <span>{p.name[lang]}</span>
                <span className="text-gray-400 line-through text-xs self-center">₹{p.mrp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-lime/20">
          <div>
            <p className="text-xs text-gray-400">Combo Price</p>
            <p className="text-leaf font-bold text-2xl">₹{combo.comboPrice}</p>
          </div>
          <button
            onClick={() => add({ id: combo.id, type: 'combo', name: combo.name[lang], price: combo.comboPrice, image: combo.image })}
            className="bg-leaf text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-forest transition-colors"
          >
            {tr.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
