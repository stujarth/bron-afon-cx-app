import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Hafan team. Book a demo or ask us anything.',
};

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Ready to transform your tenant experience? Let&apos;s talk.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-foreground">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-foreground">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Work email
              </label>
              <input
                id="email"
                type="email"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="organisation" className="mb-2 block text-sm font-medium text-foreground">
                Organisation
              </label>
              <input
                id="organisation"
                type="text"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="properties" className="mb-2 block text-sm font-medium text-foreground">
                Number of properties
              </label>
              <select
                id="properties"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select range</option>
                <option value="small">Under 1,000</option>
                <option value="medium">1,000 - 5,000</option>
                <option value="large">5,000 - 20,000</option>
                <option value="enterprise">20,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Tell us about your needs..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Send Message
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <h2 className="text-xl font-bold text-foreground">Book a demo</h2>
              <p className="mt-2 text-muted-foreground">
                See Hafan in action with a personalised demo tailored to your
                organisation&apos;s needs. We&apos;ll show you how Bron Afon is
                already using the platform.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'hello@hafan.io', href: 'mailto:hello@hafan.io' },
                { icon: Phone, label: '0800 123 4567', href: 'tel:08001234567' },
                { icon: MapPin, label: 'Cwmbran, South Wales', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <item.icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
