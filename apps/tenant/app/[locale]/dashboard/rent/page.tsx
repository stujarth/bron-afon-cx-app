import { useTranslations } from 'next-intl';
import { PoundSterling, TrendingUp, Calendar, CreditCard } from 'lucide-react';

export default function RentPage() {
  const t = useTranslations('rent');

  const payments = [
    { date: '4 Apr 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '28 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '21 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '14 Mar 2026', amount: '£98.75', method: 'Online', status: 'paid' },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Balance card */}
      <div className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg">
        <p className="text-sm text-primary-100">{t('currentBalance')}</p>
        <p className="mt-1 text-4xl font-bold">£125.50</p>
        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
          {t('inCredit')}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-primary-200">{t('weeklyRent')}</p>
            <p className="text-lg font-semibold">£98.75</p>
          </div>
          <div>
            <p className="text-xs text-primary-200">{t('nextPayment')}</p>
            <p className="text-lg font-semibold">18 Apr 2026</p>
          </div>
        </div>
      </div>

      {/* Make payment button */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-700">
        <CreditCard className="h-4 w-4" aria-hidden="true" />
        {t('makePayment')}
      </button>

      {/* Payment history */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t('paymentHistory')}</h2>
        <div className="rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border" role="list">
            {payments.map((payment, i) => (
              <li key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                    <PoundSterling className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    Paid
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{payment.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
