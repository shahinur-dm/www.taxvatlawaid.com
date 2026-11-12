'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const WHATSAPP_URL =
  'https://wa.me/8801614446444?text=Hello%20TaxVat%20LawAid%2C%20I%20would%20like%20to%20know%20more%20about%20your%20legal%20services.';

export function FloatingWhatsAppButton() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-[18px] right-[18px] md:bottom-7 md:right-7 z-40 pointer-events-none">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]/35 animate-[ping_2.8s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:animate-none"
        />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          className="pointer-events-auto relative flex h-14 w-14 md:h-[58px] md:w-[58px] items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white ring-2 ring-white/95 shadow-[0_10px_28px_-4px_rgba(37,211,102,0.55),0_4px_12px_rgba(16,27,45,0.25)] transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-7 w-7 md:h-8 md:w-8 fill-current"
          >
            <path d="M16.002 3.2c-7.058 0-12.8 5.742-12.8 12.8 0 2.256.592 4.46 1.716 6.404L3.1 29.04l6.81-1.786a12.74 12.74 0 0 0 6.092 1.548h.006c7.056 0 12.796-5.742 12.796-12.8 0-3.42-1.332-6.634-3.75-9.052A12.715 12.715 0 0 0 16.002 3.2zm0 23.43h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-4.042 1.06 1.08-3.94-.252-.402a10.567 10.567 0 0 1-1.622-5.638c0-5.864 4.77-10.634 10.636-10.634 2.84 0 5.51 1.106 7.516 3.116a10.562 10.562 0 0 1 3.116 7.52c0 5.864-4.772 10.628-10.636 10.628zm5.834-7.96c-.32-.16-1.894-.934-2.188-1.042-.294-.106-.508-.16-.72.16-.214.32-.828 1.042-1.014 1.256-.186.214-.374.24-.694.08-.32-.16-1.352-.498-2.574-1.588-.952-.85-1.594-1.898-1.78-2.218-.188-.32-.02-.494.14-.654.144-.144.32-.374.48-.56.16-.188.214-.32.32-.534.106-.214.054-.4-.026-.56-.08-.16-.72-1.736-.988-2.376-.26-.624-.524-.54-.72-.55l-.614-.01c-.214 0-.56.08-.854.4-.294.32-1.12 1.096-1.12 2.67 0 1.576 1.148 3.098 1.308 3.312.16.214 2.258 3.448 5.47 4.834.764.33 1.36.526 1.826.674.766.244 1.464.21 2.016.126.614-.092 1.894-.774 2.16-1.522.268-.748.268-1.388.188-1.522-.08-.134-.294-.214-.614-.374z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

