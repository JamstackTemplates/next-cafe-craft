// Content invariants for the café, its coffees, menu and brew guides. Runs with Node's built-in
// TypeScript type stripping. When one of these fails after an edit, the message names the item or day to fix.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { AMENITY_ICONS, cafe, DAYS, formatAddress, formatTime, groupedHours, openState, publicLinks, toMinutes } from '../content/cafe.ts';
import {
  allDrinks, barToday, beans, brewGuides, brewRatio, DIETS, drinks, extras, featuredBean, featuredDrinks, FLAVOUR_FAMILIES,
  formatAltitude, formatBrewTime, formatCoordinates, formatPrice, formatTemperature, METHODS, onTheBar, originLine,
  PROCESSES, roastLevel, ROASTS, shop, startingPrice,
} from '../content/coffee.ts';
import { matchesBean, NO_FILTERS, usedValues } from '../lib/bean-filter.ts';
import { matchesMethod, visibleCounts } from '../lib/menu-filter.ts';
import { mapDirectionsUrl, mapEmbedUrl, mapSearchUrl } from '../lib/maps.ts';
import { timeZoneLabel } from '../lib/time-zone.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validPrice = (amount: number) => Number.isFinite(amount) && amount > 0 && Math.round(amount * 100) === amount * 100;

/* ---------------- Ids ---------------- */

test('every id is unique and URL-safe (they double as page anchors)', () => {
  const ids = [
    ...beans.map(bean => bean.id), ...drinks.map(section => section.id), ...allDrinks.map(drink => drink.id),
    ...brewGuides.map(guide => guide.id),
    // Fixed anchors used by the pages.
    'find-us', 'faq', 'brew-at-home', 'main',
  ];
  for (const id of ids) assert.match(id, SLUG, `"${id}" must be lowercase words joined by hyphens`);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual(duplicates, [], `ids must be unique across coffees, menu sections, drinks and brew guides: ${duplicates.join(', ')}`);
});

/* ---------------- Beans ---------------- */

test('every coffee is complete', () => {
  assert.ok(beans.length >= 1, 'Add at least one coffee to beans.');
  for (const bean of beans) {
    const at = `coffee "${bean.id}"`;
    for (const key of ['name', 'country', 'region', 'producer', 'description', 'color'] as const) {
      assert.ok(bean[key].trim(), `${at}: ${key} is empty`);
    }
    assert.ok(['single-origin', 'blend'].includes(bean.kind), `${at}: kind must be 'single-origin' or 'blend'`);
    assert.ok(bean.process in PROCESSES, `${at}: unknown process "${bean.process}" (use ${Object.keys(PROCESSES).join(', ')})`);
    assert.ok(ROASTS.includes(bean.roast), `${at}: unknown roast "${bean.roast}" (use ${ROASTS.join(', ')})`);
    assert.ok(bean.varieties.length >= 1 && bean.varieties.every(variety => variety.trim()), `${at}: list at least one variety`);
    const altitudes = typeof bean.altitude === 'number' ? [bean.altitude] : bean.altitude;
    for (const metres of altitudes) assert.ok(Number.isInteger(metres) && metres > 0 && metres < 3000, `${at}: altitude ${metres} should be metres above sea level`);
    if (Array.isArray(bean.altitude)) assert.ok(bean.altitude[0] < bean.altitude[1], `${at}: altitude range must go from low to high`);
    assert.equal(typeof bean.available, 'boolean', `${at}: set available to true or false`);
  }
});

test('every coffee has 2–4 tasting notes from known flavour families', () => {
  for (const bean of beans) {
    assert.ok(bean.notes.length >= 2 && bean.notes.length <= 4, `coffee "${bean.id}" has ${bean.notes.length} tasting notes; use 2–4`);
    for (const note of bean.notes) {
      assert.ok(note.note.trim(), `coffee "${bean.id}": empty tasting note`);
      assert.ok(note.family in FLAVOUR_FAMILIES, `coffee "${bean.id}": "${note.note}" has unknown family "${note.family}" (use ${Object.keys(FLAVOUR_FAMILIES).join(', ')})`);
    }
    const names = bean.notes.map(note => note.note.toLowerCase());
    assert.equal(new Set(names).size, names.length, `coffee "${bean.id}" repeats a tasting note`);
  }
});

