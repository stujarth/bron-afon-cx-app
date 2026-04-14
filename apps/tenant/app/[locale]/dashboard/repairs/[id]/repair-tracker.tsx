'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  User,
  Wrench,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react';

interface RepairStep {
  label: string;
  description: string;
  date: string | null;
  time: string | null;
  completed: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface RepairData {
  id: string;
  reference: string;
  title: string;
  description: string;
  category: string;
  priority: 'emergency' | 'urgent' | 'routine';
  assignedTo: string;
  assignedPhone: string;
  estimatedDate: string;
  address: string;
  steps: RepairStep[];
  microUpdates: { time: string; text: string; highlight?: boolean }[];
  appointment?: { date: string; slot: string };
}

const DEMO_REPAIR: RepairData = {
  id: 'repair-1',
  reference: 'REP-2026-0412',
  title: 'Leaking tap in kitchen',
  description: 'The kitchen tap has been dripping constantly. Water is pooling around the base of the tap and the hot water side is worse.',
  category: 'Plumbing',
  priority: 'routine',
  assignedTo: 'Dai Evans',
  assignedPhone: '07700 900456',
  estimatedDate: '2026-04-15T14:00:00',
  address: '14 Heol y Castell, Cwmbran',
  steps: [
    { label: 'Reported', description: 'You submitted this repair request', date: '10 Apr', time: '09:15', completed: true, icon: AlertCircle },
    { label: 'Assessed', description: 'Our team reviewed and categorised your repair', date: '10 Apr', time: '11:30', completed: true, icon: CheckCircle2 },
    { label: 'Scheduled', description: 'Appointment booked with our engineer', date: '11 Apr', time: '08:00', completed: true, icon: Calendar },
    { label: 'On the Way', description: 'Your engineer is heading to your property', date: '12 Apr', time: '13:45', completed: true, icon: MapPin },
    { label: 'Completed', description: 'Repair finished — please rate your experience', date: null, time: null, completed: false, icon: Star },
  ],
  microUpdates: [
    { time: '13:45', text: 'Dai Evans checked in at Cwmbran depot' },
    { time: '13:50', text: 'Parts confirmed: replacement tap washer + sealant' },
    { time: '13:55', text: 'Engineer left depot — heading to your property' },
    { time: '14:05', text: '10 minutes away from 14 Heol y Castell', highlight: true },
    { time: '14:12', text: '5 minutes away', highlight: true },
  ],
  appointment: { date: 'Tuesday 15 April', slot: 'PM (12:00 — 5:00 PM)' },
};

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Arriving soon');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <span>{timeLeft}</span>;
}

