import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Parambariyam Organics | பாரம்பரியம் ஆர்கானிக்ஸ்',
  description: 'Traditional organic foods from Tamil Nadu — rice, oils, spices, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
