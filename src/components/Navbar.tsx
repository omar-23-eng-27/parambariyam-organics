'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { t } from '@/lib/translations';
import { SITE_NAME } from '@/lib/config';

export default function Navbar() {
  const { lang, toggle } = useLang();
  const { count } = useCart();
  const tr = t(lang).nav;
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On non-hero pages (anything except home) always use the solid style
  const heroPages = ['/'];
  const alwaysSolid = !heroPages.includes(pathname);
  const solid = alwaysSolid || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/',        label: tr.home },
    { href: '/shop',    label: tr.shop },
    { href: '/combos',  label: tr.combos },
    { href: '/offers',  label: tr.offers },
    { href: '/about',   label: tr.about },
    { href: '/contact', label: tr.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#F7FAF2] shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[88px] flex items-center justify-between gap-6">

        {/* Logo — large, flush to left with comfortable margin */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt={SITE_NAME.en}
            width={84}
            height={84}
            className={`object-contain transition-all duration-300 ${
              solid
                ? ''
                : '[filter:drop-shadow(0_3px_12px_rgba(0,0,0,0.6))_drop-shadow(0_0_4px_rgba(0,0,0,0.4))]'
            }`}
          />
          {solid && (
            <span className="font-serif text-lg text-forest/75 leading-tight hidden sm:block tracking-wider">
              Organics
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-[15px] font-medium tracking-wide transition-colors duration-200 group ${
                solid
                  ? 'text-forest/75 hover:text-leaf'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {l.label}
              {/* Underline hover accent */}
              <span className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                solid ? 'bg-leaf' : 'bg-lime/70'
              }`} />
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-all duration-300 tracking-wide ${
              solid
                ? 'border-forest/35 text-forest hover:border-forest hover:bg-forest/5'
                : 'border-white/50 text-white hover:border-white hover:bg-white/10'
            }`}
            aria-label="Switch language"
          >
            {lang === 'en' ? 'தமிழ்' : 'EN'}
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className={`relative p-2 rounded-full transition-all duration-300 ${
              solid
                ? 'text-forest hover:bg-forest/8'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ShoppingCart size={24} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-lime text-forest text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
              solid ? 'text-forest hover:bg-forest/8' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — always solid forest */}
      {open && (
        <div className="lg:hidden bg-forest/97 backdrop-blur-md border-t border-white/10 px-6 py-2 pb-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] font-medium text-white/80 hover:text-lime transition-colors border-b border-white/8 last:border-0 tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