test('bags have sizes and valid prices', () => {
  for (const bean of beans) {
    assert.ok(bean.bags.length >= 1, `coffee "${bean.id}": add at least one bag size`);
    for (const bag of bean.bags) {
      assert.ok(bag.size.trim(), `coffee "${bean.id}": bag size label is empty`);
      assert.ok(validPrice(bag.amount), `coffee "${bean.id}": ${bag.size} price ${bag.amount} must be a positive amount with at most two decimals`);
    }
    assert.equal(new Set(bean.bags.map(bag => bag.size)).size, bean.bags.length, `coffee "${bean.id}" repeats a bag size`);
  }
});

test('blends list their components and single origins do not', () => {
  for (const bean of beans) {
    if (bean.kind === 'blend') {
      assert.ok(bean.components?.length, `blend "${bean.id}": list its components`);
      const total = bean.components!.reduce((sum, part) => sum + part.share, 0);
      assert.equal(total, 100, `blend "${bean.id}": component shares add up to ${total}, not 100`);
    } else {
      assert.ok(!bean.components, `coffee "${bean.id}" is single-origin but lists blend components`);
    }
    if (bean.coordinates) {
      const { lat, lng } = bean.coordinates;
      assert.ok(Math.abs(lat) <= 90 && Math.abs(lng) <= 180, `coffee "${bean.id}": coordinates out of range`);
    }
  }
});

test('the shelf has a sensible mix of coffees', () => {
  assert.ok(beans.length >= 6 && beans.length <= 8, `Keep 6–8 coffees in the sample (found ${beans.length}).`);
  assert.ok(beans.some(bean => bean.process === 'natural'), 'Include at least one natural-process coffee.');
  assert.ok(beans.some(bean => bean.process === 'washed'), 'Include at least one washed coffee.');
  assert.ok(beans.some(bean => bean.kind === 'blend'), 'Include at least one blend.');
  assert.ok(beans.some(bean => !bean.available), 'Include one coffee with available: false to show the sold-out label.');
});

test('exactly one coffee is featured on the hero bag', () => {
  const featured = beans.filter(bean => bean.featured);
  assert.equal(featured.length, 1, `Mark exactly one coffee with featured: true (found ${featured.map(bean => bean.id).join(', ') || 'none'}).`);
  assert.equal(featuredBean, featured[0]);
});

/* ---------------- On the bar today ---------------- */

test('on the bar today names coffees that exist and are available', () => {
  for (const slot of ['espresso', 'filter', 'guest'] as const) {
    const id = onTheBar[slot];
    if (slot === 'guest' && id === '') continue;
    assert.ok(id, `onTheBar.${slot} needs a coffee id`);
    const bean = beans.find(item => item.id === id);
    assert.ok(bean, `onTheBar.${slot} is "${id}", which isn't a coffee id in beans (choose one of ${beans.map(item => item.id).join(', ')})`);
    assert.ok(bean.available, `onTheBar.${slot} is "${id}", which is marked available: false`);
  }
  assert.equal(barToday().length, onTheBar.guest ? 3 : 2);
  assert.deepEqual(barToday({ espresso: 'pioneer-blend', filter: 'kochere-washed', guest: '' }).map(entry => entry.slot), ['espresso', 'filter']);
});

/* ---------------- Drinks ---------------- */

