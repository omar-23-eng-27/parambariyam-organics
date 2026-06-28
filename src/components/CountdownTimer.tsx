'use client';
import { useEffect, useState } from 'react';

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function CountdownTimer({ endsAt, expiredLabel }: {
  endsAt: string;
  expiredLabel: string;
}) {
  // null on first render (SSR) so server and client HTML match
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDiff(new Date(endsAt).getTime() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  // Render nothing until client has hydrated — avoids SSR mismatch
  if (diff === null) return null;

  if (diff <= 0) {
    return <span className="text-red-600 font-medium text-sm">{expiredLabel}</span>;
  }

  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  const parts = d > 0
    ? `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`
    : `${pad(h)}:${pad(m)}:${pad(s)}`;

  return (
    <span className="font-mono text-sm font-semibold text-leaf bg-lime/20 px-2 py-0.5 rounded">
      {parts}
    </span>
  );
}
