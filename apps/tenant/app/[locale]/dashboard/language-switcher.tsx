'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'en';

  function switchTo(locale: 'en' | 'cy') {
    if (locale === currentLocale) return;
    // Replace the locale segment at the start of the pathname
    const newPath = pathname.replace(/^\/(en|cy)/, `/${locale}`);
    router.push(newPath);
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-muted p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => switchTo('en')}
        aria-pressed={currentLocale === 'en'}
        lang="en"
        className={`min-h-9 rounded-full px-3 py-1 transition-colors ${
          currentLocale === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span className="sm:hidden" aria-hidden="true">EN</span>
        <span className="sr-only sm:not-sr-only">English</span>
      </button>
      <button
        onClick={() => switchTo('cy')}
        aria-pressed={currentLocale === 'cy'}
        lang="cy"
        className={`min-h-9 rounded-full px-3 py-1 transition-colors ${
          currentLocale === 'cy'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span className="sm:hidden" aria-hidden="true">CY</span>
        <span className="sr-only sm:not-sr-only">Cymraeg</span>
      </button>
    </div>
  );
}
