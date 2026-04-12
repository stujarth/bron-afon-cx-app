'use client';

import {
  Trophy,
  Star,
  Flame,
  Target,
  Heart,
  Shield,
  Zap,
  Award,
  Gift,
  TrendingUp,
  CheckCircle2,
  Lock,
  Calendar,
  PoundSterling,
  Wrench,
  MessageSquare,
} from 'lucide-react';
import { Link } from '../../../../i18n/navigation';

const LEVELS = [
  { name: 'Bronze', min: 0, max: 100, color: 'from-amber-600 to-amber-700' },
  { name: 'Silver', min: 100, max: 250, color: 'from-gray-400 to-gray-500' },
  { name: 'Gold', min: 250, max: 500, color: 'from-yellow-500 to-amber-500' },
  { name: 'Platinum', min: 500, max: 1000, color: 'from-blue-400 to-indigo-500' },
  { name: 'Diamond', min: 1000, max: 2000, color: 'from-purple-400 to-pink-500' },
];

const BADGES = [
  { id: 'first-repair', name: 'First Fix', description: 'Report your first repair', icon: Wrench, earned: true, date: 'Jan 2026' },
  { id: 'rent-streak', name: 'Rent Star', description: '12 consecutive on-time payments', icon: PoundSterling, earned: true, date: 'Mar 2026' },
  { id: 'digital-native', name: 'Digital Native', description: 'Set up your online account', icon: Zap, earned: true, date: 'Jan 2026' },
  { id: 'feedback', name: 'Voice Heard', description: 'Complete a satisfaction survey', icon: MessageSquare, earned: true, date: 'Feb 2026' },
  { id: 'profile-complete', name: 'All Set', description: 'Complete your full profile', icon: CheckCircle2, earned: true, date: 'Jan 2026' },
  { id: 'community', name: 'Good Neighbour', description: 'Attend a community event', icon: Heart, earned: false, date: null },
  { id: 'green', name: 'Eco Warrior', description: 'Complete an energy efficiency survey', icon: Target, earned: false, date: null },
  { id: 'champion', name: 'Tenant Champion', description: 'Refer another tenant to the app', icon: Star, earned: false, date: null },
];

const POINTS_HISTORY = [
  { action: 'On-time rent payment', points: 10, date: '4 Apr', icon: PoundSterling },
  { action: 'Repair feedback submitted', points: 15, date: '2 Apr', icon: MessageSquare },
  { action: 'Profile updated', points: 5, date: '28 Mar', icon: CheckCircle2 },
  { action: 'On-time rent payment', points: 10, date: '28 Mar', icon: PoundSterling },
  { action: 'Used AI diagnostic', points: 20, date: '25 Mar', icon: Zap },
  { action: 'On-time rent payment', points: 10, date: '21 Mar', icon: PoundSterling },
  { action: 'Repair reported online', points: 15, date: '18 Mar', icon: Wrench },
];

export default function RewardsPage() {
  const currentPoints = 450;
  const currentLevel = LEVELS.find((l) => currentPoints >= l.min && currentPoints < l.max) || LEVELS[2];
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1];
  const progressInLevel = ((currentPoints - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
  const earnedBadges = BADGES.filter((b) => b.earned).length;
  const streak = 16;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Rewards & Achievements</h1>
        <div className="flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm font-bold text-primary-700">
          <Star className="h-4 w-4" />
          {currentPoints} pts
        </div>
      </div>

      {/* Level progress card */}
      <div className={`rounded-2xl bg-gradient-to-r ${currentLevel.color} p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Current Level</p>
            <h2 className="mt-1 text-3xl font-bold">{currentLevel.name}</h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Trophy className="h-8 w-8" />
          </div>
        </div>

        {nextLevel && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-white/80">
              <span>{currentPoints} points</span>
              <span>{nextLevel.min} for {nextLevel.name}</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-3 rounded-full bg-white transition-all duration-1000"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-white/80">
              {nextLevel.min - currentPoints} points to {nextLevel.name}
            </p>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Flame className="mx-auto h-6 w-6 text-orange-500" />
          <p className="mt-2 text-2xl font-bold text-card-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Week streak</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Award className="mx-auto h-6 w-6 text-primary-500" />
          <p className="mt-2 text-2xl font-bold text-card-foreground">{earnedBadges}/{BADGES.length}</p>
          <p className="text-xs text-muted-foreground">Badges</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <TrendingUp className="mx-auto h-6 w-6 text-green-500" />
          <p className="mt-2 text-2xl font-bold text-card-foreground">+85</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
      </div>

      {/* Badges */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Badges</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`relative rounded-xl border p-4 text-center transition-all ${
                badge.earned
                  ? 'border-primary-200 bg-card hover:shadow-md'
                  : 'border-border bg-muted/30 opacity-60'
              }`}
            >
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                badge.earned ? 'bg-primary-100' : 'bg-muted'
              }`}>
                {badge.earned ? (
                  <badge.icon className="h-6 w-6 text-primary-600" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <p className="mt-2 text-sm font-semibold text-card-foreground">{badge.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{badge.description}</p>
              {badge.earned && badge.date && (
                <p className="mt-1 text-[10px] text-primary-600">{badge.date}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Points history */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Points History</h2>
        <div className="rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border" role="list">
            {POINTS_HISTORY.map((item, i) => (
              <li key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
                    <item.icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">+{item.points}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to earn */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold text-card-foreground">How to Earn Points</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { action: 'Pay rent on time', points: 10, icon: PoundSterling },
            { action: 'Report repair online', points: 15, icon: Wrench },
            { action: 'Complete a survey', points: 15, icon: MessageSquare },
            { action: 'Use AI diagnostic', points: 20, icon: Zap },
            { action: 'Update your profile', points: 5, icon: CheckCircle2 },
            { action: 'Refer a neighbour', points: 50, icon: Gift },
          ].map((item) => (
            <div key={item.action} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-card-foreground">{item.action}</span>
              <span className="text-xs font-bold text-primary-600">+{item.points}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
