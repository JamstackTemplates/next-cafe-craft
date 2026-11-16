// Coffee: the beans you roast, what's on the bar today, the drinks menu and brew guides.
// Every page reads from this file. Coffee names, producers and prices are placeholders: the regions,
// processes and varieties are real, but producers are described generically and nothing here
// describes a real named farm, person or lot. Replace them with your own.
// Plain strings only: text is rendered as text, never as HTML.

/* ------------------------------------------------------------------
   Today's bar. The owner's most frequent edit: change the bean ids here.
   ------------------------------------------------------------------ */

export interface OnTheBar {
  /** Bean id in the espresso grinder, e.g. 'pioneer-blend'. */
  espresso: string;
  /** Bean id on filter (batch brew and pour-over), e.g. 'kochere-washed'. */
  filter: string;
  /** Optional third coffee on the slow bar. Set to '' to hide it. */
  guest: string;
}

export const onTheBar: OnTheBar = {
  espresso: 'pioneer-blend',
  filter: 'kochere-washed',
  guest: 'huila-pink-bourbon',
};

/* ------------------------------------------------------------------
   Beans
   ------------------------------------------------------------------ */

export type Process = 'washed' | 'natural' | 'honey' | 'anaerobic';
export type Roast = 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark';
export type FlavourFamily = 'fruity' | 'floral' | 'sweet' | 'nutty' | 'chocolate' | 'spice';

export const PROCESSES: Record<Process, { label: string; detail: string }> = {
  washed: { label: 'Washed', detail: 'Fruit removed before drying: clean, bright and clear.' },
  natural: { label: 'Natural', detail: 'Dried whole in the cherry: jammy, fruity and full.' },
  honey: { label: 'Honey', detail: 'Dried with some sticky fruit left on: sweet and round.' },
  anaerobic: { label: 'Anaerobic', detail: 'Fermented in sealed tanks: vivid, winey and experimental.' },
};

/** Roast levels in order, light to dark. The roast meter fills one bean per step. */
export const ROASTS: readonly Roast[] = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];

export const ROAST_LABELS: Record<Roast, string> = {
  light: 'Light', 'medium-light': 'Medium-light', medium: 'Medium', 'medium-dark': 'Medium-dark', dark: 'Dark',
};

export const FLAVOUR_FAMILIES: Record<FlavourFamily, string> = {
  fruity: 'Fruity', floral: 'Floral', sweet: 'Sweet', nutty: 'Nutty', chocolate: 'Chocolate', spice: 'Spice',
};

export interface TastingNote {
  /** What it tastes like, e.g. "Blueberry". */
  note: string;
  /** Sets the colour of the chip's dot. */
  family: FlavourFamily;
}

export interface BagPrice {
  /** Bag size as written on the shelf, e.g. "250g" or "1kg". */
  size: string;
  /** Price in `shop.currency`, e.g. 19 for $19. */
  amount: number;
}

export interface Bean {
  /** Unique, URL-safe id used for links such as /beans/#gedeb-natural and in `onTheBar`. */
  id: string;
  /** Name on the label, e.g. "Kochere". */
  name: string;
  /** A single farm or region, or a blend of several. */
  kind: 'single-origin' | 'blend';
  /** Country (or countries, for a blend), e.g. "Ethiopia". */
  country: string;
  /** Growing region, e.g. "Yirgacheffe". */
  region: string;
  /** Who grew it. Use the real producer with their permission, or a generic description such as "smallholders around Gedeb". */
  producer: string;
  process: Process;
  /** Coffee varieties, e.g. ["Heirloom landraces"]. */
  varieties: string[];
  /** Metres above sea level: one number or a [low, high] range. */
  altitude: number | [number, number];
  roast: Roast;
  /** Two to four tasting notes. */
  notes: TastingNote[];
  /** One or two sentences in your own words. */
  description: string;
  /** Retail bags on the shelf. */
  bags: BagPrice[];
  /** Set to false to show "Sold out" without deleting the coffee. */
  available: boolean;
  /** Exactly one coffee is featured: its label is printed on the home page coffee bag. */
  featured?: boolean;
  /** Label tint for this coffee. Any CSS colour. */
  color: string;
  /** For blends: what's in it. Shares add up to 100. */
  components?: { origin: string; share: number }[];
  /** Optional approximate coordinates of the region, shown as a small line on the label. */
  coordinates?: { lat: number; lng: number };
}

