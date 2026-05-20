'use client';

import { useState } from 'react';
import {
  Star,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Wrench,
  Home,
  PoundSterling,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Send,
  X,
} from 'lucide-react';

type Topic = 'repair' | 'planned_works' | 'tenancy';

interface Feedback {
  id: string;
  topic: Topic;
  ref: string;
  tenant: string;
  property: string;
  completedDate: string;
  overall: number;
  work: number;
  comms: number;
  staff: number;
  comment?: string;
  share: boolean;
  responded: boolean;
  responseDue?: string;
}

const FEEDBACK: Feedback[] = [
  {
    id: 'fb-001',
    topic: 'repair',
    ref: 'REP-2026-0412',
    tenant: 'Siân Williams',
    property: '14 Heol y Castell',
    completedDate: '12 May 2026',
    overall: 5,
    work: 5,
    comms: 5,
    staff: 5,
    comment: "Dai was lovely, explained everything, and even fixed a wobbly cabinet hinge without me asking. Brilliant service.",
    share: true,
    responded: false,
    responseDue: 'Thank you the team',
  },
  {
    id: 'fb-002',
    topic: 'planned_works',
    ref: 'PW-2025-088',
    tenant: 'Dafydd Jones',
    property: '23 Stryd y Bont',
    completedDate: '8 May 2026',
    overall: 2,
    work: 3,
    comms: 1,
    staff: 4,
    comment: "Work was fine but I had no idea what was happening from one day to the next. Confused about which trades were coming when.",
    share: false,
    responded: false,
    responseDue: 'Within 5 working days',
  },
  {
    id: 'fb-003',
    topic: 'repair',
    ref: 'REP-2026-0398',
    tenant: 'Rhiannon Evans',
    property: '8 Ffordd y Parc',
    completedDate: '6 May 2026',
    overall: 4,
    work: 5,
    comms: 3,
    staff: 5,
    comment: "Repair done well but the appointment was rebooked twice without much warning.",
    share: false,
    responded: true,
  },
  {
    id: 'fb-004',
    topic: 'planned_works',
    ref: 'PW-2026-010',
    tenant: 'Megan Davies',
    property: '5 Clos y Deri',
    completedDate: '2 May 2026',
    overall: 5,
    work: 5,
    comms: 5,
    staff: 5,
    comment: "Lovely team, work neat, house warmer already. Thank you.",
    share: true,
    responded: false,
  },
  {
    id: 'fb-005',
    topic: 'repair',
    ref: 'REP-2026-0376',
    tenant: 'Gareth Thomas',
    property: '31 Heol Newydd',
    completedDate: '29 Apr 2026',
    overall: 3,
    work: 3,
    comms: 3,
    staff: 4,
    share: false,
    responded: true,
  },
];

const TOPIC_META: Record<Topic, { label: string; icon: typeof Wrench; color: string }> = {
  repair: { label: 'Repair', icon: Wrench, color: 'bg-blue-100 text-blue-700' },
  planned_works: { label: 'Planned works', icon: Home, color: 'bg-indigo-100 text-indigo-700' },
  tenancy: { label: 'Tenancy', icon: PoundSterling, color: 'bg-green-100 text-green-700' },
};

