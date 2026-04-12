import { Wrench, Clock, CheckCircle2, AlertTriangle, Search, Filter } from 'lucide-react';

const repairs = [
  { id: 'REP-0412', tenant: 'Siân Williams', issue: 'Leaking tap in kitchen', status: 'In Progress', priority: 'Routine', date: '12 Apr' },
  { id: 'REP-0411', tenant: 'Dafydd Jones', issue: 'Boiler not heating water', status: 'Scheduled', priority: 'Urgent', date: '11 Apr' },
  { id: 'REP-0410', tenant: 'Rhiannon Evans', issue: 'Front door lock broken', status: 'Reported', priority: 'Emergency', date: '10 Apr' },
  { id: 'REP-0409', tenant: 'Gareth Thomas', issue: 'Damp patch on bedroom wall', status: 'Triaging', priority: 'Routine', date: '9 Apr' },
  { id: 'REP-0408', tenant: 'Megan Davies', issue: 'Window handle broken', status: 'Completed', priority: 'Routine', date: '8 Apr' },
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'Emergency': return 'bg-red-50 text-red-700';
    case 'Urgent': return 'bg-amber-50 text-amber-700';
    default: return 'bg-blue-50 text-blue-700';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Completed': return 'bg-green-50 text-green-700';
    case 'In Progress': return 'bg-blue-50 text-blue-700';
    case 'Reported': return 'bg-amber-50 text-amber-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

export default function AdminRepairsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Repairs</h1>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> 156 active
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search repairs..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search repairs"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Ref</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Issue</th>
              <th className="hidden p-4 text-left text-sm font-medium text-muted-foreground md:table-cell">Tenant</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="hidden p-4 text-left text-sm font-medium text-muted-foreground sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {repairs.map((repair) => (
              <tr key={repair.id} className="transition-colors hover:bg-muted/50">
                <td className="p-4 font-mono text-sm text-muted-foreground">{repair.id}</td>
                <td className="p-4 text-sm font-medium text-card-foreground">{repair.issue}</td>
                <td className="hidden p-4 text-sm text-muted-foreground md:table-cell">{repair.tenant}</td>
                <td className="p-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(repair.priority)}`}>
                    {repair.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(repair.status)}`}>
                    {repair.status}
                  </span>
                </td>
                <td className="hidden p-4 text-sm text-muted-foreground sm:table-cell">{repair.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
