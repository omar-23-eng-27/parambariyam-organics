'use client';
import Image from 'next/image';
import { Leaf, Users, Heart, Recycle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const ICON_MAP = {
  leaf:    Leaf,
  users:   Users,
  heart:   Heart,
  recycle: Recycle,
};

export default function AboutPage() {
  const { lang } = useLang();
  const tr = t(lang).about;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

      {/* Hero block: image + text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <ScrollReveal>
          {/* Image with trust-badge overlay */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            <Image src="/images/hero.jpg" alt="Our farm" fill className="object-cover" />

            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />

            {/* Trust badge card — bottom-left */}
            <div className="absolute bottom-5 left-5 bg-white/15 backdrop-blur-md border border-white/30
              rounded-2xl px-5 py-4 text-white shadow-lg">
              <p className="font-serif text-3xl font-bold text-lime leading-none">{tr.trustNumber}</p>
              <p className="text-xs font-medium text-white/80 mt-1 max-w-[120px] leading-snug">
                {tr.trustLabel}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h1 className="font-serif text-4xl text-forest mb-6">{tr.title}</h1>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>{tr.p1}</p>
            <p>{tr.p2}</p>
            <p>{tr.p3}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Icon feature row */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {(tr.features as unknown as { icon: string; title: string; desc: string }[]).map((item, i) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? Leaf;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-lime/20 p-5 flex flex-col gap-3
                  shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center text-leaf">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-serif font-semibold text-forest text-sm leading-snug">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
}
