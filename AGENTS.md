# Working on this website

This is a customer-owned Next.js website for a specialty café and roastery. Read [README.md](README.md)
for setup, content editing, deployment and the optional Jamstacks contact form.

## Working preferences

- Work in this repository on its current branch unless asked otherwise.
- Preserve existing changes. Leave edits uncommitted; push or deploy only when requested.
- Adapt the website to its owner's requested content and features. Replace the sample roastery,
  coffees, menu, address and contact details with the owner's real details; the fictional examples are starting content.

## Structure and content

- `content/coffee.ts` owns the coffee:
  - `onTheBar`: today's espresso, filter and optional guest coffee, as bean ids. The owner's most frequent
    edit ("we've switched the filter to the Gedeb") is a one-line change here.
  - `beans`: every single origin and blend with origin, producer, process, varieties, altitude, roast,
    tasting notes, bags and prices, `available` (false = "Sold out") and `featured` (exactly one; its label is
    printed on the home page coffee bag).
  - `drinks`: menu sections and items with prices/sizes, brew `method` (picks the drawing), serving, milk,
    dietary tags, stickers, availability and home page `featured` drinks; plus `extras` and `menuNotes`.
  - `brewGuides`: dose, water, grind, temperature (°C), time (seconds) and steps. The ratio and °F are
    derived; never add them as fields.
- `content/cafe.ts` owns the name, tagline, introduction, roastery story, contact details, address, directions,
  opening hours (local times), notice, the 3–4 amenity/approach points, FAQs and social links.
- Most owner requests ("add a coffee", "raise the flat white price", "the Kenya is sold out", "put the
  decaf on espresso") are edits to these two files only.
- Keep ids unique, lowercase and hyphenated; they are page anchors (`/beans/#gedeb-natural`, `/menu/#flat-white`).
  Producers must be real with permission, or generic descriptions; never invent named farms or people.
- The address drives the home page "Find us" section, Google map, directions links and structured data.
  Maps use keyless Google URLs from `lib/maps.ts`; never add a secret key, and keep the map lazy-loaded.
- The time zone is the IANA `timeZone` in `site.config.json` (Jamstacks writes the owner's choice there).
  Change it there, not in content; without it the open-now badge stays neutral.
- Use the existing illustrations (brew-method drawings, the hero bag, roast meter, tasting chips) and a bean's
  `color` instead of adding image files. Flavour families and roast levels have their own colour tokens.
- Content never goes in `site.config.json`: Jamstacks may rewrite it with deployment fields only.
- Text is rendered as plain text. Don't invent reviews, awards or claims for a real business.

## Styling (Tailwind CSS v4)

- Style components with Tailwind utility classes in the TSX. Don't add global CSS for one-off styles.
- `app/tailwind.input.css` holds everything utilities can't express: the colour tokens (`:root` for light
  "kraft", plus two dark "espresso" blocks that must stay identical), the `@theme` built from them, base element
  styles, shared building blocks (`.button`, `.button-ghost`, `.text-link`, `.eyebrow`, `.chip`, `.taste`,
  `.sticker`, `.card`, `.label`, `.stamp`, `label-text`, plus the craft details `.tape`, `.torn`, `.hang-tag` and `.hand` for short handwritten notes), the illustrations and animation, and styles driven by data attributes.
- Only this template's palette exists (`bg`, `band`, `surface`, `ink`, `muted`, `line`, `rule`, `accent`, `accent-2`,
  `label`, `stamp`, `success`, `footer` and their variants). Tailwind's default colours are switched off. To add a
  colour, add a variable to `:root` and both dark blocks, then map it in `@theme inline` as
  `--color-name: var(--variable)` to get `bg-name`, `text-name` and so on.
