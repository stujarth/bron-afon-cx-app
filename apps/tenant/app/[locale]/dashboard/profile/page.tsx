'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  AlertTriangle,
  Info,
  Smartphone,
  Send as MailSend,
  CheckCircle2,
} from 'lucide-react';

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
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

export default function ProfilePage() {
  const t = useTranslations('profile');

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

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Profile header */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700 ring-2 ring-primary-50">
          SW
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Siân Williams</h2>
          <p className="text-sm text-muted-foreground">{t('tenantSince', { year: '2019' })}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
              Gold Member
            </span>
            <span className="text-xs text-muted-foreground">450 points</span>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('personalDetails')}</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { icon: User, label: t('name'), value: 'Siân Williams' },
            { icon: Mail, label: t('email'), value: 'sian.williams@example.com' },
            { icon: Phone, label: t('phone'), value: '07700 900123' },
            { icon: MapPin, label: t('address'), value: '14 Heol y Castell, Cwmbran, NP44 1AB' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4">
              <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm text-card-foreground">{item.value}</p>
              </div>
              <button className="rounded-lg px-3 py-1 text-sm text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700">
                Edit
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Communication preferences — per type with digital + postal */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('contactPreferences')}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose how you receive notifications for each type of communication.
          </p>
        </div>

        <div className="divide-y divide-border">
          {/* Header row */}
          <div className="flex items-center gap-3 px-4 py-3 bg-muted/30">
            <div className="flex-1" />
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="w-12 text-center">Email</span>
              <span className="w-12 text-center">SMS</span>
              <span className="w-12 text-center">Push</span>
              <span className="w-12 text-center">Post</span>
            </div>
          </div>

          {/* Repairs */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <Wrench className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Repairs</p>
                <p className="text-[10px] text-muted-foreground">Status updates & scheduling</p>
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
                <p className="text-sm font-medium text-card-foreground">Rent</p>
                <p className="text-[10px] text-muted-foreground">Payments & account updates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.emailRent} onChange={() => togglePref('emailRent')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.smsRent} onChange={() => togglePref('smsRent')} /></div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushRent} onChange={() => togglePref('pushRent')} /></div>
              <div className="w-12 flex justify-center">
                <span className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed" title="Required by law">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
            </div>
          </div>

          {/* General */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-2 flex-1">
              <Bell className="h-4 w-4 text-purple-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-card-foreground">General</p>
                <p className="text-[10px] text-muted-foreground">Community events & news</p>
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
                <p className="text-sm font-medium text-card-foreground">Safety</p>
                <p className="text-[10px] text-muted-foreground">Gas safety, fire, compliance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 flex justify-center">
                <span className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
              <div className="w-12 flex justify-center">
                <span className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
              <div className="w-12 flex justify-center"><Toggle enabled={prefs.pushSafety} onChange={() => togglePref('pushSafety')} /></div>
              <div className="w-12 flex justify-center">
                <span className="flex h-6 w-11 items-center justify-center rounded-full bg-primary-600 opacity-50 cursor-not-allowed">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="flex items-start gap-2.5 border-t border-border bg-amber-50/50 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Some communications are required by law to be sent by post or email (e.g. annual rent
            reviews, gas safety certificates). These cannot be turned off and are marked with a
            locked toggle.
          </p>
        </div>
      </section>

      {/* Language preference */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('language')}</h2>
        </div>
        <div className="flex gap-3 p-4">
          <button className="flex-1 rounded-lg border-2 border-primary-500 bg-primary-50 p-3 text-center text-sm font-medium text-primary-700">
            <Globe className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            English
          </button>
          <button className="flex-1 rounded-lg border-2 border-border p-3 text-center text-sm font-medium text-card-foreground transition-colors hover:border-primary-300">
            <Globe className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            Cymraeg
          </button>
        </div>
      </section>
    </div>
  );
}
