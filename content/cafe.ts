// Café and roastery details. Edit this file to make the website yours.
// Everything here is placeholder content for a fictitious café. The sample address is a well-known
// public landmark (20 Times Square, New York) so the map has something to show; replace it with yours.
// Plain strings only: text is rendered as text, never as HTML.

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS: readonly Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export interface OpeningHours {
  day: Day;
  /** 24-hour "HH:MM" local time, e.g. "06:30". Omit both to mark the day closed. */
  opens?: string;
  closes?: string;
}

/** Icon names from components/icons.tsx. */
export type AmenityIcon = 'roast' | 'handshake' | 'drip' | 'crate' | 'wifi' | 'plug' | 'leaf' | 'cup' | 'bike';

export const AMENITY_ICONS: readonly AmenityIcon[] = ['roast', 'handshake', 'drip', 'crate', 'wifi', 'plug', 'leaf', 'cup', 'bike'];

export interface Amenity {
  /** Icon name from components/icons.tsx: one of AMENITY_ICONS. */
  icon: AmenityIcon;
  /** Short bold heading, e.g. "Roasted weekly". */
  title: string;
  /** One sentence under the heading. */
  detail: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CafeLink {
  /** Visible label, e.g. "Instagram". */
  label: string;
  /** Absolute https:// URL. Entries with an empty URL are not rendered. */
  url: string;
}

export interface Cafe {
  /** Business name, shown in the header, hero, footer and page titles. */
  name: string;
  /** Short line under the name on the home page. */
  tagline: string;
  /** One or two sentences: the first thing visitors read. */
  introduction: string;
  /** Home page "the roastery" paragraphs. */
  story: string[];
  /** Public contact address. Choose an address you are happy to publish. */
  email: string;
  /** Public phone number as written for people, e.g. "(555) 010-4477". Set to '' to hide it. */
  phone: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    /** ISO 3166-1 alpha-2, e.g. "US". */
    country: string;
    /** Optional landmark or cross streets shown under the address. */
    note?: string;
  };
  /** How to find you: transit, parking, bikes, step-free access. */
  directions: string[];
  /** Local times in the café's time zone, which is set by `timeZone` in site.config.json. */
  hours: OpeningHours[];
  /** Optional one-off notice such as holiday hours or a public cupping. Set to '' to hide it. */
  notice: string;
  /** Three or four points about how you work, shown beside the roastery story. */
  amenities: Amenity[];
  /** Questions answered at the bottom of the home page. */
  faqs: Faq[];
  /** Public profiles. Leave `url` empty to hide an entry. */
  links: CafeLink[];
}

