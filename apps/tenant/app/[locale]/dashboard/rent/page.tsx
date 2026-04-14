'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  PoundSterling,
  TrendingUp,
  CreditCard,
  Building2,
  Plus,
  CheckCircle2,
  ArrowRight,
  Pencil,
  Trash2,
  Banknote,
  Repeat,
  X,
  Shield,
} from 'lucide-react';

export default function RentPage() {
  const t = useTranslations('rent');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('98.75');

  const payments = [
    { date: '4 Apr 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '28 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '21 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '14 Mar 2026', amount: '£98.75', method: 'Online', status: 'paid' },
  ];

  const paymentMethods = [
    { id: 'dd-1', type: 'Direct Debit', label: 'Lloyds Bank ****4821', isDefault: true, icon: Building2 },
    { id: 'card-1', type: 'Debit Card', label: 'Visa ****7392', isDefault: false, icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Balance card */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-6 text-white shadow-lg">
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

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 p-3">
          <Repeat className="h-4 w-4 text-primary-200" />
          <div className="flex-1">
            <p className="text-xs text-primary-200">Active Direct Debit</p>
            <p className="text-sm font-medium">Lloyds Bank ****4821 · Every Friday</p>
          </div>
          <CheckCircle2 className="h-4 w-4 text-green-300" />
        </div>
      </div>

      {/* Payment actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          <Banknote className="h-4 w-4" aria-hidden="true" />
          Make a One-Off Payment
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted">
          <Repeat className="h-4 w-4 text-primary-600" aria-hidden="true" />
          Set Up Direct Debit
        </button>
      </div>

      {/* One-off payment modal */}
      {showPaymentModal && (
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Make a Payment</h3>
            <button onClick={() => setShowPaymentModal(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-foreground">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">£</span>
                <input
                  id="amount"
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                />
              </div>
              <div className="mt-2 flex gap-2">
                {['49.38', '98.75', '197.50'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setPaymentAmount(amt)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      paymentAmount === amt
                        ? 'bg-primary-600 text-white'
                        : 'border border-border bg-background text-foreground hover:bg-muted'
                    }`}
                  >
                    £{amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-foreground">Pay from</p>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50"
                  >
                    <input type="radio" name="payMethod" defaultChecked={method.isDefault} className="h-4 w-4 text-primary-600" />
                    <method.icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.type}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
              <Shield className="h-4 w-4" />
              Pay £{paymentAmount} securely
            </button>

            <p className="text-center text-[10px] text-muted-foreground">
              Payments are processed securely. You'll receive a confirmation via your preferred notification method.
            </p>
          </div>
        </div>
      )}

      {/* Payment methods */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Payment Methods</h2>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted">
            <Plus className="h-3 w-3" />
            Add new
          </button>
        </div>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                <method.icon className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-card-foreground">{method.label}</p>
                  {method.isDefault && (
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{method.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                {!method.isDefault && (
                  <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600" aria-label="Remove">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment history */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t('paymentHistory')}</h2>
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
                    {t('paid')}
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
