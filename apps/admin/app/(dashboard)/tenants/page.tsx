import { Users, Search, Filter } from 'lucide-react';

const tenants = [
  { name: 'Siân Williams', address: '14 Heol y Castell, Cwmbran', status: 'Active', rent: 'In credit' },
  { name: 'Dafydd Jones', address: '23 Stryd y Bont, Pontypool', status: 'Active', rent: 'In arrears' },
  { name: 'Rhiannon Evans', address: '8 Ffordd y Parc, Cwmbran', status: 'Active', rent: 'In credit' },
  { name: 'Gareth Thomas', address: '31 Heol Newydd, Blaenavon', status: 'Active', rent: 'In credit' },
  { name: 'Megan Davies', address: '5 Clos y Deri, Cwmbran', status: 'Active', rent: 'In arrears' },
];

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Tenants</h1>
        <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
          2,847 total
        </span>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search tenants..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search tenants"
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
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="hidden p-4 text-left text-sm font-medium text-muted-foreground md:table-cell">Address</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Rent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tenants.map((tenant) => (
              <tr key={tenant.name} className="transition-colors hover:bg-muted/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
                      {tenant.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{tenant.name}</span>
                  </div>
                </td>
                <td className="hidden p-4 text-sm text-muted-foreground md:table-cell">
                  {tenant.address}
                </td>
                <td className="p-4">
                  <span className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    {tenant.status}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      tenant.rent === 'In credit'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {tenant.rent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
