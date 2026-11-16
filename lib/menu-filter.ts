import type { Drink, DrinkSection } from '../content/coffee';

/** Method filters offered on the menu page. One at a time; 'all' shows everything. */
export type MethodFilter = 'all' | 'espresso' | 'pour-over' | 'cold';

export const METHOD_FILTERS: { id: MethodFilter; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'pour-over', label: 'Pour-over' },
  { id: 'cold', label: 'Cold' },
];

/** Espresso covers espresso and milk drinks; pour-over covers the hand brews and batch; cold is anything served iced. */
export function matchesMethod(drink: Drink, filter: MethodFilter): boolean {
  switch (filter) {
    case 'all': return true;
    case 'espresso': return drink.method === 'espresso' || drink.method === 'milk';
    case 'pour-over': return drink.method === 'pour-over' || drink.method === 'chemex' || drink.method === 'aeropress' || drink.method === 'batch';
    case 'cold': return drink.serve === 'iced' || drink.serve === 'hot-or-iced';
  }
}

/** Count of visible drinks per section for the active filter. */
export function visibleCounts(sections: readonly DrinkSection[], filter: MethodFilter): Record<string, number> {
  return Object.fromEntries(sections.map(section => [section.id, section.items.filter(drink => matchesMethod(drink, filter)).length]));
}
