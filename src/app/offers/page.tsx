'use client';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { getActiveOffers } from '@/lib/store';

export default function OffersPage() {
  const { lang } = useLang();
  const tr = t(lang).offers;
  const offers = getActiveOffers();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ScrollReveal>
        <h1 className="font-serif text-4xl text-forest mb-2">{tr.title}</h1>
        <p className="text-gray-500 text-sm mb-10">{tr.subtitle}</p>
      </ScrollReveal>

      {offers.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">🏷️</p>
          <p>{tr.noOffers}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((p, i) => (
            <ScrollReveal key={p.id} className={`[animation-delay:${i * 80}ms]`}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
