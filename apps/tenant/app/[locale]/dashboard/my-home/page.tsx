'use client';

import { useState } from 'react';
import {
  Home,
  Hammer,
  Accessibility,
  Building,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Calendar,
  Wrench,
  ShieldCheck,
  Info,
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

type TabId = 'overview' | 'planned' | 'condition' | 'adaptations' | 'communal' | 'newbuild';

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'planned', label: 'Planned works', icon: Calendar },
  { id: 'condition', label: 'Condition', icon: ShieldCheck },
  { id: 'adaptations', label: 'Adaptations', icon: Accessibility },
  { id: 'communal', label: 'Communal', icon: Building },
  { id: 'newbuild', label: 'Defects', icon: ClipboardList },
];

export default function MyHomePage() {
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Home</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          14 Heol y Castell · Cwmbran · NP44 1AB
        </p>
      </div>

      {/* Property summary card */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary-50 via-card to-card p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
            <Home className="h-7 w-7 text-primary-700" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your property
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              2-bed mid-terrace · Built 1978
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">EPC rating C · Gas central heating</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              <ShieldCheck className="h-3 w-3" />
              Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex gap-1 border-b border-border min-w-max" role="tablist">
          {TABS.map((t) => {
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
                <t.icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'overview' && <OverviewTab onChange={setTab} />}
      {tab === 'planned' && <PlannedWorksTab />}
      {tab === 'condition' && <ConditionTab />}
      {tab === 'adaptations' && <AdaptationsTab />}
      {tab === 'communal' && <CommunalTab />}
      {tab === 'newbuild' && <NewBuildTab />}
    </div>
  );
}

function OverviewTab({ onChange }: { onChange: (id: TabId) => void }) {
  const items = [
    {
      id: 'planned' as TabId,
      icon: Calendar,
      title: 'Planned works',
      desc: 'Kitchen replacement scheduled for September 2026',
      badge: '2 upcoming',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'condition' as TabId,
      icon: ShieldCheck,
      title: 'Property condition',
      desc: 'All compliance checks up to date',
      badge: 'All clear',
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'adaptations' as TabId,
      icon: Accessibility,
      title: 'Adaptations',
      desc: 'Grab rail request in assessment',
      badge: '1 in progress',
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'communal' as TabId,
      icon: Building,
      title: 'Communal repairs',
      desc: 'No active communal works for your area',
      badge: 'None',
      color: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
        >
          <div className={`rounded-xl p-2.5 ${item.color}`}>
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
                {item.title}
              </h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {item.badge}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </button>
      ))}
    </div>
  );
}

