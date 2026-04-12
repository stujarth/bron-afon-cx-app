import Link from 'next/link';
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
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tenants', label: 'Tenants', icon: Users },
  { href: '/dashboard/repairs', label: 'Repairs', icon: Wrench },
  { href: '/dashboard/communications', label: 'Communications', icon: MessageSquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

function AdminSidebar() {
  return (
    &lt;aside className="hidden w-64 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col"&gt;
      &lt;div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6"&gt;
        &lt;div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white"&gt;
          H
        &lt;/div&gt;
        &lt;div&gt;
          &lt;span className="text-sm font-semibold text-sidebar-foreground"&gt;Hafan Admin&lt;/span&gt;
          &lt;p className="text-xs text-muted-foreground"&gt;Bron Afon&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;nav className="flex-1 p-4" aria-label="Admin navigation"&gt;
        &lt;ul className="space-y-1"&gt;
          {navItems.map((item) =&gt; (
            &lt;li key={item.href}&gt;
              &lt;Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              &gt;
                &lt;item.icon className="h-5 w-5" aria-hidden="true" /&gt;
                {item.label}
              &lt;/Link&gt;
            &lt;/li&gt;
          ))}
        &lt;/ul&gt;
      &lt;/nav&gt;

      &lt;div className="border-t border-sidebar-border p-4"&gt;
        &lt;div className="flex items-center gap-3"&gt;
          &lt;div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700"&gt;
            &lt;Shield className="h-4 w-4" /&gt;
          &lt;/div&gt;
          &lt;div className="flex-1 truncate"&gt;
            &lt;p className="truncate text-sm font-medium text-sidebar-foreground"&gt;Admin User&lt;/p&gt;
            &lt;p className="truncate text-xs text-muted-foreground"&gt;Staff&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/aside&gt;
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    &lt;div className="flex min-h-screen"&gt;
      &lt;AdminSidebar /&gt;
      &lt;div className="flex flex-1 flex-col"&gt;
        &lt;header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-8"&gt;
          &lt;button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" aria-label="Open menu"&gt;
            &lt;Menu className="h-5 w-5" /&gt;
          &lt;/button&gt;
          &lt;div className="hidden lg:block" /&gt;
          &lt;div className="flex items-center gap-4"&gt;
            &lt;Link href="/dashboard/settings" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Settings"&gt;
              &lt;Settings className="h-5 w-5" /&gt;
            &lt;/Link&gt;
            &lt;button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Sign out"&gt;
              &lt;LogOut className="h-4 w-4" aria-hidden="true" /&gt;
              &lt;span className="hidden sm:inline"&gt;Sign out&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/header&gt;
        &lt;main id="main-content" className="flex-1 p-4 lg:p-8"&gt;
          {children}
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