export const beans: Bean[] = [
  {
    id: 'kochere-washed',
    name: 'Kochere',
    kind: 'single-origin',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    producer: 'Smallholder farmers delivering to a washing station near Kochere',
    process: 'washed',
    varieties: ['Heirloom landraces'],
    altitude: 1950,
    roast: 'light',
    notes: [
      { note: 'Bergamot', family: 'floral' },
      { note: 'Meyer lemon', family: 'fruity' },
      { note: 'Wildflower honey', family: 'sweet' },
    ],
    description: 'Tea-like and delicate, with a floral lift that blooms as it cools. Our favourite pour-over of the year so far.',
    bags: [{ size: '250g', amount: 21 }, { size: '1kg', amount: 72 }],
    available: true,
    featured: true,
    color: '#d9a63a',
    coordinates: { lat: 6.16, lng: 38.2 },
  },
  {
    id: 'gedeb-natural',
    name: 'Gedeb',
    kind: 'single-origin',
    country: 'Ethiopia',
    region: 'Gedeb, Gedeo Zone',
    producer: 'Smallholders around Gedeb, dried on raised beds',
    process: 'natural',
    varieties: ['Heirloom landraces'],
    altitude: [2000, 2200],
    roast: 'light',
    notes: [
      { note: 'Blueberry', family: 'fruity' },
      { note: 'Strawberry jam', family: 'sweet' },
      { note: 'Cacao nib', family: 'chocolate' },
    ],
    description: 'Big, juicy and unapologetically fruity. Try it as an AeroPress or over ice.',
    bags: [{ size: '250g', amount: 22 }, { size: '1kg', amount: 76 }],
    available: true,
    color: '#6d4c8f',
    coordinates: { lat: 5.9, lng: 38.23 },
  },
  {
    id: 'huila-pink-bourbon',
    name: 'Pink Bourbon',
    kind: 'single-origin',
    country: 'Colombia',
    region: 'Huila',
    producer: 'A family farm outside Pitalito, fermented in sealed tanks',
    process: 'anaerobic',
    varieties: ['Pink Bourbon'],
    altitude: 1750,
    roast: 'light',
    notes: [
      { note: 'Hibiscus', family: 'floral' },
      { note: 'Red grape', family: 'fruity' },
      { note: 'Cinnamon', family: 'spice' },
      { note: 'Brown sugar', family: 'sweet' },
    ],
    description: 'A small, experimental lot: winey and spiced, with a long, sweet finish. On the slow bar while it lasts.',
    bags: [{ size: '250g', amount: 26 }],
    available: true,
    color: '#c95d73',
    coordinates: { lat: 1.85, lng: -76.05 },
  },
  {
    id: 'nyeri-aa',
    name: 'Nyeri AA',
    kind: 'single-origin',
    country: 'Kenya',
    region: 'Nyeri',
    producer: 'Members of a cooperative society on the slopes of Mount Kenya',
    process: 'washed',
    varieties: ['SL28', 'SL34', 'Ruiru 11'],
    altitude: 1800,
    roast: 'medium-light',
    notes: [
      { note: 'Blackcurrant', family: 'fruity' },
      { note: 'Pink grapefruit', family: 'fruity' },
      { note: 'Demerara', family: 'sweet' },
    ],
    description: 'Savoury-sweet and sparkling, the way only a Kenyan coffee can be. The new harvest lands in early summer.',
    bags: [{ size: '250g', amount: 23 }, { size: '1kg', amount: 80 }],
    available: false,
    color: '#a3364a',
    coordinates: { lat: -0.42, lng: 36.95 },
  },
  {
    id: 'santa-barbara-honey',
    name: 'Santa Bárbara',
    kind: 'single-origin',
    country: 'Honduras',
    region: 'Santa Bárbara',
    producer: 'Neighbouring family farms around Lake Yojoa',
    process: 'honey',
    varieties: ['Parainema', 'Catuaí'],
    altitude: [1500, 1650],
    roast: 'medium-light',
    notes: [
      { note: 'Apricot', family: 'fruity' },
      { note: 'Caramel', family: 'sweet' },
      { note: 'Almond', family: 'nutty' },
    ],
    description: 'Round and sweet with soft stone fruit. Forgiving on any brewer, and lovely with a splash of milk.',
    bags: [{ size: '250g', amount: 20 }, { size: '1kg', amount: 68 }],
    available: true,
    color: '#d07a2c',
    coordinates: { lat: 14.92, lng: -88.24 },
  },
  {
    id: 'cerrado-natural',
    name: 'Cerrado',
    kind: 'single-origin',
    country: 'Brazil',
    region: 'Cerrado Mineiro',
    producer: 'A mid-sized estate on the Cerrado plateau',
    process: 'natural',
    varieties: ['Yellow Catuaí', 'Mundo Novo'],
    altitude: 1100,
    roast: 'medium',
    notes: [
      { note: 'Hazelnut', family: 'nutty' },
      { note: 'Milk chocolate', family: 'chocolate' },
      { note: 'Brown sugar', family: 'sweet' },
    ],
    description: 'Comforting and chocolatey, with low acidity. A great everyday coffee for French press and drip machines.',
    bags: [{ size: '250g', amount: 17 }, { size: '1kg', amount: 58 }],
    available: true,
    color: '#8a5a33',
    coordinates: { lat: -18.94, lng: -46.99 },
  },
  {
    id: 'pioneer-blend',
    name: 'Pioneer',
    kind: 'blend',
    country: 'Brazil & Colombia',
    region: 'Cerrado Mineiro & Huila',
    producer: 'Our Cerrado and Huila coffees, roasted together',
    process: 'natural',
    varieties: ['Yellow Catuaí', 'Caturra', 'Castillo'],
    altitude: [1100, 1800],
    roast: 'medium-dark',
    notes: [
      { note: 'Dark chocolate', family: 'chocolate' },
      { note: 'Toffee', family: 'sweet' },
      { note: 'Roasted hazelnut', family: 'nutty' },
    ],
    description: 'Our house espresso. Syrupy and chocolatey on its own, and built to cut through milk.',
    bags: [{ size: '250g', amount: 18 }, { size: '1kg', amount: 60 }],
    available: true,
    color: '#3d5a73',
    components: [
      { origin: 'Brazil, Cerrado Mineiro (natural)', share: 60 },
      { origin: 'Colombia, Huila (washed)', share: 40 },
    ],
  },
  {
    id: 'huila-decaf',
    name: 'Sugarcane Decaf',
    kind: 'single-origin',
    country: 'Colombia',
    region: 'Huila',
    producer: 'Smallholders around La Plata; decaffeinated in Colombia with sugarcane ethyl acetate',
    process: 'washed',
    varieties: ['Caturra', 'Castillo'],
    altitude: 1650,
    roast: 'medium',
    notes: [
      { note: 'Milk chocolate', family: 'chocolate' },
      { note: 'Red apple', family: 'fruity' },
      { note: 'Panela', family: 'sweet' },
    ],
    description: 'A decaf worth drinking for its own sake. Sweet and gentle, as espresso or filter.',
    bags: [{ size: '250g', amount: 19 }],
    available: true,
    color: '#5f8a6a',
    coordinates: { lat: 2.39, lng: -75.89 },
  },
];

