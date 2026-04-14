'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import NotificationCentre from './notification-centre';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary-500 ring-2 ring-background" />
      </button>
      <NotificationCentre isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
