import { useTranslations } from 'next-intl';
import { Wrench, PoundSterling, HelpCircle, User, Star, Trophy, ArrowRight } from 'lucide-react';
import { Link } from '../../../i18n/navigation';

function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className={`rounded-lg p-2.5 ${color}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight
        className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary-600"
        aria-hidden="true"
      />
    </Link>
  );
}

function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
}: {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
      {subtext && <p className="mt-0.5 text-sm text-muted-foreground">{subtext}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          {t('welcome', { name: 'Siân' })}
        </h1>
        <p className="mt-1 text-muted-foreground">{t('greeting')}</p>
      </section>

      {/* Gamification banner */}
      <section className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
          <Trophy className="h-6 w-6 text-primary-700" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {t('points')}: 450
            </span>
            <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
              {t('level')}: Gold
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-primary-100">
            <div
              className="h-2 rounded-full bg-primary-600 transition-all"
              style={{ width: '75%' }}
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress to next level"
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">50 points to Platinum</p>
        </div>
        <Star className="h-5 w-5 text-secondary-500" aria-hidden="true" />
      </section>

      {/* Stats */}
      <section aria-label="Account summary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t('activeRepairs')}
            value="2"
            subtext="1 in progress"
            icon={Wrench}
          />
          <StatCard
            label={t('rentBalance')}
            value="£125.50"
            subtext="In credit"
            icon={PoundSterling}
          />
          <StatCard
            label={t('nextPayment')}
            value="18 Apr"
            subtext="£98.75"
            icon={PoundSterling}
          />
          <StatCard
            label={t('messages')}
            value="3"
            subtext="1 unread"
            icon={HelpCircle}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t('quickActions')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <QuickActionCard
            href="/(dashboard)/repairs/new"
            icon={Wrench}
            title={t('reportRepair')}
            description={t('reportRepairDesc')}
            color="bg-blue-100 text-blue-700"
          />
          <QuickActionCard
            href="/(dashboard)/rent"
            icon={PoundSterling}
            title={t('payRent')}
            description={t('payRentDesc')}
            color="bg-green-100 text-green-700"
          />
          <QuickActionCard
            href="/(dashboard)/support"
            icon={HelpCircle}
            title={t('getHelp')}
            description={t('getHelpDesc')}
            color="bg-purple-100 text-purple-700"
          />
          <QuickActionCard
            href="/(dashboard)/profile"
            icon={User}
            title={t('myProfile')}
            description={t('myProfileDesc')}
            color="bg-orange-100 text-orange-700"
          />
        </div>
      </section>
    </div>
  );
}