/* ------------------------------------------------------------------
   Drinks menu
   ------------------------------------------------------------------ */

/** Dietary markers shown as tags. */
export type Diet = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'contains-nuts';

export const DIETS: Record<Diet, { label: string; short: string }> = {
  vegan: { label: 'Vegan', short: 'VG' },
  vegetarian: { label: 'Vegetarian', short: 'V' },
  'gluten-free': { label: 'Gluten-free', short: 'GF' },
  'dairy-free': { label: 'Dairy-free', short: 'DF' },
  'contains-nuts': { label: 'Contains nuts', short: 'N' },
};

/**
 * How a drink is made; picks its little drawing (components/brew-art.tsx) and the menu filters.
 * 'tea', 'cocoa' and 'pastry' are drawings for the non-coffee sections.
 */
export type Method = 'espresso' | 'milk' | 'pour-over' | 'chemex' | 'aeropress' | 'french-press' | 'batch' | 'cold-brew' | 'tea' | 'cocoa' | 'pastry';

export const METHODS: Record<Method, string> = {
  espresso: 'Espresso', milk: 'Espresso & milk', 'pour-over': 'V60 pour-over', chemex: 'Chemex', aeropress: 'AeroPress', 'french-press': 'French press',
  batch: 'Batch brew', 'cold-brew': 'Cold brew', tea: 'Tea', cocoa: 'Chocolate', pastry: 'Bakery',
};

