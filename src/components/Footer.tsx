'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/config';

/* ── Social icon SVGs ─────────────────────────────────────────────────────── */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  const { lang } = useLang();
  const tr  = t(lang).footer;
  const nav = t(lang).nav;

  const linkGroups = [
    {
      heading: tr.colProducts,
      links: [
        { href: '/shop',   label: nav.shop   },
        { href: '/combos', label: nav.combos },
        { href: '/offers', label: nav.offers },
      ],
    },
    {
      heading: tr.colCompany,
      links: [
        { href: '/about',   label: nav.about   },
        { href: '/contact', label: nav.contact },
        { href: '/admin',   label: 'Admin'      },
      ],
    },
    {
      heading: tr.colSupport,
      links: [
        { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
        { href: '#', label: tr.faq     },
        { href: '#', label: tr.returns },
        { href: '#', label: tr.privacy },
      ],
    },
  ];

  const socials = [
    { icon: <FacebookIcon />,  href: '#',                               label: 'Facebook'  },
    { icon: <InstagramIcon />, href: '#',                               label: 'Instagram' },
    { icon: <YoutubeIcon />,   href: '#',                               label: 'YouTube'   },
    { icon: <WhatsAppIcon />,  href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-forest text-white/70 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand column — spans 2 cols on large screens */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/90 rounded-full p-1 shadow-md shrink-0">
              <Image src="/logo.png" alt={SITE_NAME.en} width={52} height={52} className="rounded-full object-contain" />
            </div>
            <div>
              <p className="font-serif text-white text-base leading-tight">{SITE_NAME[lang]}</p>
              <p className="text-white/40 text-xs mt-0.5">நலமது வாழ்க்கை முறை</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/55 max-w-xs">{tr.tagline}</p>
          <p className="text-xs text-white/30 leading-relaxed border-t border-white/10 pt-4 max-w-xs">
            {tr.deliveryNote}
          </p>

          {/* Social icons */}
          <div className="flex gap-3 pt-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center
                  text-white/50 hover:text-white hover:border-white/40 transition-colors cursor-pointer">
                {s.icon}
              </a>
            ))}
          </div>

          {/* WhatsApp chat pill */}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full
              pl-4 pr-3 py-2 hover:border-white/30 transition-colors group cursor-pointer">
            <span className="text-xs text-white/60 group-hover:text-white/90 transition-colors">
              {lang === 'en' ? 'Chat on WhatsApp' : 'WhatsApp-ல் பேசுங்கள்'}
            </span>
            <span className="bg-green-600/30 group-hover:bg-green-600/50 rounded-full p-1.5 transition-colors text-green-400">
              <WhatsAppIcon />
            </span>
          </a>
        </div>

        {/* Link groups */}
        {linkGroups.map((group) => (
          <div key={group.heading} className="space-y-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">{group.heading}</h4>
            <ul className="space-y-2.5">
              {group.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-6 py-5 max-w-7xl mx-auto
        flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
        <span>© {new Date().getFullYear()} {SITE_NAME[lang]}. {tr.rights}</span>
        <div className="flex gap-4">
          <span className="text-white/20">
            {lang === 'en' ? '🌿 100% Organic Certified' : '🌿 100% இயற்கை சான்றிதழ்'}
          </span>
        </div>
      </div>
    </footer>
  );
}
