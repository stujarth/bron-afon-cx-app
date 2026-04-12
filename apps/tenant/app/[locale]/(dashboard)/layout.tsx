import { useTranslations } from 'next-intl';
import {
  Home,
  Wrench,
  PoundSterling,
  User,
  HelpCircle,
  Globe,
  LogOut,
  Menu,
} from 'lucide-react';
import { Link } from '../../../i18n/navigation';

function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1 text-sm">
      <Link
        href="/"
        locale="en"
        className="rounded-md px-2 py-1 font-medium transition-colors hover:bg-background"
      >
        EN
      </Link>
      <Link
        href="/"
        locale="cy"
        className="rounded-md px-2 py-1 font-medium transition-colors hover:bg-background"
      >
        CY
      </Link>
    </div>
  );
}

function Sidebar() {
  const t = useTranslations('nav');

  const navItems = [
    { href: '/(dashboard)', label: t('home'), icon: Home },
    { href: '/(dashboard)/repairs', label: t('repairs'), icon: Wrench },
    { href: '/(dashboard)/rent', label: t('rent'), icon: PoundSterling },
    { href: '/(dashboard)/profile', label: t('profile'), icon: User },
    { href: '/(dashboard)/support', label: t('support'), icon: HelpCircle },
  ];

  return (
    <aside className="hidden w-64 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
          BA
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">Bron Afon</span>
      </div>

      <nav className="flex-1 p-4" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
            SW
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Si&acirc;n Williams
            </p>
            <p className="truncate text-xs text-muted-foreground">14 Heol y Castell</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MobileBottomNav() {
  const t = useTranslations('nav');

  const navItems = [
    { href: '/(dashboard)', label: t('home'), icon: Home },
    { href: '/(dashboard)/repairs', label: t('repairs'), icon: Wrench },
    { href: '/(dashboard)/rent', label: t('rent'), icon: PoundSterling },
    { href: '/(dashboard)/support', label: t('support'), icon: HelpCircle },
    { href: '/(dashboard)/profile', label: t('profile'), icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-primary-600"
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-8">
          <button
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={t('signOut')}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('signOut')}</span>
            </button>
          </div>
        </header>

        <main id="main-content" className="flex-1 p-4 pb-20 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
