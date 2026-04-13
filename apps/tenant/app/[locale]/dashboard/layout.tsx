import { useTranslations } from 'next-intl';
import {
  Home,
  Wrench,
  PoundSterling,
  User,
  HelpCircle,
  LogOut,
  Menu,
  Trophy,
  Bell,
} from 'lucide-react';
import { Link } from '../../../i18n/navigation';
import { BronAfonLogo, BronAfonLogoCompact } from './bron-afon-logo';
import { LanguageSwitcher } from './language-switcher';
import FloatingChat from './floating-chat';

function Sidebar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  const navItems = [
    { href: '/dashboard', label: t('home'), icon: Home },
    { href: '/dashboard/repairs', label: t('repairs'), icon: Wrench },
    { href: '/dashboard/rent', label: t('rent'), icon: PoundSterling },
    { href: '/dashboard/rewards', label: t('rewards'), icon: Trophy },
    { href: '/dashboard/profile', label: t('profile'), icon: User },
    { href: '/dashboard/support', label: t('support'), icon: HelpCircle },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-20 items-center border-b border-sidebar-border px-5">
        <BronAfonLogo />
      </div>

      <nav className="flex-1 p-4" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-all hover:bg-sidebar-accent"
              >
                <item.icon
                  className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary-600"
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-xl border border-primary-100 bg-gradient-to-br from-primary-50 to-primary-100/50 p-4">
          <p className="text-xs font-medium text-primary-700">{tCommon('welcomeMessage')}</p>
          <p className="mt-0.5 text-xs text-primary-600/80">{tCommon('yourHome')}</p>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 ring-2 ring-primary-50">
            SW
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">Siân Williams</p>
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
    { href: '/dashboard', label: t('home'), icon: Home },
    { href: '/dashboard/repairs', label: t('repairs'), icon: Wrench },
    { href: '/dashboard/rent', label: t('rent'), icon: PoundSterling },
    { href: '/dashboard/rewards', label: t('rewards'), icon: Trophy },
    { href: '/dashboard/profile', label: t('profile'), icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-primary-600"
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
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BronAfonLogoCompact />
          </div>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={t('notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary-500 ring-2 ring-background" />
            </button>
            <button
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
              aria-label={t('signOut')}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>{t('signOut')}</span>
            </button>
          </div>
        </header>

        <main id="main-content" className="flex-1 p-4 pb-24 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
