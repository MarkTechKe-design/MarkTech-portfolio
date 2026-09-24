'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // Force a hard window redirect so the browser commits and sends the admin_token cookie
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid password. Try again.');
        setLoading(false);
      }
    } catch {
      setError('Connection failure. Verify server status.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 selection:bg-[#ff6b1a] selection:text-black">
      <div className="w-full max-w-sm">
        {/* Brand Header */}
        <div className="mb-8 text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a] group-hover:scale-125 transition-transform" />
            <span className="font-black text-xl tracking-[0.25em] text-white uppercase font-mono">
              MARK<span className="text-white/40 font-light ml-1">TECH</span>
            </span>
          </Link>
          <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-mono">
            Control Console · Oduor Mark
          </p>
        </div>

        {/* Auth Box */}
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-white font-bold text-lg mb-1">Administrative Access</h1>
          <p className="text-white/40 text-xs mb-6 font-light">
            Authenticate to manage platforms, inquiries, and analytics.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-white/50">
                Master Password
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b1a] transition-colors font-mono text-sm"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-mono py-1 px-2 rounded bg-red-500/10 border border-red-500/20">
                ✕ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#ff6b1a] hover:bg-[#ff8c42] text-black text-xs uppercase tracking-[0.2em] font-bold font-mono transition-all duration-300 shadow-lg shadow-orange-500/10 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Console →'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <Link
              href="/"
              className="text-[11px] font-mono text-white/40 hover:text-white transition-colors"
            >
              ← Back to Main Portfolio
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/20 font-mono mt-6">
          Encrypted Session · Token Expiry 7 Days
        </p>
      </div>
    </div>
  );
}