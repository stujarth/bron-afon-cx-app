import { describe, expect, it } from 'vitest';
import { addWorkingDays, classifyHazard, inspectionDueAt } from '../timescales';

describe('classifyHazard', () => {
  it('treats severe damp with a vulnerable occupant as an emergency', () => {
    expect(classifyHazard({ severity: 'severe', hasVulnerableOccupant: true })).toBe('emergency');
  });

  it('treats severe damp, or any vulnerable occupant, as significant', () => {
    expect(classifyHazard({ severity: 'severe', hasVulnerableOccupant: false })).toBe('significant');
    expect(classifyHazard({ severity: 'low', hasVulnerableOccupant: true })).toBe('significant');
  });

  it('treats low or moderate damp with no vulnerable occupant as routine', () => {
    expect(classifyHazard({ severity: 'low', hasVulnerableOccupant: false })).toBe('routine');
    expect(classifyHazard({ severity: 'moderate', hasVulnerableOccupant: false })).toBe('routine');
  });
});

describe('addWorkingDays', () => {
  it('skips weekends', () => {
    // Friday 2 Oct 2026 + 1 working day = Monday 5 Oct 2026
    const friday = new Date(2026, 9, 2, 10);
    expect(addWorkingDays(friday, 1).getDate()).toBe(5);
  });

  it('adds 10 working days as two calendar weeks', () => {
    const monday = new Date(2026, 9, 5, 10);
    expect(addWorkingDays(monday, 10).toDateString()).toBe(new Date(2026, 9, 19).toDateString());
  });
});

describe('inspectionDueAt', () => {
  const reported = new Date(2026, 9, 5, 9, 30);

  it('gives emergencies 24 hours', () => {
    const due = inspectionDueAt('emergency', reported);
    expect(due.getTime() - reported.getTime()).toBe(24 * 60 * 60 * 1000);
  });

  it('gives significant hazards 10 working days and routine cases 20', () => {
    expect(inspectionDueAt('significant', reported).getDate()).toBe(19);
    expect(inspectionDueAt('routine', reported).toDateString()).toBe(
      new Date(2026, 10, 2).toDateString(),
    );
  });
});
