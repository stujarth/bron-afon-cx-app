'use client';

import { useState } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  MessageSquareWarning,
  Volume2,
  ShieldAlert,
  ArrowLeftRight,
  Accessibility,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  Phone,
  Mail,
  MapPin,
  User,
  Send,
} from 'lucide-react';

type Queue = 'complaints' | 'asb' | 'safeguarding' | 'exchange' | 'adaptations';

interface CaseRow {
  ref: string;
  tenant: string;
  property: string;
  summary: string;
  status: string;
  statusTone: 'amber' | 'blue' | 'green' | 'red' | 'gray';
  sla: string;
  slaBreach?: boolean;
  channel: 'App' | 'Phone' | 'Email' | 'Letter' | 'In person';
  assignee: string | null;
  raised: string;
}

const COMPLAINTS: CaseRow[] = [
  {
    ref: 'CMP-2026-0357',
    tenant: 'Siân Williams',
    property: '14 Heol y Castell',
    summary: 'Damp in spare bedroom — repeated visits not fixing it',
    status: 'Stage 1 · Investigation',
    statusTone: 'amber',
    sla: 'Response due in 4 days',
    channel: 'App',
    assignee: 'Rhian Thomas',
    raised: '13 May 2026',
  },
  {
    ref: 'CMP-2026-0356',
    tenant: 'Dafydd Jones',
    property: '23 Stryd y Bont',
    summary: 'Engineer missed appointment, no follow up',
    status: 'Stage 1 · New',
    statusTone: 'red',
    sla: 'Acknowledge by today',
    slaBreach: true,
    channel: 'Phone',
    assignee: null,
    raised: '12 May 2026',
  },
  {
    ref: 'CMP-2026-0355',
    tenant: 'Gareth Thomas',
    property: '31 Heol Newydd',
    summary: 'Service charge for grounds maintenance disputed',
    status: 'Stage 2 · Escalated',
    statusTone: 'red',
    sla: 'Response due in 12 days',
    channel: 'Letter',
    assignee: 'Gareth Bowen',
    raised: '4 May 2026',
  },
  {
    ref: 'CMP-2026-0354',
    tenant: 'Megan Davies',
    property: '5 Clos y Deri',
    summary: 'Communication about kitchen replacement was unclear',
    status: 'Resolved',
    statusTone: 'green',
    sla: 'Closed 11 May 2026',
    channel: 'App',
    assignee: 'Rhian Thomas',
    raised: '28 Apr 2026',
  },
];

const ASB: CaseRow[] = [
  {
    ref: 'ASB-2026-1142',
    tenant: 'Siân Williams',
    property: '14 Heol y Castell',
    summary: 'Noise (loud music after midnight, repeated)',
    status: 'Investigating',
    statusTone: 'amber',
    sla: 'Visit due in 3 days',
    channel: 'App',
    assignee: 'Gareth Bowen',
    raised: '13 May 2026',
  },
  {
    ref: 'ASB-2026-1141',
    tenant: 'Anonymous',
    property: 'Heol y Castell estate',
    summary: 'Drug-related activity, communal stairwell',
    status: 'Triage',
    statusTone: 'red',
    sla: 'Police liaison',
    channel: 'Phone',
    assignee: null,
    raised: '12 May 2026',
  },
  {
    ref: 'ASB-2026-1138',
    tenant: 'Rhiannon Evans',
    property: '8 Ffordd y Parc',
    summary: 'Verbal abuse from neighbour',
    status: 'Action plan agreed',
    statusTone: 'blue',
    sla: 'Review in 14 days',
    channel: 'App',
    assignee: 'Gareth Bowen',
    raised: '6 May 2026',
  },
];

const SAFEGUARDING: CaseRow[] = [
  {
    ref: 'SAF-2026-0098',
    tenant: 'Siân Williams (raising for elderly neighbour)',
    property: '12 Heol y Castell (subject)',
    summary: 'Concern about elderly neighbour — possible self-neglect',
    status: 'Triage',
    statusTone: 'red',
    sla: 'Lead review by 14:00',
    channel: 'App',
    assignee: 'Safeguarding Lead',
    raised: 'Today 11:42',
  },
  {
    ref: 'SAF-2026-0097',
    tenant: 'Anonymous',
    property: '23 Stryd y Bont (subject)',
    summary: 'Possible child welfare concern — household visit needed',
    status: 'Referred to Social Services',
    statusTone: 'blue',
    sla: 'Awaiting external response',
    channel: 'Phone',
    assignee: 'Safeguarding Lead',
    raised: '10 May 2026',
  },
];

