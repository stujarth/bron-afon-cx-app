'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';
import DiagnosticTool from './diagnostic-tool';

const CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Heating',
  'Windows & Doors',
  'Damp & Mould',
  'Roof & Gutters',
  'Kitchen',
  'Bathroom',
  'Garden & External',
  'Other',
] as const;

const PRIORITIES = [
  { value: 'routine', label: 'Routine', desc: 'Can wait a few days' },
  { value: 'urgent', label: 'Urgent', desc: 'Needs attention soon' },
  { value: 'emergency', label: 'Emergency', desc: 'Immediate risk to safety' },
] as const;

function makeReference() {
  const n = 400 + Math.floor(Math.random() * 400);
  return `REP-2026-0${n}`;
}

export default function NewRepairPage() {
  const t = useTranslations('repairs.form');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<string>('routine');
  const [submitted, setSubmitted] = useState<{ reference: string; category: string } | null>(null);

  const canSubmit = category && title.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted({ reference: makeReference(), category });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link
          href="/dashboard/repairs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to repairs
        </Link>

        <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-7 w-7 text-green-700" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-foreground">Repair request submitted</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks — we have logged your {submitted.category.toLowerCase()} repair. You will get a
            text or email with appointment options within one working day.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-mono font-semibold text-foreground shadow-sm">
            {submitted.reference}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/repairs/repair-new"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Track this repair
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/repairs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to repairs
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
      </div>

      {/* AI Diagnostic Tool */}
      <DiagnosticTool />

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-sm text-muted-foreground">
            or fill in the form below
          </span>
        </div>
      </div>

      {/* Sticky category chip — visible once chosen */}
      {category && (
        <div className="sticky top-16 z-20 -mx-4 flex items-center gap-2 border-y border-primary-200 bg-primary-50/95 px-4 py-2 backdrop-blur-sm lg:mx-0 lg:rounded-lg lg:border">
          <span className="text-xs font-medium text-primary-800">Category:</span>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary-700">
            {category}
          </span>
          <button
            type="button"
            onClick={() => setCategory('')}
            className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-primary-700 hover:bg-primary-100"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            change
          </button>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Category */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">{t('category')}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="sr-only"
                />
                {cat}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
            {t('title')}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Leaking tap in kitchen"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
            {t('description')}
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe the issue in detail..."
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Priority */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">{t('priority')}</legend>
          <div className="space-y-2">
            {PRIORITIES.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50"
              >
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={priority === option.value}
                  onChange={() => setPriority(option.value)}
                  className="h-4 w-4 text-primary-600"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('submitRepair')}
        </button>
        {!canSubmit && (
          <p className="text-center text-xs text-muted-foreground">
            Choose a category and enter a short title to submit.
          </p>
        )}
      </form>
    </div>
  );
}
