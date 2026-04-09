'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) { setError('Invalid credentials'); setLoading(false); }
    else router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#a67c37" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#a67c37" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
          </div>
          <h1 className="font-serif text-2xl text-white font-bold">GSSO Admin</h1>
          <p className="text-gray-400 text-sm mt-1 font-mono tracking-wider uppercase">Secure Login</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-gold focus:outline-none transition" placeholder="ceo@geostrategicstudies.org" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-gold focus:outline-none transition" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">Geo Strategic Studies Organisation © 2026</p>
      </div>
    </div>
  );
}
