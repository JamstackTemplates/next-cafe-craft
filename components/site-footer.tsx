import { cafe, formatAddress, groupedHours, publicLinks } from '../content/cafe';
import { Logo } from './logo';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

const heading = 'mb-3 font-mono text-[.74rem] font-medium tracking-[.18em] text-footer-muted uppercase';
const footerLink = 'text-footer-accent underline decoration-footer-accent/40 underline-offset-[.2em] hover:decoration-footer-accent';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer torn torn-top mt-20 bg-footer text-footer-ink">
      <div className="footer-edge border-b border-footer-accent/20 bg-footer print:hidden" aria-hidden="true" />
      <div className="wrap grid gap-x-12 gap-y-9 pt-12 pb-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="flex items-center gap-3 font-display text-[1.75rem] leading-tight font-extrabold tracking-[-.02em]">
            <Logo className="size-10" />{cafe.name}
          </p>
          <p className="mt-2 mb-5 font-mono text-[.78rem] tracking-[.12em] text-footer-muted uppercase">{cafe.tagline}</p>
          <address className="leading-[1.85] not-italic">
            {formatAddress()}<br />
            <a className={footerLink} href={`mailto:${cafe.email}`}>{cafe.email}</a>
            {cafe.phone ? <><br /><a className={footerLink} href={`tel:${cafe.phone.replace(/[^\d+]/g, '')}`}>{cafe.phone}</a></> : null}
          </address>
        </div>
        <div>
          <h2 className={heading}>Hours</h2>
          <ul className="text-[.95rem]">
            {groupedHours().map(group => (
              <li key={group.label} className="flex justify-between gap-4 border-b border-dashed border-footer-ink/20 py-2">
                <span>{group.label}</span><span className="font-mono text-[.86rem]">{group.hours}</span>
              </li>
            ))}
          </ul>
          <TimeZoneNote className="text-footer-muted" />
        </div>
        <div>
          <h2 className={heading}>Around here</h2>
          <ul className="grid gap-2 font-medium [&_a]:no-underline [&_a:hover]:text-footer-accent [&_a:hover]:underline">
            <li><SiteLink href="/menu/">Menu</SiteLink></li>
            <li><SiteLink href="/beans/">Beans &amp; brew guides</SiteLink></li>
            <li><SiteLink href="/#find-us">Find us</SiteLink></li>
            <li><SiteLink href="/#faq">FAQs</SiteLink></li>
            <li><SiteLink href="/contact/">Wholesale &amp; cuppings</SiteLink></li>
            {publicLinks.map(link => <li key={link.url}><a href={link.url} rel="me noopener">{link.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-footer-ink/15 pt-5 pb-8 text-[.88rem] text-footer-muted">
        <span>© {year} {cafe.name} · roasted with care</span>
        <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="no-underline hover:text-footer-accent hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
      </p>
    </footer>
  );
}
