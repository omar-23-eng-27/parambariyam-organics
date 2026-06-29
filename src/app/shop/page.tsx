'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { getProducts, getCategories } from '@/lib/store';

export default function ShopPage() {
  const { lang } = useLang();
  const tr = t(lang).shop;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = getCategories();
  const products   = getProducts();
  const filtered   = activeCategory === 'all'
    ? products
    : products.filter((p) => p.categoryId === activeCategory);

  return (
    /* Warm gradient background so white cards pop */
    <div className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ee 0%, #faf8f2 45%, #f3f7ed 100%)' }}>

      {/* Page header — extra top padding to clear the 88px navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-10">
        <ScrollReveal>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-leaf text-lg">🌿</span>
            <span className="text-xs font-semibold text-leaf/80 uppercase tracking-widest">
              {lang === 'en' ? 'Our Collection' : 'எங்கள் தொகுப்பு'}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-forest font-semibold mb-2 relative inline-block">
            {tr.title}
            {/* Accent underline */}
            <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-lime rounded-full" />
          </h1>
          <p className="text-gray-500 text-sm mt-4">{tr.filterBy}</p>
        </ScrollReveal>
      </div>

      {/* Category filter bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <ScrollReveal>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-forest text-white border-forest shadow-md shadow-forest/20'
                  : 'bg-white border-lime/40 text-forest/70 hover:border-leaf hover:text-leaf hover:shadow-sm'
              }`}
            >
              {tr.allCategories}
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-forest text-white border-forest shadow-md shadow-forest/20'
                    : 'bg-white border-lime/40 text-forest/70 hover:border-leaf hover:text-leaf hover:shadow-sm'
                }`}
              >
                {c.name[lang]}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-16">{tr.noProducts}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} className={`[animation-delay:${(i % 8) * 60}ms]`}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
