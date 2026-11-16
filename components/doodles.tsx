// Hand-drawn extras: coffee ring stains, a coffee-cherry branch and pen arrows. Decorative only,
// coloured by theme tokens (--stain, --leaf, --cherry, --pen) in app/tailwind.input.css.

/** A faint ring left by a cup set down on the paper. */
export function CoffeeRing({ className = '', size = 160 }: { className?: string; size?: number }) {
  return (
    <svg className={`pointer-events-none ${className}`} width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--stain)" style={{ filter: 'url(#ink-rough)' }}>
        <path d="M80 12c38 1 68 30 67 68-1 37-31 66-68 66S12 116 13 79 43 11 80 12z" strokeWidth="6" />
        <path d="M80 22c32 0 57 26 57 58s-26 56-58 56" strokeWidth="2.5" opacity=".7" />
        <path d="M30 120c-6-6-10-13-12-20" strokeWidth="9" opacity=".5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** A small coffee branch with leaves and ripe cherries. */
export function CherryBranch({ className = '' }: { className?: string }) {
  const line = { stroke: 'var(--art-line)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 220 120" aria-hidden="true" focusable="false">
      <path d="M6 96C50 84 92 70 130 52s58-34 82-44" fill="none" {...line} strokeWidth="2.4" />
      {[
        'M54 82c-6-22 6-40 26-46-2 22-10 38-26 46z',
        'M58 84c18 6 38 2 50-12-20-4-36 0-50 12z',
        'M120 56c-4-24 10-40 30-44-2 22-12 36-30 44z',
        'M126 58c20 4 38-4 48-20-20-2-36 6-48 20z',
        'M176 30c2-16 14-26 28-26-4 14-12 22-28 26z',
      ].map(d => (
        <g key={d}>
          <path d={d} fill="var(--leaf)" {...line} />
        </g>
      ))}
      <path d="M62 80l14-38M66 82l38-8M126 54l18-38M132 56l38-16" fill="none" stroke="var(--art-line)" strokeWidth="1" opacity=".45" />
      {[[92, 74], [101, 80], [96, 86], [152, 46], [160, 52], [154, 59], [166, 44]].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="6.5" fill="var(--cherry)" {...line} />
          <path d={`M${cx - 2.5} ${cy - 2.5}a3 3 0 0 1 3-1.5`} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/** A loose pen arrow. Point it with CSS rotation/flip utilities. */
export function PenArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 90 60" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--pen)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 52C20 50 44 40 58 26s20-16 24-18" />
        <path d="M66 8l17-1-6 15" />
      </g>
    </svg>
  );
}
