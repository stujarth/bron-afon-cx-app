import { Link } from '../../../i18n/navigation';
import { CheckCircle2, Globe, Shield, Smartphone } from 'lucide-react';

function BronAfonLogo() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-11 w-11 text-white"
        aria-hidden="true"
      >
        <path
          d="M2 18C4 16 5 14 7 14C9 14 10 16 12 16C14 16 15 13 17 13C19 13 20 15 22 15V20H2V18Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M12 4C12 4 9 7 9 11C9 13.2091 10.3431 14 12 14C13.6569 14 15 13.2091 15 11C15 7 12 4 12 4Z"
          fill="currentColor"
        />
        <line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-100/40 blur-3xl" />
      </div>

      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: branding */}
        <div className="hidden flex-col justify-center lg:flex">
          <BronAfonLogo />
          <h1 className="mt-8 text-4xl font-bold leading-tight text-foreground">
            Croeso i&apos;ch{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              cartref digidol
            </span>
          </h1>
          <p className="mt-2 text-xl font-medium text-foreground/80">
            Welcome to your digital home
          </p>
          <p className="mt-6 max-w-md text-muted-foreground">
            Manage repairs, pay rent, speak to our team, and more — all from one beautiful,
            accessible place. Available in English and Cymraeg.
          </p>

          <ul className="mt-8 space-y-3" role="list">
            {[
              { icon: CheckCircle2, text: 'Report and track repairs in real-time' },
              { icon: Shield, text: 'Secure sign-in with Microsoft' },
              { icon: Globe, text: 'Cefnogaeth yn Gymraeg / Welsh language support' },
              { icon: Smartphone, text: 'Works on any device, anywhere' },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <item.icon className="h-4 w-4 text-primary-700" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: login card */}
        <div className="flex flex-col justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-400 to-primary-600 opacity-20 blur-2xl" />
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
              {/* Mobile logo */}
              <div className="mb-6 flex flex-col items-center text-center lg:hidden">
                <BronAfonLogo />
                <h1 className="mt-4 text-2xl font-bold text-foreground">Bron Afon</h1>
                <p className="mt-1 text-sm text-muted-foreground">Community Housing</p>
              </div>

              <div className="hidden lg:block">
                <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Welcome back. Sign in to your account.
                </p>
              </div>
              <h2 className="sr-only lg:hidden">Sign in</h2>

              <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md">
                <svg className="h-5 w-5" viewBox="0 0 21 21" fill="currentColor" aria-hidden="true">
                  <path d="M0 0h10v10H0zM11 0h10v10H11zM0 11h10v10H0zM11 11h10v10H11z" />
                </svg>
                Sign in with Microsoft
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email or tenancy reference
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="sian.williams@example.com"
                    className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-primary-700 hover:text-primary-800">
                    Forgot password?
                  </a>
                </div>
                <Link
                  href="/dashboard"
                  className="mt-2 flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Sign in
                </Link>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                New tenant?{' '}
                <a href="#" className="font-medium text-primary-700 hover:text-primary-800">
                  Activate your account
                </a>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Bron Afon Community Housing · Powered by{' '}
            <span className="font-semibold text-primary-700">Hafan</span>
          </p>
        </div>
      </div>
    </main>
  );
}
