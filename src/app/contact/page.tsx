'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { WHATSAPP_NUMBER } from '@/lib/config';

export default function ContactPage() {
  const { lang } = useLang();
  const tr = t(lang).contact;
  const ft = t(lang).footer;

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `*New Enquiry — Parambariyam Organics*`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      ``,
      `Message:`,
      form.message,
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`mailto:${ft.email}?subject=${subject}&body=${body}`);
  };

  const infoItems = [
    { Icon: MapPin, label: tr.visitUs,  value: ft.address          },
    { Icon: Phone,  label: tr.callUs,   value: ft.phone            },
    { Icon: Mail,   label: tr.emailUs,  value: ft.email            },
    { Icon: Clock,  label: tr.hours,    value: tr.hoursValue       },
  ];

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-forest placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-leaf/30 transition-shadow';

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <ScrollReveal>
        <h1 className="font-serif text-4xl text-forest mb-2">{tr.title}</h1>
        <p className="text-gray-500 text-sm mb-12">
          {lang === 'en'
            ? "We'd love to hear from you. Send a message or reach us on WhatsApp."
            : 'உங்கள் கருத்துகளை வரவேற்கிறோம். செய்தி அனுப்புங்கள் அல்லது WhatsApp-ல் தொடர்பு கொள்ளுங்கள்.'}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact form */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-lime/20 shadow-sm p-7 space-y-4">
            <h2 className="font-serif text-xl text-forest font-semibold">{tr.formTitle}</h2>

            <div>
              <label className="block text-xs font-semibold text-forest/60 mb-1">{tr.nameLabel}</label>
              <input value={form.name} onChange={set('name')} placeholder={tr.namePlaceholder}
                className={inputCls} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest/60 mb-1">{tr.emailFieldLabel}</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder={tr.emailPlaceholder}
                className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest/60 mb-1">{tr.phoneFieldLabel}</label>
              <input type="tel" value={form.phone} onChange={set('phone')} placeholder={tr.phonePlaceholder}
                className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest/60 mb-1">{tr.messageLabel}</label>
              <textarea rows={4} value={form.message} onChange={set('message')} placeholder={tr.messagePlaceholder}
                className={`${inputCls} resize-none`} required />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={sendWhatsApp}
                className="flex-1 bg-green-600 text-white text-sm font-semibold py-3 rounded-xl
                  hover:bg-green-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {tr.sendBtn}
              </button>
              <button onClick={sendEmail}
                className="flex-1 border border-leaf text-leaf text-sm font-semibold py-3 rounded-xl
                  hover:bg-leaf/5 transition-colors cursor-pointer">
                {tr.sendMailBtn}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Info block */}
        <ScrollReveal>
          <div className="space-y-4">
            {infoItems.map(({ Icon, label, value }) => (
              <div key={label}
                className="bg-white rounded-2xl border border-lime/20 p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-lime/15 flex items-center justify-center text-leaf shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest/50 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm text-forest leading-relaxed">{value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp quick-link */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 text-white rounded-2xl p-5
                hover:bg-green-700 transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div>
                <p className="font-semibold text-sm">{tr.whatsappBtn}</p>
                <p className="text-green-100 text-xs">+{WHATSAPP_NUMBER}</p>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
