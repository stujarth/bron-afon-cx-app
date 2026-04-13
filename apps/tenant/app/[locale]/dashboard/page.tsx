import { useTranslations } from 'next-intl';
import {
  Wrench,
  PoundSterling,
  HelpCircle,
  User,
  Star,
  Trophy,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Bell,
  Sun,
  Cloud,
  CloudRain,
  TrendingUp,
} from 'lucide-react';
import { Link } from '../../../i18n/navigation';

function GreetingHeader() {
  const t = useTranslations('dashboard');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const Weather = hour < 6 || hour >= 20 ? Cloud : hour < 12 ? Sun : hour < 18 ? Sun : Cloud;

  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{greeting}</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground lg:text-3xl">
          {t('welcome', { name: 'Si\u00e2n' })}
        </h1>
        <p className="mt-1 text-muted-foreground">{t('greeting')}</p>
      </div>
      <button
        className="relative rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
      </button>
    </div>
  );
}

function GamificationBanner() {
  const t = useTranslations('dashboard');
  return (
    <Link
      href="/dashboard/rewards"
      className="group relative overflow-hidden block rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 p-5 transition-all hover:shadow-md"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl" aria-hidden="true" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
          <Trophy className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">450 pts</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              Gold Member
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/60">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
              style={{ width: '75%' }}
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress to Platinum"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">50 points to Platinum</p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700">
              <Sparkles className="h-3 w-3" />
              16 week streak
            </span>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function ActiveRepairCard() {
  return (
    <Link
      href="/dashboard/repairs/repair-1"
      className="group block rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 p-5 transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
            <Wrench className="h-5 w-5 text-primary-700" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Leaking tap in kitchen</p>
            <p className="text-xs text-muted-foreground">REP-2026-0412</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          On the way
        </span>
      </div>

      {/* Mini progress */}
      <div className="mt-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full ${
                step <= 4 ? 'bg-primary-500' : 'bg-white'
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Step 4 of 5</span>
          <span className="font-medium text-primary-700">ETA: 2:00 PM today</span>
        </div>
      </div>
    </Link>
  );
}

function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  iconColor,
}: {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className={`rounded-lg p-1.5 ${iconColor}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <p className="mt-2 text-xl font-bold text-card-foreground">{value}</p>
      {subtext && <p className="mt-0.5 text-xs text-muted-foreground">{subtext}</p>}
    </div>
  );
}

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
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
    >
      <div className={`rounded-xl p-2.5 transition-transform group-hover:scale-110 ${color}`}>
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

function RecentActivity() {
  const activities = [
    { type: 'repair', text: 'Repair update — Engineer assigned', time: '2 hours ago', icon: Wrench, color: 'bg-blue-100 text-blue-700' },
    { type: 'points', text: 'You earned 10 points for on-time payment', time: '5 days ago', icon: Star, color: 'bg-amber-100 text-amber-700' },
    { type: 'rent', text: 'Rent payment of \u00a398.75 received', time: '1 week ago', icon: PoundSterling, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
      </div>
      <div className="rounded-xl border border-border bg-card">
        <ul className="divide-y divide-border" role="list">
          {activities.map((a, i) => (
            <li key={i} className="flex items-center gap-3 p-4">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                <a.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <GreetingHeader />
      <GamificationBanner />
      <ActiveRepairCard />

      <section aria-label="Account summary">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label={t('activeRepairs')}
            value="2"
            subtext="1 in progress"
            icon={Wrench}
            iconColor="bg-blue-100 text-blue-700"
          />
          <StatCard
            label={t('rentBalance')}
            value="\u00a3125.50"
            subtext="In credit"
            icon={PoundSterling}
            iconColor="bg-green-100 text-green-700"
          />
          <StatCard
            label={t('nextPayment')}
            value="18 Apr"
            subtext="\u00a398.75"
            icon={Clock}
            iconColor="bg-purple-100 text-purple-700"
          />
          <StatCard
            label={t('messages')}
            value="3"
            subtext="1 unread"
            icon={Bell}
            iconColor="bg-amber-100 text-amber-700"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t('quickActions')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <QuickActionCard
            href="/dashboard/repairs/new"
            icon={Wrench}
            title={t('reportRepair')}
            description={t('reportRepairDesc')}
            color="bg-blue-100 text-blue-700"
          />
          <QuickActionCard
            href="/dashboard/rent"
            icon={PoundSterling}
            title={t('payRent')}
            description={t('payRentDesc')}
            color="bg-green-100 text-green-700"
          />
          <QuickActionCard
            href="/dashboard/support"
            icon={HelpCircle}
            title={t('getHelp')}
            description={t('getHelpDesc')}
            color="bg-purple-100 text-purple-700"
          />
          <QuickActionCard
            href="/dashboard/profile"
            icon={User}
            title={t('myProfile')}
            description={t('myProfileDesc')}
            color="bg-orange-100 text-orange-700"
          />
        </div>
      </section>

      <RecentActivity />
    </div>
  );
}