export interface SizePrice {
  /** e.g. "8oz", "12oz", "Carafe for two". */
  label: string;
  amount: number;
}

export interface Drink {
  /** Unique, URL-safe id used for links such as /menu/#flat-white. */
  id: string;
  name: string;
  /** One short sentence. */
  description: string;
  /** One price, or a price per size, in `shop.currency`, e.g. 4.75 for $4.75. */
  price: number | SizePrice[];
  /** Picks the drawing and the menu filter. */
  method?: Method;
  /** For drinks: how it can be served. Iced drinks appear under the "Cold" filter. */
  serve?: 'hot' | 'iced' | 'hot-or-iced';
  diet?: Diet[];
  /** Made with milk: shows "Whole milk or oat" (oat is priced in `extras`). */
  milk?: boolean;
  /** Optional sticker. */
  badge?: 'signature' | 'seasonal' | 'new';
  /** Set to false to show "Sold out today" without deleting the item. */
  available?: boolean;
  /** Show in the home page "Signature drinks" (3–6 items). */
  featured?: boolean;
}

export interface DrinkSection {
  /** Unique, URL-safe id used for links such as /menu/#filter. */
  id: string;
  title: string;
  /** Short line under the section title. */
  description: string;
  items: Drink[];
}

/** Currency and number formatting for every price on the site. */
export const shop = { currency: 'USD', locale: 'en-US' } as const;

