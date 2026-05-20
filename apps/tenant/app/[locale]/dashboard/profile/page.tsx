'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Wrench,
  PoundSterling,
  Shield,
  Info,
  CheckCircle2,
  Check,
  X,
} from 'lucide-react';
import { Link, usePathname } from '../../../../i18n/navigation';

function Toggle({ enabled, onChange, disabled, ariaLabel }: { enabled: boolean; onChange: () => void; disabled?: boolean; ariaLabel?: string }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${enabled ? 'bg-primary-600' : 'bg-muted'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

const INITIAL_DETAILS = {
  name: 'Siân Williams',
  email: 'sian.williams@example.com',
  phone: '07700 900123',
  address: '14 Heol y Castell, Cwmbran, NP44 1AB',
};

type DetailKey = keyof typeof INITIAL_DETAILS;

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const tRewards = useTranslations('rewards');
  const locale = useLocale();
  const pathname = usePathname();

  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [editing, setEditing] = useState<DetailKey | null>(null);
  const [draft, setDraft] = useState('');

  function startEdit(key: DetailKey) {
    setEditing(key);
    setDraft(details[key]);
  }

  function saveEdit() {
    if (!editing) return;
    setDetails((d) => ({ ...d, [editing]: draft }));
    setEditing(null);
  }

  function cancelEdit() {
    setEditing(null);
  }

  const [prefs, setPrefs] = useState({
    emailRepairs: true,
    smsRepairs: true,
    pushRepairs: true,
    emailRent: true,
    smsRent: false,
    pushRent: true,
    emailGeneral: true,
    smsGeneral: false,
    pushGeneral: false,
    emailSafety: true,
    smsSafety: true,
    pushSafety: true,
  });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const detailFields: { key: DetailKey; icon: typeof User; label: string }[] = [
    { key: 'name', icon: User, label: t('name') },
    { key: 'email', icon: Mail, label: t('email') },
    { key: 'phone', icon: Phone, label: t('phone') },
    { key: 'address', icon: MapPin, label: t('address') },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Profile header */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700 ring-2 ring-primary-50">
          SW
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">{details.name}</h2>
          <p className="text-sm text-muted-foreground">{t('tenantSince', { year: '2019' })}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
              {t('goldMember')}
            </span>
            <span className="text-xs text-muted-foreground">{tRewards('pointsLabel', { n: 450 })}</span>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('personalDetails')}</h2>
        </div>
        <div className="divide-y divide-border">
          {detailFields.map(({ key, icon: Icon, label }) => {
            const isEditing = editing === key;
            return (
              <div key={key} className="flex items-start gap-3 p-4">
                <Icon className="mt-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {isEditing ? (
                    <input
                      autoFocus
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      aria-label={`Edit ${label}`}
                    />
                  ) : (
                    <p className="text-sm text-card-foreground">{details[key]}</p>
                  )}
                </div>
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={saveEdit}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {tCommon('save')}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                      {tCommon('cancel')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(key)}
                    className="rounded-lg px-3 py-1 text-sm text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                    aria-label={`Edit ${label}`}
                  >
                    {tCommon('edit')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Communication preferences — per type with digital + postal */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('contactPreferences')}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {t('contactPreferencesDesc')}
          </p>
        </div>

        <div className="divide-y divide-border">
          {/* Header row */}
          <div className="flex items-center gap-3 px-4 py-3 bg-muted/30">
            <div className="flex-1" />
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="w-12 text-center">{t('channelEmail')}</span>
              <span className="w-12 text-center">{t('channelSms')}</span>
              <span className="w-12 text-center">{t('channelPush')}</span>
              <span className="w-12 text-center">{t('channelPost')}</span>
            </div>
          </div>

          {/* Repairs */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <Wrench className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{t('categoryRepairs')}</p>
                <p className="text-[10px] text-muted-foreground">{t('categoryRepairsDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.emailRepairs} onChange={() => togglePref('emailRepairs')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.smsRepairs} onChange={() => togglePref('smsRepairs')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushRepairs} onChange={() => togglePref('pushRepairs')} /></div>
              <div className="w-12 flex justify-center text-xs text-muted-foreground">—</div>
            </div>
          </div>

          {/* Rent */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <PoundSterling className="h-4 w-4 text-green-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{t('categoryRent')}</p>
                <p className="text-[10px] text-muted-foreground">{t('categoryRentDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.emailRent} onChange={() => togglePref('emailRent')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.smsRent} onChange={() => togglePref('smsRent')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushRent} onChange={() => togglePref('pushRent')} /></div>
              <div className="w-12 flex justify-center">
                <span
                  role="switch"
                  aria-checked="true"
                  aria-disabled="true"
                  aria-label={t('requiredByLaw')}
                  title={t('requiredByLaw')}
                  className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>

          {/* General */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <Bell className="h-4 w-4 text-purple-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{t('categoryGeneral')}</p>
                <p className="text-[10px] text-muted-foreground">{t('categoryGeneralDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.emailGeneral} onChange={() => togglePref('emailGeneral')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.smsGeneral} onChange={() => togglePref('smsGeneral')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushGeneral} onChange={() => togglePref('pushGeneral')} /></div>
              <div className="w-12 flex justify-center text-xs text-muted-foreground">—</div>
            </div>
          </div>

          {/* Safety */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <Shield className="h-4 w-4 text-red-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{t('categorySafety')}</p>
                <p className="text-[10px] text-muted-foreground">{t('categorySafetyDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center">
                <span
                  role="switch"
                  aria-checked="true"
                  aria-disabled="true"
                  aria-label={t('requiredByLaw')}
                  title={t('requiredByLaw')}
                  className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="w-12 flex justify-center">
                <span
                  role="switch"
                  aria-checked="true"
                  aria-disabled="true"
                  aria-label={t('requiredByLaw')}
                  title={t('requiredByLaw')}
                  className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushSafety} onChange={() => togglePref('pushSafety')} /></div>
              <div className="w-12 flex justify-center">
                <span
                  role="switch"
                  aria-checked="true"
                  aria-disabled="true"
                  aria-label={t('requiredByLaw')}
                  title={t('requiredByLaw')}
                  className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="flex items-start gap-2.5 border-t border-border bg-amber-50/50 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-xs text-amber-800 leading-relaxed">
            {t('legalNotice')}
          </p>
        </div>
      </section>

      {/* Language preference */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('language')}</h2>
        </div>
        <div className="flex gap-3 p-4">
          <Link
            href={pathname}
            locale="en"
            className={`flex-1 rounded-lg border-2 p-3 text-center text-sm font-medium transition-colors ${
              locale === 'en'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-border text-card-foreground hover:border-primary-300'
            }`}
            aria-current={locale === 'en' ? 'true' : undefined}
          >
            <Globe className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            English
          </Link>
          <Link
            href={pathname}
            locale="cy"
            className={`flex-1 rounded-lg border-2 p-3 text-center text-sm font-medium transition-colors ${
              locale === 'cy'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-border text-card-foreground hover:border-primary-300'
            }`}
            aria-current={locale === 'cy' ? 'true' : undefined}
          >
            <Globe className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            Cymraeg
          </Link>
        </div>
      </section>
    </div>
  );
}