test('every menu section and drink is complete', () => {
  for (const section of drinks) {
    assert.ok(section.title.trim() && section.description.trim(), `menu section "${section.id}" needs a title and description`);
    assert.ok(section.items.length >= 1, `menu section "${section.id}" has no items`);
  }
  for (const drink of allDrinks) {
    assert.ok(drink.name.trim(), `drink "${drink.id}": name is empty`);
    assert.ok(drink.description.trim(), `drink "${drink.id}": description is empty`);
    if (drink.method) assert.ok(drink.method in METHODS, `drink "${drink.id}": unknown method "${drink.method}" (use ${Object.keys(METHODS).join(', ')})`);
    for (const diet of drink.diet ?? []) assert.ok(diet in DIETS, `drink "${drink.id}": unknown diet tag "${diet}" (use ${Object.keys(DIETS).join(', ')})`);
    assert.equal(new Set(drink.diet).size, drink.diet?.length ?? 0, `drink "${drink.id}" repeats a diet tag`);
    if (drink.badge) assert.ok(['signature', 'seasonal', 'new'].includes(drink.badge), `drink "${drink.id}": unknown badge "${drink.badge}"`);
    if (drink.milk) assert.ok(!drink.diet?.includes('vegan'), `drink "${drink.id}" is made with milk, so it can't be tagged vegan`);
  }
});

test('drink prices are positive with at most two decimals, and sizes are labelled', () => {
  for (const drink of allDrinks) {
    if (typeof drink.price === 'number') {
      assert.ok(validPrice(drink.price), `drink "${drink.id}": price ${drink.price}`);
    } else {
      assert.ok(drink.price.length >= 1, `drink "${drink.id}" needs at least one size`);
      for (const size of drink.price) {
        assert.ok(size.label.trim(), `drink "${drink.id}": size label is empty`);
        assert.ok(validPrice(size.amount), `drink "${drink.id}": ${size.label} price ${size.amount}`);
      }
      assert.equal(new Set(drink.price.map(size => size.label)).size, drink.price.length, `drink "${drink.id}" repeats a size`);
    }
  }
  for (const extra of extras) assert.ok(extra.name.trim() && extra.price >= 0 && Math.round(extra.price * 100) === extra.price * 100, `extra "${extra.name}" price ${extra.price}`);
  assert.ok(extras.some(extra => /oat/i.test(extra.name)), 'Offer oat milk in extras');
});

test('the home page has 3–6 signature drinks', () => {
  assert.ok(featuredDrinks.length >= 3 && featuredDrinks.length <= 6, `Mark 3–6 drinks with featured: true (found ${featuredDrinks.length}).`);
});

test('prices format in the shop currency', () => {
  assert.equal(shop.currency, 'USD');
  assert.equal(formatPrice(4.5), '$4.50');
  assert.equal(formatPrice(4), '$4');
  assert.equal(formatPrice(0), 'Free');
  assert.equal(startingPrice({ ...allDrinks[0], price: [{ label: 'L', amount: 6 }, { label: 'S', amount: 5 }] }), 5);
  assert.doesNotThrow(() => new Intl.NumberFormat(shop.locale, { style: 'currency', currency: shop.currency }));
});

test('menu method filters', () => {
  const byId = (id: string) => allDrinks.find(drink => drink.id === id)!;
  assert.ok(matchesMethod(byId('flat-white'), 'espresso') && !matchesMethod(byId('flat-white'), 'pour-over'));
  assert.ok(matchesMethod(byId('chemex'), 'pour-over') && matchesMethod(byId('batch-brew'), 'pour-over'));
  assert.ok(matchesMethod(byId('cold-brew'), 'cold') && matchesMethod(byId('espresso-tonic'), 'cold'));
  assert.ok(!matchesMethod(byId('hot-chocolate'), 'espresso'), 'hot chocolate is not an espresso drink');
  const counts = visibleCounts(drinks, 'all');
  assert.equal(Object.values(counts).reduce((a, b) => a + b, 0), allDrinks.length);
});

/* ---------------- Brew guides ---------------- */

