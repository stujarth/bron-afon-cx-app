'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Building2,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  type LucideIcon,
  Menu,
  MessageSquareWarning,
  MoreHorizontal,
  PoundSterling,
  Trophy,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { Link, usePathname } from '../../../i18n/navigation';

type NavItem = { href: string; key: string; icon: LucideIcon };

const PRIMARY: NavItem[] = [
  { href: '/dashboard', key: 'home', icon: Home },
  { href: '/dashboard/repairs', key: 'repairs', icon: Wrench },
  { href: '/dashboard/rent', key: 'rent', icon: PoundSterling },
  { href: '/dashboard/inbox', key: 'inbox', icon: Inbox },
];

const SECONDARY: NavItem[] = [
  { href: '/dashboard/my-home', key: 'myHome', icon: Building2 },
  { href: '/dashboard/tenancy', key: 'tenancy', icon: FileText },
  { href: '/dashboard/complaints', key: 'complaints', icon: MessageSquareWarning },
  { href: '/dashboard/rewards', key: 'rewards', icon: Trophy },
  { href: '/dashboard/profile', key: 'profile', icon: User },
  { href: '/dashboard/support', key: 'support', icon: HelpCircle },
];

function isActive(pathname: string, href: string) {
  return href === '/dashboard' ? pathname === href : pathname.startsWith(href);
}

export function SidebarNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4" aria-label={t('mainNav')}>
      <ul className="space-y-1">
        {[...PRIMARY, ...SECONDARY].map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-muted'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${active ? 'text-primary-600' : 'text-muted-foreground group-hover:text-primary-600'}`}
                  aria-hidden="true"
                />
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('more')}>
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/40"
        aria-label={t('close')}
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-card p-4 pb-8 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t('more')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
            aria-label={t('close')}
            autoFocus
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {SECONDARY.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-border px-3 py-3 text-sm font-semibold hover:border-primary-300 hover:bg-primary-50 aria-[current=page]:border-primary-600 aria-[current=page]:bg-primary-50"
              >
                <item.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MobileBottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = SECONDARY.some((i) => isActive(pathname, i.href));

  const itemClass = (active: boolean) =>
    `flex min-h-14 min-w-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-semibold transition-colors ${
      active ? 'text-primary-700' : 'text-muted-foreground hover:text-primary-700'
    }`;

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        aria-label={t('mobileNav')}
      >
        <ul className="flex items-center justify-around">
          {PRIMARY.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={itemClass(active)}
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                  <span>{t(item.key)}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={itemClass(moreActive)}
            >
              <MoreHorizontal className="h-6 w-6" aria-hidden="true" />
              <span>{t('more')}</span>
            </button>
          </li>
        </ul>
      </nav>
      <MoreSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Header hamburger on mobile — opens the same "More" sheet so it is never a dead button. */
export function MobileMenuButton() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        aria-label={t('openMenu')}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <MoreSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
