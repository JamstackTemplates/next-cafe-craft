import type { Metadata } from 'next';
import { BrewArt } from '../../components/brew-art';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { cafe } from '../../content/cafe';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Wholesale, cuppings & enquiries',
  description: `Wholesale coffee, cuppings, events and questions for ${cafe.name}.`,
  alternates: { canonical: absoluteUrl('/contact/') },
};

const subhead = 'mb-1 text-[1.25rem]';
const tips = ['Your café or business name', 'Roughly how much coffee you use each week', 'The dates you have in mind'];

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <PageHead eyebrow="Contact" title={<>Wholesale, cuppings <em>&amp; enquiries</em></>}
        aside={<span className="stamp rotate-[5deg] px-4 py-2 text-[.9rem]">Replies within a day</span>}>
        <p>
          Looking for coffee for your café, restaurant or office? Want to bring your team to a cupping, or book a coffee
          cart for an event? Send us a note and someone from the roastery will get back to you.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-[clamp(1.5rem,5vw,4rem)] pt-[clamp(2rem,5vw,3.5rem)] pb-(--space-section) lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="print:hidden" aria-label="Enquiry form">
          {hosted ? (
            <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={cafe.email} />
          ) : (
            <div className="label grid justify-items-start gap-[1.1rem] p-[clamp(1.5rem,4vw,2.75rem)]">
              <span className="tape -top-3 left-10 -rotate-6" aria-hidden="true" />
              <span className="tape tape-blue -top-3 right-10 rotate-6" aria-hidden="true" />
              <BrewArt method="chemex" size={88} />
              <h2 className="text-[clamp(1.7rem,3vw,2.2rem)]">Write to us directly</h2>
              <p className="max-w-[34rem] text-muted">
                Email is the best way to reach us about wholesale accounts, cuppings and events. Tell us a little about
                your business or your plans, and we’ll reply with a price list or a few dates for a tasting.
              </p>
              <p><a className="button" href={`mailto:${cafe.email}?subject=${encodeURIComponent('Wholesale or cupping enquiry')}`}>Email {cafe.name}</a></p>
            </div>
          )}
        </section>

        <aside className="grid gap-1.5 pt-1" aria-labelledby="direct-title">
          <h2 id="direct-title" className={subhead}>Email</h2>
          <p className="font-display text-[1.3rem] font-semibold wrap-anywhere"><a className="text-link" href={`mailto:${cafe.email}`}>{cafe.email}</a></p>
          <p className="flex min-h-px flex-wrap items-center gap-x-4 gap-y-2"><CopyEmail email={cafe.email} /></p>

          {cafe.phone ? (
            <>
              <h2 className={`mt-4 ${subhead}`}>Phone</h2>
              <p><a className="text-link" href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></p>
            </>
          ) : null}

          <h2 className={`mt-4 ${subhead}`}>Useful to include</h2>
          <ul className="grid gap-2 text-muted">
            {tips.map(tip => (
              <li key={tip} className="relative pl-6 before:absolute before:top-[.55em] before:left-0.5 before:size-2.5 before:rotate-45 before:border-[1.5px] before:border-accent before:content-['']">{tip}</li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
