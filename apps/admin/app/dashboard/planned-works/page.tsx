'use client';

import { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Filter,
  Search,
  Hammer,
  Wrench,
  Sparkles,
  Home,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Pencil,
  Send,
  X,
  Users,
} from 'lucide-react';

type Status = 'planning' | 'consulting' | 'scheduled' | 'in_progress' | 'complete';

interface PlannedWork {
  id: string;
  title: string;
  scope: string;
  status: Status;
  window: string;
  area: string;
  properties: number;
  notified: boolean;
  programme: string;
  icon: typeof Wrench;
  iconColor: string;
}

const STATUS_LABELS: Record<Status, string> = {
  planning: 'Planning',
  consulting: 'Consulting',
  scheduled: 'Scheduled',
  in_progress: 'In progress',
  complete: 'Complete',
};

const STATUS_STYLES: Record<Status, string> = {
  planning: 'bg-gray-50 text-gray-700',
  consulting: 'bg-amber-50 text-amber-700',
  scheduled: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-purple-50 text-purple-700',
  complete: 'bg-green-50 text-green-700',
};

const WORKS: PlannedWork[] = [
  {
    id: 'PW-2026-014',
    title: 'Kitchen replacement programme — Heol y Castell',
    scope: 'New units, worktops, sink, splashbacks and floor covering.',
    status: 'scheduled',
    window: 'September 2026',
    area: 'Heol y Castell (Cwmbran)',
    properties: 42,
    notified: true,
    programme: 'Decent Homes',
    icon: Wrench,
    iconColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'PW-2026-013',
    title: 'External painting cycle — Pontnewydd estate',
    scope: 'Front and rear exterior woodwork repaint as part of 5-year cycle.',
    status: 'planning',
    window: 'May 2027',
    area: 'Pontnewydd estate',
    properties: 118,
    notified: false,
    programme: 'Cyclical works',
    icon: Hammer,
    iconColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'PW-2026-012',
    title: 'EV charging point feasibility — terraced streets',
    scope: 'Consultation on shared EV charging for terraced properties.',
    status: 'consulting',
    window: 'Awaiting consultation results',
    area: 'Heol y Castell, Heol Newydd, Stryd y Bont',
    properties: 168,
    notified: true,
    programme: 'Net zero',
    icon: Sparkles,
    iconColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'PW-2026-011',
    title: 'Communal entrance lighting upgrade',
    scope: 'LED upgrade with motion sensors for Blocks A–C.',
    status: 'in_progress',
    window: 'May–June 2026',
    area: 'Pontnewydd Blocks A–C',
    properties: 72,
    notified: true,
    programme: 'Communal',
    icon: Building,
    iconColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'PW-2026-010',
    title: 'Loft insulation top-up',
    scope: 'Top-up loft insulation to 300mm to improve energy efficiency.',
    status: 'complete',
    window: 'Feb–Apr 2026',
    area: 'Cwmbran estates (Phase 1)',
    properties: 240,
    notified: true,
    programme: 'Net zero',
    icon: Home,
    iconColor: 'bg-slate-100 text-slate-700',
  },
];

export default function PlannedWorksPage() {
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  const filtered = statusFilter === 'all' ? WORKS : WORKS.filter((w) => w.status === statusFilter);
  const open = WORKS.filter((w) => w.status !== 'complete').length;
  const totalProps = filtered.reduce((s, w) => s + w.properties, 0);

  const filters: { id: Status | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'planning', label: 'Planning' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'in_progress', label: 'In progress' },
    { id: 'complete', label: 'Complete' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planned works</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule and communicate planned works programmes. Items here are visible to affected
            tenants in their app.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {open} open programmes
          </span>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            New programme
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Programmes shown" value={String(filtered.length)} icon={CalendarDays} tone="blue" />
        <Stat label="Properties affected" value={totalProps.toLocaleString()} icon={Users} tone="purple" />
        <Stat
          label="Awaiting tenant notification"
          value={String(WORKS.filter((w) => !w.notified && w.status !== 'planning').length)}
          icon={AlertCircle}
          tone="amber"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search programmes…"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm"
            aria-label="Search programmes"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const isActive = statusFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-border bg-card text-card-foreground hover:bg-muted'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-3">
        {filtered.map((w) => (
          <article key={w.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${w.iconColor}`}>
                <w.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-card-foreground">{w.title}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[w.status]}`}>
                    {STATUS_LABELS[w.status]}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {w.programme}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{w.scope}</p>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                  <Detail label="Window" value={w.window} />
                  <Detail label="Area" value={w.area} />
                  <Detail label="Properties" value={w.properties.toLocaleString()} />
                  <Detail label="Reference" value={w.id} />
                  <Detail
                    label="Tenant visibility"
                    value={w.notified ? 'Published to app' : 'Hidden (draft)'}
                    icon={w.notified ? CheckCircle2 : Clock}
                  />
                </dl>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  aria-label={`Preview ${w.title}`}
                >
                  <Eye className="mr-1 inline h-3 w-3" />
                  Preview
                </button>
                <button
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  aria-label={`Edit ${w.title}`}
                >
                  <Pencil className="mr-1 inline h-3 w-3" />
                  Edit
                </button>
                {!w.notified && w.status !== 'planning' && (
                  <button className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                    <Send className="mr-1 inline h-3 w-3" />
                    Publish
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {creating && <CreateProgrammeModal onClose={() => setCreating(false)} />}
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof Wrench;
  tone: 'blue' | 'purple' | 'amber';
}) {
  const styles = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    amber: 'bg-amber-100 text-amber-700',
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-card-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Wrench;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-1 text-card-foreground">
        {Icon && <Icon className="h-3 w-3 text-muted-foreground" />}
        {value}
      </dd>
    </div>
  );
}

function CreateProgrammeModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Programme created</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Saved as a draft. Affected tenants will see it once you publish.
          </p>
          <button
            onClick={onClose}
            className="mt-5 w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-semibold text-foreground">New planned works programme</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <Field label="Programme title" required>
            <input
              required
              type="text"
              placeholder="e.g. Kitchen replacement programme — Heol y Castell"
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            />
          </Field>

          <Field label="Programme type" required>
            <select required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
              <option value="">Choose…</option>
              <option>Decent Homes</option>
              <option>Cyclical works</option>
              <option>Communal</option>
              <option>Net zero</option>
              <option>Health & safety</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Scope of works" required>
            <textarea
              required
              rows={3}
              placeholder="What's being done? This is shown to tenants in their app."
              className="w-full rounded-lg border border-input bg-background p-3 text-sm"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start" required>
              <input
                required
                type="month"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="End">
              <input
                type="month"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
              />
            </Field>
          </div>

          <Field label="Affected area" required>
            <input
              required
              type="text"
              placeholder="e.g. Heol y Castell, Pontnewydd Blocks A–C"
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            />
          </Field>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-card-foreground">Tenant communications</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              By default we will send an in-app notification, an email, and SMS to affected tenants
              on publish.
            </p>
            <div className="mt-2 space-y-1.5">
              {[
                { label: 'In-app notification', checked: true },
                { label: 'Email', checked: true },
                { label: 'SMS', checked: true },
                { label: 'Letter', checked: false },
              ].map((c) => (
                <label key={c.label} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked={c.checked} className="h-4 w-4" />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Save as draft
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}
