import { useTranslations } from 'next-intl';
import { LogOut, Phone } from 'lucide-react';
import { BronAfonLogo, BronAfonLogoCompact } from './bron-afon-logo';
import { LanguageSwitcher } from './language-switcher';
import FloatingChat from './floating-chat';
import NotificationBell from './notification-bell';
import AccessibilityToolbar from './accessibility-toolbar';
import { MobileBottomNav, MobileMenuButton, SidebarNav } from './nav';

const REPAIRS_PHONE = '01633 620111';

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-20 items-center border-b border-sidebar-border px-5">
        <BronAfonLogo />
      </div>

      <SidebarNav />

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-800">
            SW
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">Siân Williams</p>
            <p className="truncate text-xs text-muted-foreground">14 Heol y Castell</p>
          </div>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
          tenant v0.5.0
        </p>
      </div>
    </aside>
  );
}

function EmergencyStrip() {
  const t = useTranslations('common');
  return (
    <div className="bg-navy-900 px-4 py-2 text-sm text-white lg:px-8">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <Phone className="h-4 w-4 shrink-0 text-primary-300" aria-hidden="true" />
        <span>{t('emergencyStrip')}</span>
        <a
          href={`tel:${REPAIRS_PHONE.replace(/\s/g, '')}`}
          className="font-bold underline underline-offset-2 hover:no-underline"
        >
          {REPAIRS_PHONE}
        </a>
        <span className="text-white/80">·</span>
        <span>{t('gasLeak')}</span>
        <a href="tel:0800111999" className="font-bold underline underline-offset-2 hover:no-underline">
          0800 111 999
        </a>
      </p>
    </div>
  );
}

function SiteFooter() {
  const t = useTranslations('footer');
  return (
    <footer className="mt-12 bg-navy-900 px-4 pb-28 pt-10 text-sm text-white/90 lg:px-8 lg:pb-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <BronAfonLogo variant="white" />
          <p className="max-w-xs text-white/80">{t('mission')}</p>
        </div>
        <div>
          <h2 className="mb-3 text-base font-bold text-white">{t('contactUs')}</h2>
          <ul className="space-y-2">
            <li>
              {t('repairsLine')}:{' '}
              <a href={`tel:${REPAIRS_PHONE.replace(/\s/g, '')}`} className="font-semibold underline">
                {REPAIRS_PHONE}
              </a>
            </li>
            <li>{t('outOfHours')}</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-base font-bold text-white">{t('usefulLinks')}</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://www.bronafon.org.uk/repairs-with-bron-afon/" className="underline hover:no-underline">
                {t('repairsGuide')}
              </a>
            </li>
            <li>
              <a href="https://www.bronafon.org.uk/" className="underline hover:no-underline">
                bronafon.org.uk
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-8 border-t border-white/15 pt-6 text-xs text-white/70">{t('legal')}</p>
    </footer>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <EmergencyStrip />
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md lg:px-8">
          <div className="flex min-w-0 items-center gap-1 lg:hidden">
            <MobileMenuButton />
            <BronAfonLogoCompact />
            <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">v0.5.0</span>
          </div>

          <div className="hidden lg:block" />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            <div className="relative">
              <AccessibilityToolbar />
            </div>
            <NotificationBell />
            <button
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
              aria-label={t('signOut')}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>{t('signOut')}</span>
            </button>
          </div>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 p-4 lg:p-8">
          {children}
        </main>
        <SiteFooter />
      </div>

      <MobileBottomNav />
      <FloatingChat />
    </div>
  );
}
