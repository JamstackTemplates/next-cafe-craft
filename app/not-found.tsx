import type { Metadata } from 'next';
import { BrewArt } from '../components/brew-art';
import { CoffeeRing } from '../components/doodles';
import { PageHead } from '../components/page-head';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pb-(--space-section)" aria-labelledby="not-found-title">
      <CoffeeRing className="absolute top-10 right-[8%] -z-10" size={260} />
      <PageHead id="not-found-title" eyebrow="404" title={<>This page went <em>stale…</em></>}
        before={<BrewArt method="espresso" size={96} className="mb-4" />}>
        <p>The link may be out of date, or the page may have moved. Here’s something freshly roasted instead:</p>
      </PageHead>
      <ul className="wrap mt-8 flex flex-wrap gap-3">
        <li><SiteLink href="/" className="button">Home</SiteLink></li>
        <li><SiteLink href="/menu/" className="button button-ghost">Menu</SiteLink></li>
        <li><SiteLink href="/beans/" className="button button-ghost">Beans</SiteLink></li>
        <li><SiteLink href="/#find-us" className="button button-ghost">Hours &amp; directions</SiteLink></li>
        <li><SiteLink href="/contact/" className="button button-ghost">Contact</SiteLink></li>
      </ul>
    </section>
  );
}
