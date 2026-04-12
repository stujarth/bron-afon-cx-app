import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Analytics</h1>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Tenant Satisfaction', value: '4.2/5', trend: 'up', change: '+0.3' },
          { label: 'Avg Repair Time', value: '4.2 days', trend: 'down', change: '-0.5 days' },
          { label: 'First Contact Resolution', value: '78%', trend: 'up', change: '+3%' },
          { label: 'Digital Adoption', value: '62%', trend: 'up', change: '+8%' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">{kpi.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-600" aria-hidden="true" />
              )}
              <span className="text-sm text-green-600">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="font-semibold text-card-foreground">Repairs by Category</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Plumbing', value: 34, max: 50 },
              { label: 'Electrical', value: 22, max: 50 },
              { label: 'Heating', value: 28, max: 50 },
              { label: 'Windows & Doors', value: 15, max: 50 },
              { label: 'Damp & Mould', value: 18, max: 50 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-card-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary-500"
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="font-semibold text-card-foreground">CX Score Trend</h2>
          </div>
          <div className="flex h-48 items-center justify-center rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Chart visualization coming soon
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
