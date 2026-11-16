import type { ReactNode } from 'react';

/** Heading block for inner pages: eyebrow, large slab title (use <em> for the accent words) and a lede. */
export function PageHead({ eyebrow, title, children, id, before, aside }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional illustration above the eyebrow. */
  before?: ReactNode;
  /** Optional stamp or illustration beside the title on wide screens. */
  aside?: ReactNode;
}) {
  return (
    <header className="wrap grid items-end gap-6 border-b-2 border-rule pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(1.75rem,3.5vw,2.75rem)] md:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        {before}
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={id} className="mt-3 mb-5 max-w-[18ch] text-[clamp(2.5rem,6.2vw,4.4rem)] leading-[1.02]">{title}</h1>
        {children ? <div className="max-w-(--measure) text-[clamp(1.05rem,1.5vw,1.18rem)] text-muted">{children}</div> : null}
      </div>
      {aside ? <div className="max-md:hidden">{aside}</div> : null}
    </header>
  );
}
