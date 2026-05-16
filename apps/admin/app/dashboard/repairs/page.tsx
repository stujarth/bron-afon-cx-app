'use client';

import { useState } from 'react';
import {
  Wrench,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Flame,
  ShieldCheck,
  Plus,
  AlertTriangle,
  CalendarClock,
  ChevronRight,
  Building,
  Home,
} from 'lucide-react';

type Tab = 'repairs' | 'compliance' | 'communal';

const REPAIRS = [
  { id: 'REP-0412', tenant: 'Siân Williams', address: '14 Heol y Castell', issue: 'Leaking tap in kitchen', status: 'In Progress', priority: 'Routine', date: '12 Apr', slot: 'Today 1pm-3pm · Dai Evans' },
  { id: 'REP-0411', tenant: 'Dafydd Jones', address: '23 Stryd y Bont', issue: 'Boiler not heating water', status: 'Scheduled', priority: 'Urgent', date: '11 Apr', slot: 'Tomorrow AM · Sara Watkins' },
  { id: 'REP-0410', tenant: 'Rhiannon Evans', address: '8 Ffordd y Parc', issue: 'Front door lock broken', status: 'Reported', priority: 'Emergency', date: '10 Apr', slot: 'Awaiting triage' },
  { id: 'REP-0409', tenant: 'Gareth Thomas', address: '31 Heol Newydd', issue: 'Damp patch on bedroom wall', status: 'Triaging', priority: 'Routine', date: '9 Apr', slot: 'Diagnostic AI processing' },
  { id: 'REP-0408', tenant: 'Megan Davies', address: '5 Clos y Deri', issue: 'Window handle broken', status: 'Completed', priority: 'Routine', date: '8 Apr', slot: 'Completed 8 Apr by Tom Pugh' },
];

const COMPLIANCE = [
  { type: 'Gas safety', tenant: 'Bryn Llewellyn', address: '5 Heol y Bryn', due: '14 May 2026', status: 'overdue' as const },
  { type: 'Gas safety', tenant: 'Rhys Morgan', address: '17 Cae Mawr', due: '20 May 2026', status: 'due_soon' as const },
  { type: 'Boiler service', tenant: 'Siân Williams', address: '14 Heol y Castell', due: '27 Jun 2026', status: 'due_soon' as const },
  { type: 'Boiler service', tenant: 'Carys Hughes', address: '9 Lôn yr Eglwys', due: '12 Jul 2026', status: 'ok' as const },
  { type: 'EICR', tenant: 'Rhiannon Evans', address: '8 Ffordd y Parc', due: '8 Apr 2027', status: 'ok' as const },
  { type: 'Smoke alarms', tenant: 'Gareth Thomas', address: '31 Heol Newydd', due: '21 May 2026', status: 'due_soon' as const },
];

const COMMUNAL = [
  { area: 'Heol y Castell — entrance lighting', detail: 'LED upgrade with motion sensors (Blocks A–C)', status: 'In progress', properties: 72, eta: 'Completing 6 Jun 2026' },
  { area: 'Pontnewydd Block B — lift fault', detail: 'Lift contractor attended 13 May, awaiting part', status: 'Awaiting parts', properties: 24, eta: 'Engineer return 20 May' },
  { area: 'Heol y Castell communal garden', detail: 'Scheduled grounds maintenance visit', status: 'Scheduled', properties: 42, eta: 'Thu 21 May' },
];

function priorityStyle(p: string) {
  switch (p) {
    case 'Emergency': return 'bg-red-100 text-red-700 ring-1 ring-red-200';
    case 'Urgent': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
    default: return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200';
  }
}

