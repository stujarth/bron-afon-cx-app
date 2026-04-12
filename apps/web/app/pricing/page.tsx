import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for housing associations of all sizes.',
};

const plans = [
  {
    name: 'Starter',
    description: 'For smaller housing associations getting started',
    price: 'From £2',
    unit: 'per property/month',
    features: [
      'Tenant self-service portal',
      'Repair reporting & tracking',
      'Rent account viewing',
      'Email notifications',
      'English language',
      'WCAG 2.1 AA accessible',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For growing associations wanting the full experience',
    price: 'From £3.50',
    unit: 'per property/month',
    features: [
      'Everything in Starter',
      'AI chatbot & diagnostics',
      'Welsh language support',
      'Push notifications',
      'Gamification & rewards',
      'Admin analytics dashboard',
      'Microsoft Dynamics integration',
      'Native mobile apps (iOS & Android)',
    ],
    cta: 'Book a Demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large associations with custom needs',
    price: 'Custom',
    unit: 'tailored to your scale',
    features: [
      'Everything in Professional',
      'Custom branding & theming',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'On-premise data options',
      'Multi-organisation support',
      'Priority feature requests',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Simple, transparent pricing</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Pay per property. No hidden fees. Scale as you grow.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-primary-500 bg-primary-50/50 shadow-lg ring-1 ring-primary-500'
                  : 'border-border bg-card'
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <p className="mt-6 text-3xl font-bold text-foreground">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.unit}</p>

              <ul className="mt-8 space-y-3" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
