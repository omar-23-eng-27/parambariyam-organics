'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { demoLogin, setAdminSession } from '@/lib/adminAuth';
import { SITE_NAME, USE_SUPABASE } from '@/lib/config';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (USE_SUPABASE) {
      // ── SUPABASE AUTH (production) ──────────────────────────────────────
      // Swap this block in when Supabase env vars are present.
      // The getSupabaseClient() import is already available in lib/supabase.ts.
      // Example:
      //   const sb = getSupabaseClient()!;
      //   const { error } = await sb.auth.signInWithPassword({ email, password });
      //   if (error) { setError(error.message); setLoading(false); return; }
      //   router.push('/admin');
      setError('Supabase not configured yet.');
      setLoading(false);
      return;
    }

    // ── LOCAL DEMO AUTH ─────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 300)); // small UX delay
    const ok = demoLogin(email, password);
    if (ok) {
      setAdminSession();
      router.push('/admin');
    } else {
      setError('Invalid credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.jpeg" alt={SITE_NAME.en} width={60} height={60} className="rounded-full mb-3" />
          <h1 className="font-serif text-2xl text-forest">Admin Login</h1>
          {!USE_SUPABASE && (
            <div className="mt-3 text-xs bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-center text-yellow-800">
              <strong>Demo Mode</strong> — use demo credentials below.<br />
              admin@parambariyam.demo / admin@2024
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-lime/20 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest/60 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-forest/60 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-leaf text-white font-semibold py-2.5 rounded-xl hover:bg-forest transition-colors disabled:opacity-50 text-sm">
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