function statusStyle(s: string) {
  switch (s) {
    case 'Completed': return 'bg-green-50 text-green-700';
    case 'In Progress': return 'bg-blue-50 text-blue-700';
    case 'Scheduled': return 'bg-purple-50 text-purple-700';
    case 'Triaging': return 'bg-amber-50 text-amber-700';
    case 'Reported': return 'bg-amber-50 text-amber-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

export default function AdminRepairsPage() {
  const [tab, setTab] = useState<Tab>('repairs');

  const tabs: { id: Tab; label: string; icon: typeof Wrench; count: number }[] = [
    { id: 'repairs', label: 'Repairs', icon: Wrench, count: REPAIRS.filter((r) => r.status !== 'Completed').length },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck, count: COMPLIANCE.filter((c) => c.status !== 'ok').length },
    { id: 'communal', label: 'Communal', icon: Building, count: COMMUNAL.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Repairs</h1>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
            <Clock className="h-3.5 w-3.5" /> 156 active
          </span>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            <Plus className="h-4 w-4" />
            New repair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1 overflow-x-auto" role="tablist">
          {tabs.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
                <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? 'bg-primary-100 text-primary-700' : 'bg-muted text-muted-foreground'
                }`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'repairs' && <RepairsTab />}
      {tab === 'compliance' && <ComplianceTab />}
      {tab === 'communal' && <CommunalTab />}
    </div>
  );
}

function RepairsTab() {
  return (
    <>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search repairs…"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm"
            aria-label="Search repairs"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ref</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Issue</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Tenant</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Priority</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Appointment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {REPAIRS.map((repair) => (
              <tr key={repair.id} className="transition-colors hover:bg-muted/50">
                <td className="p-4 font-mono text-xs text-muted-foreground">{repair.id}</td>
                <td className="p-4">
                  <p className="text-sm font-medium text-card-foreground">{repair.issue}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{repair.tenant}</p>
                </td>
                <td className="hidden p-4 md:table-cell">
                  <p className="text-sm text-card-foreground">{repair.tenant}</p>
                  <p className="text-xs text-muted-foreground">{repair.address}</p>
                </td>
                <td className="p-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle(repair.priority)}`}>
                    {repair.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle(repair.status)}`}>
                    {repair.status}
                  </span>
                </td>
                <td className="hidden p-4 text-xs text-muted-foreground lg:table-cell">
                  <div className="flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {repair.slot}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ComplianceTab() {
  const overdue = COMPLIANCE.filter((c) => c.status === 'overdue').length;
  const dueSoon = COMPLIANCE.filter((c) => c.status === 'due_soon').length;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Overdue"
          value={String(overdue)}
          tone="red"
          icon={AlertTriangle}
          desc="Legally required — book immediately"
        />
        <SummaryCard
          label="Due in 30 days"
          value={String(dueSoon)}
          tone="amber"
          icon={Clock}
          desc="Automatic reminders going out"
        />
        <SummaryCard
          label="In compliance"
          value="2,712"
          tone="green"
          icon={CheckCircle2}
          desc="95.3% of all properties"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by tenant, address or check type…"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm"
            aria-label="Search compliance"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700">
          <CalendarClock className="h-4 w-4" />
          Bulk book
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tenant / property</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Due</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COMPLIANCE.map((c, i) => {
              const Icon = c.type === 'Gas safety' || c.type === 'Boiler service' ? Flame : ShieldCheck;
              const toneIcon =
                c.status === 'overdue' ? 'bg-red-100 text-red-700' : c.status === 'due_soon' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
              const toneBadge =
                c.status === 'overdue' ? 'bg-red-50 text-red-700' : c.status === 'due_soon' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700';
              const label = c.status === 'overdue' ? 'Overdue' : c.status === 'due_soon' ? 'Due soon' : 'On track';

              return (
                <tr key={i} className="transition-colors hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneIcon}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{c.type}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-card-foreground">{c.tenant}</p>
                    <p className="text-xs text-muted-foreground">{c.address}</p>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{c.due}</td>
                  <td className="p-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${toneBadge}`}>
                      {label}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                      Book appointment
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CommunalTab() {
  return (
    <ul className="space-y-3" role="list">
      {COMMUNAL.map((c) => (
        <li key={c.area} className="flex flex-wrap items-start gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-semibold text-card-foreground">{c.area}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{c.detail}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Affects {c.properties} properties · {c.eta}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
            {c.status}
          </span>
          <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
            View
            <ChevronRight className="ml-1 inline h-3 w-3" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function SummaryCard({
  label,
  value,
  tone,
  icon: Icon,
  desc,
}: {
  label: string;
  value: string;
  tone: 'red' | 'amber' | 'green';
  icon: typeof Flame;
  desc: string;
}) {
  const styles = {
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    green: 'bg-green-100 text-green-700',
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className={`rounded-lg p-1.5 ${styles[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
