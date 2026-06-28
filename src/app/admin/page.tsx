'use client';
import AdminShell from '@/components/AdminShell';
import Link from 'next/link';
import { getProducts, getCategories, getCombos, getActiveOffers } from '@/lib/store';
import { getCheckoutCounter } from '@/lib/whatsapp';

export default function AdminDashboard() {
  const products   = getProducts();
  const categories = getCategories();
  const combos     = getCombos();
  const offers     = getActiveOffers();
  const checkouts  = getCheckoutCounter();

  const stats = [
    { label: 'Categories',              value: categories.length,                           href: '/admin/categories' },
    { label: 'Products',                value: products.length,                             href: '/admin/products' },
    { label: 'Out of Stock',            value: products.filter(p => p.stock === 0).length,  href: '/admin/products' },
    { label: 'Combos',                  value: combos.length,                               href: '/admin/combos' },
    { label: 'Active Offers',           value: offers.length,                               href: '/admin/offers' },
    { label: 'WhatsApp Checkout Clicks',
      value: checkouts,
      href: '#',
      note: '(Counts checkout button clicks, not confirmed orders)' },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-forest mb-2">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Overview of your store.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-2xl border border-lime/20 p-5 hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-leaf">{s.value}</p>
            <p className="text-sm font-medium text-forest mt-1">{s.label}</p>
            {s.note && <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl border border-lime/20 p-6">
        <h2 className="font-semibold text-forest mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/admin/products',   label: '+ Add Product'  },
            { href: '/admin/combos',     label: '+ Add Combo'    },
            { href: '/admin/offers',     label: '+ Add Offer'    },
            { href: '/admin/categories', label: '+ Add Category' },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className="bg-leaf text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-forest transition-colors">
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
