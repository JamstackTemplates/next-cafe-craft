import type { Metadata } from 'next';
import { BrewArt } from '../../components/brew-art';
import { MenuBoard } from '../../components/menu-board';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { cafe } from '../../content/cafe';
import { barToday, extras, formatPrice, menuNotes } from '../../content/coffee';
import { absoluteUrl, beanAnchor } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Menu',
  description: `Espresso, milk drinks, pour-over, cold brew, tea and pastries at ${cafe.name}.`,
  alternates: { canonical: absoluteUrl('/menu/') },
};

export default function MenuPage() {
  const bar = barToday();
  return (
    <>
      <PageHead eyebrow="Menu" title={<>Weighed, timed <em>&amp; poured to order</em></>}
        aside={
          <span className="grid justify-items-center gap-2">
            <BrewArt method="pour-over" size={150} className="-rotate-3" />
            <span className="hand rotate-3 text-[1.45rem]" aria-hidden="true">slow is the point</span>
          </span>
        }>
        <p>
          A short menu, made carefully. Espresso drinks use today’s espresso; the slow bar brews today’s filter and
          guest coffees by hand. Ask us anything: we love talking coffee.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-[clamp(1.5rem,4vw,3rem)] pb-(--space-section) lg:grid-cols-[minmax(0,1fr)_17.5rem]">
        <MenuBoard />

        <aside className="mt-4 grid gap-4 max-lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]" aria-label="On the bar, milk and extras">
          {bar.length ? (
            <div className="label relative p-[1.4rem]">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden="true" />
              <h2 className="mb-3 text-[1.25rem]">On the bar today</h2>
              <ul className="grid gap-2.5">
                {bar.map(({ slot, label, bean }) => (
                  <li key={slot}>
                    <span className="label-text block text-[.62rem] text-muted">{label}</span>
                    <SiteLink href={beanAnchor(bean.id)} className="text-link">{bean.name}</SiteLink>
                    <span className="text-[.9rem] text-muted"> · {bean.country}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="card p-[1.4rem]">
            <h2 className="mb-3 text-[1.25rem]">Milk &amp; extras</h2>
            <ul>
              {extras.map(extra => (
                <li key={extra.name} className="flex justify-between gap-4 border-b border-dashed border-rule py-2 text-[.94rem]">
                  <span>{extra.name}</span>
                  <span className="font-mono whitespace-nowrap text-accent">{extra.price ? `+${formatPrice(extra.price)}` : 'Free'}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 rounded-card border-[1.5px] border-dashed border-rule p-[1.4rem] text-[.9rem] text-muted">
            {menuNotes.map(note => <p key={note}>{note}</p>)}
            <p><SiteLink href="/beans/" className="text-link">Take home a bag of beans</SiteLink></p>
          </div>
        </aside>
      </div>
    </>
  );
}
