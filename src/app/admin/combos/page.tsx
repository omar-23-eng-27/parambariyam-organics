'use client';
import { useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { getCombos, saveCombos, getProducts } from '@/lib/store';
import type { Combo } from '@/types';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

const blank = (): Combo => ({
  id: `combo-${Date.now()}`,
  name:        { en: '', ta: '' },
  description: { en: '', ta: '' },
  productIds:  [],
  comboPrice:  0,
  image:       '',
});

export default function AdminCombos() {
  const [combos,   setCombos]   = useState<Combo[]>(getCombos());
  const [products, ]            = useState(getProducts());
  const [editing,  setEditing]  = useState<Combo | null>(null);
  const [isNew,    setIsNew]    = useState(false);

  const save = () => {
    if (!editing) return;
    const updated = isNew
      ? [...combos, editing]
      : combos.map((c) => (c.id === editing.id ? editing : c));
    setCombos(updated); saveCombos(updated);
    setEditing(null); setIsNew(false);
  };

  const del = (id: string) => {
    if (!confirm('Delete this combo?')) return;
    const updated = combos.filter((c) => c.id !== id);
    setCombos(updated); saveCombos(updated);
  };

  const toggleProduct = (id: string) => {
    if (!editing) return;
    const ids = editing.productIds.includes(id)
      ? editing.productIds.filter((p) => p !== id)
      : [...editing.productIds, id];
    setEditing({ ...editing, productIds: ids });
  };

  const setBiText = (key: 'name' | 'description', lang: 'en' | 'ta', value: string) =>
    setEditing((prev) => prev ? { ...prev, [key]: { ...prev[key], [lang]: value } } : prev);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-forest">Combos</h1>
        <button onClick={() => { setEditing(blank()); setIsNew(true); }}
          className="bg-leaf text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5">
          <Plus size={15}/> Add New
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-lime/30 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-forest mb-4">{isNew ? 'New Combo' : 'Edit Combo'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['name','description'] as const).map((key) => (
              <>
                <label key={`${key}-en`} className="block">
                  <span className="text-xs font-semibold text-forest/60 mb-1 block capitalize">{key} (English)</span>
                  <textarea rows={2} value={editing[key].en}
                    onChange={(e) => setBiText(key, 'en', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40 resize-none"/>
                </label>
                <label key={`${key}-ta`} className="block">
                  <span className="text-xs font-semibold text-forest/60 mb-1 block capitalize">{key} (Tamil)</span>
                  <textarea rows={2} value={editing[key].ta}
                    onChange={(e) => setBiText(key, 'ta', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40 resize-none"/>
                </label>
              </>
            ))}

            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Combo Price (₹)</span>
              <input type="number" min="0" value={editing.comboPrice}
                onChange={(e) => setEditing({ ...editing, comboPrice: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"/>
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Image URL</span>
              <input value={editing.image}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"/>
            </label>

            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-forest/60 mb-2">Products in Combo</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {products.map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editing.productIds.includes(p.id)}
                      onChange={() => toggleProduct(p.id)}
                      className="accent-leaf" />
                    <span className="text-xs text-forest line-clamp-1">{p.name.en}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={save}
              className="bg-leaf text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5">
              <Check size={14}/> Save
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }}
              className="border border-gray-200 text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <X size={14}/> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combos.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-lime/20 p-5">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-serif font-semibold text-forest text-lg">{c.name.en}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.name.ta}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{c.description.en}</p>
                <p className="text-leaf font-bold mt-2">₹{c.comboPrice}</p>
                <p className="text-xs text-gray-400 mt-1">{c.productIds.length} products</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditing(c); setIsNew(false); }}
                  className="p-1.5 text-leaf hover:bg-leaf/10 rounded-lg"><Pencil size={14}/></button>
                <button onClick={() => del(c.id)}
                  className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
