'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import { api, extractErrorMessage } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      toast.success('Welcome back to TaxVat LawAid Admin');
      router.replace('/admin');
    } catch (err) {
      toast.error(extractErrorMessage(err, 'Invalid credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-grid-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/images/taxvat-logo.svg"
            alt="TaxVat LawAid"
            className="h-16 w-16 mx-auto"
          />
          <h1 className="text-2xl font-extrabold text-navy-800">
            Admin Portal Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Authorized personnel only. Protected by HTTP-only JWT session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Admin Email
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@taxvatlawaid.com"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-800/15"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to TaxVat LawAid Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

