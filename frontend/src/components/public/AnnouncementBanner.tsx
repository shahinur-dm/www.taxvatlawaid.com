'use client';

import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

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
      className="bg-amber-50 border-b border-amber-200 text-amber-950 px-4 py-2 text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-600 animate-pulse shrink-0" />
          <Megaphone className="h-4 w-4 text-amber-700 shrink-0 hidden sm:inline" />
          <p className="font-medium truncate sm:whitespace-normal">{text}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide announcement"
          className="p-1 rounded hover:bg-amber-200/60 text-amber-800 transition-colors shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

