'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Accessibility, X, Type, Sun, Eye, Minus, Plus } from 'lucide-react';

const TEXT_SIZES = [
  { label: 'Small', value: 'text-sm', scale: '87.5%' },
  { label: 'Medium', value: 'text-base', scale: '100%' },
  { label: 'Large', value: 'text-lg', scale: '112.5%' },
  { label: 'Extra Large', value: 'text-xl', scale: '125%' },
];

export default function AccessibilityToolbar() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isWelsh = locale === 'cy';

  const [isOpen, setIsOpen] = useState(false);
  const [textSizeIndex, setTextSizeIndex] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hafan-a11y');
    if (saved) {
      const prefs = JSON.parse(saved);
      setTextSizeIndex(prefs.textSizeIndex ?? 1);
      setHighContrast(prefs.highContrast ?? false);
      setReducedMotion(prefs.reducedMotion ?? false);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = TEXT_SIZES[textSizeIndex].scale;

    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      html.style.setProperty('--animation-duration', '0s');
      html.classList.add('reduce-motion');
    } else {
      html.style.removeProperty('--animation-duration');
      html.classList.remove('reduce-motion');
    }

    localStorage.setItem('hafan-a11y', JSON.stringify({ textSizeIndex, highContrast, reducedMotion }));
  }, [textSizeIndex, highContrast, reducedMotion]);

  const resetAll = () => {
    setTextSizeIndex(1);
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={isWelsh ? 'Gosodiadau hygyrchedd' : 'Accessibility settings'}
        title={isWelsh ? 'Hygyrchedd' : 'Accessibility'}
      >
        <Accessibility className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-card p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-card-foreground">
                {isWelsh ? 'Hygyrchedd' : 'Accessibility'}
              </h2>
              <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Text size */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-card-foreground">
                  {isWelsh ? 'Maint testun' : 'Text size'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTextSizeIndex(Math.max(0, textSizeIndex - 1))}
                  disabled={textSizeIndex === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Decrease text size"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-sm font-medium text-card-foreground">
                    {TEXT_SIZES[textSizeIndex].label}
                  </span>
                </div>
                <button
                  onClick={() => setTextSizeIndex(Math.min(TEXT_SIZES.length - 1, textSizeIndex + 1))}
                  disabled={textSizeIndex === TEXT_SIZES.length - 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Increase text size"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* High contrast */}
            <div className="mb-3 flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-card-foreground">
                  {isWelsh ? 'Cyferbyniad uchel' : 'High contrast'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={highContrast}
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-primary-600' : 'bg-muted'
                }`}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                  highContrast ? 'translate-x-4.5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Reduced motion */}
            <div className="mb-4 flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-card-foreground">
                  {isWelsh ? 'Llai o symudiad' : 'Reduce motion'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={reducedMotion}
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  reducedMotion ? 'bg-primary-600' : 'bg-muted'
                }`}
              >
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                  reducedMotion ? 'translate-x-4.5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <button
              onClick={resetAll}
              className="w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {isWelsh ? 'Ailosod popeth' : 'Reset to defaults'}
            </button>
          </div>
        </>
      )}
    </>
  );
}
