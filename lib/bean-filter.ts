import type { Bean, Process, Roast } from '../content/coffee';

/** Active filters on the beans page. Empty lists mean "any". */
export interface BeanFilters {
  processes: Process[];
  roasts: Roast[];
}

export const NO_FILTERS: BeanFilters = { processes: [], roasts: [] };

/** A bean matches when its process is one of the chosen processes and its roast one of the chosen roasts. */
export function matchesBean(bean: Bean, filters: BeanFilters): boolean {
  return (filters.processes.length === 0 || filters.processes.includes(bean.process))
    && (filters.roasts.length === 0 || filters.roasts.includes(bean.roast));
}

/** Only offer filter values that at least one coffee uses, in their canonical order. */
export function usedValues<T extends string>(order: readonly T[], values: readonly T[]): T[] {
  return order.filter(value => values.includes(value));
}
