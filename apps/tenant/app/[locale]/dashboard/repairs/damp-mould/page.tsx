import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';
import DampMouldForm from './damp-mould-form';

export async function generateMetadata() {
  const t = await getTranslations('dampMould');
  return { title: t('title') };
}

export default async function DampMouldPage() {
  const t = await getTranslations('dampMould');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/repairs/new"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary-700 underline underline-offset-2 hover:no-underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('back')}
      </Link>

      <header>
        <h1 className="text-3xl font-extrabold text-foreground">{t('title')}</h1>
        <p className="mt-2 text-base text-muted-foreground">{t('intro')}</p>
      </header>

      <DampMouldForm />
    </div>
  );
}