const EXCHANGE: CaseRow[] = [
  {
    ref: 'MEX-2026-0042',
    tenant: 'Siân Williams ↔ Owen Davies',
    property: '14 Heol y Castell ↔ 7 Maes Pontnewydd',
    summary: 'Mutual exchange — property inspection stage',
    status: 'Inspection booked',
    statusTone: 'blue',
    sla: 'Inspection 22 May',
    channel: 'App',
    assignee: 'Megan Pugh',
    raised: '3 May 2026',
  },
  {
    ref: 'MEX-2026-0041',
    tenant: 'Bryn Llewellyn ↔ (external — Newport CHC)',
    property: '5 Heol y Bryn ↔ external',
    summary: 'Mutual exchange — tenancy checks with external landlord',
    status: 'Tenancy checks',
    statusTone: 'amber',
    sla: 'Decision by 30 May',
    channel: 'App',
    assignee: 'Megan Pugh',
    raised: '21 Apr 2026',
  },
];

const ADAPTATIONS: CaseRow[] = [
  {
    ref: 'ADP-2026-0231',
    tenant: 'Siân Williams',
    property: '14 Heol y Castell',
    summary: 'Bathroom grab rail — OT assessment booked',
    status: 'OT assessment',
    statusTone: 'amber',
    sla: 'OT visit 24 May',
    channel: 'App',
    assignee: 'Sara Watkins',
    raised: '2 May 2026',
  },
  {
    ref: 'ADP-2026-0230',
    tenant: 'Rhiannon Evans',
    property: '8 Ffordd y Parc',
    summary: 'Walk-in shower conversion — funding approved',
    status: 'Awaiting works',
    statusTone: 'blue',
    sla: 'Schedule by 6 June',
    channel: 'Phone',
    assignee: 'Sara Watkins',
    raised: '14 Apr 2026',
  },
  {
    ref: 'ADP-2026-0228',
    tenant: 'Gareth Thomas',
    property: '31 Heol Newydd',
    summary: 'Stair lift — feasibility query',
    status: 'New',
    statusTone: 'gray',
    sla: 'Acknowledge by 17 May',
    channel: 'App',
    assignee: null,
    raised: '12 May 2026',
  },
];

const QUEUES: { id: Queue; label: string; icon: typeof ClipboardList; iconColor: string; rows: CaseRow[] }[] = [
  { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning, iconColor: 'bg-rose-100 text-rose-700', rows: COMPLAINTS },
  { id: 'asb', label: 'Anti-social behaviour', icon: Volume2, iconColor: 'bg-amber-100 text-amber-700', rows: ASB },
  { id: 'safeguarding', label: 'Safeguarding', icon: ShieldAlert, iconColor: 'bg-red-100 text-red-700', rows: SAFEGUARDING },
  { id: 'exchange', label: 'Mutual exchange', icon: ArrowLeftRight, iconColor: 'bg-blue-100 text-blue-700', rows: EXCHANGE },
  { id: 'adaptations', label: 'Adaptations', icon: Accessibility, iconColor: 'bg-purple-100 text-purple-700', rows: ADAPTATIONS },
];