- Colours switch with the theme through the tokens, so prefer them to `dark:` variants (`dark:` follows `html.dark`).
- The paper texture is the `--paper` token (grain tiles in `app/textures/`, referenced relatively from the CSS so the base path is handled). Use the `paper` utility to texture a coloured band. Never tint the tiles; colour comes from the tokens.
- Keep handwritten (`.hand`, Caveat) notes to a few decorative words, marked `aria-hidden` when they repeat nearby text; never use it for body copy.
- Reuse the building blocks and components (`PageHead`, `BeanCard`, `BrewArt`, `RoastMeter`, `TastingNotes`, and `CoffeeRing`, `CherryBranch`, `PenArrow` from `components/doodles.tsx`)
  instead of restyling each instance. Add a reusable layout helper with `@utility`.
- Keep the `--jamstacks-*` component variables mapped to the tokens. Preserve readable contrast in both
  themes, responsive layouts from 360px, visible keyboard focus, semantic headings, print styles and
  reduced-motion support (all animation stops under `prefers-reduced-motion`).

## Static architecture

- Production is a static export in `out/`. Preserve static-export compatibility; no request-time rendering,
  Route Handlers, Server Actions, middleware, database or production Next.js server.
- Use local content for pages and client components only for browser interactions (open-now badge, menu and
  bean filters, copy button). Time-dependent text is computed in the browser, never at build time.
- Preserve both custom-domain root URLs and arbitrary GitHub Pages repository paths.
  Use the shared path helpers (`lib/paths.ts`) and `SiteLink` for links, images and metadata.
- Read relevant installed Next.js guides in `node_modules/next/dist/docs/` before changing framework
  behaviour. Keep dependencies modest and the npm lockfile reproducible.

## Optional Jamstacks form

- Keep the integration documented in README.md. The host is `<jamstacks-support-form>`
  with `data-jamstacks-component="support-form"` and `data-jamstacks-site` attributes.
- `JAMSTACKS_SITE` is a public website ID. Load one configured CDN bootstrap at
  `/sites/{publicSiteId}/embed.js`, on the Contact page only; no ID means no script request and a useful email fallback.
- The shared runtime owns form rendering, validation, spam protection and submission.
  Do not copy it, register a replacement element, render a substitute form, intercept submission or simulate success.
- Keep the email visible beside the form at all times, and usable during outages.
- Preserve full-document navigation to and from Contact (`SiteLink` handles it) until a supported remount contract exists.
- The form supports name, email and message. Don't promise bookings, online ordering, attachments or extra fields in page copy.
- Style through supported `--jamstacks-*` CSS variables; do not reach into shadow-root internals.
- Configuration and build-time environment values are public. Never put credentials,
  publishing keys or private notification recipients in them. Remote builds must not depend on localhost.
- Preserve `.github/workflows/pages.yml`, its optional `provisioning_id` input and correlated
  run name when changing the workflow. Pull requests validate without deploying.

## Commands and checks

```sh
npm ci
npm run dev       # http://localhost:3000
npm test          # content, hours, config and embed checks
npm run typecheck
npm run build     # static export
npm run check     # all three
PAGES_BASE_PATH=/cafe-preview npm run build
```

Run `npm run check` after every content or code change; test failures name the coffee, drink, guide or day to fix.
`npm start` previews the export on port 3000; stop the dev server first, or use `npm start -- --port 3200`.
Browser-check affected routes in light and dark, and root/project-path assets when changing layout,
navigation or deployment behaviour. Report local checks separately from any actual GitHub deployment or
delivered contact message.

## Template publishing assets

- `jamstacks/` contains optional source-template metadata, gallery captures and their checks.
- Read `jamstacks/config.json`; capture evidence is `jamstacks/screenshots.json` and the JPEGs stay directly inside `jamstacks/`.
- Run `node --test jamstacks/config.test.mjs` only when maintaining the source template.
- Customer websites can delete this entire folder, and Jamstacks provisioning removes it. Normal tests,
  website code, builds and the Pages workflow must never import or read it.
- Keep `site.config.json`, the embed integration and the Pages workflow outside the optional folder.
