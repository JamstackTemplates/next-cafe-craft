import { DarkModeToggle } from 'jamstacks';
import { cafe } from '../content/cafe';
import { Logo } from './logo';
import { SiteLink } from './site-link';

const navigation = [
  { href: '/menu/', label: 'Menu' },
  { href: '/beans/', label: 'Beans' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 bg-bg/88 backdrop-blur-md">
      <div className="wrap flex min-h-(--header-h) items-center justify-between gap-3">
        <SiteLink href="/" className="inline-flex min-w-0 items-center gap-2.5 no-underline">
          <Logo />
          <span className="font-display text-[1.3rem] leading-none font-extrabold tracking-[-.02em] whitespace-nowrap max-sm:sr-only lg:text-[1.45rem]">{cafe.name}</span>
        </SiteLink>
        <div className="flex items-center gap-1.5 sm:gap-3 print:hidden">
          <nav aria-label="Main">
            <ul className="flex gap-0.5 sm:gap-1">
              {navigation.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="section"
                    className="inline-block rounded-ui border-[1.5px] border-transparent px-2.5 py-1.5 font-mono text-[.8rem] font-medium tracking-[.12em] text-muted uppercase no-underline transition-colors hover:border-rule hover:text-ink aria-[current]:border-rule aria-[current]:bg-surface aria-[current]:text-ink sm:px-3.5 sm:text-[.84rem]">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <DarkModeToggle className="flex-none" />
        </div>
      </div>
    </header>
  );
}
