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
  Star,
  Zap,
  Users,
  TrendingUp,
  Quote,
  Bot,
  Trophy,
  Camera,
} from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-blue-50/30 to-background pb-24 pt-20 lg:pt-32">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-secondary-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-4 py-1.5 text-sm font-medium text-primary-700 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Now serving Bron Afon Community Housing
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
          The tenant experience platform that{' '}
          <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            housing associations love
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Hafan empowers social housing tenants with self-service tools for repairs, rent,
          and AI-powered support — beautifully designed, fully accessible, and proudly
          bilingual (English & Cymraeg).
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/40"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/80 px-6 py-3.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            See Features
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            WCAG 2.1 AA accessible
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Welsh & English
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            iOS, Android & Web
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Microsoft 365 & Dynamics
          </div>
        </div>

        {/* Hero product preview */}
        <div className="mt-16 mx-auto max-w-5xl">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary-600 to-blue-600 opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <p className="ml-2 text-xs font-mono text-muted-foreground">bronafon.org.uk/dashboard</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-primary-50/30">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-blue-700" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">Active Repairs</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-foreground">2</p>
                    <p className="text-xs text-muted-foreground">1 in progress</p>
                  </div>
                  <div className="rounded-xl border border-border bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <PoundSterling className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold">Rent Balance</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold">£125.50</p>
                    <p className="text-xs text-primary-100">In credit</p>
                  </div>
                  <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-amber-700" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">Gold Member</p>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-foreground">450 pts</p>
                    <p className="text-xs text-muted-foreground">50 to Platinum</p>
                  </div>
                </div>
                <div className="mt-6 rounded-xl border border-border bg-white p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold">Repair Progress · Leaking Tap</p>
                    <span className="text-xs text-green-600 font-medium">Engineer on the way</span>
                  </div>
                  <div className="relative">
                    <div className="flex justify-between">
                      {['Reported', 'Assessed', 'Scheduled', 'On the Way', 'Done'].map((step, i) => (
                        <div key={step} className="flex flex-col items-center" style={{ width: '20%' }}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            i < 4 ? 'bg-primary-500 text-white' : 'bg-muted text-muted-foreground border border-border'
                          }`}>
                            {i < 4 ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                          </div>
                          <p className="mt-1 text-[10px] text-center text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute left-[10%] right-[10%] top-4 -translate-y-1/2 -z-10">
                      <div className="h-1 bg-muted rounded-full">
                        <div className="h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            { stat: '97%', label: 'Tenant satisfaction', icon: Star, color: 'text-amber-500' },
            { stat: '60%', label: 'Reduction in call centre volume', icon: TrendingUp, color: 'text-green-500' },
            { stat: '4.2', label: 'Days avg repair completion', icon: Zap, color: 'text-blue-500' },
            { stat: '2,847', label: 'Active tenants on Hafan', icon: Users, color: 'text-primary-500' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <item.icon className={`mx-auto h-6 w-6 ${item.color}`} />
              <p className="mt-3 text-4xl font-bold text-foreground">{item.stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: Wrench, title: 'Live Repair Tracking', description: "Domino's-style live tracking. Tenants see every step from report to completion in real-time.", color: 'bg-blue-100 text-blue-700' },
    { icon: Bot, title: 'AI-Powered Support', description: '24/7 intelligent chatbot handles common queries with seamless escalation to your team.', color: 'bg-purple-100 text-purple-700' },
    { icon: Camera, title: 'AI Diagnostics', description: 'Tenants upload photos. AI identifies issues and suggests fixes — reducing unnecessary callouts.', color: 'bg-pink-100 text-pink-700' },
    { icon: PoundSterling, title: 'Smart Rent Management', description: 'View balances, set up direct debits, and make payments — all from any device.', color: 'bg-green-100 text-green-700' },
    { icon: Globe, title: 'Welsh & English', description: 'Full Cymraeg support throughout. One toggle switches the entire experience.', color: 'bg-red-100 text-red-700' },
    { icon: Smartphone, title: 'Works Everywhere', description: 'Beautiful responsive web app plus native iOS and Android apps from a single codebase.', color: 'bg-indigo-100 text-indigo-700' },
    { icon: Shield, title: 'WCAG 2.1 AA', description: 'Accessibility built in from day one. Screen readers, keyboard nav, high contrast — all covered.', color: 'bg-emerald-100 text-emerald-700' },
    { icon: BarChart3, title: 'Admin Dashboard', description: 'Real-time analytics, repair management, tenant insights, and CX scoring at a glance.', color: 'bg-cyan-100 text-cyan-700' },
    { icon: Trophy, title: 'Gamification', description: 'Points, badges, and levels reward tenants for engagement and positive behaviours.', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            <Sparkles className="h-3 w-3" />
            Built for housing
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Everything tenants need, in one place
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Purpose-built for social housing. Integrates with Microsoft 365 and Dynamics 365.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="bg-gradient-to-b from-background to-primary-50/30 py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            Customer story
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by housing associations
          </h2>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <Quote className="h-10 w-10 text-primary-200" />
          <blockquote className="mt-6">
            <p className="text-xl leading-relaxed text-foreground sm:text-2xl">
              &ldquo;Hafan transformed how we serve our tenants. Call centre volume
              dropped by 60% in the first three months, and tenant satisfaction
              jumped to its highest level ever. The Welsh language support was
              non-negotiable for us — and Hafan delivered beautifully.&rdquo;
            </p>
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
              GP
            </div>
            <div>
              <p className="font-semibold text-foreground">Geraint Pritchard</p>
              <p className="text-sm text-muted-foreground">Director of Customer Experience, Bron Afon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-blue-600 py-24">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to transform your tenant experience?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-100">
          Join forward-thinking housing associations using Hafan to deliver
          world-class self-service. Book a 30-minute demo with our team.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-primary-700 shadow-xl transition-transform hover:scale-105"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
