import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import '../../tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Bron Afon',
    default: 'Bron Afon — Your Home, Your Way',
  },
  description: 'Self-service portal for Bron Afon Community Housing tenants.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'cy')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
          >
            {locale === 'cy' ? 'Neidio i\'r prif gynnwys' : 'Skip to main content'}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
