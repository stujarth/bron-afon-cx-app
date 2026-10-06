'use server';

import { parseDampReport, type DampReportField } from '../../../../../lib/damp-mould/schema';
import { saveDampReport, type DampReportResult } from '../../../../../lib/damp-mould/store';

export type DampReportState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: Partial<Record<DampReportField, string>> }
  | { status: 'failed' }
  | { status: 'submitted'; result: DampReportResult };

export async function submitDampReport(
  _prev: DampReportState,
  formData: FormData,
): Promise<DampReportState> {
  const parsed = parseDampReport(formData);

  if (!parsed.success) {
    const errors: Partial<Record<DampReportField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as DampReportField;
      errors[field] ??= issue.message;
    }
    return { status: 'invalid', errors };
  }

  try {
    return { status: 'submitted', result: await saveDampReport(parsed.data) };
  } catch (err) {
    console.error(err);
    return { status: 'failed' };
  }
}
