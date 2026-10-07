import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { DURATION_WEEKS, type DampReportInput } from './schema';
import { classifyHazard, inspectionDueAt, type HazardLevel } from './timescales';

// The prototype has no real sign-in yet, so reports are filed against the demo tenant.
const DEMO_TENANT = {
  tenant_name: 'Siân Williams',
  property_ref: 'BA-104421',
  address_line: '14 Heol y Castell',
  postcode: 'NP44 3HQ',
  ward: 'Fairwater',
  property_type: 'flat',
  build_year: 1972,
};

export type DampReportResult = {
  reference: string;
  hazardLevel: HazardLevel;
  inspectionDueAt: string;
};

function mockReference() {
  return `DM-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
}

function supabaseConfigured() {
  return (
    process.env.DAMP_REPORTS_MOCK !== '1' &&
    !!process.env.SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function saveDampReport(input: DampReportInput): Promise<DampReportResult> {
  const reportedAt = new Date();
  const hasVulnerableOccupant = input.hasVulnerableOccupant === 'yes';
  const hazardLevel = classifyHazard({ severity: input.severity, hasVulnerableOccupant });
  const due = inspectionDueAt(hazardLevel, reportedAt).toISOString();

  if (!supabaseConfigured()) {
    return { reference: mockReference(), hazardLevel, inspectionDueAt: due };
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from('damp_mould_reports')
    .insert({
      ...DEMO_TENANT,
      rooms: input.rooms,
      severity: input.severity,
      duration_weeks: DURATION_WEEKS[input.duration],
      has_vulnerable_occupant: hasVulnerableOccupant,
      description: input.description,
      hazard_level: hazardLevel,
      source: 'tenant_portal',
      created_at: reportedAt.toISOString(),
      inspection_due_at: due,
    })
    .select('reference')
    .single();

  if (error) throw new Error(`Could not save damp & mould report: ${error.message}`);

  return { reference: data.reference as string, hazardLevel, inspectionDueAt: due };
}
