import React from 'react';

export function KalamLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kalam 2026 Logo"
    >
      <defs>
        <filter id="block-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="black" floodOpacity="0.8" />
        </filter>
      </defs>
      
      {/* KALAM is main text */}
      <text
        x="0"
        y="85"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="100"
        fontWeight="900"
        fill="#2E8B57"
        filter="url(#block-shadow)"
        letterSpacing="4"
      >
        KALAM
      </text>

      {/* 2026 is vertical text on the right */}
      <text
        x="310"
        y="10"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="45"
        fontWeight="900"
        fill="#2E8B57"
        filter="url(#block-shadow)"
        transform="rotate(90, 310, 10)"
        textAnchor="start"
        letterSpacing="4"
      >
        2026
      </text>
    </svg>
  );
}
