'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Bell,
  X,
  Wrench,
  PoundSterling,
  MessageSquare,
  Trophy,
  Mail,
  Smartphone,
  CheckCheck,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'repair' | 'rent' | 'message' | 'points';
  title: string;
  titleCy: string;
  body: string;
  bodyCy: string;
  time: string;
  timeCy: string;
  read: boolean;
  link: string;
  delivery: 'digital' | 'post';
}

const NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'repair', title: 'Engineer on the way', titleCy: 'Peiriannydd ar y ffordd', body: 'Dai Evans is heading to your property. ETA 2:00 PM.', bodyCy: "Mae Dai Evans yn dod i'ch eiddo. Cyrraedd 2:00 PM.", time: '11:42 AM', timeCy: '11:42 AM', read: false, link: '/dashboard/repairs/repair-1', delivery: 'digital' },
  { id: '2', type: 'message', title: 'New message from Sara Watkins', titleCy: 'Neges newydd gan Sara Watkins', body: 'RE: Leaking tap — REP-2026-0412', bodyCy: 'Ateb: Tap yn gollwng — REP-2026-0412', time: '11:42 AM', timeCy: '11:42 AM', read: false, link: '/dashboard/inbox', delivery: 'digital' },
  { id: '3', type: 'points', title: 'You earned 10 points!', titleCy: 'Enilloch 10 pwynt!', body: 'On-time rent payment — keep it up!', bodyCy: "Taliad rhent ar amser — daliwch ati!", time: '4 Apr', timeCy: '4 Ebr', read: true, link: '/dashboard/rewards', delivery: 'digital' },
  { id: '4', type: 'rent', title: 'Rent statement available', titleCy: 'Datganiad rhent ar gael', body: 'Your April rent statement is ready to view.', bodyCy: "Mae eich datganiad rhent Ebrill yn barod.", time: '1 Apr', timeCy: '1 Ebr', read: true, link: '/dashboard/rent', delivery: 'digital' },
  { id: '5', type: 'rent', title: 'Annual rent review letter', titleCy: 'Llythyr adolygiad rhent blynyddol', body: 'Sent by post — please check your letterbox.', bodyCy: "Wedi'i anfon drwy'r post — gwiriwch eich blwch llythyrau.", time: '28 Mar', timeCy: '28 Maw', read: true, link: '/dashboard/rent', delivery: 'post' },
  { id: '6', type: 'repair', title: 'Repair completed', titleCy: "Atgyweiriad wedi'i gwblhau", body: 'Window handle replacement — please rate your experience.', bodyCy: "Newid handlen ffenestr — rhowch sgôr i'ch profiad.", time: '25 Mar', timeCy: '25 Maw', read: true, link: '/dashboard/repairs/repair-2', delivery: 'digital' },
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'repair': return Wrench;
    case 'rent': return PoundSterling;
    case 'message': return MessageSquare;
    case 'points': return Trophy;
    default: return Bell;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'repair': return 'bg-blue-100 text-blue-700';
    case 'rent': return 'bg-green-100 text-green-700';
    case 'message': return 'bg-purple-100 text-purple-700';
    case 'points': return 'bg-amber-100 text-amber-700';
    default: return 'bg-muted text-muted-foreground';
  }
}

export default function NotificationCentre({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isWelsh = locale === 'cy';
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const today = notifications.filter((n) => n.time.includes('AM') || n.time.includes('PM'));
  const earlier = notifications.filter((n) => !n.time.includes('AM') && !n.time.includes('PM'));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="absolute right-0 top-full z-50 mt-2 w-[360px] max-h-[500px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h2 className="text-sm font-bold text-card-foreground">
              {isWelsh ? 'Hysbysiadau' : 'Notifications'}
            </h2>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} {isWelsh ? 'heb eu darllen' : 'unread'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="rounded-lg px-2 py-1 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-50"
              >
                <CheckCheck className="inline h-3 w-3 mr-1" />
                {isWelsh ? 'Darllen popeth' : 'Mark all read'}
              </button>
            )}
            <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="max-h-[400px] overflow-y-auto">
          {today.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isWelsh ? 'Heddiw' : 'Today'}
              </p>
              {today.map((n) => {
                const Icon = getTypeIcon(n.type);
                return (
                  <a
                    key={n.id}
                    href={`/${locale}${n.link}`}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50 ${
                      !n.read ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getTypeColor(n.type)}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
                        <p className={`truncate text-xs ${!n.read ? 'font-bold text-foreground' : 'font-medium text-card-foreground'}`}>
                          {isWelsh ? n.titleCy : n.title}
                        </p>
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {isWelsh ? n.bodyCy : n.body}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[10px] text-muted-foreground">{isWelsh ? n.timeCy : n.time}</span>
                      {n.delivery === 'post' ? (
                        <Mail className="h-3 w-3 text-muted-foreground" aria-label={isWelsh ? 'Drwy\'r post' : 'By post'} />
                      ) : (
                        <Smartphone className="h-3 w-3 text-muted-foreground" aria-label={isWelsh ? 'Digidol' : 'Digital'} />
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {earlier.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isWelsh ? 'Yn gynharach' : 'Earlier'}
              </p>
              {earlier.map((n) => {
                const Icon = getTypeIcon(n.type);
                return (
                  <a
                    key={n.id}
                    href={`/${locale}${n.link}`}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getTypeColor(n.type)}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium text-card-foreground">
                        {isWelsh ? n.titleCy : n.title}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {isWelsh ? n.bodyCy : n.body}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[10px] text-muted-foreground">{isWelsh ? n.timeCy : n.time}</span>
                      {n.delivery === 'post' ? (
                        <Mail className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Smartphone className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
