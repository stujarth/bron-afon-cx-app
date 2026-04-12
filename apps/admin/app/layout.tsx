import type { Metadata } from 'next';
import '../tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Hafan Admin',
    default: 'Hafan Admin — Housing Management',
  },
  description: 'Admin dashboard for managing social housing operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
