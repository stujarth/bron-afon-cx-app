'use client';

import { useState } from 'react';
import {
  MessageSquareWarning,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Star,
  Send,
  ChevronRight,
  Paperclip,
  FileText,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

type View = 'overview' | 'new' | 'feedback';

export default function ComplaintsPage() {
  const [view, setView] = useState<View>('overview');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {view !== 'overview' && (
            <button
              onClick={() => setView('overview')}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Back"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-foreground">
            {view === 'overview' && 'Complaints & feedback'}
            {view === 'new' && 'Make a complaint'}
            {view === 'feedback' && 'Share your feedback'}
          </h1>
        </div>
      </div>

      {view === 'overview' && <Overview onChange={setView} />}
      {view === 'new' && <NewComplaintForm />}
      {view === 'feedback' && <FeedbackForm />}
    </div>
  );
}

function Overview({ onChange }: { onChange: (v: View) => void }) {
  const myComplaints = [
    {
      id: 'CMP-2026-0341',
      subject: 'Damp in spare bedroom — repeated visits',
      stage: 'Stage 1 — Investigation',
      step: 2,
      total: 4,
      sla: 'Response due 27 May 2026',
      severity: 'medium' as const,
    },
  ];

  const feedbackPrompts = [
    {
      id: 'fb-1',
      title: 'How was your recent kitchen tap repair?',
      ref: 'REP-2026-0412',
      when: 'Completed 12 May 2026',
    },
  ];

  return (
    <>
      <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
        <p className="text-sm font-medium text-primary-900">
          We want to put things right when they go wrong
        </p>
        <p className="mt-1 text-xs text-primary-800/80 leading-relaxed">
          Complaints are an important way for us to improve. We will acknowledge any complaint
          within 5 working days and aim to resolve it within 20 working days.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => onChange('new')}
          className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
        >
          <div className="rounded-xl bg-rose-100 p-2.5 text-rose-700">
            <MessageSquareWarning className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
              Make a complaint
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Start a formal complaint about a service or experience.
            </p>
          </div>
        </button>

        <button
          onClick={() => onChange('feedback')}
          className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
        >
          <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700">
            <Star className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
              Share feedback
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Tell us what went well or how we could do better.
            </p>
          </div>
        </button>
      </div>

      {feedbackPrompts.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-foreground">We would love your feedback</h2>
          <ul className="space-y-2" role="list">
            {feedbackPrompts.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/40 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.ref} · {p.when}
                  </p>
                </div>
                <button
                  onClick={() => onChange('feedback')}
                  className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
                >
                  Rate
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">My complaints</h2>
        {myComplaints.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            You have no open complaints
          </p>
        ) : (
          <ul className="space-y-3" role="list">
            {myComplaints.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.id} · {c.stage}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                    <Clock className="h-3 w-3" /> In progress
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: c.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < c.step ? 'bg-primary-500' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{c.sla}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                    View timeline
                  </button>
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50">
                    Add information
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Prefer not to use the app?</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            You can also complain by phone, post or in person. We will record it on your account.
          </p>
        </div>
        <ul className="divide-y divide-border" role="list">
          <li className="flex items-center gap-3 p-4">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">Phone</p>
              <p className="text-xs text-muted-foreground">0800 123 4567 · Mon–Fri 8am–6pm</p>
            </div>
          </li>
          <li className="flex items-center gap-3 p-4">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">Email</p>
              <p className="text-xs text-muted-foreground">complaints@bronafon.org.uk</p>
            </div>
          </li>
          <li className="flex items-center gap-3 p-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">In person or post</p>
              <p className="text-xs text-muted-foreground">
                Tŷ Bron Afon, William Brown Close, Cwmbran, NP44 3AB
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-muted/40 p-5">
        <h3 className="text-sm font-semibold text-foreground">
          If we cannot resolve your complaint
        </h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          If you are unhappy with the outcome after Stage 2, you can ask the{' '}
          <span className="font-medium">Public Services Ombudsman for Wales</span> to look
          at your complaint. We will explain how when we send our final response.
        </p>
      </section>
    </>
  );
}

function NewComplaintForm() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-green-900">Complaint submitted</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-green-800/90">
          We have logged your complaint. You will receive an acknowledgement within 5
          working days from your assigned investigator.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-900">
          Reference: <span className="font-mono">CMP-2026-0357</span>
        </div>
        <Link
          href="/dashboard/complaints"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Back to complaints
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          What is your complaint about? <span className="text-red-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            'Repairs',
            'Rent or charges',
            'Staff conduct',
            'Communal areas',
            'Estate / neighbourhood',
            'Communication',
            'Tenancy management',
            'Adaptations',
            'Other',
          ].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                topic === t
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-border bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Summary of your complaint" required>
        <input
          type="text"
          required
          maxLength={120}
          placeholder="A short title, e.g. ‘Repeated visits about damp not fixing it’"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <FormField label="Tell us what happened" required>
        <textarea
          required
          rows={6}
          placeholder="Please describe what happened, when it happened, and who was involved."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm"
        />
      </FormField>

      <FormField label="What would you like to happen?" required>
        <textarea
          required
          rows={3}
          placeholder="What does ‘put right’ look like for you?"
          className="w-full rounded-lg border border-input bg-background p-3 text-sm"
        />
      </FormField>

      <FormField label="Evidence (optional)">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground hover:bg-muted"
        >
          <Paperclip className="h-4 w-4" />
          Attach photos, videos or documents
        </button>
      </FormField>

      <FormField label="How would you like us to contact you?" required>
        <div className="grid grid-cols-3 gap-2">
          {['Phone', 'Email', 'Letter'].map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border p-3 text-sm font-medium has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
            >
              <input type="radio" name="contactMethod" required className="h-3.5 w-3.5" />
              {c}
            </label>
          ))}
        </div>
      </FormField>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium text-card-foreground">Do you need any support?</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          We can offer help if you find this process difficult — interpreters, large print,
          help from an advocate.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Easy read', 'Welsh', 'Interpreter', 'Advocate'].map((tag) => (
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

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        <Send className="h-4 w-4" />
        Submit complaint
      </button>
    </form>
  );
}