export const drinks: DrinkSection[] = [
  {
    id: 'espresso-and-milk',
    title: 'Espresso & milk',
    description: 'Pulled from today’s espresso. Whole milk from a local dairy, or oat for a little extra.',
    items: [
      { id: 'espresso', name: 'Espresso', description: 'A double shot, about 40g in 30 seconds. Ask for a taste of the guest as espresso too.', price: 3.5, method: 'espresso', serve: 'hot', diet: ['vegan', 'gluten-free'] },
      { id: 'macchiato', name: 'Macchiato', description: 'A double shot marked with a spoon of microfoam.', price: 3.75, method: 'espresso', serve: 'hot', diet: ['vegetarian', 'gluten-free'], milk: true },
      { id: 'cortado', name: 'Cortado', description: 'Equal parts espresso and steamed milk, served in a glass.', price: 4.25, method: 'milk', serve: 'hot', diet: ['vegetarian', 'gluten-free'], milk: true, featured: true },
      { id: 'flat-white', name: 'Flat white', description: 'Double ristretto with a thin layer of silky microfoam. The best way to taste the espresso through milk.', price: 4.75, method: 'milk', serve: 'hot', diet: ['vegetarian', 'gluten-free'], milk: true, badge: 'signature', featured: true },
      { id: 'latte', name: 'Latte', description: 'A double shot with plenty of steamed milk.', price: [{ label: '8oz', amount: 4.75 }, { label: '12oz', amount: 5.5 }], method: 'milk', serve: 'hot-or-iced', diet: ['vegetarian', 'gluten-free'], milk: true },
      { id: 'cappuccino', name: 'Cappuccino', description: 'Classic and foamy, with a dusting of cocoa if you like.', price: [{ label: '6oz', amount: 4.5 }, { label: '8oz', amount: 4.75 }], method: 'milk', serve: 'hot', diet: ['vegetarian', 'gluten-free'], milk: true },
      { id: 'mocha', name: 'Mocha', description: 'Espresso and steamed milk with our own sauce made from 70% dark chocolate.', price: [{ label: '8oz', amount: 5.5 }, { label: '12oz', amount: 6.25 }], method: 'milk', serve: 'hot-or-iced', diet: ['vegetarian', 'gluten-free'], milk: true },
    ],
  },
  {
    id: 'filter',
    title: 'Filter & slow bar',
    description: 'Today’s filter coffee and the guest, brewed by hand to order. Weighed, timed and worth the wait.',
    items: [
      { id: 'v60', name: 'V60 pour-over', description: '15g to 250g, poured in slow circles. Clean, bright and clear.', price: 5.5, method: 'pour-over', serve: 'hot', diet: ['vegan', 'gluten-free'], featured: true },
      { id: 'chemex', name: 'Chemex', description: 'A carafe to share: thick filter, very clean cup, about two and a half mugs.', price: [{ label: 'Carafe for two', amount: 11 }], method: 'chemex', serve: 'hot', diet: ['vegan', 'gluten-free'], featured: true },
      { id: 'aeropress', name: 'AeroPress', description: 'Short steep, gentle press. A little more body than the V60.', price: 5, method: 'aeropress', serve: 'hot', diet: ['vegan', 'gluten-free'] },
      { id: 'batch-brew', name: 'Batch brew', description: 'Today’s filter coffee, fresh every half hour. Ready when you are.', price: [{ label: '8oz', amount: 3.25 }, { label: '12oz', amount: 3.75 }], method: 'batch', serve: 'hot', diet: ['vegan', 'gluten-free'] },
      { id: 'cold-brew', name: 'Cold brew', description: 'Steeped for 16 hours, smooth and chocolatey. Black or with a splash of milk.', price: [{ label: '12oz', amount: 5 }, { label: '16oz', amount: 5.75 }], method: 'cold-brew', serve: 'iced', diet: ['vegan', 'gluten-free'], featured: true },
      { id: 'espresso-tonic', name: 'Espresso tonic', description: 'A double shot over tonic, ice and an orange twist. Fizzy, bitter, wonderful.', price: 5.75, method: 'espresso', serve: 'iced', diet: ['vegan', 'gluten-free'], badge: 'signature', featured: true },
    ],
  },
  {
    id: 'not-coffee',
    title: 'Not coffee',
    description: 'For the friend who doesn’t drink coffee (we won’t hold it against them).',
    items: [
      { id: 'loose-leaf-tea', name: 'Pot of loose-leaf tea', description: 'Breakfast black, Earl Grey, sencha, or chamomile and mint.', price: 4.5, method: 'tea', serve: 'hot', diet: ['vegan', 'gluten-free'] },
      { id: 'masala-chai', name: 'Masala chai', description: 'Simmered with fresh ginger, cardamom and black pepper, finished with steamed milk.', price: [{ label: '8oz', amount: 4.75 }, { label: '12oz', amount: 5.5 }], method: 'tea', serve: 'hot-or-iced', diet: ['vegetarian', 'gluten-free'], milk: true, badge: 'seasonal' },
      { id: 'hot-chocolate', name: 'Hot chocolate', description: 'Our 70% chocolate sauce and steamed milk. A marshmallow if you ask nicely.', price: [{ label: '8oz', amount: 4.5 }, { label: '12oz', amount: 5.25 }], method: 'cocoa', serve: 'hot', diet: ['vegetarian', 'gluten-free'], milk: true },
    ],
  },
  {
    id: 'food',
    title: 'Something to eat',
    description: 'Baked each morning by a bakery down the street. When they’re gone, they’re gone.',
    items: [
      { id: 'butter-croissant', name: 'Butter croissant', description: 'Flaky, golden and very buttery.', price: 4.25, method: 'pastry', diet: ['vegetarian'] },
      { id: 'almond-croissant', name: 'Almond croissant', description: 'Twice-baked with frangipane and toasted almonds.', price: 5, method: 'pastry', diet: ['vegetarian', 'contains-nuts'] },
      { id: 'cardamom-knot', name: 'Cardamom knot', description: 'Swedish-style, sticky and fragrant. Perfect with a filter coffee.', price: 4.75, method: 'pastry', diet: ['vegetarian'], badge: 'new' },
      { id: 'olive-oil-cake', name: 'Olive oil & orange cake', description: 'Moist, citrusy and made with almond flour.', price: 4.5, method: 'pastry', diet: ['vegetarian', 'gluten-free', 'contains-nuts'] },
      { id: 'banana-bread', name: 'Banana bread', description: 'Dark, moist and vegan, with a crackly sugar top.', price: 4.25, method: 'pastry', diet: ['vegan'], available: false },
    ],
  },
];

