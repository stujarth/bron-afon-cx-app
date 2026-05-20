'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
  Pencil,
  Save,
  PoundSterling,
  Wrench,
  ClipboardList,
  FileText,
  Accessibility,
  ShieldCheck,
  Download,
  ChevronRight,
} from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  initials: string;
  address: string;
  status: 'Active' | 'Ending' | 'Pre-tenancy';
  rent: 'In credit' | 'In arrears' | 'Up to date';
  arrearsAmount?: number;
  tenancyStart: string;
  type: string;
  email: string;
  phone: string;
  household: string;
  language: 'English' | 'Cymraeg';
  supportNeeds: string[];
  recharges: { ref: string; label: string; amount: number; status: 'Outstanding' | 'Paid' }[];
  cases: { ref: string; type: string; status: string }[];
  openRepairs: number;
  compliance: { gas: string; boiler: string; eicr: string };
}

const TENANTS: Tenant[] = [
  {
    id: 't-1',
    name: 'Siân Williams',
    initials: 'SW',
    address: '14 Heol y Castell, Cwmbran',
    status: 'Active',
    rent: 'In credit',
    tenancyStart: '12 August 2019',
    type: 'Assured tenancy',
    email: 'sian.williams@example.com',
    phone: '07700 900123',
    household: 'Single adult, no children',
    language: 'Cymraeg',
    supportNeeds: ['Welsh'],
    recharges: [
      { ref: 'RC-2026-021', label: 'Replacement front door key', amount: 18.5, status: 'Outstanding' },
    ],
    cases: [
      { ref: 'ASB-2026-1142', type: 'ASB', status: 'Investigating' },
      { ref: 'ADP-2026-0231', type: 'Adaptation', status: 'OT booked' },
    ],
    openRepairs: 2,
    compliance: { gas: 'Valid to Mar 2027', boiler: 'Due Jun 2026', eicr: 'Valid to Jun 2029' },
  },
  {
    id: 't-2',
    name: 'Dafydd Jones',
    initials: 'DJ',
    address: '23 Stryd y Bont, Pontypool',
    status: 'Active',
    rent: 'In arrears',
    arrearsAmount: 247.3,
    tenancyStart: '4 March 2021',
    type: 'Assured tenancy',
    email: 'dafydd.jones@example.com',
    phone: '07700 900456',
    household: 'Couple, 2 children',
    language: 'English',
    supportNeeds: [],
    recharges: [],
    cases: [{ ref: 'CMP-2026-0356', type: 'Complaint', status: 'Stage 1' }],
    openRepairs: 1,
    compliance: { gas: 'Valid to Jan 2027', boiler: 'Valid to Nov 2026', eicr: 'Valid to Sep 2028' },
  },
  {
    id: 't-3',
    name: 'Rhiannon Evans',
    initials: 'RE',
    address: '8 Ffordd y Parc, Cwmbran',
    status: 'Active',
    rent: 'Up to date',
    tenancyStart: '17 January 2018',
    type: 'Assured tenancy',
    email: 'rhiannon.evans@example.com',
    phone: '07700 900789',
    household: 'Single adult, 1 child',
    language: 'English',
    supportNeeds: ['Easy read'],
    recharges: [],
    cases: [{ ref: 'ADP-2026-0230', type: 'Adaptation', status: 'Awaiting works' }],
    openRepairs: 0,
    compliance: { gas: 'Valid to Aug 2026', boiler: 'Valid to Feb 2027', eicr: 'Valid to Apr 2027' },
  },
  {
    id: 't-4',
    name: 'Gareth Thomas',
    initials: 'GT',
    address: '31 Heol Newydd, Blaenavon',
    status: 'Active',
    rent: 'Up to date',
    tenancyStart: '21 June 2016',
    type: 'Assured tenancy',
    email: 'gareth.thomas@example.com',
    phone: '07700 900234',
    household: 'Couple, no children',
    language: 'English',
    supportNeeds: [],
    recharges: [],
    cases: [{ ref: 'CMP-2026-0355', type: 'Complaint', status: 'Stage 2' }],
    openRepairs: 1,
    compliance: { gas: 'Valid to Oct 2026', boiler: 'Valid to Dec 2026', eicr: 'Valid to May 2030' },
  },
  {
    id: 't-5',
    name: 'Megan Davies',
    initials: 'MD',
    address: '5 Clos y Deri, Cwmbran',
    status: 'Active',
    rent: 'In arrears',
    arrearsAmount: 89.5,
    tenancyStart: '8 February 2023',
    type: 'Assured tenancy',
    email: 'megan.davies@example.com',
    phone: '07700 900567',
    household: 'Single adult, 1 child',
    language: 'English',
    supportNeeds: [],
    recharges: [
      { ref: 'RC-2026-018', label: 'Carpet damage', amount: 145, status: 'Paid' },
    ],
    cases: [],
    openRepairs: 0,
    compliance: { gas: 'Valid to Feb 2027', boiler: 'Valid to Feb 2027', eicr: 'Valid to Feb 2028' },
  },
  {
    id: 't-6',
    name: 'Owen Davies',
    initials: 'OD',
    address: '7 Maes Pontnewydd (pending)',
    status: 'Pre-tenancy',
    rent: 'Up to date',
    tenancyStart: '1 June 2026',
    type: 'Assured tenancy (pending start)',
    email: 'owen.davies@example.com',
    phone: '07700 900890',
    household: 'Couple, 1 child',
    language: 'English',
    supportNeeds: [],
    recharges: [],
    cases: [{ ref: 'MEX-2026-0042', type: 'Mutual exchange', status: 'Inspection booked' }],
    openRepairs: 0,
    compliance: { gas: 'Not yet', boiler: 'Not yet', eicr: 'Not yet' },
  },
];