function PlannedWorksTab() {
  const works = [
    {
      title: 'Kitchen replacement',
      window: 'September 2026 (2 week works window)',
      scope: 'New units, worktops, sink, splashbacks and floor covering. Cooker disconnection and reconnection included.',
      status: 'Confirmed',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      icon: Wrench,
    },
    {
      title: 'External painting (Heol y Castell)',
      window: 'May 2027',
      scope: 'Front and rear exterior woodwork repaint as part of the 5-year cycle.',
      status: 'Scheduled',
      color: 'text-purple-700',
      bg: 'bg-purple-50 border-purple-200',
      icon: Hammer,
    },
    {
      title: 'EV charging point feasibility',
      window: 'Awaiting consultation',
      scope: 'Bron Afon is exploring shared EV charging for terraced properties. We will consult residents.',
      status: 'Consulting',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
        <p className="text-sm font-medium text-primary-800">Why you can see this</p>
        <p className="mt-0.5 text-xs text-primary-700/80">
          We share planned works timelines so you know what is coming and can plan around it.
          You can subscribe to updates for any item.
        </p>
      </div>

      <ol className="space-y-3" role="list">
        {works.map((w) => (
          <li
            key={w.title}
            className={`rounded-xl border bg-card p-4 ${w.bg}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                <w.icon className={`h-5 w-5 ${w.color}`} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{w.title}</h3>
                  <span className={`rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold ${w.color}`}>
                    {w.status}
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-foreground/80">{w.window}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{w.scope}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                    Subscribe to updates
                  </button>
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100/50">
                    Ask a question
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ConditionTab() {
  const checks = [
    { name: 'Gas safety certificate', valid: 'Valid until 14 Mar 2027', status: 'ok' as const, icon: ShieldCheck },
    { name: 'Boiler service', valid: 'Last serviced 14 Mar 2026', status: 'ok' as const, icon: ShieldCheck },
    { name: 'Electrical EICR', valid: 'Valid until 22 Jun 2029', status: 'ok' as const, icon: ShieldCheck },
    { name: 'Smoke alarms tested', valid: 'Last tested 14 Mar 2026', status: 'ok' as const, icon: ShieldCheck },
    { name: 'Damp & mould inspection', valid: 'Next due Oct 2026', status: 'upcoming' as const, icon: Clock },
  ];

  const notes = [
    {
      title: 'Window seal repair — bedroom',
      summary: 'Sealant work completed 12 Feb 2026 by D. Evans. Under 12-month warranty.',
      when: '12 Feb 2026',
    },
    {
      title: 'Roof inspection (planned)',
      summary: 'Routine inspection planned as part of estate cyclical works.',
      when: 'Oct 2026',
    },
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Compliance & safety</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Records of legally required checks and certificates for your home.
          </p>
        </div>
        <ul className="divide-y divide-border" role="list">
          {checks.map((c) => (
            <li key={c.name} className="flex items-center gap-3 p-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  c.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                <c.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.valid}</p>
              </div>
              <Link
                href="/dashboard/repairs"
                className="text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                Details
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Recent and upcoming notes</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          {notes.map((n) => (
            <li key={n.title} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                <span className="text-xs text-muted-foreground">{n.when}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function AdaptationsTab() {
  const [requesting, setRequesting] = useState(false);

  const myRequests = [
    {
      name: 'Bathroom grab rail',
      status: 'Occupational therapy assessment',
      step: 2,
      total: 4,
      lastUpdate: 'OT visit booked for 24 May 2026',
    },
  ];

  const options = [
    { name: 'Grab rails (bathroom or stairs)', detail: 'Wall-mounted support to assist with mobility.' },
    { name: 'Stair lift', detail: 'Powered seat on rails to help with stairs.' },
    { name: 'Walk-in shower or wet room', detail: 'Replacement of bath with level-access shower.' },
    { name: 'Ramped access', detail: 'External ramp at front or rear door for wheelchair access.' },
    { name: 'Door widening', detail: 'Internal doorways adapted for wheelchair use.' },
    { name: 'Kitchen adaptations', detail: 'Adjustable worktops, lower cabinets, lever taps.' },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
        <div className="flex items-start gap-3">
          <Accessibility className="mt-0.5 h-5 w-5 shrink-0 text-purple-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-purple-900">Adaptations help you live independently</p>
            <p className="mt-1 text-xs text-purple-800/90 leading-relaxed">
              If you, or someone in your household, has a health condition or disability,
              we can make changes to your home. Most requests need an Occupational Therapy assessment.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">My adaptation requests</h2>
          <button
            onClick={() => setRequesting((r) => !r)}
            className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {requesting ? 'Cancel' : 'Request new'}
          </button>
        </div>
        {requesting && (
          <div className="border-b border-border bg-primary-50/40 p-4">
            <label className="block text-sm font-medium text-foreground">What do you need?</label>
            <select className="mt-1.5 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option>Choose an adaptation…</option>
              {options.map((o) => (
                <option key={o.name}>{o.name}</option>
              ))}
              <option>Other (describe)</option>
            </select>
            <label className="mt-3 block text-sm font-medium text-foreground">
              Tell us about the need
            </label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 text-sm"
              rows={3}
              placeholder="Briefly describe what you need and why…"
            />
            <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white">
              Submit request
            </button>
            <p className="mt-2 text-[11px] text-muted-foreground">
              We will get in touch within 5 working days, usually to book an OT assessment.
            </p>
          </div>
        )}
        <ul className="divide-y divide-border" role="list">
          {myRequests.map((r) => (
            <li key={r.name} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-card-foreground">{r.name}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                  <Clock className="h-3 w-3" />
                  {r.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full ${s <= r.step ? 'bg-purple-500' : 'bg-muted'}`}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{r.lastUpdate}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Adaptations we commonly fit</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          {options.map((o) => (
            <li key={o.name} className="flex items-start gap-3 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{o.name}</p>
                <p className="text-xs text-muted-foreground">{o.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CommunalTab() {
  const items = [
    {
      area: 'Heol y Castell — block entrance',
      status: 'No active repairs',
      detail: 'Last reported issue resolved on 2 March 2026 (faulty entrance light replaced).',
      color: 'text-green-700',
      bg: 'bg-green-50',
    },
    {
      area: 'Communal garden — Heol y Castell',
      status: 'Scheduled grounds maintenance',
      detail: 'Next visit by grounds team on Thursday 21 May 2026.',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Shared spaces in your area</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          {items.map((i) => (
            <li key={i.area} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-card-foreground">{i.area}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{i.detail}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${i.bg} ${i.color}`}
                >
                  {i.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-card-foreground">Spotted something in a shared space?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Let us know about issues in communal areas — entrances, gardens, lifts, lighting.
        </p>
        <Link
          href="/dashboard/repairs/new"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <Wrench className="h-4 w-4" />
          Report a communal issue
        </Link>
      </div>
    </div>
  );
}

function NewBuildTab() {
  const [expanded, setExpanded] = useState<string | null>('defect-1');

  const defects = [
    {
      id: 'defect-1',
      title: 'Hairline crack — living room wall',
      reported: '2 Apr 2026',
      status: 'Booked for remediation',
      severity: 'Snag',
      detail: 'Settlement crack near window reveal. Developer to fill and decorate during defects visit on 28 April.',
    },
    {
      id: 'defect-2',
      title: 'Sticking front door catch',
      reported: '18 Mar 2026',
      status: 'Resolved',
      severity: 'Snag',
      detail: 'Latch adjusted on 24 March. Reported as fixed by tenant.',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              New build &amp; voids reports
            </p>
            <p className="mt-1 text-xs text-blue-800/90 leading-relaxed">
              For your first 12 months in a new build property, defects are tracked here and
              passed to the developer. After this period they become standard repairs. For
              former-void properties, your move-in inspection report is also kept here.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">New build defects</h2>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-700">
            <ClipboardList className="h-3 w-3" />
            Log a defect
          </button>
        </div>
        <ul className="divide-y divide-border" role="list">
          {defects.map((d) => (
            <li key={d.id}>
              <button
                onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted/40"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    d.status === 'Resolved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {d.status === 'Resolved' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{d.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.severity} · Reported {d.reported}
                  </p>
                </div>
                <span className="hidden sm:inline rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {d.status}
                </span>
                {expanded === d.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expanded === d.id && (
                <div className="border-t border-border bg-muted/20 p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.detail}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-card-foreground">
              Voids inspection report
            </p>
            <p className="text-xs text-muted-foreground">
              The report from before you moved in — what was repaired or replaced.
            </p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
            View report <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </section>
    </div>
  );
}
