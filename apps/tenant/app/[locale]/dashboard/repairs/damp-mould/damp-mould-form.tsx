'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AlertTriangle, CalendarCheck, Camera, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';
import { DURATIONS, ROOMS, SEVERITIES, type DampReportField } from '../../../../../lib/damp-mould/schema';
import { submitDampReport, type DampReportState } from './actions';

const REPAIRS_PHONE = '01633 620111';

const FIELD_ORDER: DampReportField[] = [
  'rooms',
  'severity',
  'duration',
  'hasVulnerableOccupant',
  'description',
];

// The first input of each field, so error-summary links move focus to the right place.
const FIELD_ANCHOR: Record<DampReportField, string> = {
  rooms: 'rooms-bedroom',
  severity: 'severity-low',
  duration: 'duration-underMonth',
  hasVulnerableOccupant: 'vulnerable-yes',
  description: 'description',
};

const fieldsetClass = 'space-y-3';
const legendClass = 'text-lg font-bold text-foreground';
const hintClass = 'text-sm text-muted-foreground';
const errorTextClass = 'flex items-center gap-1.5 text-sm font-bold text-destructive';
const optionClass =
  'flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border-2 border-border bg-card p-3 transition-colors hover:border-primary-400 has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy-900';
const radioClass = 'mt-0.5 h-5 w-5 shrink-0 accent-primary-600';