export default function TenantsPage() {
  const [selected, setSelected] = useState<Tenant | null>(null);
  const [filter, setFilter] = useState<'all' | 'arrears' | 'pre-tenancy' | 'with-cases'>('all');
  const [search, setSearch] = useState('');

  const filtered = TENANTS.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.address.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter === 'arrears') return t.rent === 'In arrears';
    if (filter === 'pre-tenancy') return t.status === 'Pre-tenancy';
    if (filter === 'with-cases') return t.cases.length > 0;
    return true;
  });

  const filters: { id: typeof filter; label: string; count?: number }[] = [
    { id: 'all', label: 'All', count: TENANTS.length },
    { id: 'arrears', label: 'In arrears', count: TENANTS.filter((t) => t.rent === 'In arrears').length },
    { id: 'with-cases', label: 'With open cases', count: TENANTS.filter((t) => t.cases.length > 0).length },
    { id: 'pre-tenancy', label: 'Pre-tenancy', count: TENANTS.filter((t) => t.status === 'Pre-tenancy').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Tenants</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            2,847 total
          </span>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            <Plus className="h-4 w-4" />
            Add tenant
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address…"
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search tenants"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => {
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
              {f.count !== undefined && (
                <span className={`ml-1.5 ${isActive ? 'text-primary-700' : 'text-muted-foreground'}`}>
                  {f.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
                Address
              </th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rent</th>
              <th className="hidden p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
                Open items
              </th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => setSelected(t)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
                      {t.initials}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-card-foreground">{t.name}</span>
                      {t.supportNeeds.length > 0 && (
                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700">
                          {t.supportNeeds.join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="hidden p-4 text-sm text-muted-foreground md:table-cell">
                  {t.address}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      t.status === 'Active'
                        ? 'bg-green-50 text-green-700'
                        : t.status === 'Pre-tenancy'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${
                        t.rent === 'In credit'
                          ? 'bg-green-50 text-green-700'
                          : t.rent === 'In arrears'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {t.rent}
                    </span>
                    {t.arrearsAmount && (
                      <span className="text-[10px] font-mono text-rose-700">
                        £{t.arrearsAmount.toFixed(2)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="hidden p-4 lg:table-cell">
                  <div className="flex flex-wrap gap-1.5">
                    {t.openRepairs > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        <Wrench className="h-2.5 w-2.5" />
                        {t.openRepairs}
                      </span>
                    )}
                    {t.cases.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">
                        <ClipboardList className="h-2.5 w-2.5" />
                        {t.cases.length}
                      </span>
                    )}
                    {t.recharges.filter((r) => r.status === 'Outstanding').length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                        <PoundSterling className="h-2.5 w-2.5" />
                        recharge
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <ChevronRight className="inline-block h-4 w-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">No tenants match your filters.</p>
        )}
      </div>

      {selected && <TenantDetailDrawer tenant={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function TenantDetailDrawer({ tenant, onClose }: { tenant: Tenant; onClose: () => void }) {
  const [tab, setTab] = useState<'overview' | 'rent' | 'cases' | 'compliance' | 'documents'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <aside className="relative flex h-full w-full max-w-2xl flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-base font-semibold text-primary-700">
              {tenant.initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{tenant.name}</h2>
              <p className="text-xs text-muted-foreground">{tenant.address}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    tenant.status === 'Active'
                      ? 'bg-green-50 text-green-700'
                      : tenant.status === 'Pre-tenancy'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {tenant.status}
                </span>
                {tenant.language === 'Cymraeg' && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700">
                    Cymraeg
                  </span>
                )}
                {tenant.supportNeeds.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border px-5">
          <div className="flex gap-1 overflow-x-auto" role="tablist">
            {(
              [
                { id: 'overview', label: 'Overview' },
                { id: 'rent', label: 'Rent & charges' },
                { id: 'cases', label: 'Cases' },
                { id: 'compliance', label: 'Compliance' },
                { id: 'documents', label: 'Documents' },
              ] as const
            ).map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'overview' && <OverviewTab tenant={tenant} />}
          {tab === 'rent' && <RentTab tenant={tenant} />}
          {tab === 'cases' && <CasesTab tenant={tenant} />}
          {tab === 'compliance' && <ComplianceTab tenant={tenant} />}
          {tab === 'documents' && <DocumentsTab />}
        </div>
      </aside>
    </div>
  );
}

function OverviewTab({ tenant }: { tenant: Tenant }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-semibold text-card-foreground">Personal details</h3>
          <button
            onClick={() => setEditing((e) => !e)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            {editing ? <Save className="h-3 w-3" /> : <Pencil className="h-3 w-3" />}
            {editing ? 'Save changes' : 'Edit'}
          </button>
        </div>
        <dl className="divide-y divide-border">
          <Row icon={User} label="Name">
            {editing ? (
              <input
                type="text"
                defaultValue={tenant.name}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
              />
            ) : (
              tenant.name
            )}
          </Row>
          <Row icon={Mail} label="Email">
            {editing ? (
              <input
                type="email"
                defaultValue={tenant.email}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
              />
            ) : (
              tenant.email
            )}
          </Row>
          <Row icon={Phone} label="Phone">
            {editing ? (
              <input
                type="tel"
                defaultValue={tenant.phone}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
              />
            ) : (
              tenant.phone
            )}
          </Row>
          <Row icon={MapPin} label="Address">
            {tenant.address}
          </Row>
          <Row icon={Users} label="Household">
            {tenant.household}
          </Row>
          <Row icon={Globe} label="Preferred language">
            {editing ? (
              <select
                defaultValue={tenant.language}
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
              >
                <option>English</option>
                <option>Cymraeg</option>
              </select>
            ) : (
              tenant.language
            )}
          </Row>
        </dl>
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold text-card-foreground">Tenancy</h3>
        </div>
        <dl className="divide-y divide-border">
          <Row icon={Calendar} label="Tenancy started">
            {tenant.tenancyStart}
          </Row>
          <Row icon={FileText} label="Tenancy type">
            {tenant.type}
          </Row>
          <Row icon={Accessibility} label="Support needs">
            {tenant.supportNeeds.length > 0 ? tenant.supportNeeds.join(', ') : 'None recorded'}
          </Row>
        </dl>
      </section>
    </div>
  );
}

function RentTab({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Account balance</p>
        {tenant.rent === 'In arrears' && tenant.arrearsAmount ? (
          <>
            <p className="mt-1 text-3xl font-bold text-rose-700">£{tenant.arrearsAmount.toFixed(2)}</p>
            <p className="text-sm text-rose-700">In arrears · ~{Math.round(tenant.arrearsAmount / 98.75 * 10) / 10} weeks behind</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white hover:bg-primary-700">
                Set up payment plan
              </button>
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-foreground hover:bg-muted">
                Send arrears letter
              </button>
              <button className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-foreground hover:bg-muted">
                Refer to money advice
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-3xl font-bold text-green-700">{tenant.rent}</p>
            <p className="text-sm text-muted-foreground">Weekly rent: £98.75</p>
          </>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h3 className="font-semibold text-card-foreground">Recharges</h3>
        </div>
        {tenant.recharges.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No recharges on this account.</p>
        ) : (
          <ul className="divide-y divide-border" role="list">
            {tenant.recharges.map((r) => (
              <li key={r.ref} className="flex items-center gap-3 p-4">
                <PoundSterling className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.ref}</p>
                </div>
                <span className="text-sm font-semibold">£{r.amount.toFixed(2)}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    r.status === 'Outstanding' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold text-card-foreground">Service charges</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          £13.55 / week — block cleaning, grounds, communal lighting, insurance.
        </p>
        <button className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700">
          View itemised breakdown →
        </button>
      </section>
    </div>
  );
}

function CasesTab({ tenant }: { tenant: Tenant }) {
  return (
    <div className="space-y-3">
      {tenant.cases.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No open cases for this tenant.
        </p>
      ) : (
        tenant.cases.map((c) => (
          <div key={c.ref} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">{c.type}</p>
              <p className="text-xs text-muted-foreground font-mono">{c.ref}</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
              {c.status}
            </span>
            <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted" aria-label="Open">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))
      )}

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium text-card-foreground">Repairs</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {tenant.openRepairs} open · view full history in repairs.
        </p>
      </div>
    </div>
  );
}

function ComplianceTab({ tenant }: { tenant: Tenant }) {
  const checks = [
    { name: 'Gas safety', value: tenant.compliance.gas, icon: ShieldCheck },
    { name: 'Boiler service', value: tenant.compliance.boiler, icon: ShieldCheck },
    { name: 'EICR', value: tenant.compliance.eicr, icon: ShieldCheck },
  ];
  return (
    <ul className="space-y-3" role="list">
      {checks.map((c) => {
        const dueSoon = c.value.toLowerCase().includes('due');
        return (
          <li key={c.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                dueSoon ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {dueSoon ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.value}</p>
            </div>
            <button className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
              Book appointment
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DocumentsTab() {
  const docs = [
    { name: 'Tenancy agreement', date: 'Signed 4 Aug 2019', size: '212 KB' },
    { name: 'Gas safety certificate (2026)', date: 'Issued 14 Mar 2026', size: '84 KB' },
    { name: 'EICR certificate', date: 'Issued 22 Jun 2024', size: '96 KB' },
    { name: 'Welcome pack', date: 'v4 Jan 2026', size: '1.4 MB' },
  ];
  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-card" role="list">
      {docs.map((d) => (
        <li key={d.name} className="flex items-center gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground">{d.name}</p>
            <p className="text-xs text-muted-foreground">{d.date} · {d.size}</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
            <Download className="h-3 w-3" />
            Download
          </button>
        </li>
      ))}
    </ul>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 p-4 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-sm text-card-foreground">{children}</div>
    </div>
  );
}
