import { Users, Wrench, PoundSterling, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
      <p
        className={`mt-1 text-sm ${
          trend === 'up'
            ? 'text-green-600'
            : trend === 'down'
              ? 'text-red-600'
              : 'text-muted-foreground'
        }`}
      >
        {change}
      </p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Bron Afon Community Housing overview</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Tenants"
          value="2,847"
          change="+12 this month"
          icon={Users}
          trend="up"
        />
        <MetricCard
          label="Active Repairs"
          value="156"
          change="-8 from last week"
          icon={Wrench}
          trend="down"
        />
        <MetricCard
          label="Rent Collection"
          value="97.2%"
          change="+0.5% from last month"
          icon={PoundSterling}
          trend="up"
        />
        <MetricCard
          label="Open Messages"
          value="43"
          change="12 unread"
          icon={MessageSquare}
          trend="neutral"
        />
      </div>

      {/* Recent activity & alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent repairs */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold text-card-foreground">Recent Repairs</h2>
            <a href="/dashboard/repairs" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>
          <ul className="divide-y divide-border" role="list">
            {[
              { tenant: 'Siân Williams', issue: 'Leaking tap', status: 'In Progress', time: '2h ago' },
              { tenant: 'Dafydd Jones', issue: 'Boiler fault', status: 'Scheduled', time: '4h ago' },
              { tenant: 'Rhiannon Evans', issue: 'Broken lock', status: 'Reported', time: '6h ago' },
              { tenant: 'Gareth Thomas', issue: 'Damp patch', status: 'Triaging', time: '1d ago' },
            ].map((repair) => (
              <li key={repair.tenant} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{repair.issue}</p>
                  <p className="text-xs text-muted-foreground">{repair.tenant}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                    {repair.status}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{repair.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Alerts */}
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-semibold text-card-foreground">Alerts</h2>
          </div>
          <div className="space-y-3 p-5">
            {[
              { title: '3 emergency repairs awaiting triage', type: 'urgent' as const },
              { title: '12 tenants with rent arrears > 4 weeks', type: 'warning' as const },
              { title: 'Scheduled maintenance: Block A boilers', type: 'info' as const },
            ].map((alert) => (
              <div
                key={alert.title}
                className={`flex items-start gap-3 rounded-lg p-3 ${
                  alert.type === 'urgent'
                    ? 'bg-red-50'
                    : alert.type === 'warning'
                      ? 'bg-amber-50'
                      : 'bg-blue-50'
                }`}
              >
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    alert.type === 'urgent'
                      ? 'text-red-600'
                      : alert.type === 'warning'
                        ? 'text-amber-600'
                        : 'text-blue-600'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-sm text-foreground">{alert.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