function toneStyles(tone: CaseRow['statusTone']) {
  switch (tone) {
    case 'red': return 'bg-red-50 text-red-700';
    case 'amber': return 'bg-amber-50 text-amber-700';
    case 'blue': return 'bg-blue-50 text-blue-700';
    case 'green': return 'bg-green-50 text-green-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

function channelIcon(channel: CaseRow['channel']) {
  switch (channel) {
    case 'Phone': return Phone;
    case 'Email': return Mail;
    case 'Letter': return Mail;
    case 'In person': return User;
    default: return ClipboardList;
  }
}

export default function CaseworkPage() {
  const [queue, setQueue] = useState<Queue>('complaints');
  const [logging, setLogging] = useState(false);
  const active = QUEUES.find((q) => q.id === queue)!;

  const counts = {
    complaints: COMPLAINTS.filter((c) => c.statusTone !== 'green').length,
    asb: ASB.length,
    safeguarding: SAFEGUARDING.length,
    exchange: EXCHANGE.length,
    adaptations: ADAPTATIONS.length,
  };

  const totalOpen = Object.values(counts).reduce((s, n) => s + n, 0);
  const breaches = QUEUES.flatMap((q) => q.rows).filter((r) => r.slaBreach).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Casework</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All submissions and cases — complaints, ASB, safeguarding, exchange and adaptations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <ClipboardList className="h-3.5 w-3.5" />
            {totalOpen} open
          </span>
          {breaches > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              {breaches} SLA breach{breaches > 1 ? 'es' : ''}
            </span>
          )}
          <button
            onClick={() => setLogging(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            Log on behalf of tenant
          </button>
        </div>
      </div>

      {/* Queue tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {QUEUES.map((q) => {
          const isActive = q.id === queue;
          const count = counts[q.id];
          return (
            <button
              key={q.id}
              onClick={() => setQueue(q.id)}
              className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? 'border-primary-500 bg-primary-50/40 ring-1 ring-primary-200'
                  : 'border-border bg-card hover:border-primary-300'
              }`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${q.iconColor}`}>
                <q.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`truncate text-sm font-medium ${isActive ? 'text-primary-800' : 'text-card-foreground'}`}>
                  {q.label}
                </p>
                <p className="text-[11px] text-muted-foreground">{count} open</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder={`Search ${active.label.toLowerCase()}…`}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search casework"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Case</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Tenant</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">SLA</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Assignee</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {active.rows.map((r) => {
              const ChannelIcon = channelIcon(r.channel);
              return (
                <tr key={r.ref} className="transition-colors hover:bg-muted/40">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ChannelIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">{r.ref}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Raised {r.raised} · {r.channel}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-card-foreground">{r.summary}</p>
                    <p className="text-xs text-muted-foreground lg:hidden">{r.tenant}</p>
                  </td>
                  <td className="hidden p-4 lg:table-cell">
                    <p className="text-sm text-card-foreground">{r.tenant}</p>
                    <p className="text-xs text-muted-foreground">{r.property}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${toneStyles(r.statusTone)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="hidden p-4 md:table-cell">
                    <div className="flex items-center gap-1.5">
                      {r.slaBreach ? (
                        <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className={`text-xs ${r.slaBreach ? 'text-red-700 font-medium' : 'text-muted-foreground'}`}>
                        {r.sla}
                      </span>
                    </div>
                  </td>
                  <td className="hidden p-4 lg:table-cell">
                    {r.assignee ? (
                      <span className="text-sm text-muted-foreground">{r.assignee}</span>
                    ) : (
                      <button className="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 hover:bg-primary-100">
                        Assign
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted" aria-label="Open case">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {logging && <LogOnBehalfModal queue={queue} queues={QUEUES} onClose={() => setLogging(false)} />}
    </div>
  );
}

function LogOnBehalfModal({
  queue,
  queues,
  onClose,
}: {
  queue: Queue;
  queues: typeof QUEUES;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<Queue>(queue);
  const [channel, setChannel] = useState<'Phone' | 'Letter' | 'In person' | 'Email'>('Phone');

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Case logged on behalf of tenant</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            A reference has been issued and a written acknowledgement will be sent to the tenant
            through their preferred contact method.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold">
            Reference: <span className="font-mono">CMP-2026-0358</span>
          </div>
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
          <div>
            <h2 className="text-lg font-semibold text-foreground">Log on behalf of tenant</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Use this when a tenant contacts you by phone, letter or in person and is unable or
              unwilling to use the app.
            </p>
          </div>
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
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Case type</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {queues.map((q) => {
                const isActive = type === q.id;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setType(q.id)}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-sm font-medium ${
                      isActive
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-border bg-card text-card-foreground hover:bg-muted'
                    }`}
                  >
                    <q.icon className="h-4 w-4" />
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Tenant" required>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                type="text"
                placeholder="Search by name, address or tenancy reference…"
                className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm"
              />
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Linking the tenant ensures they receive acknowledgement and updates.
            </p>
          </Field>

          <Field label="Channel used by tenant" required>
            <div className="grid grid-cols-4 gap-2">
              {(['Phone', 'Letter', 'In person', 'Email'] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setChannel(c)}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium ${
                    channel === c
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-border bg-card text-card-foreground hover:bg-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Summary" required>
            <input
              required
              maxLength={120}
              placeholder="Short title for the case"
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
            />
          </Field>

          <Field label="What did the tenant say?" required>
            <textarea
              required
              rows={5}
              placeholder="Record what the tenant told you, in their words where possible."
              className="w-full rounded-lg border border-input bg-background p-3 text-sm"
            />
          </Field>

          <Field label="What does the tenant want to happen?">
            <textarea
              rows={2}
              placeholder="Their desired outcome, if stated."
              className="w-full rounded-lg border border-input bg-background p-3 text-sm"
            />
          </Field>

          <Field label="Acknowledgement to tenant" required>
            <div className="grid grid-cols-4 gap-2">
              {['Phone', 'Letter', 'Email', 'SMS'].map((c) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border p-2 text-xs font-medium has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
                >
                  <input type="radio" name="ack" required className="h-3 w-3" />
                  {c}
                </label>
              ))}
            </div>
          </Field>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-card-foreground">Support needs noted</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Mark any access or communication support the tenant needs.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Welsh', 'Easy read', 'Interpreter', 'Advocate', 'Large print'].map((tag) => (
                <label
                  key={tag}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
                >
                  <input type="checkbox" className="h-3 w-3" />
                  {tag}
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
            <Send className="h-4 w-4" />
            Log case &amp; send acknowledgement
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
