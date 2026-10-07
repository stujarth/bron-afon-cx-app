/**
 * Response timescales for damp & mould reports.
 *
 * Modelled on Awaab's Law (Hazards in Social Housing (Prescribed Requirements)
 * (England) Regulations 2025). Awaab's Law applies to social landlords in England;
 * the Welsh Government has consulted on equivalent duties. Bron Afon adopts these
 * timescales as a service commitment.
 *
 * - Emergency hazard: investigate and make safe within 24 hours
 * - Significant hazard: investigate within 10 working days
 * - Other damp & mould: inspect within 20 working days
 *
 * Working days skip weekends only; bank holidays are not modelled in this prototype.
 */

export type Severity = 'low' | 'moderate' | 'severe';
export type HazardLevel = 'emergency' | 'significant' | 'routine';

export function classifyHazard(input: {
  severity: Severity;
  hasVulnerableOccupant: boolean;
}): HazardLevel {
  if (input.severity === 'severe' && input.hasVulnerableOccupant) return 'emergency';
  if (input.severity === 'severe' || input.hasVulnerableOccupant) return 'significant';
  return 'routine';
}

export function addWorkingDays(from: Date, days: number): Date {
  const result = new Date(from);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

export function inspectionDueAt(level: HazardLevel, reportedAt: Date): Date {
  switch (level) {
    case 'emergency':
      return new Date(reportedAt.getTime() + 24 * 60 * 60 * 1000);
    case 'significant':
      return addWorkingDays(reportedAt, 10);
    case 'routine':
      return addWorkingDays(reportedAt, 20);
  }
}
