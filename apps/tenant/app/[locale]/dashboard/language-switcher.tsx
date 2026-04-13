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
        className={`rounded-full px-3 py-1 transition-colors ${
          currentLocale === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchTo('cy')}
        className={`rounded-full px-3 py-1 transition-colors ${
          currentLocale === 'cy'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Cymraeg
      </button>
    </div>
  );
}
