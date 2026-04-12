import { MessageSquare, Mail, Phone, Bell, Send } from 'lucide-react';

export default function CommunicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Communications</h1>
        <button className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700">
          <Send className="h-4 w-4" aria-hidden="true" />
          New Message
        </button>
      </div>

      {/* Channel stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Email', count: '1,234', icon: Mail, color: 'bg-blue-100 text-blue-700' },
          { label: 'SMS', count: '856', icon: Phone, color: 'bg-green-100 text-green-700' },
          { label: 'Push', count: '2,103', icon: Bell, color: 'bg-purple-100 text-purple-700' },
          { label: 'In-App', count: '543', icon: MessageSquare, color: 'bg-orange-100 text-orange-700' },
        ].map((channel) => (
          <div key={channel.label} className="rounded-xl border border-border bg-card p-5">
            <div className={`inline-flex rounded-lg p-2 ${channel.color}`}>
              <channel.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold text-card-foreground">{channel.count}</p>
            <p className="text-sm text-muted-foreground">{channel.label} sent this month</p>
          </div>
        ))}
      </div>

      {/* Recent messages */}
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold text-card-foreground">Recent Messages</h2>
        </div>
        <ul className="divide-y divide-border" role="list">
          {[
            { to: 'All tenants', subject: 'Spring maintenance schedule', channel: 'Email', date: '11 Apr' },
            { to: 'Block A residents', subject: 'Boiler servicing reminder', channel: 'SMS', date: '10 Apr' },
            { to: 'Siân Williams', subject: 'Repair update: Leaking tap', channel: 'Push', date: '10 Apr' },
            { to: 'New tenants (March)', subject: 'Welcome to Bron Afon', channel: 'Email', date: '9 Apr' },
          ].map((msg) => (
            <li key={msg.subject} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-card-foreground">{msg.subject}</p>
                <p className="text-xs text-muted-foreground">To: {msg.to}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                  {msg.channel}
                </span>
                <p className="mt-0.5 text-xs text-muted-foreground">{msg.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
