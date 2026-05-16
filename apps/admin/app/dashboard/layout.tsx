'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Wrench,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Shield,
  ClipboardList,
  CalendarDays,
  X,
  Star,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tenants', label: 'Tenants', icon: Users },
  { href: '/dashboard/repairs', label: 'Repairs', icon: Wrench },
  { href: '/dashboard/casework', label: 'Casework', icon: ClipboardList },
  { href: '/dashboard/planned-works', label: 'Planned works', icon: CalendarDays },
  { href: '/dashboard/feedback', label: 'Feedback', icon: Star },
  { href: '/dashboard/communications', label: 'Communications', icon: MessageSquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname?.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? 'text-primary-600' : ''}`}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SidebarBranding() {
  return (
    <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
        H
      </div>
      <div>
        <span className="text-sm font-semibold text-sidebar-foreground">Hafan Admin</span>
        <p className="text-xs text-muted-foreground">Bron Afon</p>
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-sidebar-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
          <Shield className="h-4 w-4" />
        </div>
        <div className="flex-1 truncate">
          <p className="truncate text-sm font-medium text-sidebar-foreground">Admin User</p>
          <p className="truncate text-xs text-muted-foreground">Staff</p>
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/60">
        admin v0.4.1
      </p>
    </div>
  );
}

function DesktopSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <SidebarBranding />
      <nav className="flex-1 p-4" aria-label="Admin navigation">
        <NavList />
      </nav>
      <SidebarFooter />
    </aside>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-2xl">
        <div className="flex h-16 items-center justify-between gap-3 border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
              H
            </div>
            <div>
              <span className="text-sm font-semibold text-sidebar-foreground">Hafan Admin</span>
              <p className="text-xs text-muted-foreground">Bron Afon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4" aria-label="Admin navigation">
          <NavList onNavigate={onClose} />
        </nav>
        <SidebarFooter />
      </aside>
    </div>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/settings"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>
        <main id="main-content" className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
