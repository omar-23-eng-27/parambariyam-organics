'use client';
import ComboCard from '@/components/ComboCard';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { getCombos } from '@/lib/store';

export default function CombosPage() {
  const { lang } = useLang();
  const tr = t(lang).combos;
  const combos = getCombos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ScrollReveal>
        <h1 className="font-serif text-4xl text-forest mb-2">{tr.title}</h1>
        <p className="text-gray-500 text-sm mb-10">{tr.subtitle}</p>
      </ScrollReveal>

      {combos.length === 0 ? (
        <p className="text-gray-500 text-center py-16">{tr.noCombos}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((c, i) => (
            <ScrollReveal key={c.id} className={`[animation-delay:${i * 120}ms]`}>
              <ComboCard combo={c} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
