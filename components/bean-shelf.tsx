'use client';

import { useState } from 'react';
import { beans, PROCESSES, ROAST_LABELS, ROASTS, type Process, type Roast } from '../content/coffee';
import { matchesBean, NO_FILTERS, usedValues, type BeanFilters } from '../lib/bean-filter';
import { BeanCard } from './bean-card';
import { Icon } from './icons';

const PROCESS_ORDER = Object.keys(PROCESSES) as Process[];
const processes = usedValues(PROCESS_ORDER, beans.map(bean => bean.process));
const roasts = usedValues(ROASTS, beans.map(bean => bean.roast));

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter(item => item !== value) : [...list, value];
}

/**
 * Every coffee as a bag-label card, with process and roast filters. The complete shelf is in the
 * static HTML; filtering is a progressive enhancement that only hides non-matching coffees.
 */
export function BeanShelf() {
  const [filters, setFilters] = useState<BeanFilters>(NO_FILTERS);
  const visible = beans.filter(bean => matchesBean(bean, filters));
  const active = filters.processes.length + filters.roasts.length > 0;
  const chip = 'chip min-h-[2.1rem] py-0.5 text-[.86rem]';
  const groupLabel = 'label-text inline-flex min-w-[4.5rem] items-center text-[.68rem] text-muted';

  return (
    <div>
      <div className="mb-6 grid gap-2.5 print:hidden">
        <div className="scrollbar-none flex flex-wrap gap-2 p-0.5" role="group" aria-label="Filter by process">
          <span className={groupLabel}><Icon name="filter" width={15} height={15} className="mr-1.5" />Process</span>
          {processes.map(process => (
            <button key={process} type="button" className={chip} aria-pressed={filters.processes.includes(process)} title={PROCESSES[process].detail}
              onClick={() => setFilters(current => ({ ...current, processes: toggle(current.processes, process) }))}>
              {PROCESSES[process].label}
            </button>
          ))}
        </div>
        <div className="scrollbar-none flex flex-wrap gap-2 p-0.5" role="group" aria-label="Filter by roast level">
          <span className={groupLabel}><Icon name="roast" width={15} height={15} className="mr-1.5" />Roast</span>
          {roasts.map((roast: Roast) => (
            <button key={roast} type="button" className={chip} aria-pressed={filters.roasts.includes(roast)}
              onClick={() => setFilters(current => ({ ...current, roasts: toggle(current.roasts, roast) }))}>
              {ROAST_LABELS[roast]}
            </button>
          ))}
          {active ? <button type="button" className={`${chip} border-dashed text-muted`} onClick={() => setFilters(NO_FILTERS)}>Clear</button> : null}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{active ? `${visible.length} of ${beans.length} coffees match.` : ''}</p>
      </div>

      {visible.length ? (
        <ul className="grid gap-x-5 gap-y-8 lg:grid-cols-2">
          {visible.map((bean, index) => (
            <li key={bean.id} className="relative">
              <span className={`tape -top-3 ${index % 2 ? 'right-36 rotate-3' : 'left-14 tape-blue -rotate-3'}`} aria-hidden="true" />
              <BeanCard bean={bean} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card border-[1.5px] border-dashed border-rule p-5 text-muted">
          No coffee on the shelf matches both of those right now. Try another roast, or ask us what’s coming next.
        </p>
      )}
    </div>
  );
}
