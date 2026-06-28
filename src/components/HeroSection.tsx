'use client';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function HeroSection() {
  const { lang } = useLang();
  const tr = t(lang).hero;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden -mt-16">
      {/* Background video with Ken Burns */}
      <div className="absolute inset-0 animate-kenburns">
        <video
          autoPlay muted loop playsInline
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-grass-720.mp4" type="video/mp4" />
        </video>
        {/* CSS fallback if video fails */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero.jpg)' }} />
      </div>

      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/55 to-forest/85" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">

        {/* Pill label */}
        <div className="animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="inline-block border border-lime/50 text-lime/90 text-xs font-medium
            tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm bg-lime/10 mb-6">
            {tr.pill}
          </span>
        </div>

        {/* Two-tone brand name */}
        <div className="animate-fadeUp opacity-0 [animation-delay:100ms]"
          style={{ animationFillMode: 'forwards' }}>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 drop-shadow-lg">
            <span className="text-lime">{tr.brandMain}</span>
            {' '}
            <span className="text-white">{tr.brandSub}</span>
          </p>
        </div>

        {/* Main headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight
          animate-fadeUp opacity-0 [animation-delay:200ms] whitespace-pre-line drop-shadow-lg"
          style={{ animationFillMode: 'forwards' }}>
          {tr.headline}
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-white/85 animate-fadeUp opacity-0 [animation-delay:350ms]"
          style={{ animationFillMode: 'forwards' }}>
          {tr.subtext}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fadeUp opacity-0 [animation-delay:500ms]"
          style={{ animationFillMode: 'forwards' }}>
          <Link href="/shop"
            className="bg-lime text-forest font-semibold px-7 py-3 rounded-full hover:bg-lime/90 transition-colors shadow-lg">
            {tr.shopBtn}
          </Link>
          <Link href="/combos"
            className="border-2 border-white text-white font-semibold px-7 py-3 rounded-full hover:bg-white/15 transition-colors">
            {tr.combosBtn}
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fadeUp opacity-0 [animation-delay:650ms]"
          style={{ animationFillMode: 'forwards' }}>
          {[
            { icon: '🌿', label: tr.badge1 },
            { icon: '✅', label: tr.badge2 },
            { icon: '💬', label: tr.badge3 },
          ].map(({ icon, label }) => (
            <div key={label}
              className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20
                px-4 py-2 rounded-full text-sm font-medium">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <div className="w-5 h-8 rounded-full border-2 border-white flex items-start justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
