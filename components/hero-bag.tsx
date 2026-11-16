import type { CSSProperties } from 'react';
import { cafe } from '../content/cafe';
import { beans, featuredBean, FLAVOUR_FAMILIES, originLine, PROCESSES } from '../content/coffee';
import { PenArrow } from './doodles';
import { RoastMeter } from './roast-meter';

// Scattered beans at the foot of the bag: [x, y, rotation].
const SCATTER: [number, number, number][] = [
  [104, 556, 24], [132, 575, -34], [78, 581, 78], [196, 584, 32], [356, 586, -52], [252, 592, 96],
];

function Bean({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <ellipse rx="9.5" ry="13" fill="var(--bean)" />
      <path d="M-3 -11c7 5-3 12 3 22" fill="none" stroke="var(--bean-crease)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-6.5 -5c-1 3-1 6 0 9" fill="none" stroke="var(--bean-shine)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/**
 * The home page illustration: a stand-up coffee bag whose label shows the featured coffee from
 * content/coffee.ts, with an espresso cup, scattered beans and a roaster's stamp. The label is HTML
 * over the drawing so long names wrap; every colour is a token, so the bag is kraft by day and
 * matte black by night.
 */
export function HeroBag() {
  const bean = featuredBean;
  const number = String(beans.indexOf(bean) + 1).padStart(2, '0');
  const summary = `${cafe.name} coffee bag. Featured coffee: ${bean.name}, ${bean.country}, ${PROCESSES[bean.process].label.toLowerCase()} process, tasting of ${bean.notes.map(note => note.note.toLowerCase()).join(', ')}.`;
  const stampText = `Roasted in ${cafe.address.locality} ✦ Small batch ✦ `.toUpperCase();

  return (
    <div className="hero-art" role="img" aria-label={summary}>
      <svg viewBox="0 0 560 610" aria-hidden="true" focusable="false">
        <defs>
          <path id="stamp-circle" d="M0 0m-49 0a49 49 0 1 1 98 0a49 49 0 1 1 -98 0" />
          <linearGradient id="bag-fold" x1="0" x2="1">
            <stop offset="0" stopColor="var(--bag-shade)" stopOpacity=".55" />
            <stop offset=".14" stopColor="var(--bag-shade)" stopOpacity="0" />
            <stop offset=".55" stopColor="var(--bag-light)" stopOpacity=".35" />
            <stop offset=".86" stopColor="var(--bag-shade)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--bag-shade)" stopOpacity=".7" />
          </linearGradient>
        </defs>

        <ellipse cx="282" cy="560" rx="180" ry="13" fill="#000" opacity=".16" />

        {/* Bag */}
        <path d="M156 128H404C408 260 414 420 420 528Q418 546 400 548H160Q142 546 140 528C146 420 152 260 156 128Z" fill="var(--bag)" />
        <path d="M156 128H404C408 260 414 420 420 528Q418 546 400 548H160Q142 546 140 528C146 420 152 260 156 128Z" fill="url(#bag-fold)" />
        <path d="M144 522Q280 502 416 522" fill="none" stroke="var(--bag-shade)" strokeWidth="2" opacity=".7" />
        <path d="M156 128H404C408 260 414 420 420 528Q418 546 400 548H160Q142 546 140 528C146 420 152 260 156 128Z" fill="none" stroke="var(--bag-edge)" strokeWidth="2" />
        <rect x="150" y="94" width="260" height="38" rx="4" fill="var(--bag-seal)" stroke="var(--bag-edge)" strokeWidth="2" />
        <path d={Array.from({ length: 42 }, (_, i) => `M${157 + i * 6} 99v28`).join('')} stroke="var(--bag-shade)" strokeWidth="1.4" opacity=".55" />
        <path d="M150 108l9 5-9 5" fill="var(--bg)" opacity=".9" />
        <circle cx="280" cy="149" r="8.5" fill="var(--bag-seal)" stroke="var(--bag-edge)" strokeWidth="2" />
        <circle cx="280" cy="149" r="3.6" fill="none" stroke="var(--bag-edge)" strokeWidth="1.6" />
        <text x="280" y="180" textAnchor="middle" fill="var(--bag-print)" fontFamily="var(--font-mono)" fontSize="12.5" fontWeight="600" letterSpacing="2.6">
          {cafe.name.toUpperCase()}
        </text>
        {/* Twine tied round the seal, with a kraft hang tag */}
        <g fill="none" stroke="var(--twine)" strokeLinecap="round">
          <path d="M383 90l5 46M390 90l5 46" strokeWidth="2.4" />
          <path d="M392 113c-10-12-22-10-20-2s16 4 20-0c4-8 18-12 20-4s-12 10-20 6" strokeWidth="2.2" />
          <path d="M392 114c12 4 30 16 44 40" strokeWidth="2.2" />
          <path d="M391 115c4 14 2 26-4 34" strokeWidth="2" />
        </g>
        <g transform="translate(440 156) rotate(12)">
          <path d="M-14 -8H14L32 12V104H-32V12Z" fill="var(--tag)" stroke="var(--twine)" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cy="4" r="5" fill="var(--bg)" stroke="var(--twine)" strokeWidth="1.6" />
          <text y="40" textAnchor="middle" fill="var(--tag-ink)" fontFamily="var(--font-hand)" fontSize="21" fontWeight="600">
            <tspan x="0">roasted</tspan><tspan x="0" dy="21">by hand</tspan>
          </text>
          <path d="M-18 78c8-3 24-3 34 0" fill="none" stroke="var(--tag-ink)" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
          <text x="0" y="96" textAnchor="middle" fill="var(--tag-ink)" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.5" opacity=".8">BATCH {number}</text>
        </g>

        <text x="280" y="519" textAnchor="middle" fill="var(--bag-print)" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="2.5" opacity=".85">
          WHOLE BEAN · NET WT 250 G
        </text>

        {/* Espresso cup */}
        <ellipse cx="482" cy="552" rx="56" ry="11" fill="var(--cup)" stroke="var(--cup-line)" strokeWidth="2.5" />
        <path d="M518 508c15 0 15 22-3 22" fill="none" stroke="var(--cup-line)" strokeWidth="5" strokeLinecap="round" />
        <path d="M518 508c15 0 15 22-3 22" fill="none" stroke="var(--cup)" strokeWidth="2" strokeLinecap="round" />
        <path d="M444 500h76v10c0 22-15 36-34 36h-8c-19 0-34-14-34-36z" fill="var(--cup)" stroke="var(--cup-line)" strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="482" cy="500" rx="38" ry="8" fill="var(--crema)" stroke="var(--cup-line)" strokeWidth="2.5" />
        <path d="M466 499c8 4 22 4 30-1" fill="none" stroke="var(--bean)" strokeWidth="2" strokeLinecap="round" opacity=".6" />
        <g className="steam" fill="none" stroke="var(--steam)" strokeWidth="3" strokeLinecap="round">
          <path d="M466 486c-8-9 8-14 0-25s6-15 0-22" />
          <path d="M482 482c-8-9 8-14 0-25s6-15 0-22" />
          <path d="M498 486c-8-9 8-14 0-25s6-15 0-22" />
        </g>

        {SCATTER.map(([x, y, rotate]) => <Bean key={`${x}-${y}`} x={x} y={y} rotate={rotate} />)}

        {/* Roaster's stamp */}
        <g transform="translate(102 206) rotate(-14)">
          <g className="hero-stamp" style={{ filter: 'url(#ink-rough)' }} fill="none" stroke="var(--stamp)">
            <circle r="62" strokeWidth="3" />
            <circle r="38" strokeWidth="1.6" />
            <g className="hero-stamp__ring">
              <text fill="var(--stamp)" stroke="none" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight="600">
                <textPath href="#stamp-circle" textLength="304" lengthAdjust="spacing">{stampText}</textPath>
              </text>
            </g>
            <g transform="rotate(30)">
              <ellipse rx="13" ry="19" fill="var(--stamp)" stroke="none" />
              <path d="M-4 -16c9 7-4 15 4 32" strokeWidth="3" stroke="var(--bg)" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>

      <p className="hand absolute top-[67%] left-[1%] w-[24%] -rotate-6 text-[4.2cqi]" aria-hidden="true">
        the one we can’t stop brewing
        <PenArrow className="mt-1 ml-[30%] block w-[70%] -rotate-[28deg]" />
      </p>

      <div className="bag-label" style={{ '--tint': bean.color } as CSSProperties} aria-hidden="true">
        <div className="bag-label__band" />
        <p className="label-mono flex justify-between gap-2"><span>No. {number}</span><span>{bean.kind === 'blend' ? 'Blend' : 'Single origin'}</span></p>
        <p className="bag-label__name">{bean.name}</p>
        <p className="label-mono text-label-muted">{bean.country} · {bean.region}</p>
        <p className="label-mono border-y border-dashed border-current py-[1cqi]">{originLine(bean).split(' · ').slice(1).join(' · ')}</p>
        <p className="label-mono text-label-muted">Tasting notes</p>
        <ul className="bag-label__notes -mt-[.6cqi]">
          {bean.notes.map(note => <li key={note.note} title={FLAVOUR_FAMILIES[note.family]}>{note.note}</li>)}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-2 text-[2.2cqi]">
          <span className="label-mono">Roast</span>
          <RoastMeter roast={bean.roast} showLabel={false} />
        </div>
      </div>
    </div>
  );
}
