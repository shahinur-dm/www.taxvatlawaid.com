'use client';

import React, { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'option',
  'optgroup',
  'label',
  'summary',
  'details',
  'iframe',
  'video',
  'audio',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="option"]',
  '[role="tab"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="combobox"]',
  '[role="textbox"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
  '[onclick]',
  '.cursor-pointer',
  '.cursor-text',
  '[data-interactive]',
  '.recharts-wrapper',
].join(', ');

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!target) return false;
  const el =
    target instanceof Element
      ? target
      : target instanceof Node
        ? target.parentElement
        : null;
  if (!el) return false;

  if (el.closest(INTERACTIVE_SELECTOR)) {
    return true;
  }

  let current: Element | null = el;
  for (let depth = 0; depth < 6 && current; depth++) {
    if (current instanceof HTMLElement && current.style?.cursor === 'pointer') {
      return true;
    }
    current = current.parentElement;
  }

  return false;
}

export function CustomGavelCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluateCapability = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    evaluateCapability();
    pointerQuery.addEventListener('change', evaluateCapability);
    motionQuery.addEventListener('change', evaluateCapability);

    return () => {
      pointerQuery.removeEventListener('change', evaluateCapability);
      motionQuery.removeEventListener('change', evaluateCapability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('gavel-cursor-active');
      return;
    }

    let rafId: number | null = null;
    let pointerX = -100;
    let pointerY = -100;
    let isInsideViewport = false;
    let isInteractive = false;
    let isTouchOverride = false;
    let lastShownState = false;

    const syncCursorVisibility = () => {
      const el = cursorRef.current;
      const shouldShow =
        isInsideViewport && !isInteractive && !isTouchOverride;

      if (shouldShow !== lastShownState) {
        lastShownState = shouldShow;
        document.documentElement.classList.toggle('gavel-cursor-active', shouldShow);
      }

      if (el) {
        el.style.opacity = shouldShow ? '1' : '0';
      }
    };

    const schedulePositionUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const el = cursorRef.current;
        if (!el) return;
        el.style.transform = `translate3d(${pointerX - 8}px, ${pointerY - 8}px, 0)`;
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        isTouchOverride = true;
        syncCursorVisibility();
        return;
      }

      isTouchOverride = false;
      pointerX = e.clientX;
      pointerY = e.clientY;

      const onScrollbarEdge =
        e.clientX >= document.documentElement.clientWidth ||
        e.clientY >= document.documentElement.clientHeight ||
        e.clientX < 0 ||
        e.clientY < 0;

      isInsideViewport = !onScrollbarEdge;
      isInteractive = onScrollbarEdge ? false : isInteractiveTarget(e.target);

      syncCursorVisibility();
      if (isInsideViewport) {
        schedulePositionUpdate();
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isInteractive = isInteractiveTarget(e.target);
      syncCursorVisibility();
    };

    const handleScroll = () => {
      if (!isInsideViewport || pointerX < 0 || pointerY < 0) return;
      const underPointer = document.elementFromPoint(pointerX, pointerY);
      isInteractive = isInteractiveTarget(underPointer);
      syncCursorVisibility();
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isInsideViewport = false;
        syncCursorVisibility();
      }
    };

    const handleHide = () => {
      isInsideViewport = false;
      syncCursorVisibility();
    };

    const handleTouchStart = () => {
      isTouchOverride = true;
      syncCursorVisibility();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleHide();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('blur', handleHide);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      document.documentElement.classList.remove('gavel-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', handleHide);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-testid="custom-gavel-cursor"
      className="fixed left-0 top-0 pointer-events-none z-[9999] select-none transition-opacity duration-75 ease-out will-change-transform"
      style={{
        opacity: 0,
        transform: 'translate3d(-100px, -100px, 0)',
        width: '40px',
        height: '40px',
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width="40"
        height="40"
        className="w-10 h-10 overflow-visible"
        style={{
          filter: 'drop-shadow(0 3px 5px rgba(10, 18, 34, 0.36))',
        }}
      >
        <defs>
          {/* Rich redwood / mahogany cylinder shading for gavel caps & handle */}
          <linearGradient id="gavelWoodHead" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E1533C" />
            <stop offset="32%" stopColor="#B8291E" />
            <stop offset="72%" stopColor="#851710" />
            <stop offset="100%" stopColor="#560D08" />
          </linearGradient>

          <linearGradient id="gavelHandleWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E65942" />
            <stop offset="30%" stopColor="#BF2F22" />
            <stop offset="75%" stopColor="#8A1811" />
            <stop offset="100%" stopColor="#540C07" />
          </linearGradient>

          {/* Polished metallic gold band on mallet center */}
          <linearGradient id="gavelGoldBand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF6C4" />
            <stop offset="22%" stopColor="#F5C954" />
            <stop offset="55%" stopColor="#D49428" />
            <stop offset="85%" stopColor="#A66A14" />
            <stop offset="100%" stopColor="#7C4B09" />
          </linearGradient>
        </defs>

        {/* Judge's Gavel angled diagonally matching reference (mallet top-left, handle bottom-right) */}
        <g transform="rotate(-38 25 25)">
          {/* Handle socket neck */}
          <rect
            x="22.5"
            y="24"
            width="5"
            height="7"
            rx="1.2"
            fill="url(#gavelHandleWood)"
            stroke="#4D0A06"
            strokeWidth="0.6"
          />

          {/* Main turned mahogany handle */}
          <path
            d="M23.1,30 L26.9,30 L27.7,51.5 C27.8,54.2 26.6,55.8 25,55.8 C23.4,55.8 22.2,54.2 22.3,51.5 Z"
            fill="url(#gavelHandleWood)"
            stroke="#4D0A06"
            strokeWidth="0.6"
          />

          {/* Turned ornamental grip collar along handle */}
          <rect
            x="21.2"
            y="33.2"
            width="7.6"
            height="3.2"
            rx="1.6"
            fill="url(#gavelHandleWood)"
            stroke="#4D0A06"
            strokeWidth="0.55"
          />
          <rect
            x="22"
            y="36.8"
            width="6"
            height="1.8"
            rx="0.9"
            fill="url(#gavelGoldBand)"
            stroke="#6E4207"
            strokeWidth="0.4"
          />

          {/* Handle specular wood sheen */}
          <path
            d="M23.9,38.8 L24.8,38.8 L24.5,53.2 C24,53.2 23.7,52.2 23.7,51 Z"
            fill="rgba(255,220,200,0.34)"
          />

          {/* Left mallet cap (wood cylinder + rounded striking face) */}
          <rect
            x="8"
            y="10.2"
            width="6.5"
            height="14.6"
            rx="2.6"
            fill="url(#gavelWoodHead)"
            stroke="#4D0A06"
            strokeWidth="0.65"
          />
          <rect
            x="9.2"
            y="11.5"
            width="1.6"
            height="12"
            rx="0.8"
            fill="rgba(255,215,195,0.28)"
          />

          {/* Right mallet cap */}
          <rect
            x="35.5"
            y="10.2"
            width="6.5"
            height="14.6"
            rx="2.6"
            fill="url(#gavelWoodHead)"
            stroke="#4D0A06"
            strokeWidth="0.65"
          />
          <rect
            x="39.2"
            y="11.5"
            width="1.4"
            height="12"
            rx="0.7"
            fill="rgba(255,215,195,0.22)"
          />

          {/* Central metallic gold mallet barrel */}
          <rect
            x="14.2"
            y="11.2"
            width="21.6"
            height="12.6"
            rx="1.4"
            fill="url(#gavelGoldBand)"
            stroke="#6E4207"
            strokeWidth="0.65"
          />

          {/* Crisp inner bevel rings framing the gold center */}
          <line
            x1="16"
            y1="11.6"
            x2="16"
            y2="23.4"
            stroke="rgba(255,248,210,0.65)"
            strokeWidth="0.8"
          />
          <line
            x1="34"
            y1="11.6"
            x2="34"
            y2="23.4"
            stroke="rgba(124,75,9,0.55)"
            strokeWidth="0.8"
          />

          {/* Bright polished gold highlight stripe */}
          <rect
            x="16.5"
            y="13.2"
            width="17"
            height="2.6"
            rx="1.3"
            fill="rgba(255,252,230,0.72)"
          />
        </g>
      </svg>
    </div>
  );
}

