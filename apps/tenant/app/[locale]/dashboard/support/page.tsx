import { useTranslations } from 'next-intl';
import { Phone, HelpCircle } from 'lucide-react';
import Chatbot from './chatbot';

export default function SupportPage() {
  const t = useTranslations('support');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main chatbot */}
        <div className="lg:col-span-2">
          <Chatbot />
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Call us card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Phone className="h-5 w-5 text-green-700" aria-hidden="true" />
            </div>
            <h2 className="mt-3 font-semibold text-card-foreground">{t('callUs')}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t('callUsDesc')}</p>
            <a
              href="tel:08001234567"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('callNumber')}
            </a>
            <p className="mt-2 text-xs text-muted-foreground">Mon-Fri, 8am-6pm</p>
          </div>

          {/* FAQ */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-card-foreground">{t('faq')}</h2>
            <div className="mt-3 space-y-2">
              {[
                'How do I report a repair?',
                'How do I pay my rent?',
                'What is an emergency repair?',
                'How do I earn points?',
              ].map((q) => (
                <button
                  key={q}
                  className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-card-foreground transition-colors hover:bg-muted"
                >
                  <HelpCircle className="h-3.5 w-3.5 shrink-0 text-primary-600" aria-hidden="true" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
