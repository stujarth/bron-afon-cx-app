'use client';

import {
  Users,
  Wrench,
  PoundSterling,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle2,
  Phone,
  Star,
} from 'lucide-react';

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  trend,
  sparkline,
  iconColor,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  iconColor: string;
}) {
  const max = Math.max(...sparkline);
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;

  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={`rounded-lg p-1.5 ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className={`flex items-center gap-1 text-xs ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
        }`}>
          <TrendIcon className="h-3 w-3" />
          {change}
        </div>
        {/* Sparkline */}
        <div className="flex h-6 items-end gap-0.5">
          {sparkline.map((v, i) => (
            <div
              key={i}
              className={`w-1 rounded-t ${
                trend === 'up' ? 'bg-green-200 group-hover:bg-green-400' :
                trend === 'down' ? 'bg-red-200 group-hover:bg-red-400' :
                'bg-primary-200 group-hover:bg-primary-400'
              } transition-colors`}
              style={{ height: `${(v / max) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    { tenant: 'Siân Williams', issue: 'Leaking tap', status: 'In Progress', priority: 'Routine', time: '2 min ago', engineer: 'Dai Evans' },
    { tenant: 'Dafydd Jones', issue: 'Boiler fault', status: 'Scheduled', priority: 'Urgent', time: '14 min ago', engineer: 'Sara Watkins' },
    { tenant: 'Rhiannon Evans', issue: 'Broken lock', status: 'Triaging', priority: 'Emergency', time: '32 min ago', engineer: '-' },
    { tenant: 'Gareth Thomas', issue: 'Damp patch', status: 'Reported', priority: 'Routine', time: '1h ago', engineer: '-' },
    { tenant: 'Megan Davies', issue: 'No hot water', status: 'Completed', priority: 'Urgent', time: '2h ago', engineer: 'Tom Pugh' },
  ];

  function getStatusStyle(status: string) {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700';
      case 'In Progress': return 'bg-blue-50 text-blue-700';
      case 'Scheduled': return 'bg-purple-50 text-purple-700';
      case 'Triaging': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  }

  function getPriorityStyle(priority: string) {
    switch (priority) {
      case 'Emergency': return 'bg-red-100 text-red-700 ring-1 ring-red-200';
      case 'Urgent': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
      default: return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200';
    }
  }

  return (
    <ul className="divide-y divide-border" role="list">
      {activities.map((a, i) => (
        <li key={i} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/30">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
            {a.tenant.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-card-foreground">{a.issue}</p>
            <p className="truncate text-xs text-muted-foreground">{a.tenant} · {a.engineer}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className={`hidden md:inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getPriorityStyle(a.priority)}`}>
              {a.priority}
            </span>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${getStatusStyle(a.status)}`}>
              {a.status}
            </span>
          </div>
          <span className="hidden sm:inline shrink-0 text-xs text-muted-foreground">{a.time}</span>
        </li>
      ))}
    </ul>
  );
}

function CategoryChart() {
  const categories = [
    { label: 'Plumbing', value: 34, color: 'bg-blue-500' },
    { label: 'Heating', value: 28, color: 'bg-orange-500' },
    { label: 'Electrical', value: 22, color: 'bg-yellow-500' },
    { label: 'Damp & Mould', value: 18, color: 'bg-purple-500' },
    { label: 'Windows & Doors', value: 15, color: 'bg-green-500' },
    { label: 'Other', value: 12, color: 'bg-gray-500' },
  ];
  const max = Math.max(...categories.map((c) => c.value));

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-card-foreground">{cat.label}</span>
            <span className="font-medium text-muted-foreground">{cat.value}</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`}
              style={{ width: `${(cat.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendChart() {
  const data = [65, 72, 68, 75, 82, 78, 85, 88, 92, 87, 91, 95];
  const max = Math.max(...data);
  const min = Math.min(...data);

  // Build path
  const width = 280;
  const height = 100;
  const padding = 4;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = padding + chartH - ((v - min) / (max - min)) * chartH;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#trendGradient)" />
        <path d={linePath} stroke="rgb(34 197 94)" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgb(34 197 94)" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: { title: string; type: 'urgent' | 'warning' | 'info'; count?: number } }) {
  const styles = {
    urgent: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };
  const iconStyles = {
    urgent: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3 ${styles[alert.type]}`}>
      <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${iconStyles[alert.type]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{alert.title}</p>
      </div>
      {alert.count && (
        <span className="text-sm font-bold">{alert.count}</span>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Bron Afon Community Housing · Real-time overview
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Live data
            </span>
          </div>
        </div>
      </div>

      {/* Metrics with sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Tenants"
          value="2,847"
          change="+12 this month"
          icon={Users}
          trend="up"
          iconColor="bg-blue-100 text-blue-700"
          sparkline={[20, 22, 19, 24, 28, 26, 30, 34]}
        />
        <MetricCard
          label="Active Repairs"
          value="156"
          change="-8 from last week"
          icon={Wrench}
          trend="down"
          iconColor="bg-amber-100 text-amber-700"
          sparkline={[180, 175, 168, 172, 165, 160, 158, 156]}
        />
        <MetricCard
          label="Rent Collection"
          value="97.2%"
          change="+0.5% from last month"
          icon={PoundSterling}
          trend="up"
          iconColor="bg-green-100 text-green-700"
          sparkline={[94, 95, 95, 96, 96, 97, 97, 97]}
        />
        <MetricCard
          label="CX Score"
          value="4.6"
          change="+0.2 from last month"
          icon={Star}
          trend="up"
          iconColor="bg-purple-100 text-purple-700"
          sparkline={[3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6]}
        />
      </div>

      {/* Activity & alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-semibold text-card-foreground">Recent Activity</h2>
              <p className="text-xs text-muted-foreground">Latest repairs and updates</p>
            </div>
            <a href="/dashboard/repairs" className="text-sm text-primary-600 hover:text-primary-700">
              View all →
            </a>
          </div>
          <ActivityFeed />
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold text-card-foreground">Alerts</h2>
            <p className="text-xs text-muted-foreground">Items needing attention</p>
          </div>
          <div className="space-y-2 p-4">
            <AlertCard alert={{ title: '3 emergency repairs awaiting triage', type: 'urgent', count: 3 }} />
            <AlertCard alert={{ title: 'Tenants with rent arrears > 4 weeks', type: 'warning', count: 12 }} />
            <AlertCard alert={{ title: 'Block A boiler maintenance scheduled', type: 'info' }} />
            <AlertCard alert={{ title: 'New satisfaction surveys to review', type: 'info', count: 8 }} />
          </div>
        </section>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-card-foreground">Repairs by Category</h2>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
          </div>
          <CategoryChart />
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-card-foreground">Satisfaction Trend</h2>
              <p className="text-xs text-muted-foreground">Last 12 months</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <TrendChart />
        </section>
      </div>

      {/* Quick stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Avg Repair Time</p>
          </div>
          <p className="mt-2 text-xl font-bold text-card-foreground">4.2 days</p>
          <p className="mt-0.5 text-xs text-green-600">-0.5 days vs last month</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">First Contact Resolution</p>
          </div>
          <p className="mt-2 text-xl font-bold text-card-foreground">78%</p>
          <p className="mt-0.5 text-xs text-green-600">+3% vs last month</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Call Volume</p>
          </div>
          <p className="mt-2 text-xl font-bold text-card-foreground">-40%</p>
          <p className="mt-0.5 text-xs text-green-600">Since app launch</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Digital Adoption</p>
          </div>
          <p className="mt-2 text-xl font-bold text-card-foreground">62%</p>
          <p className="mt-0.5 text-xs text-green-600">+8% vs last month</p>
        </div>
      </div>
    </div>
  );
}