test('brew guides are complete, and the ratio is derived from dose and water', () => {
  assert.ok(brewGuides.length >= 1, 'Add at least one brew guide.');
  for (const guide of brewGuides) {
    const at = `brew guide "${guide.id}"`;
    assert.ok(guide.name.trim() && guide.summary.trim() && guide.grind.trim(), `${at}: name, summary and grind are required`);
    assert.ok(guide.method in METHODS, `${at}: unknown method "${guide.method}"`);
    assert.ok(guide.dose > 0 && guide.water > guide.dose, `${at}: dose ${guide.dose}g and water ${guide.water}g look wrong`);
    const ratio = guide.water / guide.dose;
    assert.ok(ratio >= 5 && ratio <= 20, `${at}: 1:${ratio.toFixed(1)} is outside a sensible brew ratio`);
    assert.ok(guide.temperature >= 0 && guide.temperature <= 100, `${at}: water temperature ${guide.temperature}°C`);
    assert.ok(Number.isInteger(guide.seconds) && guide.seconds > 0, `${at}: total time in whole seconds`);
    assert.ok(guide.steps.length >= 3 && guide.steps.length <= 6, `${at} has ${guide.steps.length} steps; use 3–6`);
    for (const step of guide.steps) assert.ok(step.trim(), `${at}: empty step`);
    assert.ok(!('ratio' in guide), `${at}: remove "ratio"; it is worked out from dose and water`);
  }
  assert.equal(brewRatio({ dose: 15, water: 250 }), '1:16.7');
  assert.equal(brewRatio({ dose: 30, water: 500 }), '1:16.7');
  assert.equal(brewRatio({ dose: 100, water: 1000 }), '1:10');
  // The page renders brewRatio(guide); no ratio is typed into the page either.
  const page = readFileSync(new URL('../app/beans/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /brewRatio\(guide\)/);
});

test('labels format for people', () => {
  assert.equal(formatAltitude(1950), '1,950 masl');
  assert.equal(formatAltitude([2000, 2200]), '2,000–2,200 masl');
  assert.equal(formatTemperature(94), '94°C · 201°F');
  assert.equal(formatBrewTime(180), '3:00');
  assert.equal(formatBrewTime(150), '2:30');
  assert.equal(formatBrewTime(57600), '16 hours');
  assert.equal(formatCoordinates({ lat: -0.42, lng: 36.95 }), '0.42° S · 36.95° E');
  assert.equal(roastLevel('light'), 1);
  assert.equal(roastLevel('dark'), 5);
  const kochere = beans.find(bean => bean.id === 'kochere-washed');
  if (kochere) assert.equal(originLine(kochere), 'ETHIOPIA · WASHED · 1,950 MASL');
});

test('bean filters narrow by process and roast', () => {
  const [first] = beans;
  assert.ok(matchesBean(first, NO_FILTERS));
  assert.ok(matchesBean(first, { processes: [first.process], roasts: [] }));
  assert.ok(!matchesBean(first, { processes: [], roasts: ROASTS.filter(roast => roast !== first.roast) }));
  assert.deepEqual(usedValues(['a', 'b', 'c'], ['c', 'a', 'c']), ['a', 'c']);
});

/* ---------------- Café ---------------- */

test('opening hours list each day once with valid times', () => {
  assert.deepEqual(cafe.hours.map(entry => entry.day), [...DAYS], 'List Monday to Sunday once each, in order');
  for (const entry of cafe.hours) {
    assert.equal(Boolean(entry.opens), Boolean(entry.closes), `${entry.day}: set both opens and closes, or neither`);
    if (entry.opens && entry.closes) {
      assert.match(entry.opens, /^([01]\d|2[0-3]):[0-5]\d$/, `${entry.day}.opens`);
      assert.match(entry.closes, /^([01]\d|2[0-3]):[0-5]\d$/, `${entry.day}.closes`);
      assert.ok(toMinutes(entry.opens) < toMinutes(entry.closes), `${entry.day} must open before it closes`);
    }
  }
});

test('hours format and group for people', () => {
  assert.equal(formatTime('07:00'), '7am');
  assert.equal(formatTime('06:30'), '6:30am');
  assert.equal(formatTime('12:00'), '12pm');
  assert.equal(formatTime('17:00'), '5pm');
  assert.equal(formatTime('00:00'), '12am');
  assert.deepEqual(groupedHours(), [
    { label: 'Mon – Fri', hours: '6:30am – 5pm' }, { label: 'Saturday', hours: '7:30am – 5pm' }, { label: 'Sunday', hours: '8am – 3pm' },
  ]);
});

test('open-now logic handles open, before opening, after closing and closed days', () => {
  const list = [
    { day: 'Monday', opens: '07:00', closes: '18:00' }, { day: 'Tuesday' },
    { day: 'Wednesday', opens: '08:00', closes: '12:00' },
  ] as { day: (typeof DAYS)[number]; opens?: string; closes?: string }[];
  assert.deepEqual(openState('Monday', toMinutes('09:00'), list), { open: true, closes: '18:00' });
  assert.deepEqual(openState('Monday', toMinutes('06:59'), list), { open: false, next: { day: 'Monday', opens: '07:00' } });
  assert.deepEqual(openState('Monday', toMinutes('18:00'), list), { open: false, next: { day: 'Wednesday', opens: '08:00' } });
  assert.deepEqual(openState('Tuesday', toMinutes('10:00'), list), { open: false, next: { day: 'Wednesday', opens: '08:00' } });
  assert.deepEqual(openState('Wednesday', toMinutes('13:00'), list), { open: false, next: { day: 'Monday', opens: '07:00' } });
  assert.deepEqual(openState('Monday', 600, []), { open: false });
});

test('contact details, amenities and links are publishable', () => {
  assert.match(cafe.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'cafe.email');
  if (cafe.phone) assert.match(cafe.phone, /\d{3}.*\d{4}/, 'cafe.phone');
  for (const link of publicLinks) assert.match(link.url, /^https:\/\//, `link "${link.label}" must be an https:// URL`);
  assert.ok(cafe.amenities.length >= 3 && cafe.amenities.length <= 4, `List 3–4 amenities (found ${cafe.amenities.length}).`);
  for (const amenity of cafe.amenities) {
    assert.ok(AMENITY_ICONS.includes(amenity.icon), `amenity "${amenity.title}": unknown icon "${amenity.icon}" (use ${AMENITY_ICONS.join(', ')})`);
    assert.ok(amenity.title.trim() && amenity.detail.trim(), `amenity "${amenity.title}" needs a title and detail`);
  }
  assert.ok(cafe.faqs.length >= 1, 'Add at least one FAQ.');
  for (const faq of cafe.faqs) assert.ok(faq.question.trim() && faq.answer.trim(), `FAQ "${faq.question}"`);
  assert.ok(cafe.story.length >= 1, 'Add a roastery story paragraph.');
  assert.ok(existsSync(new URL('../public/og.png', import.meta.url)), 'public/og.png social image');
});

test('time zones read naturally next to the hours', () => {
  assert.equal(timeZoneLabel('America/Los_Angeles'), 'Pacific Time');
  assert.equal(timeZoneLabel('America/New_York'), 'Eastern Time');
  assert.equal(timeZoneLabel('UTC'), 'UTC');
  assert.equal(timeZoneLabel(''), '');
});

test('the address is complete and Google Maps links are keyless and encoded', () => {
  for (const key of ['street', 'locality', 'region', 'postalCode', 'country'] as const) assert.ok(cafe.address[key].trim(), `address.${key}`);
  assert.match(cafe.address.country, /^[A-Z]{2}$/, 'address.country is a two-letter code such as US');
  const query = formatAddress();
  assert.equal(query, '20 Times Square, New York, NY 10036');
  assert.equal(mapSearchUrl('A & B, #1'), 'https://www.google.com/maps/search/?api=1&query=A%20%26%20B%2C%20%231');
  assert.ok(mapDirectionsUrl(query).startsWith('https://www.google.com/maps/dir/?api=1&destination=20%20Times%20Square'));
  assert.equal(mapEmbedUrl(query), 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s20+Times+Square%2C+New+York%2C+NY+10036!6i16');
  assert.ok(mapEmbedUrl('Shop! 1').includes('1sShop%21+1!6i16'));
  for (const url of [mapSearchUrl(query), mapDirectionsUrl(query), mapEmbedUrl(query)]) assert.doesNotMatch(url, /key=/);
});
