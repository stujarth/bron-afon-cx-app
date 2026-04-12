import { useTranslations } from 'next-intl';
import { Plus, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

function RepairCard({
  id,
  title,
  status,
  date,
  steps,
}: {
  id: string;
  title: string;
  status: string;
  date: string;
  steps: { label: string; completed: boolean }[];
}) {
  const t = useTranslations('repairs.status');
  const completedSteps = steps.filter((s) => s.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Link
      href={`/dashboard/repairs/${id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary-300 hover:shadow-md"
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

      {/* Mini progress tracker */}
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
          {t('completedRepairs')} (0)
        </h2>
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No completed repairs yet
        </p>
      </section>
    </div>
  );
}