/** Milk options and add-ons, shown beside the menu. A price of 0 shows as "Free". */
export const extras: { name: string; price: number }[] = [
  { name: 'Whole milk', price: 0 },
  { name: 'Oat milk', price: 0.75 },
  { name: 'Extra shot', price: 1.25 },
  { name: 'Decaf espresso', price: 0 },
  { name: 'House vanilla or chocolate', price: 0.75 },
];

/** Small print under the extras, e.g. allergy advice. */
export const menuNotes: string[] = [
  'VG vegan · V vegetarian · GF gluten-free · DF dairy-free · N contains nuts.',
  'Our pastries come from a kitchen that handles gluten, dairy, eggs and nuts. Please tell us about any allergy before ordering.',
];

/* ------------------------------------------------------------------
   Brew guides
   ------------------------------------------------------------------ */

export interface BrewGuide {
  /** Unique, URL-safe id used for links such as /beans/#brew-v60. */
  id: string;
  name: string;
  /** Drawing for the card. */
  method: Method;
  /** One line about why to use it. */
  summary: string;
  /** Ground coffee in grams. The ratio is worked out from dose and water. */
  dose: number;
  /** Water in grams (1g = 1ml). */
  water: number;
  /** Grind size in plain words, e.g. "Medium-fine, like table salt". */
  grind: string;
  /** Water temperature in °C. Fahrenheit is worked out for you. */
  temperature: number;
  /** Total brew time in seconds (16 hours = 57600). */
  seconds: number;
  /** Three to six short steps. */
  steps: string[];
}

export const brewGuides: BrewGuide[] = [
  {
    id: 'brew-v60',
    name: 'V60',
    method: 'pour-over',
    summary: 'Clean and bright. The best way to taste a light-roast single origin.',
    dose: 15,
    water: 250,
    grind: 'Medium-fine, like table salt',
    temperature: 94,
    seconds: 180,
    steps: [
      'Rinse the paper filter with hot water and tip the water away.',
      'Add the coffee, shake it flat and pour 45g of water to bloom. Wait 40 seconds.',
      'Pour slowly in small circles to 150g by 1:15.',
      'Pour to 250g by 1:45, then give the brewer a gentle swirl.',
      'Let it draw down; aim to finish around 3:00.',
    ],
  },
  {
    id: 'brew-aeropress',
    name: 'AeroPress',
    method: 'aeropress',
    summary: 'Quick, forgiving and travel-friendly, with a little more body.',
    dose: 15,
    water: 230,
    grind: 'Medium, like sand',
    temperature: 90,
    seconds: 150,
    steps: [
      'Rinse the paper filter in the cap and set the AeroPress on a sturdy mug.',
      'Add the coffee and all the water, then stir three times.',
      'Put the plunger on to stop drips and wait until 1:45.',
      'Swirl gently, then press slowly for about 30 seconds.',
    ],
  },
  {
    id: 'brew-french-press',
    name: 'French press',
    method: 'french-press',
    summary: 'Rich and heavy-bodied. Great for chocolatey coffees and for sharing.',
    dose: 30,
    water: 500,
    grind: 'Coarse, like sea salt',
    temperature: 95,
    seconds: 540,
    steps: [
      'Add the coffee and pour all the water, wetting every ground.',
      'Wait 4 minutes, then break the crust with a spoon and skim off the foam.',
      'Leave it another 5 minutes so the fines settle.',
      'Press the plunger just to the surface of the coffee and pour gently.',
    ],
  },
  {
    id: 'brew-cold-brew',
    name: 'Cold brew',
    method: 'cold-brew',
    summary: 'Smooth, sweet and low in acidity. Make it on Sunday, drink it all week.',
    dose: 100,
    water: 1000,
    grind: 'Very coarse, like breadcrumbs',
    temperature: 20,
    seconds: 57600,
    steps: [
      'Stir the coffee into cool, filtered water in a large jar.',
      'Cover and leave at room temperature for 16 hours.',
      'Strain through a paper filter or a fine cloth.',
      'Keep it in the fridge for up to a week. Serve over ice, diluted 1:1 with water or milk.',
    ],
  },
];

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

