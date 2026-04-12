import { useTranslations } from 'next-intl';
import { ArrowLeft, Camera, Upload } from 'lucide-react';
import { Link } from '../../../../../i18n/navigation';

export default function NewRepairPage() {
  const t = useTranslations('repairs.form');

  const categories = [
    'Plumbing',
    'Electrical',
    'Heating',
    'Windows & Doors',
    'Damp & Mould',
    'Roof & Gutters',
    'Kitchen',
    'Bathroom',
    'Garden & External',
    'Other',
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/repairs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to repairs
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
      </div>

      <form className="space-y-6">
        {/* Category */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">{t('category')}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-2.5 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700"
              >
                <input type="radio" name="category" value={cat} className="sr-only" />
                {cat}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
            {t('title')}
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Leaking tap in kitchen"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
            {t('description')}
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Please describe the issue in detail..."
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Photo upload */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t('uploadPhotos')}
          </label>
          <p className="mb-3 text-sm text-muted-foreground">{t('uploadDesc')}</p>
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 transition-colors hover:border-primary-300 hover:bg-primary-50/50">
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <p className="mt-2 text-sm font-medium text-foreground">
                Take a photo or upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG up to 10MB
              </p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                Choose files
              </button>
            </div>
          </div>
        </div>

        {/* Priority */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">{t('priority')}</legend>
          <div className="space-y-2">
            {[
              { value: 'routine', label: 'Routine', desc: 'Can wait a few days' },
              { value: 'urgent', label: 'Urgent', desc: 'Needs attention soon' },
              { value: 'emergency', label: 'Emergency', desc: 'Immediate risk to safety' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50"
              >
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  defaultChecked={option.value === 'routine'}
                  className="h-4 w-4 text-primary-600"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          {t('submitRepair')}
        </button>
      </form>
    </div>
  );
}
