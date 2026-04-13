import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Settings,
  Rocket,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for housing associations of all sizes.',
};

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 lg:pt-32">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
          <Sparkles className="h-3 w-3" />
          Tailored to your organisation
        </span>
        <h1 className="mt-4 text-4xl font-bold text-foreground lg:text-6xl">
          Simple pricing, built for housing
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Every housing association is different. We tailor pricing to your size,
          integrations, and feature needs — with a one-off implementation fee plus
          an ongoing subscription.
        </p>
      </div>
    </section>
  );
}

function PricingModel() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Implementation */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-100/60 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-md">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">Implementation</h2>
              <p className="mt-1 text-sm font-medium text-primary-700">One-off setup fee</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We handle everything to get you live — brand customisation, data
                migration, integrations with your existing systems, staff training,
                and go-live support.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  'Custom branding & theming',
                  'Microsoft Dynamics 365 integration',
                  'Microsoft 365 + Entra ID setup',
                  'Data migration from existing systems',
                  'iOS & Android app publication',
                  'Staff training sessions',
                  '30 days of go-live support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estimated investment</p>
                <p className="mt-1 text-sm text-foreground">
                  Tailored to your size and complexity — we&apos;ll provide a detailed
                  estimate during your discovery call.
                </p>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="relative overflow-hidden rounded-3xl border border-primary-300 bg-gradient-to-br from-white to-primary-50/50 p-8 shadow-lg">
            <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-amber-100/60 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <span className="rounded-full bg-primary-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Ongoing
                </span>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">Subscription</h2>
              <p className="mt-1 text-sm font-medium text-primary-700">Monthly or annual</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ongoing access to the full Hafan platform with all features, updates,
                hosting, support, and security included. Priced per property.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  'Unlimited tenant users',
                  'Full feature access (web + mobile)',
                  'Admin dashboard for your team',
                  'AI chatbot & diagnostics',
                  'All platform updates & new features',
                  'Managed hosting & security',
                  'Ongoing technical support',
                  'Annual discount available',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl bg-primary-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Priced per property</p>
                <p className="mt-1 text-sm text-foreground">
                  Volume pricing scales with your portfolio. Contact us for a
                  quote tailored to your property count and feature selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Everything included</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            No hidden costs. No feature tiers. Every housing association gets the
            full Hafan platform.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: 'Unlimited users', desc: 'Every tenant, every staff member — no per-seat charges.' },
            { icon: Settings, title: 'All integrations', desc: 'Microsoft Dynamics, M365, Entra ID, payment providers.' },
            { icon: Rocket, title: 'Continuous updates', desc: 'New features shipped every sprint, automatically.' },
            { icon: Heart, title: 'Welsh + English', desc: 'Full bilingual support at no extra cost.' },
            { icon: Sparkles, title: 'AI features', desc: 'Chatbot, diagnostics, and personalisation included.' },
            { icon: CheckCircle2, title: 'WCAG 2.1 AA', desc: 'Accessibility audit and certification included.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <item.icon className="h-5 w-5 text-primary-700" />
              </div>
              <h3 className="mt-3 font-semibold text-card-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'How long does implementation take?',
      a: 'Typically 8–12 weeks from kick-off to go-live, depending on your integration needs and data complexity. We run bi-weekly check-ins throughout.',
    },
    {
      q: 'Can we customise the branding?',
      a: "Yes — the platform is fully themable. We'll customise colours, logos, copy, and even the Welsh translations to match your organisation.",
    },
    {
      q: 'What happens after the 30 days of go-live support?',
      a: 'You move to our ongoing support plan, which is included in the subscription. This covers bug fixes, updates, feature requests, and technical help.',
    },
    {
      q: 'Do I need a separate Microsoft Dynamics licence?',
      a: "You'll need your existing Dynamics licence. We handle the integration layer that syncs tenant actions, repairs, and data in both directions.",
    },
    {
      q: 'Can we trial Hafan before committing?',
      a: 'We offer a tailored demo with your data, plus optional pilot programmes. Book a call and we can discuss what works for you.',
    },
    {
      q: 'How does the annual discount work?',
      a: "Commit to annual upfront and we'll give you two months free — effectively a ~17% discount on the monthly rate.",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-3xl font-bold text-foreground">Common questions</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-card-foreground">
                {faq.q}
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white lg:text-4xl">Get a tailored quote</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Tell us about your organisation and property count — we&apos;ll put together
          an estimate with implementation and subscription costs.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-xl transition-all hover:scale-105"
        >
          Get Your Quote
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <HeroSection />
      <PricingModel />
      <IncludedSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