export default function DampMouldForm() {
  const t = useTranslations('dampMould');
  const [state, formAction, pending] = useActionState<DampReportState, FormData>(
    submitDampReport,
    { status: 'idle' },
  );

  // Controlled values so answers survive a validation round-trip.
  const [rooms, setRooms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [vulnerable, setVulnerable] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const errors = state.status === 'invalid' ? state.errors : {};

  useEffect(() => {
    if (state.status === 'invalid' || state.status === 'failed') summaryRef.current?.focus();
    if (state.status === 'submitted') window.scrollTo({ top: 0 });
  }, [state]);

  useEffect(() => () => void (photo && URL.revokeObjectURL(photo)), [photo]);

  if (state.status === 'submitted') return <Confirmation state={state} />;

  const errorId = (field: DampReportField) => (errors[field] ? `${field}-error` : undefined);
  const errorText = (field: DampReportField) =>
    errors[field] ? (
      <p id={`${field}-error`} className={errorTextClass}>
        <span className="sr-only">{t('errorPrefix')}</span>
        {t(`errors.${errors[field]}`)}
      </p>
    ) : null;
  const groupClass = (field: DampReportField) =>
    `${fieldsetClass} ${errors[field] ? 'border-l-4 border-destructive pl-4' : ''}`;

  return (
    <form
      // Submit via onSubmit rather than `action` so React doesn't reset the form,
      // which would clear answers the tenant has already given on a validation error.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      noValidate
      className="space-y-8"
      aria-describedby="form-hint"
    >
      <p id="form-hint" className="sr-only">
        {t('intro')}
      </p>

      {state.status === 'invalid' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="rounded-xl border-4 border-destructive bg-card p-5"
        >
          <h2 id="error-summary-title" className="text-lg font-bold text-foreground">
            {t('errorSummary')}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {FIELD_ORDER.filter((f) => errors[f]).map((f) => (
              <li key={f}>
                <a
                  href={`#${FIELD_ANCHOR[f]}`}
                  className="font-semibold text-destructive underline underline-offset-2"
                >
                  {t(`errors.${errors[f]}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.status === 'failed' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border-4 border-destructive bg-card p-5"
        >
          <p className="font-bold">{t('failed')}</p>
          <p className="mt-1 text-sm">
            {t('failedCall')}{' '}
            <a href="tel:01633620111" className="font-bold underline">
              {REPAIRS_PHONE}
            </a>
          </p>
        </div>
      )}

      {/* Rooms */}
      <fieldset className={groupClass('rooms')} aria-describedby={['rooms-hint', errorId('rooms')].filter(Boolean).join(' ')}>
        <legend className={legendClass}>{t('rooms.legend')}</legend>
        <p id="rooms-hint" className={hintClass}>
          {t('rooms.hint')}
        </p>
        {errorText('rooms')}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ROOMS.map((room) => (
            <label key={room} className={`${optionClass} items-center`}>
              <input
                id={`rooms-${room}`}
                type="checkbox"
                name="rooms"
                value={room}
                checked={rooms.includes(room)}
                onChange={(e) =>
                  setRooms((r) => (e.target.checked ? [...r, room] : r.filter((x) => x !== room)))
                }
                className={radioClass}
              />
              <span className="font-semibold">{t(`rooms.${room}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Severity */}
      <fieldset className={groupClass('severity')} aria-describedby={errorId('severity')}>
        <legend className={legendClass}>{t('severity.legend')}</legend>
        {errorText('severity')}
        <div className="space-y-2">
          {SEVERITIES.map((level) => (
            <label key={level} className={optionClass}>
              <input
                id={`severity-${level}`}
                type="radio"
                name="severity"
                value={level}
                checked={severity === level}
                onChange={() => setSeverity(level)}
                className={radioClass}
              />
              <span>
                <span className="block font-semibold">{t(`severity.${level}`)}</span>
                <span className="block text-sm text-muted-foreground">
                  {t(`severity.${level}Hint`)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Duration */}
      <fieldset className={groupClass('duration')} aria-describedby={errorId('duration')}>
        <legend className={legendClass}>{t('duration.legend')}</legend>
        {errorText('duration')}
        <div className="grid gap-2 sm:grid-cols-3">
          {DURATIONS.map((d) => (
            <label key={d} className={`${optionClass} items-center`}>
              <input
                id={`duration-${d}`}
                type="radio"
                name="duration"
                value={d}
                checked={duration === d}
                onChange={() => setDuration(d)}
                className={radioClass}
              />
              <span className="font-semibold">{t(`duration.${d}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Vulnerable occupants */}
      <fieldset
        className={groupClass('hasVulnerableOccupant')}
        aria-describedby={['vulnerable-hint', errorId('hasVulnerableOccupant')].filter(Boolean).join(' ')}
      >
        <legend className={legendClass}>{t('vulnerable.legend')}</legend>
        <p id="vulnerable-hint" className={hintClass}>
          {t('vulnerable.hint')}
        </p>
        {errorText('hasVulnerableOccupant')}
        <div className="flex gap-2">
          {(['yes', 'no'] as const).map((v) => (
            <label key={v} className={`${optionClass} min-w-28 items-center`}>
              <input
                id={`vulnerable-${v}`}
                type="radio"
                name="hasVulnerableOccupant"
                value={v}
                checked={vulnerable === v}
                onChange={() => setVulnerable(v)}
                className={radioClass}
              />
              <span className="font-semibold">{t(`vulnerable.${v}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Description */}
      <div className={groupClass('description')}>
        <label htmlFor="description" className={`${legendClass} block`}>
          {t('description.label')}
        </label>
        <p id="description-hint" className={hintClass}>
          {t('description.hint')}
        </p>
        {errorText('description')}
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={['description-hint', errorId('description')].filter(Boolean).join(' ')}
          className={`w-full rounded-xl border-2 bg-card p-3 text-base ${errors.description ? 'border-destructive' : 'border-input'}`}
        />
      </div>

      {/* Photo — previewed locally only in this prototype */}
      <div className={fieldsetClass}>
        <label htmlFor="photo" className={`${legendClass} block`}>
          {t('photo.label')}{' '}
          <span className="text-base font-normal text-muted-foreground">({t('optional')})</span>
        </label>
        <p className={hintClass}>{t('photo.hint')}</p>
        <label
          htmlFor="photo"
          className="flex min-h-12 w-fit cursor-pointer items-center gap-2 rounded-xl border-2 border-secondary-600 px-4 py-2 font-semibold text-secondary-700 hover:bg-secondary-50"
        >
          <Camera className="h-5 w-5" aria-hidden="true" />
          {t('photo.button')}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPhoto(file ? URL.createObjectURL(file) : null);
          }}
        />
        {photo && (
          <img src={photo} alt={t('photo.previewAlt')} className="max-h-48 rounded-xl border border-border" />
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-70 sm:w-auto"
      >
        {pending && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {pending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}

function Confirmation({ state }: { state: Extract<DampReportState, { status: 'submitted' }> }) {
  const t = useTranslations('dampMould');
  const locale = useLocale();
  const { reference, hazardLevel, inspectionDueAt } = state.result;
  const due = new Date(inspectionDueAt);

  return (
    <div className="space-y-6" data-testid="damp-confirmation">
      <div className="rounded-2xl bg-primary-700 p-6 text-center text-white">
        <CheckCircle2 className="mx-auto h-12 w-12" aria-hidden="true" />
        <h2 className="mt-3 text-2xl font-extrabold">{t('done.title')}</h2>
        <p className="mt-2">{t('done.reference')}</p>
        <p className="mt-1 font-mono text-3xl font-bold tracking-wide" data-testid="damp-reference">
          {reference}
        </p>
      </div>

      {hazardLevel === 'emergency' && (
        <div
          role="alert"
          data-testid="damp-emergency"
          className="flex gap-3 rounded-2xl border-4 border-destructive bg-card p-5"
        >
          <AlertTriangle className="h-7 w-7 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="text-lg font-bold">{t('done.emergencyTitle')}</p>
            <p className="mt-1">{t('done.emergencyBody')}</p>
            <a
              href="tel:01633620111"
              className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl bg-destructive px-5 py-2 font-bold text-white"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              {t('done.callNow', { phone: REPAIRS_PHONE })}
            </a>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
        <div className="flex items-start gap-3">
          <CalendarCheck className="h-7 w-7 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold">{t(`done.level.${hazardLevel}`)}</h3>
            <p className="mt-1" data-testid="damp-due">
              {t('done.inspectBy', {
                date: new Intl.DateTimeFormat(locale === 'cy' ? 'cy-GB' : 'en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  timeZone: 'Europe/London',
                  ...(hazardLevel === 'emergency' ? { hour: 'numeric', minute: '2-digit' } : {}),
                }).format(due),
              })}
            </p>
          </div>
        </div>

        <h3 className="mt-6 font-bold">{t('done.nextTitle')}</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>{t('done.next1')}</li>
          <li>{t('done.next2')}</li>
          <li>{t('done.next3')}</li>
        </ol>
      </div>

      <div className="rounded-2xl bg-secondary-50 p-6">
        <h3 className="font-bold">{t('done.tipsTitle')}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>{t('done.tip1')}</li>
          <li>{t('done.tip2')}</li>
          <li>{t('done.tip3')}</li>
        </ul>
      </div>

      <Link
        href="/dashboard"
        className="inline-flex min-h-12 items-center rounded-xl border-2 border-navy-900 px-5 py-2 font-bold hover:bg-card"
      >
        {t('done.home')}
      </Link>
    </div>
  );
}
