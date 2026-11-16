import type { CSSProperties } from 'react';
import { beans, formatAltitude, formatCoordinates, formatPrice, isAvailable, originLine, PROCESSES, type Bean } from '../content/coffee';
import { Icon } from './icons';
import { RoastMeter } from './roast-meter';
import { TastingNotes } from './tasting-notes';

const term = 'label-text text-[.66rem] text-muted';

/** A coffee as a printed bag label: every detail from content/coffee.ts, with "Sold out" when unavailable. */
export function BeanCard({ bean, headingLevel = 3 }: { bean: Bean; headingLevel?: 2 | 3 }) {
  const available = isAvailable(bean);
  const number = String(beans.indexOf(bean) + 1).padStart(2, '0');
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <article id={bean.id} data-available={available} style={{ '--tint': bean.color } as CSSProperties}
      className="bean-card label grid h-full grid-cols-[2.6rem_minmax(0,1fr)] overflow-hidden transition-shadow sm:grid-cols-[3.1rem_minmax(0,1fr)]">
      <div className="relative flex justify-center border-r-[1.5px] border-dashed border-rule bg-[color-mix(in_srgb,var(--tint)_24%,var(--surface))] py-5">
        <span className="absolute inset-y-0 left-0 w-1.5 bg-(--tint)" aria-hidden="true" />
        <span className="label-text text-[.68rem] whitespace-nowrap [writing-mode:vertical-rl] rotate-180" aria-hidden="true">
          No. {number} · {bean.kind === 'blend' ? 'Blend' : 'Single origin'}
        </span>
      </div>

      <div className="relative flex flex-col gap-3.5 p-[clamp(1.1rem,2.5vw,1.6rem)]">
        {!available ? <span className="stamp absolute top-4 right-4 z-10 rotate-[8deg] bg-surface text-[.8rem] text-accent">Sold out</span> : null}
        <div className="bean-card__body flex flex-1 flex-col gap-3.5">
          <header>
            <Heading className="pr-20 text-[clamp(1.55rem,2.6vw,1.9rem)] leading-none">{bean.name}</Heading>
            <p className="mt-1.5 font-medium text-muted">{bean.country} · {bean.region}</p>
          </header>
          <p className="label-text border-y-[1.5px] border-rule py-1.5 text-[.68rem] leading-relaxed">
            Origin · {originLine(bean)}
          </p>

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-[.93rem]">
            <dt className={term}>Producer</dt><dd>{bean.producer}</dd>
            <dt className={term}>Varieties</dt><dd>{bean.varieties.join(', ')}</dd>
            <dt className={term}>Altitude</dt><dd>{formatAltitude(bean.altitude)}</dd>
            <dt className={term}>Process</dt><dd><abbr title={PROCESSES[bean.process].detail}>{PROCESSES[bean.process].label}</abbr></dd>
            <dt className={term}>Roast</dt><dd><RoastMeter roast={bean.roast} /></dd>
          </dl>

          {bean.components?.length ? (
            <div>
              <p className={term}>In the blend</p>
              <ul className="mt-1.5 grid gap-1 text-[.9rem]">
                {bean.components.map(part => (
                  <li key={part.origin} className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-2">
                    <span className="font-mono text-[.82rem]">{part.share}%</span>
                    <span>{part.origin}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <TastingNotes notes={bean.notes} />
          <p className="text-[.95rem] text-muted">{bean.description}</p>

          {bean.coordinates ? (
            <p className="label-text mt-auto flex items-center gap-1.5 text-[.66rem] text-muted">
              <Icon name="globe" width={14} height={14} />{formatCoordinates(bean.coordinates)}
            </p>
          ) : null}
        </div>

        <ul className="flex flex-wrap gap-2.5 border-t-[1.5px] border-dashed border-rule pt-3.5" aria-label="Bags">
          {bean.bags.map(bag => (
            <li key={bag.size} className={`hang-tag ${available ? '' : 'opacity-60'}`}>
              <span className="label-text text-[.7rem]">{bag.size}</span>
              <span className="font-mono font-semibold">{formatPrice(bag.amount)}</span>
            </li>
          ))}
          {!available ? <li className="hand self-center text-[1.3rem]">ask us when it’s back!</li> : null}
        </ul>
      </div>
    </article>
  );
}
