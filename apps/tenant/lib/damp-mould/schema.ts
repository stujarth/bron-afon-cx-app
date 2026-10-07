import { z } from 'zod';

export const ROOMS = ['bedroom', 'livingRoom', 'kitchen', 'bathroom', 'hallway', 'other'] as const;
export const SEVERITIES = ['low', 'moderate', 'severe'] as const;
export const DURATIONS = ['underMonth', 'oneToThreeMonths', 'overThreeMonths'] as const;

/** Approximate weeks for each duration answer, stored for reporting. */
export const DURATION_WEEKS: Record<(typeof DURATIONS)[number], number> = {
  underMonth: 2,
  oneToThreeMonths: 8,
  overThreeMonths: 16,
};

// Error messages are translation keys under `dampMould.errors`.
export const dampReportSchema = z.object({
  rooms: z.array(z.enum(ROOMS)).min(1, 'rooms'),
  severity: z.enum(SEVERITIES, { errorMap: () => ({ message: 'severity' }) }),
  duration: z.enum(DURATIONS, { errorMap: () => ({ message: 'duration' }) }),
  hasVulnerableOccupant: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'vulnerable' }) }),
  description: z
    .string()
    .trim()
    .min(10, 'descriptionShort')
    .max(2000, 'descriptionLong'),
});

export type DampReportInput = z.infer<typeof dampReportSchema>;
export type DampReportField = keyof DampReportInput;

export function parseDampReport(formData: FormData) {
  return dampReportSchema.safeParse({
    rooms: formData.getAll('rooms'),
    severity: formData.get('severity') ?? undefined,
    duration: formData.get('duration') ?? undefined,
    hasVulnerableOccupant: formData.get('hasVulnerableOccupant') ?? undefined,
    description: formData.get('description') ?? '',
  });
}
