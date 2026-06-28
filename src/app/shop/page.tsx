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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ScrollReveal>
        <h1 className="font-serif text-4xl text-forest mb-2">{tr.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{tr.filterBy}</p>
      </ScrollReveal>

      {/* Category filter chips */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === 'all'
                ? 'bg-leaf text-white border-leaf'
                : 'border-leaf/40 text-leaf hover:bg-leaf/10'
            }`}
          >
            {tr.allCategories}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === c.id
                  ? 'bg-leaf text-white border-leaf'
                  : 'border-leaf/40 text-leaf hover:bg-leaf/10'
              }`}
            >
              {c.name[lang]}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-16">{tr.noProducts}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <ScrollReveal key={p.id} className={`[animation-delay:${(i % 8) * 60}ms]`}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