export default function FeedbackPage() {
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [filter, setFilter] = useState<'all' | 'low' | 'unresponded'>('all');

  const filtered = FEEDBACK.filter((f) => {
    if (filter === 'low') return f.overall <= 3;
    if (filter === 'unresponded') return !f.responded;
    return true;
  });

  const avg = (FEEDBACK.reduce((s, f) => s + f.overall, 0) / FEEDBACK.length).toFixed(1);
  const positive = FEEDBACK.filter((f) => f.overall >= 4).length;
  const negative = FEEDBACK.filter((f) => f.overall <= 2).length;
  const unresponded = FEEDBACK.filter((f) => !f.responded).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tenant feedback on completed repairs and planned works.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Average rating"
          value={`${avg} / 5`}
          icon={Star}
          trend="up"
          change="+0.2 vs last month"
          color="bg-amber-100 text-amber-700"
        />
        <Stat
          label="Positive (4-5 stars)"
          value={String(positive)}
          icon={TrendingUp}
          trend="up"
          change="80% of total"
          color="bg-green-100 text-green-700"
        />
        <Stat
          label="Negative (1-2 stars)"
          value={String(negative)}
          icon={TrendingDown}
          trend="down"
          change={`${Math.round((negative / FEEDBACK.length) * 100)}% of total`}
          color="bg-rose-100 text-rose-700"
        />
        <Stat
          label="Awaiting response"
          value={String(unresponded)}
          icon={AlertCircle}
          trend="neutral"
          change="See below"
          color="bg-blue-100 text-blue-700"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search feedback…"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm"
            aria-label="Search feedback"
          />
        </div>
        <div className="flex gap-1.5">
          {([
            { id: 'all', label: 'All' },
            { id: 'low', label: 'Low scoring' },
            { id: 'unresponded', label: 'Awaiting response' },
          ] as const).map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
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

      {/* List */}
      <ul className="space-y-3" role="list">
        {filtered.map((f) => {
          const topic = TOPIC_META[f.topic];
          return (
            <li
              key={f.id}
              className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary-300"
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${topic.color}`}>
                  <topic.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{f.ref}</span>
                    <span className="text-[11px] text-muted-foreground">·</span>
                    <p className="text-sm font-medium text-card-foreground">{f.tenant}</p>
                    <span className="text-[11px] text-muted-foreground">· {f.completedDate}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          f.overall >= s ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      {f.overall} · work {f.work}, comms {f.comms}, staff {f.staff}
                    </span>
                  </div>
                  {f.comment && (
                    <blockquote className="mt-2 border-l-2 border-primary-200 pl-3 text-sm italic text-muted-foreground">
                      &ldquo;{f.comment}&rdquo;
                    </blockquote>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                    {f.share && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                        <Star className="h-3 w-3" /> OK to share
                      </span>
                    )}
                    {f.responded ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 font-medium text-green-700">
                        <CheckCircle2 className="h-3 w-3" /> Responded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                        <AlertCircle className="h-3 w-3" /> Action: {f.responseDue}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {!f.responded && (
                    <button
                      onClick={() => setSelected(f)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                    >
                      <Send className="h-3 w-3" />
                      Respond
                    </button>
                  )}
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                    Open case
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {selected && <RespondModal feedback={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  trend,
  change,
  color,
}: {
  label: string;
  value: string;
  icon: typeof Star;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  color: string;
}) {
  const trendColor =
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground';
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={`rounded-lg p-1.5 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
      <p className={`mt-1 text-xs ${trendColor}`}>{change}</p>
    </div>
  );
}

function RespondModal({ feedback, onClose }: { feedback: Feedback; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Response sent</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {feedback.tenant} will receive your message through their preferred channel.
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

  const placeholder =
    feedback.overall >= 4
      ? `Thank ${feedback.tenant.split(' ')[0]} for taking the time to leave such positive feedback…`
      : `Acknowledge what went wrong for ${feedback.tenant.split(' ')[0]} and what you're going to do about it…`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Respond to feedback</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {feedback.tenant} · {feedback.ref} · {feedback.completedDate}
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

        <div className="space-y-4 overflow-y-auto p-5">
          {feedback.comment && (
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-amber-800">
                Tenant said
              </p>
              <blockquote className="mt-1 text-sm italic text-amber-900">
                &ldquo;{feedback.comment}&rdquo;
              </blockquote>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Your response
            </label>
            <textarea
              required
              rows={6}
              placeholder={placeholder}
              className="w-full rounded-lg border border-input bg-background p-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Send via
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['App', 'Email', 'SMS', 'Phone call'].map((c, i) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border p-2 text-xs font-medium has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
                >
                  <input type="radio" name="channel" required defaultChecked={i === 0} className="h-3 w-3" />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {feedback.overall <= 2 && (
            <label className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50/50 p-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <div>
                <p className="text-sm font-medium text-rose-900">Open a complaint case</p>
                <p className="text-[11px] text-rose-800/90">
                  Recommended for ratings of 2 or below.
                </p>
              </div>
            </label>
          )}
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
            Send response
          </button>
        </div>
      </form>
    </div>
  );
}
