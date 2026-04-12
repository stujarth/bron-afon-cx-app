'use client';

import { useState, useCallback } from 'react';
import {
  Camera,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Wrench,
  ArrowRight,
} from 'lucide-react';

interface DiagnosticResult {
  issue: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  trade: string;
  quickFixes: string[];
  needsEngineer: boolean;
}

const MOCK_RESULTS: Record<string, DiagnosticResult> = {
  default: {
    issue: 'Possible plumbing leak — dripping tap or pipe joint',
    confidence: 87,
    severity: 'medium',
    trade: 'Plumber',
    quickFixes: [
      'Check if the tap is fully turned off',
      'Look under the sink for visible drips',
      'Place a towel or container to catch water',
      'Turn off the isolation valve if the leak is significant',
    ],
    needsEngineer: true,
  },
  mould: {
    issue: 'Surface mould / condensation damage detected',
    confidence: 92,
    severity: 'medium',
    trade: 'Damp & Mould Specialist',
    quickFixes: [
      'Improve ventilation — open windows daily for 15 minutes',
      'Use extractor fans when cooking or showering',
      'Clean surface mould with a mould spray (not bleach)',
      'Keep heating on low consistently rather than high intermittently',
    ],
    needsEngineer: true,
  },
};

export default function DiagnosticTool() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [analysisStep, setAnalysisStep] = useState('');

  const handleUpload = useCallback(() => {
    setUploadedImage('/images/demo-leak.jpg');
    setResult(null);
  }, []);

  const runDiagnostic = async () => {
    setIsAnalysing(true);
    setResult(null);

    const steps = [
      'Scanning image...',
      'Identifying issue type...',
      'Assessing severity...',
      'Generating recommendations...',
    ];

    for (const step of steps) {
      setAnalysisStep(step);
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
    }

    setResult(MOCK_RESULTS.default);
    setIsAnalysing(false);
    setAnalysisStep('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 text-primary-600" />
          <div>
            <p className="text-sm font-semibold text-primary-800">AI Diagnostic Tool</p>
            <p className="mt-0.5 text-xs text-primary-600">
              Upload a photo and our AI will try to identify the issue, suggest quick fixes,
              and recommend the right trade — before we send someone out.
            </p>
          </div>
        </div>
      </div>

      {/* Upload area */}
      {!uploadedImage ? (
        <button
          onClick={handleUpload}
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-10 transition-colors hover:border-primary-300 hover:bg-primary-50/50"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <Camera className="h-7 w-7 text-primary-600" />
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">
            Take a photo or upload an image
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG, JPG up to 10MB — our AI will analyse it
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white">
            <Upload className="h-4 w-4" />
            Choose file
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          {/* Uploaded image preview */}
          <div className="relative rounded-xl border border-border bg-muted/50 p-2">
            <div className="flex items-center gap-3 rounded-lg bg-card p-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">kitchen-tap-issue.jpg</p>
                <p className="text-xs text-muted-foreground">2.4 MB — uploaded just now</p>
              </div>
              <button
                onClick={() => { setUploadedImage(null); setResult(null); }}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Analyse button */}
          {!result && !isAnalysing && (
            <button
              onClick={runDiagnostic}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
            >
              <Lightbulb className="h-4 w-4" />
              Analyse with AI
            </button>
          )}

          {/* Analysing state */}
          {isAnalysing && (
            <div className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600" />
              <p className="mt-3 text-sm font-semibold text-primary-800">{analysisStep}</p>
              <div className="mx-auto mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-primary-100">
                <div className="h-full animate-pulse rounded-full bg-primary-500" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              {/* Diagnosis card */}
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-green-800">Issue Identified</p>
                    <p className="mt-1 text-sm text-green-700">{result.issue}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        {result.confidence}% confidence
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        result.severity === 'high' ? 'bg-red-100 text-red-700' :
                        result.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        <AlertTriangle className="h-3 w-3" />
                        {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} priority
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        <Wrench className="h-3 w-3" />
                        {result.trade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick fixes */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Try these quick fixes first
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.quickFixes.map((fix, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                        {i + 1}
                      </span>
                      {fix}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Still need help */}
              {result.needsEngineer && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-card-foreground">Still need help?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    If the quick fixes didn&apos;t resolve the issue, we&apos;ll send a {result.trade.toLowerCase()} to take a look.
                  </p>
                  <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                    Book a {result.trade}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