function ProgressBar({ steps }: { steps: RepairStep[] }) {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="relative">
      {/* Step dots */}
      <div className="relative flex justify-between">
        {steps.map((step, i) => {
          const isCurrent = step.completed && !steps[i + 1]?.completed;
          return (
            <div key={step.label} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  step.completed
                    ? isCurrent
                      ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                      : 'border-primary-500 bg-primary-500 text-white'
                    : 'border-muted bg-background text-muted-foreground'
                }`}
              >
                {step.completed ? (
                  isCurrent ? (
                    <step.icon className="h-5 w-5 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <p className={`mt-2 text-center text-xs font-medium ${
                step.completed ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress track */}
      <div className="absolute left-[5%] right-[5%] top-5 -translate-y-1/2">
        <div className="h-1 w-full rounded-full bg-muted">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function LiveStatusBanner({ repair }: { repair: RepairData }) {
  const currentStepIndex = repair.steps.findIndex((s) => !s.completed) - 1;
  const currentStep = repair.steps[Math.max(currentStepIndex, 0)];
  const isOnTheWay = currentStep?.label === 'On the Way';

  return (
    <div className={`rounded-xl p-4 ${
      isOnTheWay
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
        : 'bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isOnTheWay ? 'bg-green-100' : 'bg-primary-100'
        }`}>
          {isOnTheWay ? (
            <MapPin className="h-5 w-5 text-green-700 animate-bounce" />
          ) : (
            <Clock className="h-5 w-5 text-primary-700" />
          )}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${isOnTheWay ? 'text-green-800' : 'text-primary-800'}`}>
            {isOnTheWay ? 'Engineer on the way!' : `Status: ${currentStep?.label}`}
          </p>
          <p className={`text-xs ${isOnTheWay ? 'text-green-600' : 'text-primary-600'}`}>
            {isOnTheWay
              ? `${repair.assignedTo} is heading to ${repair.address}`
              : `Estimated: ${repair.estimatedDate.split('T')[0]}`
            }
          </p>
        </div>
        <div className={`text-right text-xs font-medium ${isOnTheWay ? 'text-green-700' : 'text-primary-700'}`}>
          <p className="text-lg font-bold">
            <CountdownTimer targetDate={repair.estimatedDate} />
          </p>
          <p>until arrival</p>
        </div>
      </div>
    </div>
  );
}

export default function RepairTracker({ repairId }: { repairId: string }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const repair = DEMO_REPAIR;

  const completedCount = repair.steps.filter((s) => s.completed).length;

  return (
    <div className="space-y-6">
      {/* Live status banner */}
      <LiveStatusBanner repair={repair} />

      {/* Horizontal progress tracker */}
      <div className="rounded-xl border border-border bg-card p-6">
        <ProgressBar steps={repair.steps} />
      </div>

      {/* Info grid */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wrench className="h-4 w-4" />
            <p className="text-xs">Reference</p>
          </div>
          <p className="mt-1 font-mono text-sm font-bold text-card-foreground">{repair.reference}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <p className="text-xs">Engineer</p>
          </div>
          <p className="mt-1 text-sm font-bold text-card-foreground">{repair.assignedTo}</p>
          <p className="text-xs text-muted-foreground">Plumbing Team</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <p className="text-xs">Estimated</p>
          </div>
          <p className="mt-1 text-sm font-bold text-card-foreground">15 Apr 2026</p>
          <p className="text-xs text-muted-foreground">2:00 PM</p>
        </div>
      </div>

      {/* Contact engineer */}
      <div className="flex gap-3">
        <a
          href={`tel:${repair.assignedPhone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4 text-green-600" />
          Call Engineer
        </a>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-muted">
          <MessageSquare className="h-4 w-4 text-primary-600" />
          Message
        </button>
      </div>

      {/* Timeline detail */}
      <div className="rounded-xl border border-border bg-card">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between p-4 text-sm font-semibold text-card-foreground"
        >
          <span>Repair Timeline ({completedCount}/{repair.steps.length} steps)</span>
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showDetails && (
          <div className="border-t border-border px-4 pb-4">
            <ol className="relative mt-4 space-y-0" aria-label="Repair timeline">
              {repair.steps.map((step, index) => {
                const isLast = index === repair.steps.length - 1;
                const isCurrent = step.completed && !repair.steps[index + 1]?.completed;

                return (
                  <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {!isLast && (
                      <div
                        className={`absolute left-[15px] top-[30px] h-[calc(100%-6px)] w-0.5 ${
                          step.completed ? 'bg-primary-500' : 'bg-muted'
                        }`}
                        aria-hidden="true"
                      />
                    )}

                    <div className="relative z-10 flex-shrink-0">
                      {step.completed ? (
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isCurrent ? 'bg-primary-600 shadow-lg shadow-primary-600/30' : 'bg-primary-500'
                        } text-white`}>
                          <step.icon className={`h-4 w-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                          <Circle className="h-4 w-4 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                      {step.date && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {step.date} at {step.time}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>

      {/* Appointment slot */}
      {repair.appointment && (
        <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary-700">Your Appointment</p>
              <p className="mt-1 text-sm font-bold text-foreground">{repair.appointment.date}</p>
              <p className="text-xs text-muted-foreground">{repair.appointment.slot}</p>
            </div>
            <button className="rounded-lg border border-primary-200 bg-white px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100">
              Reschedule
            </button>
          </div>
        </div>
      )}

      {/* Live micro-updates */}
      {repair.microUpdates.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live Updates
          </h3>
          <div className="mt-3 space-y-2">
            {repair.microUpdates.map((update, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg p-2.5 text-sm ${
                  update.highlight
                    ? 'bg-green-50 text-green-800 font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                <span className="shrink-0 font-mono text-xs">{update.time}</span>
                <span className={`h-1 w-1 shrink-0 rounded-full ${
                  update.highlight ? 'bg-green-500' : 'bg-muted-foreground/40'
                }`} />
                <span>{update.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Repair details */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-card-foreground">Repair Details</h3>
        <p className="mt-2 text-sm text-muted-foreground">{repair.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {repair.category}
          </span>
          <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            {repair.priority.charAt(0).toUpperCase() + repair.priority.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
