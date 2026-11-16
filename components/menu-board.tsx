'use client';

import { useState } from 'react';
import { DIETS, drinks, formatPrice, isAvailable, type Drink } from '../content/coffee';
import { matchesMethod, METHOD_FILTERS, visibleCounts, type MethodFilter } from '../lib/menu-filter';
import { BrewArt } from './brew-art';
import { Icon } from './icons';

const BADGES: Record<NonNullable<Drink['badge']>, string> = { signature: 'Signature', seasonal: 'Seasonal', new: 'New' };
const SERVE: Record<NonNullable<Drink['serve']>, string> = { hot: 'Hot', iced: 'Iced', 'hot-or-iced': 'Hot or iced' };

const chipSmall = 'chip min-h-[2.1rem] py-0.5 text-[.86rem]';

function Price({ drink, dim }: { drink: Drink; dim: boolean }) {
  const base = `font-mono font-semibold whitespace-nowrap text-accent ${dim ? 'opacity-60' : ''}`;
  if (typeof drink.price === 'number') return <span className={base}>{formatPrice(drink.price)}</span>;
  return (
    <span className={`${base} grid justify-items-end gap-px text-[.92rem]`}>
      {drink.price.map(size => (
        <span key={size.label}><span className="text-[.76rem] font-normal text-muted">{size.label}</span> {formatPrice(size.amount)}</span>
      ))}
    </span>
  );
}

function Item({ drink }: { drink: Drink }) {
  const available = isAvailable(drink);
  return (
    <li id={drink.id} data-available={available}
      className="menu-item card flex scroll-mt-28 items-start gap-3 p-3.5 transition hover:border-rule hover:shadow-card data-[available=false]:bg-surface-2 sm:gap-4 sm:px-[1.1rem] sm:py-4">
      {drink.method ? <BrewArt method={drink.method} size={60} className="max-sm:size-12!" /> : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className={`text-[1.15rem] leading-tight ${available ? '' : 'opacity-60'}`}>{drink.name}</h3>
          <span className="min-w-4 flex-1 -translate-y-1 border-b-[1.5px] border-dotted border-rule" aria-hidden="true" />
          <Price drink={drink} dim={!available} />
        </div>
        <p className="mt-1 text-[.94rem] leading-normal text-muted">{drink.description}</p>
        <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {!available ? <span className="sticker sticker-soldout">Sold out today</span> : null}
          {drink.badge ? <span className={`sticker sticker-${drink.badge}`}>{BADGES[drink.badge]}</span> : null}
          {drink.serve ? (
            <span className="mr-1 inline-flex items-center gap-1 text-[.8rem] font-semibold text-muted">
              <Icon name={drink.serve === 'iced' ? 'iced' : 'hot'} width={14} height={14} />{SERVE[drink.serve]}
            </span>
          ) : null}
          {drink.milk ? <span className="mr-1 text-[.8rem] font-semibold text-muted">Whole milk or oat</span> : null}
          {drink.diet?.map(diet => (
            <abbr key={diet} title={DIETS[diet].label}
              className={`inline-grid h-6 min-w-7 cursor-help place-items-center rounded-[4px] border-[1.5px] px-1.5 font-mono text-[.68rem] font-semibold tracking-wide ${
                diet === 'vegan' ? 'border-success/60 text-success' : 'border-line text-muted'} ${diet === 'contains-nuts' ? 'border-dashed' : ''}`}>
              {DIETS[diet].short}
            </abbr>
          ))}
        </p>
      </div>
    </li>
  );
}

/**
 * The full drinks menu with section shortcuts and method filters. The complete menu is in the static
 * HTML; filtering is a progressive enhancement that only hides non-matching drinks.
 */
export function MenuBoard() {
  const [filter, setFilter] = useState<MethodFilter>('all');
  const counts = visibleCounts(drinks, filter);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div>
      <div className="sticky top-(--header-h) z-20 mb-2 grid gap-2.5 border-b-[1.5px] border-rule bg-bg/92 py-3 backdrop-blur-md print:hidden">
        <nav className="scrollbar-none flex gap-2 overflow-x-auto p-0.5" aria-label="Menu sections">
          {drinks.map(section => (
            <a key={section.id} href={`#${section.id}`} className={chipSmall}>
              {section.title}
              {filter !== 'all' ? (
                <span className="min-w-[1.4rem] rounded-full bg-accent-soft px-1.5 text-center font-mono text-[.74rem]">{counts[section.id]}</span>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="scrollbar-none flex gap-2 overflow-x-auto p-0.5" role="group" aria-label="Filter by brew method">
          <span className="label-text inline-flex items-center gap-1.5 pr-1 text-[.68rem] whitespace-nowrap text-muted"><Icon name="filter" width={15} height={15} />Show</span>
          {METHOD_FILTERS.map(option => (
            <button key={option.id} type="button" className={chipSmall} aria-pressed={filter === option.id} onClick={() => setFilter(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{filter !== 'all' ? `${total} items match.` : ''}</p>
      </div>

      {drinks.map(section => (
        <section key={section.id} id={section.id} className="scroll-mt-28 pt-8 pb-3" aria-labelledby={`${section.id}-title`}>
          <header className="mb-5 grid gap-1.5">
            <h2 id={`${section.id}-title`} className="flex items-baseline gap-3 text-[clamp(1.8rem,3.4vw,2.4rem)]">
              {section.title}
              <span className="label-text text-[.68rem] text-muted">{section.items.length} items</span>
            </h2>
            <p className="max-w-(--measure) text-muted">{section.description}</p>
          </header>
          {counts[section.id] ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,21rem),1fr))] gap-3">
              {section.items.filter(drink => matchesMethod(drink, filter)).map(drink => <Item key={drink.id} drink={drink} />)}
            </ul>
          ) : (
            <p className="rounded-ui border-[1.5px] border-dashed border-rule p-5 text-muted">Nothing in this section for that filter. Ask at the bar: we can often adapt a drink.</p>
          )}
        </section>
      ))}
    </div>
  );
}
