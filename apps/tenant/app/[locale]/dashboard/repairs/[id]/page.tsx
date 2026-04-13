import { ArrowLeft } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';
import RepairTracker from './repair-tracker';

export default async function RepairTrackerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/repairs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to repairs
      </Link>

      <RepairTracker repairId={id} />
    </div>
  );
}
