'use client';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import ComboCard from '@/components/ComboCard';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { getProducts, getCombos } from '@/lib/store';

export default function Home() {
  const { lang } = useLang();
  const tr = t(lang);
  const featuredProducts = getProducts().filter((p) => p.stock > 0).slice(0, 4);
  const combos = getCombos().slice(0, 2);

  return (
    <>
      <HeroSection />

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest">{tr.shop.title}</h2>
              <p className="text-gray-500 mt-1 text-sm">
                {lang === 'en' ? 'Our most-loved organic staples' : 'எங்கள் அதிக விரும்பப்படும் இயற்கை உணவுகள்'}
              </p>
            </div>
            <Link href="/shop" className="text-leaf font-semibold text-sm hover:underline shrink-0">
              {lang === 'en' ? 'View all →' : 'அனைத்தும் பாருங்கள் →'}
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p, i) => (
            <ScrollReveal key={p.id} className={`[animation-delay:${i * 100}ms]`}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-leaf text-white py-16 px-4">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl leading-snug">
            {lang === 'en'
              ? '"Food is our first medicine. Choose it wisely."'
              : '"உணவே மருந்து. அதை கவனமாக தேர்ந்தெடுங்கள்."'}
          </p>
          <p className="mt-3 text-white/70 text-sm">— {lang === 'en' ? 'Ancient Tamil wisdom' : 'பண்டைய தமிழ் ஞானம்'}</p>
        </ScrollReveal>
      </section>

      {/* Combos */}
      {combos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest">{tr.combos.title}</h2>
                <p className="text-gray-500 mt-1 text-sm">{tr.combos.subtitle}</p>
              </div>
              <Link href="/combos" className="text-leaf font-semibold text-sm hover:underline shrink-0">
                {lang === 'en' ? 'View all →' : 'அனைத்தும் பாருங்கள் →'}
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combos.map((c, i) => (
              <ScrollReveal key={c.id} className={`[animation-delay:${i * 150}ms]`}>
                <ComboCard combo={c} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="bg-cream border-t border-lime/20 py-20 px-4">
        <ScrollReveal className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
            {lang === 'en' ? 'Why Choose Us?' : 'ஏன் எங்களை தேர்ந்தெடுக்கணும்?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🌾', en: 'Chemical-Free Farming', ta: 'இரசாயன இல்லா வேளாண்மை',
                den: 'Every crop grown without synthetic pesticides or fertilisers.',
                dta: 'செயற்கை பூச்சிக்கொல்லி இல்லாமல் வளர்க்கப்பட்ட ஒவ்வொரு பயிர்.' },
              { icon: '🏡', en: 'Direct from Farm', ta: 'நேரடியாக பண்ணையிலிருந்து',
                den: 'No middlemen. You get the freshest product at the fairest price.',
                dta: 'இடைத்தரகர்கள் இல்லை. புதுமையான தயாரிப்பு நேரடியாக உங்களுக்கு.' },
              { icon: '📦', en: 'WhatsApp Ordering', ta: 'WhatsApp ஆர்டர்',
                den: 'Simple, personal ordering — just send us a message.',
                dta: 'எளிய, தனிப்பட்ட ஆர்டர் — ஒரு செய்தி அனுப்புங்கள்.' },
            ].map((item) => (
              <div key={item.en} className="p-6 bg-white rounded-2xl border border-lime/20 shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-serif text-forest font-semibold text-lg mb-2">
                  {lang === 'en' ? item.en : item.ta}
                </h3>
                <p className="text-gray-500 text-sm">
                  {lang === 'en' ? item.den : item.dta}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
