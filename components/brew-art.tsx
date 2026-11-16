import type { ReactNode } from 'react';
import type { Method } from '../content/coffee';

// Little ink drawings for brew methods, on a 64×64 grid. Every colour is a theme token
// (--art-* in app/tailwind.input.css), so the drawings switch with light and dark mode.

const line = { stroke: 'var(--art-line)', strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const thin = { ...line, strokeWidth: 1.4 } as const;

function Steam({ x = 32, y = 14 }: { x?: number; y?: number }) {
  return (
    <g className="steam" fill="none" stroke="var(--art-steam)" strokeWidth="2" strokeLinecap="round">
      <path d={`M${x - 6} ${y + 8}c-3-3 3-5 0-9`} />
      <path d={`M${x} ${y + 6}c-3-3 3-5 0-9`} />
      <path d={`M${x + 6} ${y + 8}c-3-3 3-5 0-9`} />
    </g>
  );
}

function Drips({ x = 32, y = 36 }: { x?: number; y?: number }) {
  return (
    <>
      <ellipse className="drip" cx={x} cy={y} rx="1.3" ry="1.8" fill="var(--art-coffee)" />
      <ellipse className="drip" cx={x} cy={y} rx="1.3" ry="1.8" fill="var(--art-coffee)" />
    </>
  );
}

const saucer = <ellipse cx="31" cy="53" rx="21" ry="4.5" fill="var(--art-fill)" {...line} />;

const drawings: Record<Method, () => ReactNode> = {
  espresso: () => (
    <>
      {saucer}
      <path d="M43 37.5c6.5 0 6.5 8-1 8" fill="none" {...line} strokeWidth="2.6" />
      <path d="M18 34h26v3.5c0 7.5-5 12-11.5 12h-3C23 49.5 18 45 18 37.5z" fill="var(--art-fill)" {...line} />
      <ellipse cx="31" cy="34" rx="13" ry="3.2" fill="var(--art-crema)" {...line} />
      <path d="M26 33.6c2.5 1 6.5 1.2 9.5-.2" fill="none" stroke="var(--art-coffee)" strokeWidth="1.3" strokeLinecap="round" />
      <Steam x={31} y={14} />
    </>
  ),
  milk: () => (
    <>
      {saucer}
      <path d="M46 34c8 0 8 10 0 10" fill="none" {...line} strokeWidth="2.6" />
      <path d="M13 30h36v4.5C49 44 42 50.5 33 50.5h-4C20 50.5 13 44 13 34.5z" fill="var(--art-fill)" {...line} />
      <ellipse cx="31" cy="30" rx="18" ry="4.2" fill="var(--art-crema)" {...line} />
      <path d="M31 33c-3.6-2.2-5.4-3.8-3.4-5.1 1.5-.9 3.4.3 3.4 1.3 0-1 1.9-2.2 3.4-1.3 2 1.3.2 2.9-3.4 5.1z" fill="var(--art-milk)" />
      <Steam x={31} y={10} />
    </>
  ),
  'pour-over': () => (
    <>
      <path d="M20 37h24v12c0 4-3 6.5-7 6.5H27c-4 0-7-2.5-7-6.5z" fill="var(--art-glass)" {...line} />
      <path d="M21 47h22v2c0 3.5-2.5 5.5-6 5.5H27c-3.5 0-6-2-6-5.5z" fill="var(--art-coffee)" />
      <Drips x={32} y={38} />
      <rect x="22" y="31.5" width="20" height="3.5" rx="1" fill="var(--art-fill)" {...line} />
      <path d="M14 10h36L39 31.5H25z" fill="var(--art-fill)" {...line} />
      <path d="M17 10.5h30l-1.8 3.5H18.8z" fill="var(--art-paper)" />
      <path d="M27 15l3 13M33 15l-.5 13M39 15l-4 13" fill="none" {...thin} opacity=".45" />
      <path d="M48 16c5 0 6 6 1.5 8" fill="none" {...line} />
    </>
  ),
  chemex: () => (
    <>
      <path d="M17 7h30L36 29l12 21c1.6 3-.4 6-4 6H20c-3.6 0-5.6-3-4-6l12-21z" fill="var(--art-glass)" {...line} />
      <path d="M19 8h26l-9.5 19h-7z" fill="var(--art-paper)" />
      <path d="M18 47.5h28l1.6 3c1.2 2.4-.4 4.5-3.2 4.5H19.6c-2.8 0-4.4-2.1-3.2-4.5z" fill="var(--art-coffee)" />
      <Drips x={32} y={34} />
      <path d="M26.5 25h11l2.6 9h-16.2z" fill="var(--art-wood)" {...line} />
      <path d="M32 34.5l-2.5 6M32 34.5l2 5.5" fill="none" {...thin} />
      <circle cx="29.3" cy="41" r="1.6" fill="var(--art-wood)" {...thin} />
    </>
  ),
  aeropress: () => (
    <>
      <path d="M17 44h28v6c0 3.5-2.5 6-6 6H23c-3.5 0-6-2.5-6-6z" fill="var(--art-fill)" {...line} />
      <path d="M45 46.5c5 0 5 6.5 0 6.5" fill="none" {...line} strokeWidth="2.4" />
      <rect x="20" y="3.5" width="22" height="4.5" rx="2" fill="var(--art-fill)" {...line} />
      <rect x="23" y="8" width="16" height="12" fill="var(--art-fill)" {...line} />
      <rect x="21" y="16" width="20" height="25" rx="1.5" fill="var(--art-glass)" {...line} />
      <rect x="22.2" y="28" width="17.6" height="12" fill="var(--art-coffee)" />
      <path d="M24 21h4M24 25h4M24 29h4" {...thin} opacity=".6" />
      <rect x="19" y="40" width="24" height="4.5" rx="1.5" fill="var(--art-metal)" {...line} />
    </>
  ),
  'french-press': () => (
    <>
      <path d="M32 3.5v12" {...line} />
      <circle cx="32" cy="4" r="2.6" fill="var(--art-fill)" {...line} />
      <rect x="17" y="13.5" width="27" height="4.5" rx="1.5" fill="var(--art-metal)" {...line} />
      <path d="M44 22h3.5c3 0 4.5 2 4.5 5v15c0 3-1.5 5-4.5 5H44" fill="none" {...line} strokeWidth="2.6" />
      <rect x="18.5" y="18" width="24" height="36" rx="2" fill="var(--art-glass)" {...line} />
      <rect x="19.6" y="28" width="21.8" height="25" rx="1" fill="var(--art-coffee)" />
      <path d="M20 27.5h21" stroke="var(--art-crema)" strokeWidth="2.4" />
      <path d="M18.5 50h24M18.5 22h24" {...thin} />
      <path d="M15 56.5h31" {...line} />
    </>
  ),
  batch: () => (
    <>
      <path d="M9 57h46" {...line} />
      <rect x="10" y="7" width="12" height="49" rx="2" fill="var(--art-fill)" {...line} />
      <rect x="10" y="7" width="42" height="11" rx="2" fill="var(--art-fill)" {...line} />
      <path d="M26 18h20l-3 6H29z" fill="var(--art-metal)" {...line} />
      <Drips x={36} y={27} />
      <path d="M27 30h18v20c0 3-2 5-5 5h-8c-3 0-5-2-5-5z" fill="var(--art-glass)" {...line} />
      <path d="M28 40h16v10c0 2.4-1.6 4-4 4h-8c-2.4 0-4-1.6-4-4z" fill="var(--art-coffee)" />
      <path d="M45 33h3c2 0 3 1.5 3 3.5v6" fill="none" {...line} />
      <circle cx="16" cy="13" r="1.6" fill="var(--art-crema)" />
    </>
  ),
  'cold-brew': () => (
    <>
      <rect x="19" y="5.5" width="26" height="6.5" rx="1.5" fill="var(--art-metal)" {...line} />
      <path d="M21 12h22v3c4 1.5 6 4 6 8v26c0 4-3 7-7 7H22c-4 0-7-3-7-7V23c0-4 2-6.5 6-8z" fill="var(--art-glass)" {...line} />
      <path d="M16.2 27h31.6v22c0 3.4-2.5 5.8-5.8 5.8H22c-3.3 0-5.8-2.4-5.8-5.8z" fill="var(--art-coffee)" />
      <rect x="21" y="23" width="9" height="9" rx="1.5" fill="var(--art-ice)" {...thin} transform="rotate(-12 25.5 27.5)" />
      <rect x="32" y="25" width="9" height="9" rx="1.5" fill="var(--art-ice)" {...thin} transform="rotate(14 36.5 29.5)" />
      <rect x="26" y="34" width="8" height="8" rx="1.5" fill="var(--art-ice)" {...thin} transform="rotate(6 30 38)" opacity=".8" />
      <path d="M19 19v6" stroke="var(--art-ice)" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  tea: () => (
    <>
      <path d="M44 31c7-1 9 4 6 9-1.6 2.6-4 3.6-6 3.6" fill="none" {...line} strokeWidth="2.6" />
      <path d="M17 35c-5-1.5-9-6-10-10 3 0 6 2.5 8.5 6" fill="var(--art-fill)" {...line} />
      <ellipse cx="30" cy="40" rx="16" ry="13.5" fill="var(--art-fill)" {...line} />
      <path d="M18 30.5c4 2 20 2 24 0" fill="none" {...line} />
      <path d="M22 28c1-4 15-4 16 0" fill="var(--art-crema)" {...line} />
      <circle cx="30" cy="23" r="2.6" fill="var(--art-crema)" {...line} />
      <path d="M17 44c5 2.5 21 2.5 26 0" fill="none" stroke="var(--art-crema)" strokeWidth="2.4" strokeLinecap="round" />
      <Steam x={30} y={4} />
    </>
  ),
  cocoa: () => (
    <>
      <path d="M44 30c8 0 8 13 0 13" fill="none" {...line} strokeWidth="3" />
      <path d="M16 24h29v24c0 4-3 7-7 7H23c-4 0-7-3-7-7z" fill="var(--art-fill)" {...line} />
      <ellipse cx="30.5" cy="24" rx="14.5" ry="3.6" fill="var(--art-coffee)" {...line} />
      <rect x="25" y="19.5" width="8" height="6" rx="2" fill="var(--art-paper)" {...thin} transform="rotate(-10 29 22.5)" />
      <path d="M16 40h29" stroke="var(--art-crema)" strokeWidth="2.4" />
      <Steam x={31} y={3} />
    </>
  ),
  pastry: () => (
    <>
      <ellipse cx="32" cy="50" rx="24" ry="4" fill="var(--art-disc)" opacity=".7" />
      <path d="M8 42c1-13 12-22 24-22s23 9 24 22c-4 2.5-9 1-11-2-2.5 4-8 5.5-13 5.5s-10.5-1.5-13-5.5c-2 3-7 4.5-11 2z" fill="var(--art-pastry)" {...line} />
      <path d="M19 40.5c1-6 3-11 6-15M27 45c0-7 1-14 3-19.5M37 45c0-7-1-14-3-19.5M45 40.5c-1-6-3-11-6-15" fill="none" {...thin} opacity=".75" />
      <path d="M22 29c3-2 6-3 9-3.4" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
};

/** Drawing for a brew method on a small stamped disc. Decorative: always paired with visible text. */
export function BrewArt({ method, size = 64, className = '' }: { method: Method; size?: number; className?: string }) {
  return (
    <span className={`brew-art ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">{drawings[method]()}</svg>
    </span>
  );
}
