'use client';
import { useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { getProducts, saveProducts, getCategories } from '@/lib/store';
import type { Product } from '@/types';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

const blank = (): Product => ({
  id: `prod-${Date.now()}`,
  categoryId: '', weight: '',
  name:        { en: '', ta: '' },
  description: { en: '', ta: '' },
  contains:    { en: '', ta: '' },
  mrp: 0, stock: 0, image: '', isBestseller: false,
});

export default function AdminProducts() {
  const [products,   setProducts]  = useState<Product[]>(getProducts());
  const [categories, ]             = useState(getCategories());
  const [editing,    setEditing]   = useState<Product | null>(null);
  const [isNew,      setIsNew]     = useState(false);
  const [filter,     setFilter]    = useState('all');

  const save = () => {
    if (!editing) return;
    const updated = isNew
      ? [...products, editing]
      : products.map((p) => (p.id === editing.id ? editing : p));
    setProducts(updated); saveProducts(updated);
    setEditing(null); setIsNew(false);
  };

  const del = (id: string) => {
    if (!confirm('Delete this product?')) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated); saveProducts(updated);
  };

  const setField = (key: string, value: unknown) =>
    setEditing((prev) => prev ? { ...prev, [key]: value } : prev);

  const setBiText = (key: 'name' | 'description' | 'contains', lang: 'en' | 'ta', value: string) =>
    setEditing((prev) => prev ? { ...prev, [key]: { ...prev[key], [lang]: value } } : prev);

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name.en ?? id;
  const filtered = filter === 'all' ? products : products.filter((p) => p.categoryId === filter);

  const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40';
  const labelCls = 'block text-xs font-semibold text-forest/60 mb-1';

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-forest">Products</h1>
        <button onClick={() => { setEditing(blank()); setIsNew(true); }}
          className="bg-leaf text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5 cursor-pointer">
          <Plus size={15}/> Add New
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...categories.map((c) => c.id)].map((id) => (
          <button key={id} onClick={() => setFilter(id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              filter === id ? 'bg-leaf text-white border-leaf' : 'border-leaf/40 text-leaf hover:bg-leaf/10'
            }`}>
            {id === 'all' ? 'All' : categoryName(id)}
          </button>
        ))}
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white border border-lime/30 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-forest mb-4">{isNew ? 'New Product' : 'Edit Product'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* BiText fields */}
            {(['name', 'description', 'contains'] as const).map((key) => (
              <>
                <label key={`${key}-en`} className="block">
                  <span className={labelCls}>{key.charAt(0).toUpperCase() + key.slice(1)} (English)</span>
                  <textarea rows={key === 'name' ? 1 : 2} value={editing[key].en}
                    onChange={(e) => setBiText(key, 'en', e.target.value)}
                    className={`${inputCls} resize-none`}/>
                </label>
                <label key={`${key}-ta`} className="block">
                  <span className={labelCls}>{key.charAt(0).toUpperCase() + key.slice(1)} (Tamil)</span>
                  <textarea rows={key === 'name' ? 1 : 2} value={editing[key].ta}
                    onChange={(e) => setBiText(key, 'ta', e.target.value)}
                    className={`${inputCls} resize-none`}/>
                </label>
              </>
            ))}

            {/* Weight / size */}
            <label className="block">
              <span className={labelCls}>Weight / Size (e.g. 500 g, 1 kg, 250 ml)</span>
              <input value={editing.weight ?? ''}
                onChange={(e) => setField('weight', e.target.value)}
                className={inputCls} placeholder="e.g. 1 kg"/>
            </label>

            {/* Category */}
            <label className="block">
              <span className={labelCls}>Category</span>
              <select value={editing.categoryId} onChange={(e) => setField('categoryId', e.target.value)}
                className={`${inputCls} py-2.5`}>
                <option value="">— select —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}
              </select>
            </label>

            {/* Image */}
            <label className="block">
              <span className={labelCls}>Image URL</span>
              <input value={editing.image} onChange={(e) => setField('image', e.target.value)} className={inputCls}/>
            </label>

            {/* MRP */}
            <label className="block">
              <span className={labelCls}>MRP (₹)</span>
              <input type="number" min="0" value={editing.mrp}
                onChange={(e) => setField('mrp', Number(e.target.value))} className={inputCls}/>
            </label>

            {/* Offer price */}
            <label className="block">
              <span className={labelCls}>Offer Price (₹) — blank = none</span>
              <input type="number" min="0" value={editing.offerPrice ?? ''}
                onChange={(e) => setField('offerPrice', e.target.value ? Number(e.target.value) : undefined)}
                className={inputCls}/>
            </label>

            {/* Offer ends at */}
            <label className="block">
              <span className={labelCls}>Offer Ends At</span>
              <input type="datetime-local"
                value={editing.offerEndsAt ? editing.offerEndsAt.slice(0, 16) : ''}
                onChange={(e) => setField('offerEndsAt', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                className={inputCls}/>
            </label>

            {/* Stock */}
            <label className="block">
              <span className={labelCls}>Stock (units)</span>
              <input type="number" min="0" value={editing.stock}
                onChange={(e) => setField('stock', Number(e.target.value))} className={inputCls}/>
            </label>

            {/* Bestseller toggle — full width */}
            <label className="sm:col-span-2 flex items-center gap-3 cursor-pointer select-none">
              <div className={`relative w-10 h-6 rounded-full transition-colors ${editing.isBestseller ? 'bg-amber-500' : 'bg-gray-200'}`}
                onClick={() => setField('isBestseller', !editing.isBestseller)}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${editing.isBestseller ? 'left-5' : 'left-1'}`}/>
              </div>
              <span className="text-sm font-medium text-forest">
                ⭐ Mark as Bestseller / Popular
              </span>
              {editing.isBestseller && (
                <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">ON</span>
              )}
            </label>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={save}
              className="bg-leaf text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5 cursor-pointer">
              <Check size={14}/> Save
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }}
              className="border border-gray-200 text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer">
              <X size={14}/> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-lime/20 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-cream border-b border-lime/20">
            <tr>
              {['Product', 'Category', 'Weight', 'MRP', 'Offer', 'Stock', 'Badges', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-forest/60 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-lime/10">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-4 py-3 font-medium text-forest max-w-[180px] truncate">{p.name.en}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{categoryName(p.categoryId)}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.weight || '—'}</td>
                <td className="px-4 py-3">₹{p.mrp}</td>
                <td className="px-4 py-3">{p.offerPrice ? `₹${p.offerPrice}` : '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                    {p.stock === 0 ? 'Out' : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {p.isBestseller && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">⭐</span>
                    )}
                    {p.offerPrice && (
                      <span className="bg-lime/20 text-leaf text-[10px] font-bold px-1.5 py-0.5 rounded-full">SALE</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setEditing(p); setIsNew(false); }}
                      className="p-1.5 text-leaf hover:bg-leaf/10 rounded-lg cursor-pointer"><Pencil size={14}/></button>
                    <button onClick={() => del(p.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
