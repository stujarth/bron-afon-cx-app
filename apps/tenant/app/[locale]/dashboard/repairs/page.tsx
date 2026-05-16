'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Plus,
  Clock,
  CheckCircle2,
  Flame,
  ShieldCheck,
  CalendarClock,
  X,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

function RepairCard({
  id,
  title,
  status,
  date,
  steps,
  appointment,
}: {
  id: string;
  title: string;
  status: string;
  date: string;
  steps: { label: string; completed: boolean }[];
  appointment?: string;
}) {
  const t = useTranslations('repairs.status');
  const [showReschedule, setShowReschedule] = useState(false);
  const completedSteps = steps.filter((s) => s.completed).length;

  return (
    <div className="rounded-xl border border-border bg-card transition-all hover:border-primary-300 hover:shadow-md">
      <Link
        href={`/dashboard/repairs/${id}`}
        className="group block p-5"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{date}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {t(status as 'reported' | 'triaging' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled')}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className={`h-1.5 w-full rounded-full ${
                    step.completed ? 'bg-primary-500' : 'bg-muted'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Step {completedSteps} of {steps.length}
          </p>
        </div>
      </Link>

      {appointment && (
        <div className="border-t border-border bg-muted/30 px-5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarClock className="h-4 w-4 text-primary-600" />
              <span className="font-medium text-foreground">{appointment}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowReschedule((s) => !s)}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
              >
                Change date
              </button>
              <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50">
                Cancel
              </button>
            </div>
          </div>
          {showReschedule && (
            <RescheduleInline onClose={() => setShowReschedule(false)} />
          )}
        </div>
      )}
    </div>
  );
}

function RescheduleInline({ onClose }: { onClose: () => void }) {
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const slots = [
    { date: 'Tue 14 May', window: 'AM (8am – 12pm)', engineer: 'Dai Evans' },
    { date: 'Thu 16 May', window: 'PM (1pm – 5pm)', engineer: 'Bethan Lloyd' },
    { date: 'Fri 17 May', window: 'PM (1pm – 5pm)', engineer: 'Dai Evans' },
    { date: 'Mon 20 May', window: 'AM (8am – 12pm)', engineer: 'Bethan Lloyd' },
  ];

  if (confirmed) {
    return (
      <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-medium">New appointment confirmed: {confirmed}</span>
        </div>
        <p className="mt-1 text-xs text-green-700">
          You will receive an SMS reminder the day before.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-lg border border-border bg-white p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-foreground">Pick an alternative slot</p>
        <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-muted">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-2 space-y-1.5">
        {slots.map((s) => (
          <button
            key={`${s.date}-${s.window}`}
            onClick={() => setConfirmed(`${s.date}, ${s.window}`)}
            className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary-400 hover:bg-primary-50/40"
          >
            <div>
              <p className="font-medium text-card-foreground">{s.date}</p>
              <p className="text-xs text-muted-foreground">{s.window} · {s.engineer}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ComplianceCard({
  title,
  subtitle,
  status,
  due,
  icon: Icon,
  tone,
}: {
  title: string;
  subtitle: string;
  status: 'ok' | 'soon' | 'due';
  due: string;
  icon: typeof Flame;
  tone: 'orange' | 'blue' | 'amber';
}) {
  const toneStyles = {
    orange: 'bg-orange-100 text-orange-700 ring-orange-200',
    blue: 'bg-blue-100 text-blue-700 ring-blue-200',
    amber: 'bg-amber-100 text-amber-700 ring-amber-200',
  };

  const statusStyles = {
    ok: 'bg-green-50 text-green-700',
    soon: 'bg-amber-50 text-amber-700',
    due: 'bg-rose-50 text-rose-700',
  };

  const statusLabel = {
    ok: 'Up to date',
    soon: 'Due soon',
    due: 'Action needed',
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-card-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}>
              {statusLabel[status]}
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-foreground">{due}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
              Book / change appointment
            </button>
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50">
              View certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RepairsPage() {
  const t = useTranslations('repairs');

  const repairs = [
    {
      id: 'repair-1',
      title: 'Leaking tap in kitchen',
      status: 'in_progress',
      date: '10 April 2026',
      appointment: 'Today · 1pm – 3pm · Dai Evans',
      steps: [
        { label: 'Reported', completed: true },
        { label: 'Triaging', completed: true },
        { label: 'Scheduled', completed: true },
        { label: 'In Progress', completed: true },
        { label: 'Completed', completed: false },
      ],
    },
    {
      id: 'repair-2',
      title: 'Broken window handle — bedroom',
      status: 'scheduled',
      date: '8 April 2026',
      appointment: 'Thu 15 May · AM (8am – 12pm)',
      steps: [
        { label: 'Reported', completed: true },
        { label: 'Triaging', completed: true },
        { label: 'Scheduled', completed: true },
        { label: 'In Progress', completed: false },
        { label: 'Completed', completed: false },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
        <Link
          href="/dashboard/repairs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('reportNew')}
        </Link>
      </div>

      {/* Emergency callout */}
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />
          <div>
            <p className="text-sm font-semibold text-rose-900">Got an emergency?</p>
            <p className="mt-0.5 text-xs text-rose-800/90">
              Burst pipe, no heating in cold weather, unsafe electrics, gas smell or no access to your home —
              call <a href="tel:08001234567" className="font-semibold underline">0800 123 4567</a> day or night.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance / safety checks */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Safety & compliance checks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ComplianceCard
            title="Annual gas safety check"
            subtitle="Legally required every 12 months"
            status="ok"
            due="Next due: 14 March 2027"
            icon={Flame}
            tone="orange"
          />
          <ComplianceCard
            title="Boiler service"
            subtitle="Recommended annual service"
            status="soon"
            due="Due in 6 weeks (around 27 June 2026)"
            icon={Sparkles}
            tone="blue"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {t('activeRepairs')} ({repairs.length})
        </h2>
        <div className="space-y-3">
          {repairs.map((repair) => (
            <RepairCard key={repair.id} {...repair} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {t('completedRepairs')} (1)
        </h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Boiler — annual service
              </p>
              <p className="text-xs text-muted-foreground">Completed 14 Mar 2026 by Bethan Lloyd</p>
            </div>
            <Link
              href="/dashboard/complaints"
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100"
            >
              Rate work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
