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
  LayoutDashboard,
  Send,
  MapPin,
  Heart,
} from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40">
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-primary-200/40 blur-3xl" style={{ animationDuration: '8s' }} />
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary-200/30 blur-3xl" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 animate-pulse rounded-full bg-blue-200/30 blur-3xl" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-primary-700 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          Live in Wales · Serving Bron Afon Community Housing
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-bold tracking-tight text-foreground lg:text-7xl">
          The tenant experience{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 bg-clip-text text-transparent">
              housing loves
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full text-primary-400"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 0 8 Q 75 2 150 6 T 300 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
          Hafan gives social housing tenants a beautifully designed self-service platform —
          repairs, rent, AI support — all bilingual, fully accessible, deeply human.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:shadow-xl hover:shadow-primary-600/50"
          >
            <span className="relative">Book a Demo</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/features"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-white/80 px-8 py-4 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
          >
            See Features
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {[
            'WCAG 2.1 AA',
            'Welsh + English',
            'iOS, Android & Web',
            'Microsoft 365 + Dynamics',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary-500" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero product screenshot */}
      <div className="relative mx-auto mt-20 max-w-6xl px-4">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500 via-blue-500 to-primary-600 opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-gradient-to-b from-muted/50 to-muted/30 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-muted-foreground shadow-inner">
                <Globe className="h-3 w-3" />
                <span className="font-mono">bronafon.org.uk/en/dashboard</span>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-white via-primary-50/20 to-blue-50/20 p-6 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Stat cards */}
                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <Wrench className="h-4 w-4 text-blue-700" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Active Repairs</p>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">1 in progress</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                      <PoundSterling className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold">Rent Balance</p>
                  </div>
                  <p className="mt-3 text-3xl font-bold">£125.50</p>
                  <p className="text-xs text-primary-100">In credit</p>
                </div>
                <div className="rounded-xl border border-border bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Gold Member</p>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-foreground">450 pts</p>
                  <p className="text-xs text-amber-700">50 to Platinum</p>
                </div>
              </div>

              {/* Pizza tracker preview */}
              <div className="mt-6 rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                      <Wrench className="h-5 w-5 text-primary-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Leaking tap in kitchen</p>
                      <p className="text-xs text-muted-foreground">REP-2026-0412</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    On the way
                  </span>
                </div>
                <div className="mt-4">
                  <div className="relative flex justify-between">
                    {['Reported', 'Assessed', 'Scheduled', 'On the Way', 'Done'].map((step, i) => (
                      <div key={step} className="flex flex-col items-center" style={{ width: '20%' }}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          i < 4 ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md' : 'bg-white border border-border text-muted-foreground'
                        }`}>
                          {i < 4 ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                        </div>
                        <p className="mt-1.5 text-[10px] text-center text-muted-foreground">{step}</p>
                      </div>
                    ))}
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
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background to-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-700">
            Proven results
          </h2>
          <p className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">
            Housing associations see real impact
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {[
            { stat: '97%', label: 'Tenant satisfaction score', icon: Star, color: 'from-amber-400 to-orange-500' },
            { stat: '60%', label: 'Reduction in call centre volume', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
            { stat: '4.2', label: 'Days average repair completion', icon: Zap, color: 'from-blue-400 to-indigo-500' },
            { stat: '2,847', label: 'Tenants active on platform', icon: Users, color: 'from-primary-400 to-primary-600' },
          ].map((item) => (
            <div key={item.label} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-sm`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-4xl font-bold text-foreground">{item.stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <Sparkles className="h-3 w-3" />
            Complete platform
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
            Three beautifully designed apps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            One platform, three surfaces. A tenant app, admin dashboard, and marketing site —
            all maintained from one codebase and deployed instantly.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Tenant app card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary-300 hover:shadow-xl">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
              <Smartphone className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Tenant App</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The beautifully crafted experience your tenants will actually love using.
              Web, iOS, and Android — bilingual English + Cymraeg.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {['Live repair tracking', 'AI chatbot support', 'Rewards & gamification', 'Photo diagnostics'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Admin app card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-300 hover:shadow-xl">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
              <LayoutDashboard className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Admin Dashboard</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything your staff need — real-time metrics, repair management,
              tenant insights, and CX analytics at a glance.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {['Real-time dashboards', 'Repair management', 'Tenant profiles', 'CX analytics'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-amber-300 hover:shadow-xl">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Integrations</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Plugs into your existing stack. Real-time sync with Microsoft Dynamics 365
              and deep Microsoft 365 integration.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {['Microsoft Dynamics 365', 'Microsoft 365 + Entra ID', 'Payment providers', 'SMS & email'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: Wrench, title: 'Live Repair Tracking', description: "Domino's-style live tracking keeps tenants informed from report to completion.", color: 'bg-blue-500' },
    { icon: Bot, title: 'AI-Powered Support', description: '24/7 intelligent chatbot handles common queries with seamless human escalation.', color: 'bg-purple-500' },
    { icon: Camera, title: 'AI Diagnostics', description: 'Tenants upload photos — AI identifies issues and suggests fixes, reducing callouts.', color: 'bg-pink-500' },
    { icon: PoundSterling, title: 'Smart Rent Management', description: 'View balances, set up direct debits, and make payments — from any device.', color: 'bg-green-500' },
    { icon: Globe, title: 'Bilingual by Design', description: 'Full Welsh (Cymraeg) support throughout. One toggle switches everything.', color: 'bg-red-500' },
    { icon: Smartphone, title: 'Works Everywhere', description: 'Beautiful responsive web plus native iOS and Android from a single codebase.', color: 'bg-indigo-500' },
    { icon: Shield, title: 'WCAG 2.1 AA', description: 'Accessibility built in from day one. Not bolted on as an afterthought.', color: 'bg-emerald-500' },
    { icon: BarChart3, title: 'Admin Analytics', description: 'Real-time CX metrics, repair analytics, and tenant insights at a glance.', color: 'bg-cyan-500' },
    { icon: Trophy, title: 'Gamification', description: 'Points, badges, and streaks reward positive tenant behaviours and engagement.', color: 'bg-amber-500' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <Heart className="h-3 w-3" />
            Built for housing
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
            Everything tenants need, in one place
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every feature purpose-built for social housing. Opinionated defaults with
            the flexibility to match your organisation&apos;s needs.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} shadow-md`}>
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-card-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${feature.color} opacity-0 blur-3xl transition-opacity group-hover:opacity-10`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            Customer story
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
            Loved by housing associations
          </h2>
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-xl lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <Quote className="h-12 w-12 text-primary-200" />
              <blockquote className="mt-6">
                <p className="text-xl font-medium leading-relaxed text-foreground lg:text-2xl">
                  &ldquo;Hafan transformed how we serve our tenants. Call centre volume
                  dropped by 60% in three months, satisfaction jumped to its highest
                  level ever, and the Welsh language support was delivered beautifully.&rdquo;
                </p>
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-base font-bold text-white shadow-md">
                  GP
                </div>
                <div>
                  <p className="font-bold text-foreground">Geraint Pritchard</p>
                  <p className="text-sm text-muted-foreground">Director of Customer Experience, Bron Afon</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:w-64">
              {[
                { label: 'Satisfaction', value: '97%' },
                { label: 'Call volume', value: '-60%' },
                { label: 'Digital adoption', value: '62%' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-2xl font-bold text-primary-700">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-blue-800" aria-hidden="true" />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Sparkles className="h-3 w-3" />
          Limited spaces for Q3 onboarding
        </span>
        <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
          Ready to transform your tenant experience?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Join forward-thinking housing associations using Hafan. Book a 30-minute
          demo — we&apos;ll show you exactly how it works with your data.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-xl transition-all hover:scale-105"
          >
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Explore Features
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
      <PlatformSection />
      <FeaturesGrid />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
