-- Damp & mould reports from tenants (Bron Afon demo project).
-- Written by the tenant portal's server action using the service-role key;
-- RLS is enabled with no policies, so anon/authenticated clients have no access.

create sequence if not exists public.damp_mould_report_seq start 5001;

create table if not exists public.damp_mould_reports (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    default ('DM-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.damp_mould_report_seq')::text, 4, '0')),
  created_at timestamptz not null default now(),
  source text not null default 'tenant_portal'
    check (source in ('tenant_portal', 'phone', 'email', 'surveyor')),

  tenant_name text not null,
  property_ref text not null,
  address_line text,
  postcode text not null,
  ward text not null,
  property_type text not null check (property_type in ('flat', 'house', 'bungalow', 'maisonette')),
  build_year int,
  wall_type text check (wall_type in ('solid', 'cavity', 'system_built')),

  rooms text[] not null,
  severity text not null check (severity in ('low', 'moderate', 'severe')),
  duration_weeks int,
  has_vulnerable_occupant boolean not null default false,
  hazard_level text not null check (hazard_level in ('emergency', 'significant', 'routine')),
  description text not null,

  status text not null default 'reported'
    check (status in ('reported', 'inspection_booked', 'inspected', 'treatment_scheduled', 'resolved')),
  inspection_due_at timestamptz not null,
  inspected_at timestamptz,
  resolved_at timestamptz,
  root_cause text check (root_cause in ('condensation', 'penetrating_damp', 'rising_damp', 'plumbing_leak', 'roof_leak')),
  cost_gbp numeric(10, 2)
);

alter table public.damp_mould_reports enable row level security;

create index if not exists damp_mould_reports_created_at_idx on public.damp_mould_reports (created_at);
create index if not exists damp_mould_reports_ward_idx on public.damp_mould_reports (ward);
create index if not exists damp_mould_reports_property_ref_idx on public.damp_mould_reports (property_ref);

-- Column comments help people (and Claude) query the data correctly.
comment on table public.damp_mould_reports is
  'Damp and mould reports from Bron Afon tenants (Torfaen, South Wales). Demo data: all tenants are fictional.';
comment on column public.damp_mould_reports.hazard_level is
  'emergency = severe + vulnerable occupant (24h); significant = severe or vulnerable occupant (10 working days); routine (20 working days). Timescales modelled on Awaab''s Law.';
comment on column public.damp_mould_reports.inspection_due_at is
  'Deadline to inspect, from hazard_level. A breach is inspected_at > inspection_due_at, or still uninspected after the deadline.';
comment on column public.damp_mould_reports.has_vulnerable_occupant is
  'Household includes a child under 5, someone over 65, someone pregnant, or someone with a respiratory, heart or immune condition.';
comment on column public.damp_mould_reports.duration_weeks is 'Approximate weeks the tenant had noticed the problem before reporting.';
comment on column public.damp_mould_reports.wall_type is 'solid = pre-1930 solid wall; cavity = cavity wall; system_built = 1960s/70s non-traditional construction.';
comment on column public.damp_mould_reports.cost_gbp is 'Total cost of remedial works in GBP, once known.';
