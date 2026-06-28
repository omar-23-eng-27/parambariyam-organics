// WhatsApp business number with country code (no + or spaces).
// Override via NEXT_PUBLIC_WHATSAPP_NUMBER env var for production.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918220473456';

export const SITE_NAME = {
  en: 'Parambariyam Organics',
  ta: 'பாரம்பரியம் ஆர்கானிக்ஸ்',
};

// Set to true once Supabase env vars are present.
export const USE_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
