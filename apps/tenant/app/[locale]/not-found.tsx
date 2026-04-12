import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/(dashboard)"
          className="mt-6 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