function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [stars, setStars] = useState<{ work: number; comms: number; staff: number }>({
    work: 0,
    comms: 0,
    staff: 0,
  });

  if (submitted) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white">
          <Star className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-amber-900">Thanks for your feedback</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-amber-800/90">
          We will share your comments with the team and use them to improve our service.
          You earned <span className="font-semibold">20 points</span> for completing this.
        </p>
        <Link
          href="/dashboard/complaints"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Done
        </Link>
      </div>
    );
  }

  const ratings = [
    { id: 'work' as const, label: 'Quality of the work' },
    { id: 'comms' as const, label: 'Communication you received' },
    { id: 'staff' as const, label: 'How staff treated you' },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">
              About: Kitchen tap repair (REP-2026-0412)
            </p>
            <p className="text-xs text-muted-foreground">Completed 12 May 2026 by Dai Evans</p>
          </div>
        </div>
      </section>

      {ratings.map((r) => (
        <div key={r.id} className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium text-card-foreground">{r.label}</p>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStars({ ...stars, [r.id]: s })}
                aria-label={`${s} star${s > 1 ? 's' : ''}`}
                className="rounded-lg p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-7 w-7 ${
                    stars[r.id] >= s ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ))}

      <FormField label="Anything else you would like to tell us? (optional)">
        <textarea
          rows={4}
          placeholder="Your comments help us improve. They are read by the team."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm"
        />
      </FormField>

      <label className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 cursor-pointer">
        <input type="checkbox" className="mt-1 h-4 w-4" />
        <span className="text-sm text-card-foreground">
          I am happy for Bron Afon to share my comments anonymously to celebrate good work
          or improve services.
        </span>
      </label>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Submit feedback
      </button>
    </form>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}
