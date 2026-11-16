# Acme Coffee Roasters: Craft café (Next.js)

A specialty coffee theme for cafés and roasteries: single-origin profiles with tasting notes, brew methods, beans to take home, opening hours, location and a [Jamstacks](https://jamstacks.net) contact component for wholesale and cupping enquiries.

It exports to plain static files, deploys to GitHub Pages (custom domain or `/repository/` path) and works with no backend. Light mode is **kraft**: paper-bag brown, cream labels and espresso ink. Dark mode is **espresso**: dark roast surfaces with crema gold. Both follow the visitor's device unless they pick one with the header toggle.

**Acme Coffee Roasters**, its coffees, producers, menu and contact details are fictitious placeholders. Coffee regions, processes and varieties are real, but producers are described generically. The sample address is a public landmark, 20 Times Square in New York, so the map has something real to show. Replace all of it with your own.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero with a live "open now" badge and a coffee bag whose label prints your featured coffee, then **Find us** (address, directions, hours, map), **On the bar today**, signature drinks, the roastery story beside a roast log, a wholesale & cuppings invitation and FAQs |
| `/menu/` | Drinks by section with sizes, prices, brew-method drawings, dietary tags and sold-out items; section shortcuts and Espresso / Pour-over / Cold filters; milk & extras in a sticky aside |
| `/beans/` | Every coffee as a bag-label card (origin, producer, process, varieties, altitude, roast meter, tasting notes, bags and prices), process and roast filters, and **Brew at home** guides |
| `/contact/` | Wholesale, cuppings & enquiries: email and phone (always available) plus the hosted form when connected |
| any other URL | A friendly 404 ("This page went stale…") |

"Find us" is reached from the hero buttons and the footer.

## Quick start

Requires Node.js 24 or newer.

```sh
npm ci            # install exact locked dependencies
npm run dev       # http://localhost:3000 with live reload
npm test          # configuration, content and hours checks
npm run typecheck
npm run build     # static export to out/
npm start         # serve out/ locally at http://localhost:3000/
npm run check     # test + typecheck + build in one go
```

No account, API key or network service is needed to run or build the website. Fonts are installed from npm and bundled at build time.

## Make it yours

Every page reads from two content files:

| File | What to change |
| --- | --- |
| [content/coffee.ts](content/coffee.ts) | **What's on the bar today**, your coffees (beans), the drinks menu, milk & extras, allergy notes and brew guides |
| [content/cafe.ts](content/cafe.ts) | Name, tagline, introduction, roastery story, email, phone, address (plus an optional landmark/cross-streets `note`), directions, opening hours, notice, approach points, FAQs, social links |
| [app/tailwind.input.css](app/tailwind.input.css) | Colours (including the illustration palette), fonts and other customizations |
| `public/og.png` | 1200×630 social preview image |
| `app/icon.svg` | Browser tab icon |
| [site.config.json](site.config.json) | Site name/description, your time zone and public deployment settings (see below) |

### What's on the bar today

The most frequent edit. At the top of `content/coffee.ts`:

```ts
export const onTheBar: OnTheBar = {
  espresso: 'pioneer-blend',
  filter: 'kochere-washed',
  guest: 'huila-pink-bourbon', // or '' to hide the guest card
};
```

Each value is a coffee `id` from `beans`. `npm test` fails with a clear message if an id doesn't exist or that coffee is sold out.

### Adding a coffee

```ts
{
  id: 'gedeb-natural',                 // unique; also the link /beans/#gedeb-natural
  name: 'Gedeb',
  kind: 'single-origin',               // or 'blend' (then add components with shares adding up to 100)
  country: 'Ethiopia',
  region: 'Gedeb, Gedeo Zone',
  producer: 'Smallholders around Gedeb, dried on raised beds', // a real producer with permission, or a description
  process: 'natural',                  // 'washed' | 'natural' | 'honey' | 'anaerobic'
  varieties: ['Heirloom landraces'],
  altitude: [2000, 2200],              // metres: one number or a [low, high] range
  roast: 'light',                      // 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark'
  notes: [                             // 2–4; family colours the chip's dot
    { note: 'Blueberry', family: 'fruity' },   // fruity, floral, sweet, nutty, chocolate, spice
    { note: 'Strawberry jam', family: 'sweet' },
    { note: 'Cacao nib', family: 'chocolate' },
  ],
  description: 'Big, juicy and unapologetically fruity.',
  bags: [{ size: '250g', amount: 22 }, { size: '1kg', amount: 76 }],
  available: true,
  color: '#6d4c8f',                    // label tint
  coordinates: { lat: 5.9, lng: 38.23 }, // optional line on the label
}
```

- **Sold out?** Set `available: false`. The card stays on the Beans page, faded with a "Sold out" stamp. Set it back to `true` when the new harvest arrives.
- **Featured coffee:** exactly one coffee has `featured: true`; its label is printed on the home page coffee bag.
- **Seasonal drinks:** add a drink with `badge: 'seasonal'`, and delete it when the season ends. Use `available: false` for "Sold out today".
- **New menu section:** add `{ id, title, description, items: [...] }` to `drinks`. It appears in the section shortcuts automatically.
- **Drinks:** `method` picks the drawing (`espresso`, `milk`, `pour-over`, `chemex`, `aeropress`, `french-press`, `batch`, `cold-brew`, `tea`, `cocoa`, `pastry`) and the menu filter. `milk: true` shows "Whole milk or oat". Keep 3–6 drinks `featured` for the home page.
- **Brew guides:** give dose and water in grams, temperature in °C and time in seconds. The ratio (e.g. 1:16.7) and °F are worked out for you.
- **Prices** are numbers in `shop.currency` (`5` is $5, `5.5` is $5.50). Change `currency` and `locale` for other countries.

`npm test` checks the content after every edit: unique, URL-safe ids, required fields, valid prices and sizes, known processes, roasts, flavour families, diet tags and drawings, blend shares, brew ratios and sensible counts. A failure names the item to fix.

### Hours and the "open now" badge

`hours` in `content/cafe.ts` lists every day once with 24-hour `opens`/`closes` local times. Leave both out for a closed day. Use `notice` for one-off messages such as holiday hours or a public cupping; leave it `''` to hide it.

Your time zone is `timeZone` in [site.config.json](site.config.json), an IANA name such as `America/New_York` or `Europe/London`. If Jamstacks created this website, it's the time zone you chose in the portal. With it:

- the badge works out "Open now · until 5pm" or "Closed · opens Monday at 6:30am" in the visitor's browser using *your* clock, refreshed every minute, so the built files never contain a stale time;
- the hours say "Times shown in Eastern Time" (or your zone).

Without a time zone, or without JavaScript, the badge shows a neutral label ("Open 7 days", or "See opening hours" if you close on any day) and never claims open or closed.

### Location and map

The home page puts the address, directions and hours directly under the hero, beside a Google map. The map and the "Get directions" and "Open in Google Maps" buttons all come from `address` in `content/cafe.ts`.

All three are free and need no Google account or API key. The links use Google's documented [Maps URLs](https://developers.google.com/maps/documentation/urls/get-started); the map uses Google's keyless embed (`google.com/maps/embed?pb=…`), which is widely used but not a documented API. For Google's officially supported option, create a free [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) key restricted to your domain and change `mapEmbedUrl` in [lib/maps.ts](lib/maps.ts) as shown there.

The map is lazy-loaded, so Google is only contacted when it scrolls into view. Google may set cookies in the embedded map, so mention it in your privacy notice if you have one. `--map-filter` in `app/tailwind.input.css` warms the map in light mode and darkens it in dark mode; set it to `none` for Google's normal colours.

## Appearance

The header uses `DarkModeToggle` from the published `jamstacks` React package; the root layout supplies `ThemeProvider` and the early `ThemeScript`, so a saved preference applies before the first paint.

The coffee bag (with twine and a kraft hang tag), brew-method drawings, roast meter, tasting-note dots, ink stamps, masking tape, torn paper edges, coffee ring stains, a coffee-cherry branch and pen notes are inline SVG and CSS coloured by tokens in `app/tailwind.input.css`: a kraft bag by day, a matte black bag with gold print by night. The background is a real paper texture: a neutral grey grain tile in `app/textures/` blended over the theme colour, so the colour always comes from the tokens (originals and notes in [design/textures/](design/textures/)). Gentle animations (steam, a pour-over drip, stamps settling) stop for visitors who prefer reduced motion.

Styling uses [Tailwind CSS v4](https://tailwindcss.com). Components use utility classes such as `bg-surface text-ink`, built from the template's own colour tokens; Tailwind's default palette is switched off. To change a colour, edit its variable in `app/tailwind.input.css` (light `:root` and both dark blocks). To add one, add a variable there and map it in `@theme inline` (`--color-highlight: var(--highlight)` gives `bg-highlight`, `text-highlight` and so on).

Fonts, all self-hosted through Fontsource packages under the SIL Open Font License:

- [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab) for headings
- [Work Sans](https://fonts.google.com/specimen/Work+Sans) for text
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for label details
- [Caveat](https://fonts.google.com/specimen/Caveat) for a few handwritten pen notes

## Footer credit

The footer ends with "with ❤️ [jamstacks.net](https://jamstacks.net)". It's an ordinary link in [components/site-footer.tsx](components/site-footer.tsx). This is your website, so you can keep, reword or remove it.

## Configuration

`site.config.json` holds public deployment settings only. Jamstacks may rewrite this file when it sets up a repository for you; it never touches `content/`.

```json
{
  "name": "Acme Coffee Roasters",
  "description": "Specialty coffee and a micro-roastery in Midtown Manhattan. …",
  "domain": "",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Build-time environment variables override the file (blank values keep the file's value). See [.env.example](.env.example).

| Purpose | Local/build variable | GitHub Actions repository variable |
| --- | --- | --- |
| Public Jamstacks website ID | `JAMSTACKS_SITE` | `JAMSTACKS_SITE` |
| Component CDN base | `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | `JAMSTACKS_CDN_URL` |
| Display/canonical domain (hostname only) | `NEXT_PUBLIC_SITE_DOMAIN` | `SITE_DOMAIN` |
| Time zone for opening hours (IANA name) | `SITE_TIME_ZONE` | not needed; set `timeZone` in the file |
| Project-path prefix, e.g. `/my-roastery` | `PAGES_BASE_PATH` | set automatically from `actions/configure-pages` |
| Absolute site URL for canonical links/sitemap | `PAGES_BASE_URL` | set automatically from `actions/configure-pages` |

Every value here is **public** and ends up in the built files. Never put GitHub tokens, publishing keys or private email addresses in config or `.env` files.

Validation happens at build time ([lib/config.mjs](lib/config.mjs)): the site ID must be a single path-safe segment, the CDN must be HTTPS, the domain a bare hostname and the base path a plain URL path. A `localhost` CDN is rejected unless you opt in with `JAMSTACKS_ALLOW_LOCAL_CDN=1`, and always rejected in GitHub Actions. When neither `PAGES_BASE_URL` nor a domain is known, canonical links and social images are omitted and `sitemap.xml` is empty, rather than guessing an origin.

The home page includes `CafeOrCoffeeShop` structured data (address, hours, contact, menu link) built from `content/`.

## Contact and Jamstacks

**Without Jamstacks** (default): the Contact page shows your email with a copy button, your phone number and a "useful to include" list (business name, weekly volume, dates). No Jamstacks script is requested anywhere.

**With Jamstacks**: create a website in the Jamstacks portal, configure the support form's copy (for example heading "Wholesale, cuppings & enquiries", labels, button text and a success message) and theme, and **publish** it. Then set `JAMSTACKS_SITE` (and `JAMSTACKS_CDN_URL` if you're not using `https://cdn.jamstacks.net`) and rebuild. The Contact page then renders:

```html
<jamstacks-support-form data-jamstacks-component="support-form" data-jamstacks-site="site_…"></jamstacks-support-form>
<!-- plus, after hydration, one script: {cdn}/sites/{siteId}/embed.js -->
```

- The hosted component renders inside the tag and owns validation, spam protection, submission and the success/error messages. This template never submits messages, never registers the element itself and never shows a success message of its own.
- Your email stays visible next to the form at all times. If the script can't load, a short message offers the email instead.
- Form text and theme changes you publish in the portal appear after a reload — no rebuild needed. Changing content or the site ID does need a rebuild.
- The form supports name, email and message. Don't promise ordering, bookings, attachments or extra fields in your page copy.
- Only the Contact page loads the Jamstacks script.

**Why Contact uses full page loads:** the shared runtime finds the form's host when its script runs and has no public "remount" API, so links to and from Contact do an ordinary full page load ([components/site-link.tsx](components/site-link.tsx)).

**Styling:** the page maps its tokens to the shared `--jamstacks-*` CSS variables in `app/tailwind.input.css`. A theme you publish in the portal overrides these. Don't style the component's internals.

**Content Security Policy:** none is set by this template. If you add one, allow scripts from your Jamstacks CDN origin, the spam-check provider used by the form (`https://challenges.cloudflare.com` for scripts and frames), `connect-src` to the API origin your published form uses, and `frame-src https://www.google.com` for the map. Inline structured data and the theme script also need a nonce or hash. Avoid wildcards and `unsafe-eval`.

## Deploy to GitHub Pages

The workflow at [.github/workflows/pages.yml](.github/workflows/pages.yml) tests, type-checks, builds and deploys on every push to `main`, validates pull requests without deploying, and can be run manually.

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Optional: **Settings → Secrets and variables → Actions → Variables**: add `JAMSTACKS_SITE`, `JAMSTACKS_CDN_URL`, `SITE_DOMAIN`. These are *variables*, not secrets — they're public.
4. Push to `main` or run the workflow from the Actions tab.

To preview a project-path build locally:

```sh
PAGES_BASE_PATH=/cafe-preview npm run build
node scripts/serve.mjs --base /cafe-preview   # http://localhost:3000/cafe-preview/
```

**Custom domain:** set it in **Settings → Pages → Custom domain** and create the DNS records GitHub shows you. `SITE_DOMAIN` alone only informs canonical URLs.

**Jamstacks provisioning:** if Jamstacks created this repository, it already enabled Pages, set the variables and started the first run, named `Jamstacks <operation id>` via the workflow's optional `provisioning_id` input. Keep the workflow's file path, inputs and run name if you edit it.

## Local Jamstacks development

```sh
JAMSTACKS_SITE=site_… \
NEXT_PUBLIC_JAMSTACKS_CDN_URL=https://localhost:5001/_cdn \
JAMSTACKS_ALLOW_LOCAL_CDN=1 npm run dev
```

Trust the local development certificate in your browser and register `http://localhost:3000` as an allowed origin for the website in the portal.

## Project structure

```
app/                  routes, metadata, sitemap/robots, global styles, tokens and paper grain tiles (app/textures/)
components/           header, footer, hero bag, bean cards, brew drawings, roast meter, menu board, open badge, Jamstacks host
content/              cafe.ts and coffee.ts — your content
lib/config.mjs        build-time public config resolution and validation
lib/menu-filter.ts    menu method filters
lib/bean-filter.ts    beans process/roast filters
lib/paths.ts          base-path-aware links and asset URLs
lib/structured-data.ts  schema.org CafeOrCoffeeShop data
lib/time-zone.ts      readable time zone names for the hours
lib/maps.ts           Google Maps embed, search and directions URLs
lib/embed-status.ts   observable states of the hosted form
types/jamstacks.d.ts  typed JSX for <jamstacks-support-form>
public/               social preview image
scripts/serve.mjs     static preview server (with base path support)
tests/                node:test suites
site.config.json      public deployment settings (provisioner-compatible)
design/textures/      source photos for the paper grain (not served)
jamstacks/            optional template publishing metadata and gallery captures
```

## Before publishing your website

- Replace Acme Coffee Roasters, the address (and its `note`), directions, email, phone, coffees, producers, prices, menu, FAQs and social links with your own details.
- Set what's on the bar today and your featured coffee.
- Set your real opening hours and `timeZone` in `site.config.json`, and check the "open now" badge.
- Update the site title/description, icon and social preview image. Set the correct public domain or Pages URL.
- Run `npm run check` and a project-path build when using a repository URL.
- Check the pages on phone and desktop, in light and dark, with keyboard navigation and the Contact fallback.
- If you connect Jamstacks, publish the form in the portal and verify a real test message arrives. A successful build does not verify delivery.

`AGENTS.md` gives coding assistants the same architecture and editing guidance.

## Optional template publishing folder

`jamstacks/` is used only to publish this source template in the Jamstacks gallery:

```text
jamstacks/config.json       template metadata and screenshot paths
jamstacks/screenshots.json  capture viewport, hashes and sizes
jamstacks/home-light.jpg    light homepage preview
jamstacks/home-dark.jpg     dark homepage preview
jamstacks/config.test.mjs   source-template publishing checks
```

Run `node --test jamstacks/config.test.mjs` when maintaining the source template. **Customer websites can delete the whole folder**, and Jamstacks provisioning removes it after verifying it. Website code, normal `npm test`, type checking, builds and the Pages workflow never import or read it. `site.config.json`, the embed integration and `.github/workflows/pages.yml` live outside it and keep working without it.
