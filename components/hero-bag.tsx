import type { CSSProperties } from 'react';
import { cafe } from '../content/cafe';
import { beans, featuredBean, FLAVOUR_FAMILIES, originLine, PROCESSES } from '../content/coffee';
import { PenArrow } from './doodles';
import { RoastMeter } from './roast-meter';

// Beans spilled from the scoop and round the foot of the bag: [x, y, rotation, scale, tone].
// Tones mix roast levels so the pile doesn't look printed.
const TONES = ['var(--bean)', 'var(--roast-3)', 'var(--roast-4)'];
const SCATTER: [number, number, number, number, number][] = [
  [168, 576, 24, 1, 0], [196, 592, -34, .9, 1], [232, 584, 78, 1, 2], [268, 598, 32, .85, 0], [214, 598, 120, .75, 2],
  [326, 590, -52, 1, 1], [372, 600, 96, .9, 0], [410, 580, 14, .85, 2], [298, 600, -12, .7, 1],
];
// The heap in the scoop's bowl.
const HEAP: [number, number, number, number, number][] = [
  [70, 552, 70, .8, 0], [92, 546, -20, .85, 2], [114, 552, 40, .8, 1], [82, 538, 10, .75, 1], [104, 536, -60, .75, 0], [126, 542, 100, .7, 2],
];
// Cherries on the branch behind the bag.
const CHERRIES: [number, number][] = [[458, 318], [470, 328], [459, 334], [504, 280], [516, 288], [507, 296]];

function Bean({ x, y, rotate, scale = 1, tone = 0 }: { x: number; y: number; rotate: number; scale?: number; tone?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <ellipse rx="9.5" ry="13" fill={TONES[tone]} />
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
  // The name is printed across the bag: shrink the type for longer names so it clears the twine.
  const brand = cafe.name.toUpperCase();
  const brandSize = Math.min(12.5, 208 / (brand.length * 0.8));
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

        {/* Cup-ring stains on the paper behind the bag */}
        <g fill="none" stroke="var(--stain)" style={{ filter: 'url(#ink-rough)' }}>
          <circle cx="430" cy="218" r="92" strokeWidth="7" />
          <circle cx="430" cy="218" r="82" strokeWidth="2.5" opacity=".7" />
          <path d="M352 266a92 92 0 0 0 50 38" strokeWidth="14" strokeLinecap="round" opacity=".6" />
        </g>
        <g fill="var(--stain)">
          <circle cx="540" cy="318" r="7" /><circle cx="528" cy="334" r="3.5" /><circle cx="552" cy="300" r="2.5" />
        </g>

        {/* Coffee branch reaching out from behind the bag */}
        <g stroke="var(--art-line)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M392 380C430 360 470 330 500 300s34-46 50-70" fill="none" strokeWidth="2.6" />
          <path d="M432 356c-6-24 6-42 28-50-2 24-10 40-28 50z" fill="var(--leaf)" />
          <path d="M440 360c22 6 42-2 54-18-22-4-40 2-54 18z" fill="var(--leaf)" />
          <path d="M498 302c-6-22 4-38 24-46 0 22-8 36-24 46z" fill="var(--leaf)" />
          <path d="M504 304c20 2 36-8 44-24-20-2-34 6-44 24z" fill="var(--leaf)" />
          <path d="M534 252c-2-16 6-28 20-32-2 16-8 26-20 32z" fill="var(--leaf)" />
          <path d="M440 352l14-36M446 358l40-12M504 298l14-34M510 300l32-16" fill="none" strokeWidth="1" opacity=".45" />
          {CHERRIES.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="var(--cherry)" />)}
        </g>
        {CHERRIES.map(([cx, cy]) => <path key={`s${cx}-${cy}`} d={`M${cx - 3} ${cy - 2.5}a3.5 3.5 0 0 1 3.5-2`} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round" />)}

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
        <text x="280" y="180" textAnchor="middle" fill="var(--bag-print)" fontFamily="var(--font-mono)" fontSize={brandSize} fontWeight="600" letterSpacing={brandSize * .2}>
          {brand}
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
        {/* Latte-art heart poured into the crema */}
        <path d="M482 506c-10-3-16-6-16-9 0-2.4 3-3.4 6-2 3 1.2 6 3 10 3s7-1.8 10-3c3-1.4 6-.4 6 2 0 3-6 6-16 9z" fill="var(--cup)" opacity=".85" />
        <path d="M482 495v10" stroke="var(--crema)" strokeWidth="1.4" strokeLinecap="round" />
        {/* Drips by the saucer */}
        <g fill="var(--bean)" opacity=".55">
          <ellipse cx="430" cy="578" rx="7" ry="2.6" /><ellipse cx="444" cy="584" rx="2.6" ry="1.2" /><ellipse cx="536" cy="576" rx="3.5" ry="1.4" />
        </g>
        <g className="steam" fill="none" stroke="var(--steam)" strokeWidth="3" strokeLinecap="round">
          <path d="M466 486c-8-9 8-14 0-25s6-15 0-22" />
          <path d="M482 482c-8-9 8-14 0-25s6-15 0-22" />
          <path d="M498 486c-8-9 8-14 0-25s6-15 0-22" />
        </g>

        {/* Wooden scoop tipped on its side, spilling beans toward the bag */}
        <ellipse cx="96" cy="590" rx="78" ry="8" fill="#000" opacity=".12" />
        <path d="M44 566L8 600" stroke="var(--art-line)" strokeWidth="12" strokeLinecap="round" />
        <path d="M44 566L8 600" stroke="var(--art-wood)" strokeWidth="8" strokeLinecap="round" />
        <path d="M52 548c0 22 16 38 44 38s46-14 46-36" fill="var(--art-wood)" stroke="var(--art-line)" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M62 566c10 10 40 14 62 2" fill="none" stroke="var(--art-line)" strokeWidth="1.2" opacity=".35" strokeLinecap="round" />
        <ellipse cx="97" cy="549" rx="45" ry="10" fill="var(--bean-crease)" stroke="var(--art-line)" strokeWidth="2.2" />
        {HEAP.map(([x, y, rotate, scale, tone]) => <Bean key={`h${x}-${y}`} x={x} y={y} rotate={rotate} scale={scale} tone={tone} />)}
        {SCATTER.map(([x, y, rotate, scale, tone]) => <Bean key={`${x}-${y}`} x={x} y={y} rotate={rotate} scale={scale} tone={tone} />)}

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
