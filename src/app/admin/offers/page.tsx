'use client';
import { useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { getProducts, saveProducts } from '@/lib/store';
import type { Product } from '@/types';
import CountdownTimer from '@/components/CountdownTimer';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminOffers() {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [editing,  setEditing]  = useState<Product | null>(null);

  // Offers are products that have offerPrice set.
  // Admin edits just the offer fields on existing products.
  const offerProducts = products.filter((p) => p.offerPrice);

  const save = () => {
    if (!editing) return;
    const updated = products.map((p) => (p.id === editing.id ? editing : p));
    setProducts(updated); saveProducts(updated);
    setEditing(null);
  };

  const removeOffer = (id: string) => {
    if (!confirm('Remove offer from this product?')) return;
    const updated = products.map((p) =>
      p.id === id ? { ...p, offerPrice: undefined, offerEndsAt: undefined } : p
    );
    setProducts(updated); saveProducts(updated);
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-forest">Offers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Set an offer price + end date on any product. The offer auto-expires when the timer reaches zero.
          </p>
        </div>
      </div>

      {/* Edit form — shows only when editing */}
      {editing && (
        <div className="bg-white border border-lime/30 rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-forest">Edit Offer: {editing.name.en}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Offer Price (₹)</span>
              <input type="number" min="0" value={editing.offerPrice ?? ''}
                onChange={(e) => setEditing({ ...editing, offerPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"/>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Offer Ends At</span>
              <input type="datetime-local"
                value={editing.offerEndsAt ? editing.offerEndsAt.slice(0,16) : ''}
                onChange={(e) => setEditing({ ...editing, offerEndsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"/>
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={save}
              className="bg-leaf text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-forest transition-colors">
              Save Offer
            </button>
            <button onClick={() => setEditing(null)}
              className="border border-gray-200 text-sm px-5 py-2 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add offer to a product without one */}
      <div className="bg-white rounded-2xl border border-lime/20 p-5 mb-6">
        <p className="text-sm font-semibold text-forest mb-3">Add / Edit Offer on a Product</p>
        <select
          onChange={(e) => {
            const p = products.find((pr) => pr.id === e.target.value);
            if (p) setEditing({ ...p });
            e.target.value = '';
          }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40 w-full max-w-xs"
          defaultValue=""
        >
          <option value="" disabled>— pick a product —</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name.en} (MRP ₹{p.mrp})</option>
          ))}
        </select>
      </div>

      {/* Active offers */}
      <h2 className="font-semibold text-forest mb-3">Active Offers ({offerProducts.length})</h2>
      {offerProducts.length === 0 ? (
        <p className="text-gray-400 text-sm">No offers set. Use the selector above to add one.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-lime/20 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream border-b border-lime/20">
              <tr>
                {['Product', 'MRP', 'Offer Price', 'Savings', 'Ends In', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-forest/60 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-lime/10">
              {offerProducts.map((p) => (
                <tr key={p.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-forest max-w-[200px] truncate">{p.name.en}</td>
                  <td className="px-4 py-3 text-gray-400 line-through">₹{p.mrp}</td>
                  <td className="px-4 py-3 text-leaf font-bold">₹{p.offerPrice}</td>
                  <td className="px-4 py-3 text-green-600 text-xs font-semibold">
                    -{Math.round(((p.mrp - p.offerPrice!) / p.mrp) * 100)}%
                  </td>
                  <td className="px-4 py-3">
                    {p.offerEndsAt
                      ? <CountdownTimer endsAt={p.offerEndsAt} expiredLabel="Expired" />
                      : <span className="text-gray-400 text-xs">No end date</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setEditing(p)}
                        className="p-1.5 text-leaf hover:bg-leaf/10 rounded-lg"><Pencil size={14}/></button>
                      <button onClick={() => removeOffer(p.id)}
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
