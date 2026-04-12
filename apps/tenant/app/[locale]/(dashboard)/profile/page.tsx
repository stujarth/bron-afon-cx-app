import { useTranslations } from 'next-intl';
import { User, Mail, Phone, MapPin, Globe, Bell } from 'lucide-react';

export default function ProfilePage() {
  const t = useTranslations('profile');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>

      {/* Profile header */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
          SW
        </div>
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Si&acirc;n Williams</h2>
          <p className="text-sm text-muted-foreground">Tenant since 2019</p>
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
            { icon: User, label: 'Name', value: 'Siân Williams' },
            { icon: Mail, label: 'Email', value: 'sian.williams@example.com' },
            { icon: Phone, label: 'Phone', value: '07700 900123' },
            { icon: MapPin, label: 'Address', value: '14 Heol y Castell, Cwmbran, NP44 1AB' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4">
              <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm text-card-foreground">{item.value}</p>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700">Edit</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact preferences */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">{t('contactPreferences')}</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { icon: Mail, label: 'Email notifications', enabled: true },
            { icon: Phone, label: 'SMS notifications', enabled: true },
            { icon: Bell, label: 'Push notifications', enabled: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <pref.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-card-foreground">{pref.label}</span>
              </div>
              <button
                role="switch"
                aria-checked={pref.enabled}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pref.enabled ? 'bg-primary-600' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pref.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
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
