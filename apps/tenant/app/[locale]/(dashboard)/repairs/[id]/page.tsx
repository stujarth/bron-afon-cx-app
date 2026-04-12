import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle2, Circle, Clock, UserCircle } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';

const steps = [
  { label: 'Reported', completed: true, date: '10 Apr 2026', description: 'You reported this repair' },
  { label: 'Being Assessed', completed: true, date: '10 Apr 2026', description: 'Our team reviewed your request' },
  { label: 'Scheduled', completed: true, date: '11 Apr 2026', description: 'An appointment has been booked' },
  { label: 'In Progress', completed: true, date: '12 Apr 2026', description: 'Our engineer is working on it' },
  { label: 'Completed', completed: false, date: null, description: 'Repair will be marked as done' },
];

export default function RepairTrackerPage() {
  const t = useTranslations('repairs.tracker');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/(dashboard)/repairs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to repairs
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
        <p className="mt-1 text-muted-foreground">Leaking tap in kitchen</p>
      </div>

      {/* Reference & assignment info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{t('reference')}</p>
          <p className="mt-1 font-mono text-sm font-semibold text-card-foreground">REP-2026-0412</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">{t('assignedTo')}</p>
          <div className="mt-1 flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-card-foreground">
              Dai Evans — Plumbing
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:col-span-2">
          <p className="text-sm text-muted-foreground">{t('estimatedCompletion')}</p>
          <p className="mt-1 text-sm font-semibold text-card-foreground">
            15 April 2026
          </p>
        </div>
      </div>

      {/* Pizza tracker timeline */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="sr-only">Repair progress timeline</h2>
        <ol className="relative space-y-0" aria-label="Repair progress steps">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isCurrent = step.completed && !steps[index + 1]?.completed;

            return (
              <li key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`absolute left-[15px] top-[30px] h-[calc(100%-14px)] w-0.5 ${
                      step.completed ? 'bg-primary-500' : 'bg-muted'
                    }`}
                    aria-hidden="true"
                  />
                )}

                {/* Step icon */}
                <div className="relative z-10 flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle2
                      className={`h-8 w-8 ${
                        isCurrent
                          ? 'text-primary-600 animate-pulse'
                          : 'text-primary-500'
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1">
                  <p
                    className={`text-sm font-semibold ${
                      step.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                    {isCurrent && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        Current
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                  {step.date && (
                    <p className="mt-1 text-xs text-muted-foreground">{step.date}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
