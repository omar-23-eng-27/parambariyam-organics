/**
 * LOCAL DEMO AUTH — used when Supabase env vars are NOT set.
 *
 * These are demo-only credentials for local development.
 * They grant access to nothing real and should NOT be used in production.
 * When NEXT_PUBLIC_SUPABASE_URL is set, the admin login page switches to
 * Supabase Auth and these credentials are ignored entirely.
 *
 * Two accounts are provided so admin + developer can both log in.
 */
export const DEMO_USERS = [
  { email: 'admin@parambariyam.demo',     password: 'admin@2024' },
  { email: 'developer@parambariyam.demo', password: 'dev@2024' },
];

export function demoLogin(email: string, password: string): boolean {
  return DEMO_USERS.some((u) => u.email === email && u.password === password);
}

const SESSION_KEY = 'po_admin_session';

export function setAdminSession(): void {
  if (typeof window !== 'undefined') sessionStorage.setItem(SESSION_KEY, '1');
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === '1';
}
