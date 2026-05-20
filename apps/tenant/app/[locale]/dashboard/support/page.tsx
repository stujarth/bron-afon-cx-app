'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, HelpCircle, ChevronDown } from 'lucide-react';
import Chatbot from './chatbot';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const;

export default function SupportPage() {
  const t = useTranslations('support');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <p className="mt-2 text-xs text-muted-foreground">{t('openHours')}</p>
          </div>

          {/* FAQ */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-card-foreground">{t('faq')}</h2>
            <ul className="mt-3 space-y-1" role="list">
              {FAQ_KEYS.map((qKey, i) => {
                const aKey = `a${qKey.slice(1)}` as 'a1' | 'a2' | 'a3' | 'a4';
                const isOpen = openIndex === i;
                return (
                  <li key={qKey}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-card-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <HelpCircle className="h-3.5 w-3.5 shrink-0 text-primary-600" aria-hidden="true" />
                      <span className="flex-1 font-medium">{t(`faqs.${qKey}`)}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="px-2 pb-3 pl-8 pt-1 text-xs text-muted-foreground leading-relaxed">
                        {t(`faqs.${aKey}`)}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
