import { describe, expect, it } from 'vitest';
import { parseDampReport } from '../schema';

function form(fields: Record<string, string | string[]>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    for (const v of Array.isArray(value) ? value : [value]) fd.append(key, v);
  }
  return fd;
}

const valid = {
  rooms: ['bedroom', 'bathroom'],
  severity: 'moderate',
  duration: 'oneToThreeMonths',
  hasVulnerableOccupant: 'no',
  description: 'Black mould behind the wardrobe and around the window.',
};

describe('parseDampReport', () => {
  it('accepts a complete report', () => {
    const result = parseDampReport(form(valid));
    expect(result.success).toBe(true);
    expect(result.data?.rooms).toEqual(['bedroom', 'bathroom']);
  });

  it('returns a translation key for every missing answer', () => {
    const result = parseDampReport(form({}));
    expect(result.success).toBe(false);
    const messages = Object.fromEntries(
      result.error!.issues.map((i) => [String(i.path[0]), i.message]),
    );
    expect(messages).toEqual({
      rooms: 'rooms',
      severity: 'severity',
      duration: 'duration',
      hasVulnerableOccupant: 'vulnerable',
      description: 'descriptionShort',
    });
  });

  it('rejects unknown rooms and over-long descriptions', () => {
    expect(parseDampReport(form({ ...valid, rooms: ['garage'] })).success).toBe(false);
    expect(parseDampReport(form({ ...valid, description: 'x'.repeat(2001) })).success).toBe(false);
  });
});