/** Every drink, in menu order. */
export const allDrinks: Drink[] = drinks.flatMap(section => section.items);

/** Drinks shown on the home page. */
export const featuredDrinks: Drink[] = allDrinks.filter(drink => drink.featured);

/** The coffee printed on the home page bag. Tests ensure exactly one is featured. */
export const featuredBean: Bean = beans.find(bean => bean.featured) ?? beans[0];

export function beanById(id: string): Bean | undefined {
  return beans.find(bean => bean.id === id);
}

/** Today's coffees for the home page and menu, in display order. Missing ids are skipped (tests catch them). */
export function barToday(bar = onTheBar): { slot: 'espresso' | 'filter' | 'guest'; label: string; bean: Bean }[] {
  const slots = [
    { slot: 'espresso' as const, label: 'On espresso', id: bar.espresso },
    { slot: 'filter' as const, label: 'On filter', id: bar.filter },
    { slot: 'guest' as const, label: 'Guest on the slow bar', id: bar.guest },
  ];
  return slots.flatMap(({ slot, label, id }) => {
    const bean = id ? beanById(id) : undefined;
    return bean ? [{ slot, label, bean }] : [];
  });
}

const formatter = new Intl.NumberFormat(shop.locale, { style: 'currency', currency: shop.currency });

/** "$4.50", or "$4" for whole amounts. */
export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  const text = formatter.format(amount);
  return Number.isInteger(amount) ? text.replace(/[.,]00(?=\D*$)/, '') : text;
}

/** Lowest price, for compact cards. */
export function startingPrice(drink: Drink): number {
  return typeof drink.price === 'number' ? drink.price : Math.min(...drink.price.map(size => size.amount));
}

export function isAvailable(item: { available?: boolean }): boolean {
  return item.available !== false;
}

/** 1 (light) to 5 (dark), for the roast meter. */
export function roastLevel(roast: Roast): number {
  return ROASTS.indexOf(roast) + 1;
}

/** "1,950 masl" or "2,000–2,200 masl". */
export function formatAltitude(altitude: Bean['altitude']): string {
  const n = (value: number) => value.toLocaleString('en-US');
  return typeof altitude === 'number' ? `${n(altitude)} masl` : `${n(altitude[0])}–${n(altitude[1])} masl`;
}

/** "ETHIOPIA · WASHED · 1,950 MASL", the typewriter line on each label. */
export function originLine(bean: Bean): string {
  return [bean.country, PROCESSES[bean.process].label, formatAltitude(bean.altitude)].join(' · ').toUpperCase();
}

/** "6.16° N · 38.20° E" */
export function formatCoordinates(point: { lat: number; lng: number }): string {
  const part = (value: number, positive: string, negative: string) => `${Math.abs(value).toFixed(2)}° ${value >= 0 ? positive : negative}`;
  return `${part(point.lat, 'N', 'S')} · ${part(point.lng, 'E', 'W')}`;
}

/** Water per gram of coffee, always derived from dose and water: 15g to 250g → "1:16.7". */
export function brewRatio(guide: Pick<BrewGuide, 'dose' | 'water'>): string {
  const ratio = Math.round((guide.water / guide.dose) * 10) / 10;
  return `1:${ratio}`;
}

/** 94 → "94°C · 201°F" */
export function formatTemperature(celsius: number): string {
  return `${celsius}°C · ${Math.round(celsius * 9 / 5 + 32)}°F`;
}

/** 180 → "3:00", 57600 → "16 hours". */
export function formatBrewTime(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.round(seconds / 360) / 10;
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
