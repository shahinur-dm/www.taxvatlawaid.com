'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Briefcase,
  CalendarCheck,
  ExternalLink,
  FileEdit,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-react';
import { api } from '@/lib/api';
import { AdminUser } from '@/types';

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarCheck },
  { label: 'Services & Divisions', href: '/admin/services', icon: Briefcase },
  { label: 'Website Content', href: '/admin/content', icon: FileEdit },
  { label: 'Settings & Notice', href: '/admin/settings', icon: Settings },
];

export function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;
    async function verifySession() {
      try {
        const res = await api.get<{ success: boolean; admin: AdminUser }>('/auth/me');
        if (active && res.data?.admin) {
          setAdmin(res.data.admin);
        }
      } catch {
        if (active) {
          router.replace('/admin/login');
        }
      } finally {
        if (active) setCheckingAuth(false);
      }
    }
    verifySession();
    return () => {
      active = false;
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      toast.success('Signed out successfully');
      router.replace('/admin/login');
    } catch {
      router.replace('/admin/login');
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-navy-800" />
        <p className="text-sm font-medium text-slate-600">
          Verifying administrator session...
        </p>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-navy-900 text-white">
        <div className="h-16 px-5 flex items-center gap-3 border-b border-navy-800">
          <img
            src="/images/taxvat-logo.svg"
            alt="TaxVat LawAid"
            className="h-9 w-9 bg-white rounded-full p-0.5"
          />
          <div>
            <div className="font-extrabold text-sm tracking-tight">TaxVat LawAid</div>
            <div className="text-[11px] text-slate-400">Admin Control Panel</div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-brandRed-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-navy-800 hover:text-white transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-300 hover:bg-navy-800 hover:text-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-slate-950/60"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-navy-900 text-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 px-4 flex items-center justify-between border-b border-navy-800">
              <span className="font-bold text-sm">TaxVat LawAid Admin</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded hover:bg-navy-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
                      active
                        ? 'bg-brandRed-600 text-white'
                        : 'text-slate-300 hover:bg-navy-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-navy-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-300 hover:bg-navy-800"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-extrabold text-navy-800 truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-slate-500 truncate hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-navy-800">{admin.name}</div>
              <div className="text-[11px] text-slate-500">{admin.email}</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-[11px] font-bold uppercase">
              {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

