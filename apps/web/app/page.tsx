import Link from 'next/link';
import {
  ArrowRight,
  Wrench,
  PoundSterling,
  MessageSquare,
  Globe,
  Shield,
  Smartphone,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background pb-20 pt-20 lg:pt-32">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Now available for Welsh housing associations
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
          The modern tenant experience{' '}
          <span className="text-primary-600">your residents deserve</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Hafan empowers social housing tenants with self-service tools for repairs, rent,
          and communication — all in one beautiful, accessible platform that supports
          Welsh and English.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-primary-700"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            See Features
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Trusted by Bron Afon Community Housing and growing
        </p>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    {
      icon: Wrench,
      title: 'Repair Tracking',
      description: 'Domino\'s-style live repair tracking. Tenants report, upload photos, and follow every step.',
    },
    {
      icon: PoundSterling,
      title: 'Rent Management',
      description: 'View balances, set up direct debits, and make payments — all from their phone.',
    },
    {
      icon: MessageSquare,
      title: 'AI-Powered Support',
      description: 'Intelligent chatbot handles common queries. Seamless escalation to your call centre.',
    },
    {
      icon: Globe,
      title: 'Welsh Language',
      description: 'Full Cymraeg support throughout. One toggle switches the entire experience.',
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      description: 'Responsive web app plus native iOS and Android apps from a single codebase.',
    },
    {
      icon: Shield,
      title: 'WCAG Accessible',
      description: 'Built to WCAG 2.1 AA standards. Screen readers, keyboard nav, high contrast — all covered.',
    },
    {
      icon: BarChart3,
      title: 'Admin Dashboard',
      description: 'Real-time analytics, repair management, tenant insights, and CX scoring.',
    },
    {
      icon: Sparkles,
      title: 'Gamification',
      description: 'Points, badges, and levels reward tenants for engagement and positive behaviours.',
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Everything tenants need, in one place</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Purpose-built for social housing. Integrates with Microsoft 365 and Dynamics.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
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
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-primary-600 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to transform your tenant experience?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-100">
          Join forward-thinking housing associations already using Hafan to deliver
          world-class self-service to their tenants.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-primary-700 shadow-md transition-colors hover:bg-primary-50"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { stat: '97%', label: 'Tenant satisfaction score' },
            { stat: '60%', label: 'Reduction in call centre volume' },
            { stat: '4.2 days', label: 'Average repair completion' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-4xl font-bold text-primary-600">{item.stat}</p>
              <p className="mt-1 text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}
