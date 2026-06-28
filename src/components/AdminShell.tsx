'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { isAdminLoggedIn, clearAdminSession } from '@/lib/adminAuth';
import { SITE_NAME, USE_SUPABASE } from '@/lib/config';

const NAV = [
  { href: '/admin',            label: 'Dashboard'   },
  { href: '/admin/categories', label: 'Categories'  },
  { href: '/admin/products',   label: 'Products'    },
  { href: '/admin/combos',     label: 'Combos'      },
  { href: '/admin/offers',     label: 'Offers'      },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdminLoggedIn()) router.replace('/admin/login');
  }, [router]);

  const logout = () => {
    clearAdminSession();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-forest text-white flex flex-col">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
          <Image src="/logo.jpeg" alt={SITE_NAME.en} width={32} height={32} className="rounded-full" />
          <span className="font-serif text-sm leading-tight">{SITE_NAME.en}<br/><span className="text-white/50 text-xs font-sans">Admin</span></span>
        </div>

        {!USE_SUPABASE && (
          <div className="mx-3 mt-3 text-xs bg-yellow-500/20 border border-yellow-400/30 rounded-lg px-2 py-1.5 text-yellow-200">
            ⚠️ Demo Mode — data is local only
          </div>
        )}

        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href ? 'bg-leaf text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button onClick={logout}
            className="w-full text-left text-sm text-white/60 hover:text-white transition-colors">
            ← Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
