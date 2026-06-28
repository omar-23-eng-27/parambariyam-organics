import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin — Parambariyam Organics' };

// Admin uses its own layout — no public Navbar/Footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
