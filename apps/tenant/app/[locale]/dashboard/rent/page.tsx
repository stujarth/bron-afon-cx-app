'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  PoundSterling,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Building2,
  Plus,
  CheckCircle2,
  Pencil,
  Trash2,
  Banknote,
  Repeat,
  X,
  Shield,
  Receipt,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Heart,
  Phone,
  Info,
  CalendarClock,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

type Tab = 'balance' | 'charges' | 'recharges' | 'history';

// Toggle this in dev to preview the arrears state.
const DEMO_ARREARS = false;

export default function RentPage() {
  const t = useTranslations('rent');
  const [tab, setTab] = useState<Tab>('balance');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(DEMO_ARREARS ? '50.00' : '98.75');
  const [demoArrears, setDemoArrears] = useState(DEMO_ARREARS);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'balance', label: 'Balance' },
    { id: 'charges', label: 'Service charges' },
    { id: 'recharges', label: 'Recharges' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
        <button
          onClick={() => setDemoArrears((a) => !a)}
          className="rounded-full border border-dashed border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted"
          title="Demo toggle — preview the arrears state"
        >
          Demo: {demoArrears ? 'arrears' : 'in credit'} (tap to switch)
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex gap-1 border-b border-border min-w-max" role="tablist">
          {tabs.map((tt) => {
            const isActive = tab === tt.id;
            return (
              <button
                key={tt.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(tt.id)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tt.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'balance' && (
        <BalanceTab
          arrears={demoArrears}
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
        />
      )}
      {tab === 'charges' && <ServiceChargesTab />}
      {tab === 'recharges' && <RechargesTab />}
      {tab === 'history' && <HistoryTab />}
    </div>
  );
}

function BalanceTab({
  arrears,
  showPaymentModal,
  setShowPaymentModal,
  paymentAmount,
  setPaymentAmount,
}: {
  arrears: boolean;
  showPaymentModal: boolean;
  setShowPaymentModal: (v: boolean) => void;
  paymentAmount: string;
  setPaymentAmount: (v: string) => void;
}) {
  const t = useTranslations('rent');

  const paymentMethods = [
    { id: 'dd-1', type: 'Direct Debit', label: 'Lloyds Bank ****4821', isDefault: true, icon: Building2 },
    { id: 'card-1', type: 'Debit Card', label: 'Visa ****7392', isDefault: false, icon: CreditCard },
  ];

  return (
    <>
      {/* Balance card */}
      {arrears ? <ArrearsBalanceCard /> : <CreditBalanceCard />}

      {/* Payment actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setShowPaymentModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          <Banknote className="h-4 w-4" aria-hidden="true" />
          Make a one-off payment
        </button>
        {arrears ? (
          <button className="flex items-center justify-center gap-2 rounded-xl border border-primary-300 bg-primary-50 px-4 py-3.5 text-sm font-semibold text-primary-700 hover:bg-primary-100">
            <Heart className="h-4 w-4" />
            Set up a payment plan
          </button>
        ) : (
          <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted">
            <Repeat className="h-4 w-4 text-primary-600" aria-hidden="true" />
            Manage direct debit
          </button>
        )}
      </div>

      {arrears && <ArrearsSupportCard />}

      {/* One-off payment modal */}
      {showPaymentModal && (
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Make a payment</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-foreground">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  £
                </span>
                <input
                  id="amount"
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                />
              </div>
              <div className="mt-2 flex gap-2">
                {(arrears ? ['25.00', '50.00', '125.00'] : ['49.38', '98.75', '197.50']).map(
                  (amt) => (
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
                  ),
                )}
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
                    <input
                      type="radio"
                      name="payMethod"
                      defaultChecked={method.isDefault}
                      className="h-4 w-4 text-primary-600"
                    />
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
          </div>
        </div>
      )}

      {/* Payment methods */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Payment methods</h2>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted">
            <Plus className="h-3 w-3" />
            Add new
          </button>
        </div>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
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
                <button
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                {!method.isDefault && (
                  <button
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Query rent */}
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-card-foreground">
              Something not right about your rent?
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Query a charge, missing payment or anything else. We aim to respond within 5
              working days.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/dashboard/inbox"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            <MessageSquare className="h-4 w-4" />
            Raise a query
          </Link>
          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Phone className="h-4 w-4" />
            Call the team
          </Link>
        </div>
      </section>
    </>
  );
}

function CreditBalanceCard() {
  const t = useTranslations('rent');
  return (
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
          <p className="text-xs text-primary-200">Active direct debit</p>
          <p className="text-sm font-medium">Lloyds Bank ****4821 · Every Friday</p>
        </div>
        <CheckCircle2 className="h-4 w-4 text-green-300" />
      </div>
    </div>
  );
}

function ArrearsBalanceCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 p-6 text-white shadow-lg">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-rose-100" />
        <p className="text-sm text-rose-100">Outstanding balance</p>
      </div>
      <p className="mt-1 text-4xl font-bold">£247.30</p>
      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
        <TrendingDown className="h-3 w-3" aria-hidden="true" />
        2.5 weeks behind
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-rose-200">Weekly rent</p>
          <p className="text-lg font-semibold">£98.75</p>
        </div>
        <div>
          <p className="text-xs text-rose-200">Next payment due</p>
          <p className="text-lg font-semibold">Fri 16 May</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-white/10 p-3">
        <p className="text-xs text-rose-200">Your income officer</p>
        <p className="text-sm font-medium">Rhian Thomas · 0800 123 4567</p>
        <p className="mt-1 text-[11px] text-rose-100/90 leading-relaxed">
          We are here to help you get back on track — there are no consequences for
          getting in touch.
        </p>
      </div>
    </div>
  );
}

function ArrearsSupportCard() {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white p-2 text-rose-700">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-rose-900">Struggling to pay?</p>
            <p className="text-xs text-rose-800/80">
              We can help with payment plans, benefits checks and money advice.
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-rose-700" />
        ) : (
          <ChevronDown className="h-4 w-4 text-rose-700" />
        )}
      </button>
      {open && (
        <div className="border-t border-rose-200 p-4">
          <ul className="space-y-2 text-sm text-rose-900">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
              <span>
                Talk to your Income Officer about a manageable payment arrangement.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
              <span>Free benefits check — many tenants miss money they are owed.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
              <span>Free debt advice through Citizens Advice and StepChange.</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

function ServiceChargesTab() {
  const [queryItem, setQueryItem] = useState<string | null>(null);

  const items = [
    {
      id: 'sc-1',
      label: 'Block cleaning',
      detail: 'Weekly clean of entrance, hallways and stairwells.',
      amount: 6.42,
      frequency: 'weekly',
    },
    {
      id: 'sc-2',
      label: 'Grounds maintenance',
      detail: 'Communal garden upkeep and seasonal planting.',
      amount: 3.18,
      frequency: 'weekly',
    },
    {
      id: 'sc-3',
      label: 'Communal lighting',
      detail: 'Electricity supply for entrance and stairwell lighting.',
      amount: 1.85,
      frequency: 'weekly',
    },
    {
      id: 'sc-4',
      label: 'Building insurance',
      detail: 'Buildings insurance covering structure and common parts.',
      amount: 2.10,
      frequency: 'weekly',
    },
  ];

  const total = items.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Service charges this period
        </p>
        <p className="mt-1 text-3xl font-bold text-foreground">£{total.toFixed(2)} <span className="text-sm font-medium text-muted-foreground">/ week</span></p>
        <p className="mt-1 text-xs text-muted-foreground">
          Last statement: April 2026 · Next reconciliation: October 2026
        </p>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Itemised breakdown</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Tap an item to see what it pays for or raise a query.
          </p>
        </div>
        <ul className="divide-y divide-border" role="list">
          {items.map((i) => (
            <li key={i.id}>
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <Receipt className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{i.label}</p>
                  <p className="text-xs text-muted-foreground">{i.detail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">
                    £{i.amount.toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">{i.frequency}</p>
                </div>
                <button
                  onClick={() => setQueryItem(queryItem === i.id ? null : i.id)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    queryItem === i.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-border bg-white text-foreground hover:bg-muted'
                  }`}
                >
                  Query
                </button>
              </div>
              {queryItem === i.id && (
                <QueryInline subject={`Service charge: ${i.label}`} onCancel={() => setQueryItem(null)} />
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Service charges are reviewed and reconciled twice a year. If actual costs are
            lower than estimated, the difference is credited to your rent account.
          </p>
        </div>
      </div>
    </div>
  );
}

function RechargesTab() {
  const [queryItem, setQueryItem] = useState<string | null>(null);

  const recharges = [
    {
      id: 'rc-1',
      label: 'Replacement front door key',
      raised: '4 Apr 2026',
      amount: 18.50,
      status: 'Outstanding',
      detail: 'Lost key replacement issued by office.',
    },
    {
      id: 'rc-2',
      label: 'Kitchen tile replacement',
      raised: '12 Mar 2026',
      amount: 64.20,
      status: 'Paid',
      detail: 'Replacement of 3 cracked tiles damaged by tenant.',
    },
  ];

  const outstanding = recharges
    .filter((r) => r.status === 'Outstanding')
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Outstanding recharges
        </p>
        <p className="mt-1 text-3xl font-bold text-foreground">£{outstanding.toFixed(2)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Recharges are charges for work that is your responsibility, e.g. accidental damage,
          lost keys.
        </p>
        {outstanding > 0 && (
          <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            <Banknote className="h-4 w-4" />
            Pay £{outstanding.toFixed(2)}
          </button>
        )}
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">All recharges</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          {recharges.map((r) => (
            <li key={r.id}>
              <div className="flex flex-wrap items-center gap-3 p-4">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    r.status === 'Outstanding'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  <PoundSterling className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-[120px]">
                  <p className="text-sm font-medium text-card-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.detail}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Raised {r.raised}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">
                    £{r.amount.toFixed(2)}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      r.status === 'Outstanding'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  {r.status === 'Outstanding' && (
                    <button className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => setQueryItem(queryItem === r.id ? null : r.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                      queryItem === r.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-border bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    Query
                  </button>
                </div>
              </div>
              {queryItem === r.id && (
                <QueryInline subject={`Recharge: ${r.label}`} onCancel={() => setQueryItem(null)} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function HistoryTab() {
  const t = useTranslations('rent');

  const payments = [
    { date: '4 Apr 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '28 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '21 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '14 Mar 2026', amount: '£98.75', method: 'Online', status: 'paid' },
    { date: '7 Mar 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
    { date: '29 Feb 2026', amount: '£64.20', method: 'Online (Recharge)', status: 'paid' },
    { date: '22 Feb 2026', amount: '£98.75', method: 'Direct Debit', status: 'paid' },
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">{t('paymentHistory')}</h2>
          <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
            Download statement
          </button>
        </div>
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
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-card-foreground">Annual rent review</p>
            <p className="text-xs text-muted-foreground">
              Your next review will be on 3 April 2027. We will write to you in good time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function QueryInline({ subject, onCancel }: { subject: string; onCancel: () => void }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="border-t border-border bg-green-50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          Query sent — we will reply within 5 working days. Ref: QRY-2026-0212
        </div>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="border-t border-border bg-primary-50/40 p-4"
    >
      <p className="mb-2 text-sm font-medium text-foreground">{subject}</p>
      <textarea
        required
        rows={3}
        placeholder="Tell us what you would like clarified or what you think is wrong…"
        className="w-full rounded-lg border border-input bg-background p-3 text-sm"
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
        >
          Send query
        </button>
      </div>
    </form>
  );
}
