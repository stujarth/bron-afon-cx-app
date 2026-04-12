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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover the features that make Hafan the leading tenant experience platform.',
};

export default function FeaturesPage() {
  const featureGroups = [
    {
      title: 'For Tenants',
      features: [
        { icon: Wrench, title: 'Live Repair Tracking', description: 'Report repairs with photos. Track every step from report to completion, just like tracking a delivery.' },
        { icon: PoundSterling, title: 'Rent Management', description: 'View balance, payment history, and make payments online. Set up direct debits in seconds.' },
        { icon: MessageSquare, title: 'AI Chatbot', description: 'Get instant answers 24/7. Our AI understands common housing queries and can triage repair issues.' },
        { icon: Camera, title: 'Diagnostic Tool', description: 'Upload photos of issues. AI helps identify problems and suggests solutions before sending an engineer.' },
        { icon: Bell, title: 'Smart Notifications', description: 'Choose how you want to be contacted. Email, SMS, push, or in-app — in your preferred language.' },
        { icon: Sparkles, title: 'Rewards & Gamification', description: 'Earn points for engagement. Unlock badges and climb levels for maintaining your account.' },
      ],
    },
    {
      title: 'For Housing Associations',
      features: [
        { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time CX metrics, repair analytics, rent collection rates, and tenant satisfaction scores.' },
        { icon: Users, title: 'Tenant Management', description: 'Complete tenant profiles, communication history, and property management in one place.' },
        { icon: Zap, title: 'Dynamics 365 Integration', description: 'Two-way sync with Microsoft Dynamics. Tenant actions in the app update their CRM record automatically.' },
        { icon: Globe, title: 'Welsh Language', description: 'Full Welsh (Cymraeg) support throughout the tenant app. One toggle switches everything.' },
        { icon: Smartphone, title: 'Multi-Platform', description: 'Web, iOS, and Android from a single codebase. Responsive design works on any device.' },
        { icon: Shield, title: 'WCAG 2.1 AA', description: 'Built accessible from the ground up. Screen readers, keyboard navigation, high contrast, and focus management.' },
      ],
    },
  ];

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Features</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Everything you need to deliver a world-class tenant experience.
          </p>
        </div>

        {featureGroups.map((group) => (
          <section key={group.title} className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground">{group.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <feature.icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
