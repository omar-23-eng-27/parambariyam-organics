'use client';
import { useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { getCategories, saveCategories } from '@/lib/store';
import type { Category } from '@/types';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

const blank = (): Category => ({
  id: `cat-${Date.now()}`,
  slug: '',
  name: { en: '', ta: '' },
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [editing, setEditing] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = () => {
    if (!editing) return;
    const updated = isNew
      ? [...categories, { ...editing, slug: slugify(editing.name.en) }]
      : categories.map((c) => (c.id === editing.id ? { ...editing, slug: slugify(editing.name.en) } : c));
    setCategories(updated);
    saveCategories(updated);
    setEditing(null);
    setIsNew(false);
  };

  const del = (id: string) => {
    if (!confirm('Delete this category?')) return;
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveCategories(updated);
  };

  const startNew = () => { setEditing(blank()); setIsNew(true); };
  const cancel   = () => { setEditing(null); setIsNew(false); };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-forest">Categories</h1>
        <button onClick={startNew}
          className="bg-leaf text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5">
          <Plus size={15}/> Add New
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white border border-lime/30 rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-forest">{isNew ? 'New Category' : 'Edit Category'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Name (English)</span>
              <input value={editing.name.en}
                onChange={(e) => setEditing({ ...editing, name: { ...editing.name, en: e.target.value } })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-forest/60 mb-1 block">Name (Tamil)</span>
              <input value={editing.name.ta}
                onChange={(e) => setEditing({ ...editing, name: { ...editing.name, ta: e.target.value } })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40" />
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={save}
              className="bg-leaf text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5">
              <Check size={14}/> Save
            </button>
            <button onClick={cancel}
              className="border border-gray-200 text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <X size={14}/> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-lime/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-lime/20">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase">Name (EN)</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase">Name (TA)</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase">Slug</th>
              <th className="px-5 py-3 w-24"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-lime/10">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-5 py-3 font-medium text-forest">{c.name.en}</td>
                <td className="px-5 py-3 text-gray-600">{c.name.ta}</td>
                <td className="px-5 py-3 text-gray-400 font-mono text-xs">{c.slug}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setEditing(c); setIsNew(false); }}
                      className="p-1.5 text-leaf hover:bg-leaf/10 rounded-lg transition-colors"><Pencil size={14}/></button>
                    <button onClick={() => del(c.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
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
