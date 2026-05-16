import type { Metadata } from 'next';
import {
  Wrench,
  PoundSterling,
  MessageSquare,
  Globe,
  Smartphone,
  Shield,
  BarChart3,
  Sparkles,
  Camera,
  Bell,
  Users,
  Zap,
  Flame,
  Home,
  Accessibility,
  Building,
  ClipboardList,
  ShieldAlert,
  Volume2,
  ArrowLeftRight,
  DoorOpen,
  KeyRound,
  FileText,
  MessageSquareWarning,
  Star,
  CalendarDays,
  Trophy,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover the features that make Hafan the leading tenant experience platform.',
};

export default function FeaturesPage() {
  const featureGroups = [
    {
      title: 'For Tenants',
      subtitle: 'Self-service that residents actually enjoy using',
      features: [
        { icon: Wrench, title: 'Live Repair Tracking', description: 'Report repairs with photos. Track every step — appointment, rescheduling, engineer ETA — like tracking a delivery.' },
        { icon: Camera, title: 'AI Diagnostics', description: 'Upload photos of issues. AI helps identify problems and suggests fixes before sending an engineer.' },
        { icon: Flame, title: 'Compliance Reminders', description: 'Gas safety, boiler service and EICR appointments — proactive booking and reminders.' },
        { icon: PoundSterling, title: 'Rent & Charges', description: 'Pay rent, manage arrears, view service charges and recharges with itemised breakdowns and queries.' },
        { icon: Home, title: 'My Home', description: 'Planned works timeline, property condition, communal repairs and new-build defects for your address.' },
        { icon: Accessibility, title: 'Adaptations Pathway', description: 'Request grab rails, stair lifts, walk-in showers and more — progress through OT assessment to install.' },
        { icon: ArrowLeftRight, title: 'Mutual Exchange', description: 'Browse matches, see your application progress through inspections and checks to decision.' },
        { icon: DoorOpen, title: 'Tenancy Lifecycle', description: 'Pre-tenancy steps, move-in checklist, end-tenancy notice — all the moments handled in-app.' },
        { icon: MessageSquareWarning, title: 'Complaints', description: 'Structured complaints with stage tracking and SLAs — plus offline channels for those who need them.' },
        { icon: Star, title: 'Feedback on Works', description: 'Star-rate completed planned works on quality, communication and staff conduct.' },
        { icon: MessageSquare, title: 'AI Chatbot', description: 'Instant answers 24/7. AI understands housing queries and can triage repair issues.' },
        { icon: Bell, title: 'Smart Notifications', description: 'Per-channel choice (email / SMS / push / post) for repairs, rent, general and safety — legally required items locked.' },
        { icon: Trophy, title: 'Rewards & Gamification', description: 'Earn points for engagement. Unlock badges and climb levels for positive tenant behaviours.' },
      ],
    },
    {
      title: 'Safe & Sensitive Journeys',
      subtitle: 'Designed with the right tone for the things that matter most',
      features: [
        { icon: ShieldAlert, title: 'Safeguarding Referrals', description: 'Confidential concerns about adults or children at risk. 999 escalation prompt and anonymous option.' },
        { icon: Volume2, title: 'ASB Reporting', description: 'Report noise, harassment, drugs, vandalism or threats. Evidence upload and case tracking.' },
        { icon: KeyRound, title: 'Arrears Support', description: 'Different tone in the arrears state — payment plans, benefits check, debt advice, never punitive.' },
        { icon: FileText, title: 'Contracts & Documents', description: 'Tenancy agreement, gas safety certificates, EICR — downloadable on demand.' },
      ],
    },
    {
      title: 'For Housing Staff',
      subtitle: 'Tools that make every tenant submission actionable',
      features: [
        { icon: ClipboardList, title: 'Casework Queues', description: 'Single queue for complaints, ASB, safeguarding, mutual exchange and adaptations — all with SLAs.' },
        { icon: Users, title: 'Log on Behalf of Tenant', description: 'Record complaints and reports received by phone, letter or in person — full audit trail.' },
        { icon: CalendarDays, title: 'Planned Works Management', description: 'Plan programmes, consult tenants and publish to affected properties with one click.' },
        { icon: BarChart3, title: 'Live Analytics', description: 'CX metrics, repair analytics, rent collection, satisfaction trends and SLA breaches at a glance.' },
        { icon: Zap, title: 'Dynamics 365 Integration', description: 'Two-way sync with Microsoft Dynamics. Tenant actions update CRM records automatically.' },
        { icon: Building, title: 'Communal & Estate', description: 'See and manage what tenants see — communal repairs, block notifications, area updates.' },
      ],
    },
    {
      title: 'Platform Foundations',
      subtitle: 'Built for the realities of social housing',
      features: [
        { icon: Globe, title: 'Welsh & English', description: 'Full Cymraeg support throughout the tenant app. One toggle switches everything.' },
        { icon: Shield, title: 'WCAG 2.1 AA', description: 'Accessibility from day one. Screen readers, keyboard navigation, high contrast, focus management.' },
        { icon: Smartphone, title: 'Web, iOS & Android', description: 'Beautiful responsive web plus native mobile from a single codebase.' },
        { icon: Sparkles, title: 'Tenant Voice Built In', description: 'Every submission carries support needs (Welsh, easy read, interpreter, advocate) end-to-end.' },
      ],
    },
  ];

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground lg:text-5xl">Features</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A complete tenant experience platform — shaped by real customer workshops and
            built around the journeys that matter.
          </p>
        </div>

        {featureGroups.map((group) => (
          <section key={group.title} className="mt-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">{group.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{group.subtitle}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <feature.icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
