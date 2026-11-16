import type { Metadata } from 'next';
import { BeanShelf } from '../../components/bean-shelf';
import { BrewArt } from '../../components/brew-art';
import { Icon } from '../../components/icons';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { cafe } from '../../content/cafe';
import { beans, brewGuides, brewRatio, formatBrewTime, formatTemperature, isAvailable } from '../../content/coffee';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Beans & brew guides',
  description: `Single origins and blends roasted by ${cafe.name}: origin, process, roast and tasting notes, with bags to take home and guides for brewing them.`,
  alternates: { canonical: absoluteUrl('/beans/') },
};

const fact = 'grid gap-0.5 rounded-ui border-[1.5px] border-rule bg-surface-2 px-3 py-2';
const factLabel = 'label-text flex items-center gap-1.5 text-[.62rem] text-muted';

export default function BeansPage() {
  const onShelf = beans.filter(isAvailable).length;
  return (
    <>
      <PageHead eyebrow="Beans" title={<>Coffees on the shelf, <em>roasted this week</em></>}
        aside={<span className="stamp rotate-[-8deg] px-4 py-2 text-[.9rem]">{onShelf} on the shelf</span>}>
        <p>
          Every coffee we roast, with where it’s from, how it was processed and what we taste in it. All of them are
          brewing somewhere on our bar, and all of them come home in a bag.
        </p>
      </PageHead>

      <section className="wrap pt-[clamp(1.5rem,3vw,2.5rem)]" aria-label="Coffees">
        <BeanShelf />
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-card border-[1.5px] border-dashed border-accent bg-accent-soft px-5 py-4">
          <Icon name="bag" width={22} height={22} className="flex-none text-accent" />
          <span>Bags are available at the counter. Want one saved for you, or a wholesale price list?</span>
          <SiteLink href="/contact/" className="text-link">Send us a note</SiteLink>
        </p>
      </section>

      <section id="brew-at-home" className="wrap section-y" aria-labelledby="brew-title">
        <p className="eyebrow">Brew at home</p>
        <h2 id="brew-title" className="mt-2.5 flex flex-wrap items-end gap-x-5 text-[clamp(2rem,4.4vw,3rem)]">
          <span>Our recipes, <em>by weight</em></span>
          <span className="hand mb-1 -rotate-3 text-[1.5rem]" aria-hidden="true">a scale is your best friend</span>
        </h2>
        <p className="mt-4 max-w-(--measure) text-[clamp(1.05rem,1.5vw,1.18rem)] text-muted">
          A scale makes the biggest difference. Start with these, then adjust: finer if it tastes sour or thin, coarser if
          it tastes bitter or dry.
        </p>
        <ul className="mt-10 grid gap-x-5 gap-y-8 md:grid-cols-2">
          {brewGuides.map(guide => (
            <li key={guide.id} id={guide.id} className="guide-card label flex flex-col gap-4 p-[clamp(1.2rem,2.6vw,1.75rem)]">
              <span className="tape tape-blue -top-3 right-8 rotate-6" aria-hidden="true" />
              <div className="flex items-start gap-4">
                <BrewArt method={guide.method} size={72} />
                <div>
                  <h3 className="text-[1.6rem]">{guide.name}</h3>
                  <p className="mt-1 text-[.95rem] text-muted">{guide.summary}</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className={`${fact} col-span-2 sm:col-span-1`}>
                  <dt className={factLabel}><Icon name="scale" width={14} height={14} />Ratio</dt>
                  <dd className="font-mono font-semibold">{guide.dose}g → {guide.water}g <span className="text-accent">({brewRatio(guide)})</span></dd>
                </div>
                <div className={fact}>
                  <dt className={factLabel}><Icon name="thermo" width={14} height={14} />Water</dt>
                  <dd className="font-mono text-[.92rem]">{formatTemperature(guide.temperature)}</dd>
                </div>
                <div className={fact}>
                  <dt className={factLabel}><Icon name="timer" width={14} height={14} />Time</dt>
                  <dd className="font-mono text-[.92rem]">{formatBrewTime(guide.seconds)}</dd>
                </div>
                <div className={`${fact} col-span-2 sm:col-span-3`}>
                  <dt className={factLabel}><Icon name="grind" width={14} height={14} />Grind</dt>
                  <dd className="text-[.94rem]">{guide.grind}</dd>
                </div>
              </dl>
              <ol className="grid gap-2 text-[.95rem]">
                {guide.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2">
                    <span className="grid size-6 place-items-center rounded-full border-[1.5px] border-rule font-mono text-[.72rem] font-semibold">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
