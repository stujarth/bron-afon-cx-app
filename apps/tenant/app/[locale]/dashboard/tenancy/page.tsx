'use client';

import { useState } from 'react';
import {
  ShieldAlert,
  ArrowLeftRight,
  DoorOpen,
  ClipboardCheck,
  FileSignature,
  FileText,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Volume2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  Home,
  Users,
  Paperclip,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

type Section =
  | 'menu'
  | 'asb'
  | 'safeguarding'
  | 'exchange'
  | 'ending'
  | 'starting'
  | 'contracts';

export default function TenancyPage() {
  const [section, setSection] = useState<Section>('menu');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-2">
        {section !== 'menu' && (
          <button
            onClick={() => setSection('menu')}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Back to tenancy"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {section === 'menu' && 'Tenancy'}
            {section === 'asb' && 'Report anti-social behaviour'}
            {section === 'safeguarding' && 'Raise a safeguarding concern'}
            {section === 'exchange' && 'Mutual exchange'}
            {section === 'ending' && 'Ending my tenancy'}
            {section === 'starting' && 'Starting your tenancy'}
            {section === 'contracts' && 'My contracts'}
          </h1>
        </div>
      </div>

      {section === 'menu' && <Menu onChange={setSection} />}
      {section === 'asb' && <ASBForm />}
      {section === 'safeguarding' && <SafeguardingForm />}
      {section === 'exchange' && <MutualExchange />}
      {section === 'ending' && <EndTenancy />}
      {section === 'starting' && <StartTenancy />}
      {section === 'contracts' && <ContractsView />}
    </div>
  );
}

function Menu({ onChange }: { onChange: (s: Section) => void }) {
  const cards = [
    {
      id: 'asb' as Section,
      icon: Volume2,
      title: 'Report anti-social behaviour',
      desc: 'Report noise, harassment, or other ASB in your area.',
      color: 'bg-rose-100 text-rose-700',
    },
    {
      id: 'safeguarding' as Section,
      icon: ShieldAlert,
      title: 'Raise a safeguarding concern',
      desc: 'Confidentially flag concerns about a vulnerable adult or child.',
      color: 'bg-amber-100 text-amber-700',
      sensitive: true,
    },
    {
      id: 'exchange' as Section,
      icon: ArrowLeftRight,
      title: 'Apply for a mutual exchange',
      desc: 'Swap your home with another social housing tenant.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'ending' as Section,
      icon: DoorOpen,
      title: 'End my tenancy',
      desc: 'Give notice to leave and see what you need to do.',
      color: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'starting' as Section,
      icon: KeyRound,
      title: 'Starting your tenancy',
      desc: 'Pre-tenancy steps, move-in checklist and welcome pack.',
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'contracts' as Section,
      icon: FileText,
      title: 'My contracts & documents',
      desc: 'Tenancy agreement, leasehold and contract documents.',
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Current tenancy
        </p>
        <p className="mt-1 text-lg font-semibold text-foreground">
          Assured tenancy · 14 Heol y Castell
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Tenant since 12 August 2019 · Siân Williams (sole tenant)
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
          >
            <div className={`rounded-xl p-2.5 ${c.color}`}>
              <c.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary-700">
                  {c.title}
                </h3>
                {c.sensitive && <Lock className="h-3 w-3 text-amber-700" aria-label="Sensitive" />}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <Link
          href="/dashboard/profile"
          className="group flex items-center gap-3"
        >
          <div className="rounded-xl bg-orange-100 p-2.5 text-orange-700">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground group-hover:text-primary-700">
              Update my personal details
            </p>
            <p className="text-sm text-muted-foreground">
              Keep your contact and household information up to date.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
}

function ASBForm() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<string | null>(null);

  if (submitted) {
    return (
      <SubmissionSuccess
        reference="ASB-2026-1142"
        title="Report received"
        message="Thank you for reporting this. Our Neighbourhood team will be in touch within 5 working days. If you feel unsafe right now, please call 101 or 999."
      />
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
          <div>
            <p className="text-sm font-semibold text-red-900">
              If you are in immediate danger, dial 999
            </p>
            <p className="mt-0.5 text-xs text-red-800/90">
              For non-emergency police matters, call 101. This form is for reporting
              behaviour to Bron Afon, not emergencies.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          What type of behaviour?
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {['Noise', 'Verbal abuse', 'Drugs', 'Vandalism', 'Threats', 'Other'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                type === t
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-border bg-card text-card-foreground hover:bg-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Where did it happen?" required>
        <input
          type="text"
          required
          placeholder="e.g. outside 14 Heol y Castell, communal stairwell"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <FormField label="When did it happen?" required>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            required
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
          />
          <input
            type="time"
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
          />
        </div>
      </FormField>

      <FormField label="What happened?" required>
        <textarea
          required
          rows={4}
          placeholder="Describe what you saw or heard. The more detail the better."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm"
        />
      </FormField>

      <FormField label="Witnesses or other people involved (optional)">
        <input
          type="text"
          placeholder="Names or descriptions, if known"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <FormField label="Evidence (optional)">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground hover:bg-muted"
        >
          <Paperclip className="h-4 w-4" />
          Attach photos, video or audio
        </button>
      </FormField>

      <div className="rounded-lg border border-border bg-card p-4">
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="mt-1 h-4 w-4" />
          <div>
            <p className="text-sm font-medium text-card-foreground">Report anonymously</p>
            <p className="text-xs text-muted-foreground">
              Our investigation may be more limited if we cannot contact you for follow up.
            </p>
          </div>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Submit report
        </button>
      </div>
    </form>
  );
}

function SafeguardingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [anonymously, setAnonymously] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        reference="SAF-2026-0098"
        title="Safeguarding concern received"
        message="Your concern has been received and will be triaged by a Safeguarding Lead within one working day. If you believe someone is in immediate danger, please dial 999."
      />
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
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              You are doing the right thing
            </p>
            <p className="mt-1 text-xs text-amber-800/90 leading-relaxed">
              Safeguarding concerns are treated confidentially. Only people who need to know
              will see them. If you suspect immediate harm, call 999.
            </p>
          </div>
        </div>
      </div>

      <FormField label="Who is the concern about?" required>
        <select
          required
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option value="">Select…</option>
          <option>A child (under 18)</option>
          <option>An adult I think is at risk</option>
          <option>Myself</option>
          <option>Someone else, prefer not to say</option>
        </select>
      </FormField>

      <FormField label="Their name and location (if known)">
        <input
          type="text"
          placeholder="Optional — only what you know"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <FormField label="What has made you concerned?" required>
        <textarea
          required
          rows={5}
          placeholder="Briefly describe what you have noticed. Include dates if you know them."
          className="w-full rounded-lg border border-input bg-background p-3 text-sm"
        />
      </FormField>

      <FormField label="Is anyone in immediate danger?" required>
        <div className="flex gap-2">
          {['No', 'Not sure', 'Yes'].map((opt) => (
            <label
              key={opt}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 text-sm font-medium has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
            >
              <input type="radio" name="danger" className="h-4 w-4" required />
              {opt}
            </label>
          ))}
        </div>
      </FormField>

      <div className="rounded-lg border border-border bg-card p-4">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={anonymously}
            onChange={(e) => setAnonymously(e.target.checked)}
          />
          <div>
            <p className="text-sm font-medium text-card-foreground">
              I want to report this anonymously
            </p>
            <p className="text-xs text-muted-foreground">
              We may not be able to give you updates if you choose this option.
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-amber-700 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-800"
      >
        Submit confidentially
      </button>
    </form>
  );
}

function MutualExchange() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
        <div className="flex flex-wrap items-start gap-3">
          <div className="rounded-xl bg-white p-2.5 shadow-sm">
            <ArrowLeftRight className="h-6 w-6 text-blue-700" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-base font-semibold text-foreground">Find a match</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Browse properties from other social tenants who want to swap.
            </p>
          </div>
          <a
            href="https://www.homeswapper.co.uk"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
          >
            Open HomeSwapper
          </a>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Application progress</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            You started an exchange application on 3 May 2026.
          </p>
        </div>
        <ol className="divide-y divide-border" role="list">
          {[
            { label: 'Application started', done: true, when: '3 May 2026' },
            { label: 'Match identified', done: true, when: '8 May 2026' },
            { label: 'Property inspections', done: false, when: 'Due 22 May 2026' },
            { label: 'Tenancy checks', done: false, when: 'Pending' },
            { label: 'Decision', done: false, when: 'Pending' },
          ].map((step) => (
            <li key={step.label} className="flex items-center gap-3 p-4">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  step.done
                    ? 'bg-green-100 text-green-700'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.done ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.when}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Potential match</h2>
        </div>
        <div className="flex gap-4 p-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-card-foreground">
              3-bed semi · Pontnewydd
            </p>
            <p className="text-xs text-muted-foreground">
              Owen Davies · Bron Afon tenant
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Garden
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Off-street parking
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Ground floor WC
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                Accept match
              </button>
              <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function EndTenancy() {
  const [step, setStep] = useState(0);

  if (step === 1) {
    return (
      <SubmissionSuccess
        reference="NTQ-2026-0042"
        title="Notice to quit submitted"
        message="Your 4 week notice has been registered. End date: Friday 12 June 2026. Your tenancy team will contact you within 3 working days to arrange the move-out inspection."
      />
    );
  }

  const steps = [
    {
      icon: Calendar,
      title: 'Give 4 weeks’ notice',
      detail: 'Notice must end on a Sunday. You can pick a date below.',
    },
    {
      icon: Home,
      title: 'Property inspection',
      detail:
        'We will visit before you leave to agree the condition. Anything you damage will need repairing or you may be recharged.',
    },
    {
      icon: KeyRound,
      title: 'Return your keys',
      detail:
        'Hand all keys, fobs and remote controls to our office by 12 noon on the end date.',
    },
    {
      icon: ClipboardCheck,
      title: 'Final account',
      detail:
        'We will calculate any rent owed or refund due, and any recharges. You will see this on your account.',
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(1);
      }}
      className="space-y-5"
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Are you sure you want to end your tenancy?
        </p>
        <p className="mt-1 text-xs text-amber-800/90 leading-relaxed">
          Once you submit notice, you will be expected to leave by the end date.
          If you are leaving because you are struggling, please{' '}
          <Link href="/dashboard/support" className="underline">
            speak to us first
          </Link>
          .
        </p>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">What happens next</h2>
        </div>
        <ol className="divide-y divide-border" role="list">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">
                  {i + 1}. {s.title}
                </p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <FormField label="Preferred end date (must be a Sunday)" required>
        <input
          type="date"
          required
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <FormField label="Why are you leaving? (optional)">
        <select className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm">
          <option value="">Prefer not to say</option>
          <option>Buying a home</option>
          <option>Moving in with family or partner</option>
          <option>Moving for work or study</option>
          <option>Property no longer suitable</option>
          <option>Other</option>
        </select>
      </FormField>

      <FormField label="Where are you moving to? (optional)">
        <input
          type="text"
          placeholder="New address or area"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />
      </FormField>

      <label className="flex items-start gap-2 rounded-lg border border-border bg-card p-4 cursor-pointer">
        <input type="checkbox" className="mt-1 h-4 w-4" required />
        <span className="text-sm text-card-foreground">
          I understand I must clear the property, return all keys by 12 noon on the end
          date, and that rent is owed up to that date.
        </span>
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Submit notice to quit
      </button>
    </form>
  );
}

function StartTenancy() {
  const tasks = [
    { label: 'Sign tenancy agreement', done: true, action: 'View signed copy' },
    { label: 'Set up rent payment method', done: true, action: 'View direct debit' },
    { label: 'Photo ID & right-to-rent check', done: true, action: 'Confirmed 4 Aug 2019' },
    { label: 'Read your welcome pack', done: false, action: 'Open welcome pack' },
    { label: 'Tell us about household members', done: false, action: 'Update household' },
    { label: 'Choose contact preferences', done: false, action: 'Open preferences' },
  ];

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <Sparkles className="h-6 w-6 text-green-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-900">
              Welcome to your Bron Afon home
            </p>
            <p className="text-xs text-green-800/80">
              Your tenancy started on 12 August 2019.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${(completed / tasks.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-green-900">
                {completed} of {tasks.length} steps done
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Move-in checklist</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Useful steps to settle into your home.
          </p>
        </div>
        <ul className="divide-y divide-border" role="list">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center gap-3 p-4">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  t.done
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-border bg-white text-muted-foreground'
                }`}
              >
                {t.done && <CheckCircle2 className="h-4 w-4" />}
              </div>
              <p
                className={`flex-1 text-sm ${
                  t.done ? 'text-muted-foreground line-through' : 'text-card-foreground font-medium'
                }`}
              >
                {t.label}
              </p>
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                {t.action}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Key people</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          <li className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
              GT
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">Gareth Thomas</p>
              <p className="text-xs text-muted-foreground">Your Neighbourhood Officer</p>
            </div>
            <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
              <Phone className="mr-1 inline h-3 w-3" />
              Contact
            </button>
          </li>
          <li className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
              RT
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">Rhian Thomas</p>
              <p className="text-xs text-muted-foreground">Your Income Officer</p>
            </div>
            <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
              <Phone className="mr-1 inline h-3 w-3" />
              Contact
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}

function ContractsView() {
  const [showAccount, setShowAccount] = useState(false);

  const docs = [
    { name: 'Tenancy agreement', updated: 'Signed 4 Aug 2019', size: '212 KB', type: 'PDF' },
    { name: 'Tenancy handbook', updated: 'v4 — Jan 2026', size: '1.4 MB', type: 'PDF' },
    { name: 'Gas safety certificate (2026)', updated: '14 Mar 2026', size: '84 KB', type: 'PDF' },
    { name: 'EICR certificate', updated: '22 Jun 2024', size: '96 KB', type: 'PDF' },
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Tenancy snapshot</h2>
        </div>
        <dl className="divide-y divide-border">
          <Row label="Tenancy type" value="Assured (Welsh Govt secure contract)" />
          <Row label="Property" value="14 Heol y Castell, Cwmbran NP44 1AB" />
          <Row label="Tenant(s)" value="Siân Williams (sole tenant)" />
          <Row label="Start date" value="12 August 2019" />
          <Row label="Rent account">
            <button
              onClick={() => setShowAccount((s) => !s)}
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
            >
              {showAccount ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" /> ACC-2104-4821
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Show
                </>
              )}
            </button>
          </Row>
          <Row label="Weekly rent" value="£98.75 (reviewed annually)" />
        </dl>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-card-foreground">Documents</h2>
          <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
            Request copy
          </button>
        </div>
        <ul className="divide-y divide-border" role="list">
          {docs.map((d) => (
            <li key={d.name} className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileSignature className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">
                  {d.updated} · {d.type} · {d.size}
                </p>
              </div>
              <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                Download
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-card-foreground">{value ?? children}</dd>
    </div>
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

function SubmissionSuccess({
  reference,
  title,
  message,
}: {
  reference: string;
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-green-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-green-800/90">{message}</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-900">
        Reference: <span className="font-mono">{reference}</span>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <Link
          href="/dashboard"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Back to home
        </Link>
        <Link
          href="/dashboard/inbox"
          className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Go to inbox
        </Link>
      </div>
    </div>
  );
}
