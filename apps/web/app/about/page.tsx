import type { Metadata } from 'next';
import { Heart, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Hafan and our mission to transform the social housing experience.',
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">About Hafan</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Welsh for &quot;haven&quot; — because every tenant deserves to feel at home.
          </p>
        </div>

        <section className="mt-16 space-y-8">
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Target className="h-6 w-6 text-primary-700" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-card-foreground">Our Mission</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We believe social housing tenants deserve the same quality digital experience
              as customers of any premium consumer brand. Hafan was built to close that gap —
              giving tenants real-time visibility, genuine self-service, and a voice in how
              their homes are managed.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Heart className="h-6 w-6 text-primary-700" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-card-foreground">Built for Wales, Built for Everyone</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Born from a partnership with Bron Afon Community Housing in South Wales,
              Hafan is proudly Welsh-first — with full Cymraeg language support and
              deep understanding of social housing needs. But our platform is designed to
              serve housing associations across the UK and beyond.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <Users className="h-6 w-6 text-primary-700" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-card-foreground">Our Values</h2>
            <ul className="mt-3 space-y-3 text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">Accessibility first:</span>
                Every feature is WCAG 2.1 AA compliant. No exceptions.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">Tenant-centric:</span>
                We design with tenants, not just for them.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">Open & transparent:</span>
                Simple pricing, clear communication, no vendor lock-in.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">Bilingual by default:</span>
                Welsh and English are equal partners in our platform.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
