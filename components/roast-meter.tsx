import { ROAST_LABELS, ROASTS, roastLevel, type Roast } from '../content/coffee';

/** One bean of the meter, drawn filled or as an outline. */
function Bean({ filled, level }: { filled: boolean; level: number }) {
  return (
    <svg viewBox="0 0 14 18" className="h-[1.05em] w-[.82em]" aria-hidden="true" focusable="false">
      <ellipse cx="7" cy="9" rx="5.6" ry="7.6" transform="rotate(14 7 9)"
        fill={filled ? `var(--roast-${level})` : 'var(--roast-empty)'} stroke={filled ? 'var(--roast-5)' : 'var(--rule)'} strokeWidth="1.2" />
      <path d="M5.2 2.8c3.4 3 -1.4 7.2 3 12.4" fill="none" stroke={filled ? 'rgba(0,0,0,.45)' : 'var(--rule)'} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/** Light → dark roast level drawn as five beans filling in. */
export function RoastMeter({ roast, showLabel = true, className = '' }: { roast: Roast; showLabel?: boolean; className?: string }) {
  const level = roastLevel(roast);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex gap-0.5" role="img" aria-label={`Roast: ${ROAST_LABELS[roast]}, ${level} of ${ROASTS.length}`}>
        {ROASTS.map((_, index) => <Bean key={index} filled={index < level} level={level} />)}
      </span>
      {showLabel ? <span className="label-text text-[.68rem]" aria-hidden="true">{ROAST_LABELS[roast]}</span> : null}
    </span>
  );
}
