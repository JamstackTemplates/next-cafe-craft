import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { BrewArt } from '../components/brew-art';
import { CherryBranch, CoffeeRing, PenArrow } from '../components/doodles';
import { GoogleMap } from '../components/google-map';
import { HeroBag } from '../components/hero-bag';
import { Icon } from '../components/icons';
import { OpenBadge } from '../components/open-badge';
import { RoastMeter } from '../components/roast-meter';
import { SiteLink } from '../components/site-link';
import { TastingNotes } from '../components/tasting-notes';
import { TimeZoneNote } from '../components/time-zone-note';
import { cafe, formatAddress, groupedHours } from '../content/cafe';
import { allDrinks, barToday, beans, featuredDrinks, formatPrice, isAvailable, originLine, PROCESSES, ROAST_LABELS, startingPrice } from '../content/coffee';
import { mapDirectionsUrl, mapSearchUrl } from '../lib/maps';
import { absoluteUrl, beanAnchor, menuAnchor } from '../lib/paths';
import { cafeStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

// Repeated text styles, kept here so every section matches.
const sectionTitle = 'mt-2.5 text-[clamp(2rem,4.4vw,3rem)]';
const lede = 'max-w-(--measure) text-[clamp(1.05rem,1.5vw,1.18rem)] text-muted';

export default function HomePage() {
  const bar = barToday();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(cafeStructuredData()) }} />

      {/* Hero */}
      <section className="overflow-hidden pt-[clamp(1.75rem,5vw,3.75rem)] pb-[clamp(1.5rem,4vw,3rem)]" aria-labelledby="hero-title">
        <div className="wrap grid items-center gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="relative isolate">
            <CoffeeRing className="absolute -bottom-24 -left-28 -z-10 max-sm:hidden" size={230} />
            <OpenBadge />
            <h1 id="hero-title" className="mt-6 mb-5 grid gap-4">
              <span className="text-[clamp(2.9rem,6.6vw,5.2rem)] leading-[.95] font-extrabold tracking-[-.035em]">
                {/* An ampersand in the name is set in the accent colour, like a printed logotype. */}
                {cafe.name.split(/(&)/).map((part, index) => part === '&' ? <span key={index} className="font-normal text-accent">&amp;</span> : part)}
              </span>
              <span className="label-text text-[clamp(.74rem,1.2vw,.86rem)] font-medium text-accent">{cafe.tagline}</span>
            </h1>
            <p className="max-w-xl text-[clamp(1.08rem,1.6vw,1.24rem)]">{cafe.introduction}</p>
            <p className="mt-7 flex flex-wrap gap-3.5">
              <SiteLink href="/menu/" className="button">See the menu <Icon name="arrow" width={18} height={18} /></SiteLink>
              <a href="#find-us" className="button button-ghost"><Icon name="pin" width={18} height={18} />Find us</a>
            </p>
            <p className="mt-6 text-[.95rem] text-muted">
              <a href="#find-us" className="inline-flex items-start gap-2 no-underline hover:text-ink">
                <Icon name="pin" width={18} height={18} className="mt-0.5 flex-none text-accent" />
                <span className="border-b-[1.5px] border-dashed border-rule">{formatAddress()}</span>
              </a>
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none print:hidden">
            <HeroBag />
          </div>
        </div>
      </section>

      {/* Find us */}
      <section id="find-us" className="wrap grid gap-6 pt-[clamp(1rem,3vw,2rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" aria-labelledby="find-us-title">
        <div className="label relative p-[clamp(1.4rem,3.5vw,2.4rem)]">
          <span className="tape -top-2.5 -left-4 -rotate-[32deg]" aria-hidden="true" />
          <p className="eyebrow">Find us</p>
          <h2 id="find-us-title" className="mt-3.5 flex items-start gap-2.5 text-[clamp(1.7rem,3.2vw,2.3rem)]">
            <Icon name="pin" width={24} height={24} className="mt-1 flex-none text-accent" />
            <span>
              {cafe.address.street}
              <span className="mt-1.5 block font-sans text-[1.05rem] font-semibold tracking-normal text-muted">
                {cafe.address.locality}, {cafe.address.region} {cafe.address.postalCode}
              </span>
            </span>
          </h2>
          {cafe.address.note ? <p className="mt-2 text-[.95rem] text-muted">{cafe.address.note}</p> : null}
          <p className="mt-5 mb-1 flex flex-wrap gap-3">
            <a className="button" href={mapDirectionsUrl(formatAddress())} rel="noopener">Get directions <Icon name="arrow" width={18} height={18} /></a>
            <a className="button button-ghost" href={mapSearchUrl(formatAddress())} rel="noopener">Open in Google Maps</a>
          </p>
          {cafe.directions.length ? (
            <ul className="mt-5 grid list-[square] gap-1.5 pl-[1.1rem] text-[.95rem] text-muted marker:text-accent">
              {cafe.directions.map(line => <li key={line}>{line}</li>)}
            </ul>
          ) : null}
          {cafe.notice ? (
            <p className="my-5 flex items-start gap-2.5 rounded-ui border-[1.5px] border-dashed border-accent bg-accent-soft px-4 py-3 text-[.95rem] font-semibold">
              <Icon name="cup" width={18} height={18} className="mt-0.5 flex-none text-accent" />{cafe.notice}
            </p>
          ) : null}
          <h3 className="mt-6 flex items-center gap-2 text-lg"><Icon name="clock" width={19} height={19} className="text-accent" />Opening hours</h3>
          <ul className="mt-2 mb-1">
            {groupedHours().map(group => (
              <li key={group.label} className="flex justify-between gap-4 border-b border-dashed border-rule py-2">
                <span>{group.label}</span><span className="font-mono text-[.92rem]">{group.hours}</span>
              </li>
            ))}
          </ul>
          <TimeZoneNote />
        </div>
        <GoogleMap className="min-h-96" />
      </section>

      {/* On the bar today */}
      {bar.length ? (
        <section className="wrap section-y" aria-labelledby="bar-title">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="eyebrow">What we’re pouring</p>
              <h2 id="bar-title" className={`${sectionTitle} flex flex-wrap items-end gap-x-5`}>
                On the bar today
                <span className="hand mb-1 inline-flex items-end gap-1 -rotate-3 text-[1.55rem] font-semibold" aria-hidden="true">
                  <PenArrow className="w-12 -scale-x-100 rotate-[200deg]" />ask for a taste!
                </span>
              </h2>
            </div>
            <SiteLink href="/beans/" className="text-link">All {beans.length} coffees &amp; brew guides</SiteLink>
          </div>
          <ul className={`grid gap-5 ${bar.length === 3 ? 'lg:grid-cols-3' : bar.length === 2 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
            {bar.map(({ slot, label, bean }) => (
              <li key={slot} className="relative" style={{ '--tint': bean.color } as CSSProperties}>
                <span className={`tape -top-3 left-1/2 -translate-x-1/2 ${slot === 'filter' ? 'tape-blue -rotate-2' : 'rotate-3'}`} aria-hidden="true" />
                <SiteLink href={beanAnchor(bean.id)}
                  className="label group flex h-full flex-col gap-3.5 overflow-hidden p-6 pt-0 no-underline transition duration-200 hover:-translate-y-1 hover:shadow-lift">
                  <span className="-mx-6 mb-1.5 block h-2 bg-(--tint)" aria-hidden="true" />
                  <span className="flex items-start justify-between gap-3">
                    <span className="stamp text-[.68rem]">{label}</span>
                    <BrewArt method={slot === 'espresso' ? 'espresso' : slot === 'filter' ? 'pour-over' : 'chemex'} size={54} />
                  </span>
                  <span>
                    <span className="block font-display text-[1.75rem] leading-none font-bold">{bean.name}</span>
                    <span className="mt-1.5 block font-medium text-muted">{bean.country} · {bean.region}</span>
                  </span>
                  <span className="label-text border-y-[1.5px] border-rule py-1.5 text-[.66rem] leading-relaxed">{originLine(bean)}</span>
                  <span className="flex flex-wrap items-center justify-between gap-2 text-[.9rem]">
                    <span><span className="label-text text-[.66rem] text-muted">Process </span>{PROCESSES[bean.process].label}</span>
                    <RoastMeter roast={bean.roast} />
                  </span>
                  <TastingNotes notes={bean.notes} />
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-semibold text-accent group-hover:underline">
                    About this coffee <Icon name="arrow" width={16} height={16} />
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Signature drinks */}
      <section className="torn paper section-y my-4 bg-band" aria-labelledby="drinks-title">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="eyebrow">From the bar</p>
              <h2 id="drinks-title" className={sectionTitle}>Signature drinks</h2>
            </div>
            <SiteLink href="/menu/" className="text-link">Full menu · {allDrinks.length} items</SiteLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDrinks.map(drink => (
              <li key={drink.id}>
                <SiteLink href={menuAnchor(drink.id)}
                  className="card flex h-full items-start gap-4 p-5 no-underline shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-rule hover:shadow-lift">
                  {drink.method ? <BrewArt method={drink.method} size={76} /> : null}
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-[1.25rem] leading-tight font-bold">{drink.name}</span>
                      <span className="font-mono text-[.92rem] font-semibold whitespace-nowrap text-accent">
                        {typeof drink.price === 'number' ? '' : 'from '}{formatPrice(startingPrice(drink))}
                      </span>
                    </span>
                    <span className="text-[.93rem] text-muted">{drink.description}</span>
                    {!isAvailable(drink) ? <span className="sticker sticker-soldout mt-1 self-start">Sold out today</span> : null}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The roastery */}
      <section className="wrap section-y grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" aria-labelledby="roastery-title">
        <div>
          <CherryBranch className="float-right -mt-4 -mr-2 w-[clamp(8rem,18vw,13rem)] -rotate-6" />
          <p className="eyebrow">The roastery</p>
          <h2 id="roastery-title" className={sectionTitle}>Roasted a few feet <em>from the bar</em></h2>
          {cafe.story.map(paragraph => <p key={paragraph} className={`mt-5 ${lede}`}>{paragraph}</p>)}
          <ul className="mt-9 grid gap-x-7 gap-y-5 sm:grid-cols-2">
            {cafe.amenities.map(amenity => (
              <li key={amenity.title} className="flex items-start gap-3.5">
                <span className="grid size-11 flex-none place-items-center rounded-full border-[1.5px] border-rule bg-surface text-accent">
                  <Icon name={amenity.icon} />
                </span>
                <span>
                  <strong className="block font-display font-bold">{amenity.title}</strong>
                  <span className="block text-[.94rem] leading-normal text-muted">{amenity.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="label relative rotate-[.6deg] p-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" aria-hidden="true" />
          <CoffeeRing className="absolute -right-3 -bottom-12 z-10 lg:-right-10" size={150} />
          <div className="flex items-start justify-between gap-4 border-b-2 border-rule pb-4">
            <div>
              <p className="label-text text-[.68rem] text-muted">{cafe.name}</p>
              <p className="mt-1 font-display text-[1.6rem] leading-none font-extrabold">Roast log</p>
            </div>
            <span className="stamp rotate-[6deg]">Cupped &amp; approved</span>
          </div>
          <ol className="mt-1">
            {beans.map((bean, index) => (
              <li key={bean.id} className="grid grid-cols-[1.8rem_minmax(0,1fr)_auto] items-center gap-x-3 border-b border-dashed border-rule py-2.5">
                <span className="font-mono text-[.78rem] text-muted">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <SiteLink href={beanAnchor(bean.id)} className={`font-semibold no-underline hover:underline ${isAvailable(bean) ? '' : 'text-muted line-through decoration-1'}`}>{bean.name}</SiteLink>
                  <span className="label-text block truncate text-[.62rem] text-muted">{bean.country} · {PROCESSES[bean.process].label}</span>
                </span>
                {isAvailable(bean)
                  ? <RoastMeter roast={bean.roast} showLabel={false} className="text-[.9rem]" />
                  : <span className="label-text text-[.64rem] text-accent">Sold out</span>}
              </li>
            ))}
          </ol>
          <p className="hand mt-4 -rotate-2 text-right text-[1.45rem]" aria-hidden="true">— every batch, cupped before it’s sold</p>
          <figcaption className="mt-2 text-[.85rem] text-muted">
            Roast levels from {ROAST_LABELS.light.toLowerCase()} to {ROAST_LABELS.dark.toLowerCase()}. Every bag shows its roast date.
          </figcaption>
        </figure>
      </section>

      {/* Wholesale & cuppings */}
      <section className="wrap relative pb-[clamp(1rem,3vw,2rem)]" aria-labelledby="wholesale-title">
        <span className="tape -top-2 left-6 -rotate-6" aria-hidden="true" />
        <span className="tape tape-blue -top-2 right-6 rotate-6" aria-hidden="true" />
        <div className="relative grid items-center gap-x-8 gap-y-5 rounded-panel border-2 border-rule bg-surface p-[clamp(1.5rem,4vw,2.6rem)] shadow-card sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
          <BrewArt method="chemex" size={96} className="-rotate-6 max-sm:hidden" />
          <div>
            <p className="eyebrow">For cafés, restaurants &amp; offices</p>
            <h2 id="wholesale-title" className="mt-2 mb-2 text-[clamp(1.7rem,3vw,2.3rem)]">Wholesale, cuppings &amp; enquiries</h2>
            <p className="max-w-[44rem] text-muted">
              Want our coffee on your bar, a private cupping for your team, or a coffee cart at your event? Tell us a little
              about it and we’ll set up a tasting.
            </p>
          </div>
          <p className="sm:col-span-full lg:col-span-1"><SiteLink href="/contact/" className="button">Send us a note</SiteLink></p>
        </div>
      </section>

      {/* FAQs */}
      {cafe.faqs.length ? (
        <section id="faq" className="wrap section-y" aria-labelledby="faq-title">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className={sectionTitle}>Good to know</h2>
          <div className="mt-7 grid max-w-[52rem] gap-3">
            {cafe.faqs.map(faq => (
              <details key={faq.question} className="faq card">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display text-[1.08rem] font-bold">{faq.question}</summary>
                <p className="max-w-(--measure) px-5 pb-5 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-muted">
            Something else? <SiteLink href="/contact/" className="text-link">Send us a note</SiteLink>
            {cafe.phone ? <> or call <a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}.
          </p>
        </section>
      ) : null}
    </>
  );
}
