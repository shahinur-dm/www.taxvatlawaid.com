'use client';

import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

interface AnnouncementBannerProps {
  enabled: boolean;
  text: string;
}

export function AnnouncementBanner({ enabled, text }: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!enabled || !text?.trim() || dismissed) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-midnight-950 border-b border-champagne-500/30 text-ivory-100 px-4 py-2 text-xs sm:text-[13px]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex h-2 w-2 rounded-full bg-champagne-400 animate-pulse shrink-0" />
          <Bell className="h-3.5 w-3.5 text-champagne-400 shrink-0 hidden sm:inline" />
          <p className="font-medium tracking-wide truncate sm:whitespace-normal text-ivory-100/95">
            {text}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide announcement"
          className="p-1 rounded hover:bg-white/10 text-champagne-300 transition-colors shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
