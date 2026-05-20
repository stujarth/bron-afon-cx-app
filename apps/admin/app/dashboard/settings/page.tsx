'use client';

import { useState } from 'react';
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  Plug,
  Database,
  Clock,
  Palette,
  Globe,
  Save,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

type Section = 'organisation' | 'staff' | 'sla' | 'notifications' | 'integrations' | 'security' | 'branding';

const SECTIONS: { id: Section; label: string; icon: typeof Settings }[] = [
  { id: 'organisation', label: 'Organisation', icon: Building2 },
  { id: 'staff', label: 'Staff & roles', icon: Users },
  { id: 'sla', label: 'SLAs & policies', icon: Clock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'branding', label: 'Branding & language', icon: Palette },
];

export default function SettingsPage() {
  const [section, setSection] = useState<Section>('organisation');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure how the platform works for Bron Afon staff and tenants.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Settings sections" className="lg:sticky lg:top-20 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {SECTIONS.map((s) => {
              const isActive = section === s.id;
              return (
                <li key={s.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setSection(s.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <s.icon className="h-4 w-4" aria-hidden="true" />
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0">
          {section === 'organisation' && <OrganisationPanel />}
          {section === 'staff' && <StaffPanel />}
          {section === 'sla' && <SLAPanel />}
          {section === 'notifications' && <NotificationsPanel />}
          {section === 'integrations' && <IntegrationsPanel />}
          {section === 'security' && <SecurityPanel />}
          {section === 'branding' && <BrandingPanel />}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="font-semibold text-card-foreground">{title}</h2>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function FormRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-border p-4 sm:grid-cols-3 sm:items-start sm:gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function OrganisationPanel() {
  return (
    <div className="space-y-6">
      <Panel
        title="Organisation"
        description="Public details shown to tenants."
      >
        <FormRow label="Trading name">
          <input
            type="text"
            defaultValue="Bron Afon Community Housing"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          />
        </FormRow>
        <FormRow label="Registered office">
          <textarea
            rows={2}
            defaultValue="Tŷ Bron Afon, William Brown Close, Cwmbran, NP44 3AB"
            className="w-full rounded-lg border border-input bg-background p-3 text-sm"
          />
        </FormRow>
        <FormRow label="Customer phone" hint="Used on out-of-hours page and emergency banners.">
          <input
            type="tel"
            defaultValue="0800 123 4567"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          />
        </FormRow>
        <FormRow label="Complaints inbox">
          <input
            type="email"
            defaultValue="complaints@bronafon.org.uk"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          />
        </FormRow>
        <div className="flex justify-end p-4">
          <SaveButton />
        </div>
      </Panel>

      <Panel title="Office hours" description="Used to set the staffed window for live chat and inbound calls.">
        <FormRow label="Weekday hours">
          <div className="flex items-center gap-2">
            <input type="time" defaultValue="08:00" className="h-10 rounded-lg border border-input bg-background px-2 text-sm" />
            <span className="text-sm text-muted-foreground">to</span>
            <input type="time" defaultValue="18:00" className="h-10 rounded-lg border border-input bg-background px-2 text-sm" />
          </div>
        </FormRow>
        <FormRow label="Weekend cover" hint="Emergency-only out of hours.">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="h-4 w-4" />
            Emergency line is 24/7
          </label>
        </FormRow>
        <div className="flex justify-end p-4">
          <SaveButton />
        </div>
      </Panel>
    </div>
  );
}

function StaffPanel() {
  const staff = [
    { name: 'Rhian Thomas', role: 'Income Officer', email: 'rhian.thomas@bronafon.org.uk', team: 'Rents' },
    { name: 'Gareth Bowen', role: 'Neighbourhood Officer', email: 'gareth.bowen@bronafon.org.uk', team: 'Tenancy' },
    { name: 'Sara Watkins', role: 'Repairs Coordinator', email: 'sara.watkins@bronafon.org.uk', team: 'Repairs' },
    { name: 'Megan Pugh', role: 'Allocations Officer', email: 'megan.pugh@bronafon.org.uk', team: 'Lettings' },
    { name: 'Safeguarding Lead', role: 'Safeguarding Lead', email: 'safeguarding@bronafon.org.uk', team: 'Tenancy' },
  ];

  const roles = ['Administrator', 'Income Officer', 'Repairs Coordinator', 'Neighbourhood Officer', 'Safeguarding Lead', 'Read-only'];

  return (
    <div className="space-y-6">
      <Panel title="Staff" description="Add staff members and control what they can see.">
        <div className="flex items-center justify-between border-b border-border p-4">
          <p className="text-sm text-muted-foreground">{staff.length} active</p>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
            <Plus className="h-3 w-3" />
            Invite staff member
          </button>
        </div>
        <ul className="divide-y divide-border" role="list">
          {staff.map((s) => (
            <li key={s.email} className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                {s.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-card-foreground">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.email}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-card-foreground">{s.role}</p>
                <p className="text-[11px] text-muted-foreground">{s.team}</p>
              </div>
              <button
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                aria-label={`Edit ${s.name}`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Roles" description="Permission groups available when inviting staff.">
        <ul className="divide-y divide-border" role="list">
          {roles.map((r) => (
            <li key={r} className="flex items-center justify-between p-4">
              <p className="text-sm font-medium text-card-foreground">{r}</p>
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                Edit permissions
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function SLAPanel() {
  const slas = [
    { name: 'Complaint acknowledgement', value: 5, unit: 'working days' },
    { name: 'Complaint resolution (Stage 1)', value: 20, unit: 'working days' },
    { name: 'Complaint resolution (Stage 2)', value: 20, unit: 'working days' },
    { name: 'ASB initial response', value: 5, unit: 'working days' },
    { name: 'Safeguarding triage', value: 1, unit: 'working day' },
    { name: 'Rent query response', value: 5, unit: 'working days' },
    { name: 'Service charge query response', value: 10, unit: 'working days' },
    { name: 'Adaptation acknowledgement', value: 5, unit: 'working days' },
    { name: 'Mutual exchange decision', value: 42, unit: 'days' },
  ];

  return (
    <Panel title="Service-level agreements" description="Targets shown to tenants and tracked on casework.">
      <ul className="divide-y divide-border" role="list">
        {slas.map((sla) => (
          <li key={sla.name} className="flex items-center gap-3 p-4">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="flex-1 text-sm text-card-foreground">{sla.name}</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={sla.value}
                className="h-9 w-16 rounded-lg border border-input bg-background px-2 text-right text-sm"
              />
              <span className="w-28 text-xs text-muted-foreground">{sla.unit}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end p-4">
        <SaveButton />
      </div>
    </Panel>
  );
}

function NotificationsPanel() {
  const channels = [
    { name: 'Email', icon: Mail, status: 'Connected', provider: 'Microsoft 365' },
    { name: 'SMS', icon: Smartphone, status: 'Connected', provider: 'Twilio' },
    { name: 'Push (in-app)', icon: Bell, status: 'Connected', provider: 'Web Push' },
    { name: 'Letter (post)', icon: Mail, status: 'Connected', provider: 'Docmail' },
    { name: 'Voice (IVR)', icon: Phone, status: 'Not connected', provider: '—' },
  ];

  const templates = [
    'Repair reported acknowledgement',
    'Repair appointment booked',
    'Repair appointment reminder (24h)',
    'Gas safety check due',
    'Rent statement available',
    'Arrears support outreach',
    'Mutual exchange decision',
    'Complaint stage 1 response',
    'Planned works programme notification',
  ];

  return (
    <div className="space-y-6">
      <Panel title="Channels" description="Where notifications are sent from.">
        <ul className="divide-y divide-border" role="list">
          {channels.map((c) => (
            <li key={c.name} className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <c.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.provider}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  c.status === 'Connected'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {c.status}
              </span>
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                Configure
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Templates" description="Standard messages reused across journeys.">
        <ul className="divide-y divide-border" role="list">
          {templates.map((t) => (
            <li key={t} className="flex items-center justify-between p-4">
              <p className="text-sm text-card-foreground">{t}</p>
              <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                <Pencil className="mr-1 inline h-3 w-3" />
                Edit
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function IntegrationsPanel() {
  const integrations = [
    { name: 'Microsoft Dynamics 365', status: 'Connected', summary: 'Two-way sync of tenants, repairs and cases.', icon: Database },
    { name: 'Microsoft 365 (Entra ID)', status: 'Connected', summary: 'SSO for staff and tenant sign-in.', icon: Shield },
    { name: 'GOV.UK Pay', status: 'Connected', summary: 'Online rent and recharge payments.', icon: Plug },
    { name: 'Capita Academy', status: 'Connected', summary: 'Rent account ledger.', icon: Database },
    { name: 'Docmail (post)', status: 'Connected', summary: 'Legal letters and tenants who choose post.', icon: Mail },
    { name: 'HomeSwapper', status: 'Connected', summary: 'Mutual exchange browsing and matches.', icon: Plug },
    { name: 'Twilio (SMS)', status: 'Connected', summary: 'SMS notifications and reminders.', icon: Smartphone },
  ];

  return (
    <Panel title="Integrations" description="Where Hafan connects to the rest of your stack.">
      <ul className="divide-y divide-border" role="list">
        {integrations.map((i) => (
          <li key={i.name} className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <i.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.summary}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              {i.status}
            </span>
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              Manage
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function SecurityPanel() {
  return (
    <div className="space-y-6">
      <Panel title="Security policy">
        <FormRow label="Two-factor authentication" hint="Required for all staff signing in.">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="h-4 w-4" />
            Require 2FA
          </label>
        </FormRow>
        <FormRow label="Session timeout" hint="Staff are signed out after this period of inactivity.">
          <select defaultValue="2h" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
            <option value="30m">30 minutes</option>
            <option value="1h">1 hour</option>
            <option value="2h">2 hours</option>
            <option value="4h">4 hours</option>
          </select>
        </FormRow>
        <FormRow label="Password policy" hint="Minimum requirements for staff passwords.">
          <p className="text-sm text-muted-foreground">12 characters · upper, lower, number, symbol</p>
        </FormRow>
        <div className="flex justify-end p-4">
          <SaveButton />
        </div>
      </Panel>

      <Panel title="Audit log" description="All admin actions are recorded for compliance.">
        <ul className="divide-y divide-border" role="list">
          {[
            { actor: 'Rhian Thomas', action: 'Logged complaint on behalf of tenant', when: 'Today 09:15' },
            { actor: 'Gareth Bowen', action: 'Assigned ASB case ASB-2026-1142', when: 'Today 08:42' },
            { actor: 'Admin User', action: 'Updated SLA configuration', when: 'Yesterday 16:30' },
            { actor: 'Sara Watkins', action: 'Published planned works programme', when: 'Yesterday 11:05' },
          ].map((row, i) => (
            <li key={i} className="flex items-center gap-3 p-4">
              <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{row.action}</p>
                <p className="text-xs text-muted-foreground">by {row.actor}</p>
              </div>
              <span className="text-xs text-muted-foreground">{row.when}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-border p-3 text-center">
          <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
            View full audit log →
          </button>
        </div>
      </Panel>
    </div>
  );
}

function BrandingPanel() {
  return (
    <div className="space-y-6">
      <Panel title="Brand">
        <FormRow label="Display name" hint="Shown in app headers and emails.">
          <input
            type="text"
            defaultValue="Bron Afon"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          />
        </FormRow>
        <FormRow label="Primary colour">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-lg bg-primary-600" aria-hidden="true" />
            <input
              type="text"
              defaultValue="#0EA5E9"
              className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm font-mono"
            />
          </div>
        </FormRow>
        <FormRow label="Logo" hint="SVG preferred. PNG accepted.">
          <button className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground hover:bg-muted">
            Upload new logo
          </button>
        </FormRow>
        <div className="flex justify-end p-4">
          <SaveButton />
        </div>
      </Panel>

      <Panel title="Languages" description="Languages available to tenants in the app.">
        <ul className="divide-y divide-border" role="list">
          {[
            { name: 'English', enabled: true, default: true },
            { name: 'Cymraeg (Welsh)', enabled: true, default: false },
            { name: 'Polski (Polish)', enabled: false, default: false },
            { name: 'Português (Portuguese)', enabled: false, default: false },
          ].map((lang) => (
            <li key={lang.name} className="flex items-center gap-3 p-4">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{lang.name}</p>
                {lang.default && (
                  <p className="text-[11px] text-muted-foreground">Default language</p>
                )}
              </div>
              <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
                <input type="checkbox" defaultChecked={lang.enabled} className="peer sr-only" />
                <span className="absolute inset-0 rounded-full bg-muted peer-checked:bg-primary-600 transition-colors" />
                <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
              </label>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
      className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
    >
      {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
      {saved ? 'Saved' : 'Save changes'}
    </button>
  );
}