export const cafe: Cafe = {
  name: 'Kraft & Crema Roasters',
  tagline: 'Specialty coffee · roasted weekly in New York',
  introduction:
    'A brew bar and micro-roastery on the square. Two coffees on the bar every day, beans roasted a few feet from the counter, and someone happy to talk you through both.',
  story: [
    'Kraft & Crema started as a 5-kilo roaster in a borrowed corner and a list of farms we wanted to taste. The roaster is bigger now, but the idea hasn’t changed: buy great green coffee, roast it carefully, and brew it the way it wants to be brewed.',
    'We roast every Tuesday and Friday, cup every batch before it reaches the bar, and keep the menu short so each coffee gets the attention it deserves. Ask for a taste of anything on the shelf.',
  ],
  email: 'hello@example.com',
  phone: '(555) 010-4477',
  address: {
    street: '20 Times Square',
    locality: 'New York',
    region: 'NY',
    postalCode: '10036',
    country: 'US',
    note: 'Northeast corner of 7th Avenue and 47th Street',
  },
  directions: [
    'A five-minute walk from Times Sq–42 St station (1, 2, 3, 7, N, Q, R, W and S trains) — head north up 7th Avenue.',
    'From 49 St station (N, Q, R, W), walk two blocks south. Citi Bike docks are on 47th Street.',
    'Step-free entrance on 7th Avenue and an accessible restroom.',
  ],
  hours: [
    { day: 'Monday', opens: '06:30', closes: '17:00' },
    { day: 'Tuesday', opens: '06:30', closes: '17:00' },
    { day: 'Wednesday', opens: '06:30', closes: '17:00' },
    { day: 'Thursday', opens: '06:30', closes: '17:00' },
    { day: 'Friday', opens: '06:30', closes: '17:00' },
    { day: 'Saturday', opens: '07:30', closes: '17:00' },
    { day: 'Sunday', opens: '08:00', closes: '15:00' },
  ],
  notice: 'Public cupping on Saturdays at 10am: free, no booking, just turn up.',
  amenities: [
    { icon: 'roast', title: 'Roasted weekly', detail: 'Small batches every Tuesday and Friday, rested a few days before they hit the bar.' },
    { icon: 'handshake', title: 'Direct relationships', detail: 'We buy from the same producers and importers year after year, and pay well above commodity prices.' },
    { icon: 'drip', title: 'A proper brew bar', detail: 'Espresso on one side, V60, Chemex and AeroPress on the other. Every cup is weighed.' },
    { icon: 'crate', title: 'Wholesale', detail: 'Coffee, training and equipment advice for cafés, restaurants and offices.' },
  ],
  faqs: [
    {
      question: 'Do you sell beans to take home?',
      answer: 'Yes. Every coffee on the Beans page is on the shelf by the counter in 250g and 1kg bags, roasted within the last week or two.',
    },
    {
      question: 'Can you grind them for me?',
      answer: 'Of course. Tell us how you brew (espresso, pour-over, French press, cold brew) and we’ll grind to suit. Whole beans stay fresh longer if you have a grinder.',
    },
    {
      question: 'How fresh is the coffee?',
      answer: 'Every bag has its roast date on the label. Filter roasts taste best from about 4 days to 5 weeks after roasting; espresso from about 7 days.',
    },
    {
      question: 'Do you have dairy-free milks?',
      answer: 'Oat milk is always on, at a small extra charge, and we’re happy to steam it for any milk drink. The menu marks vegan and dairy-free items.',
    },
    {
      question: 'Can I bring a laptop?',
      answer: 'Yes, there’s Wi‑Fi and a long bar with power at the window. On busy weekend mornings we kindly ask laptop users to leave the big tables for groups.',
    },
    {
      question: 'Do you supply cafés and offices?',
      answer: 'We do. Send us a note with your business name and roughly how much coffee you go through each week, and we’ll set up a tasting and send a price list.',
    },
  ],
  links: [
    // Add your public profiles. Entries with an empty URL are hidden, so no dead links ship.
    { label: 'Instagram', url: '' },
    { label: 'Google Maps', url: '' },
  ],
};

/** Profile links that have a URL. */
export const publicLinks = cafe.links.filter(link => link.url.trim() !== '');

/** Single-line postal address. */
export function formatAddress(address = cafe.address): string {
  return `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
}

/** "07:30" → "7:30am", "18:00" → "6pm". */
export function formatTime(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

/** "7am – 6pm" or "Closed". */
export function formatHours(entry: OpeningHours): string {
  return entry.opens && entry.closes ? `${formatTime(entry.opens)} – ${formatTime(entry.closes)}` : 'Closed';
}

/** Consecutive days with the same hours, e.g. [{ label: 'Mon – Fri', hours: '6:30am – 5pm' }]. */
export function groupedHours(hours = cafe.hours): { label: string; hours: string }[] {
  const groups: { days: Day[]; hours: string }[] = [];
  for (const entry of hours) {
    const text = formatHours(entry);
    const last = groups.at(-1);
    if (last && last.hours === text) last.days.push(entry.day);
    else groups.push({ days: [entry.day], hours: text });
  }
  const short = (day: Day) => day.slice(0, 3);
  return groups.map(group => ({
    label: group.days.length === 1 ? group.days[0] : `${short(group.days[0])} – ${short(group.days.at(-1)!)}`,
    hours: group.hours,
  }));
}

/** Minutes after midnight for "HH:MM". */
export function toMinutes(value: string): number {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
}

export type OpenState = { open: true; closes: string } | { open: false; next?: { day: Day; opens: string } };

/**
 * Whether the café is open at a given local day/time. Pure, so it is unit tested and
 * the browser only supplies the current time in the café's time zone.
 */
export function openState(day: Day, minutes: number, hours = cafe.hours): OpenState {
  const today = hours.find(entry => entry.day === day);
  if (today?.opens && today.closes && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, closes: today.closes };
  }
  const start = DAYS.indexOf(day);
  for (let offset = 0; offset < 8; offset++) {
    const candidate = DAYS[(start + offset) % 7];
    const entry = hours.find(item => item.day === candidate);
    if (!entry?.opens || !entry.closes) continue;
    if (offset === 0 && minutes >= toMinutes(entry.opens)) continue;
    return { open: false, next: { day: candidate, opens: entry.opens } };
  }
  return { open: false };
}
