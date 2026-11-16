import type { ReactNode, SVGProps } from 'react';
import type { AmenityIcon } from '../content/cafe';

// Small line icons. Decorative: always paired with visible text.
type IconName = AmenityIcon | 'clock' | 'pin' | 'phone' | 'mail' | 'arrow' | 'hot' | 'iced' | 'filter' | 'bag' | 'scale' | 'grind' | 'thermo' | 'timer' | 'drop' | 'globe';

const paths: Record<IconName, ReactNode> = {
  roast: <><path d="M4 9h16v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" /><path d="M7 9V6.5a5 5 0 0 1 10 0V9" /><path d="M9 14c1.5-1 4.5-1 6 0" /><path d="M20 12h1.5" /></>,
  handshake: <><path d="M2.5 11l4-4 3 1.5 2.5-1.5 2.5 1.5 3-1.5 4 4" /><path d="M6.5 7l-1 8 3 3 2-1 1.5 1.5 1.5-1 1.5 1 1.5-1 1.5-.5 1-2.5-1-7.5" /><path d="M10.5 12.5l2 2M12.5 11l2.5 2.5" /></>,
  drip: <><path d="M5 5h14l-4.5 7h-5z" /><path d="M8 15h8v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" /><path d="M12 12.5v1" /></>,
  crate: <><path d="M3.5 8.5h17v11h-17z" /><path d="M3.5 13h17M9 8.5v11M15 8.5v11" /><path d="M7 8.5c0-3 2.5-4.5 5-4.5s5 1.5 5 4.5" /></>,
  wifi: <><path d="M3.5 9.5a12 12 0 0 1 17 0" /><path d="M6.5 12.8a7.5 7.5 0 0 1 11 0" /><path d="M9.5 16a3.2 3.2 0 0 1 5 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></>,
  plug: <><path d="M9 3v4M15 3v4" /><path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0z" /><path d="M12 16v5" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" /><path d="M5 19l8-8" /></>,
  cup: <><path d="M4.5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" /><path d="M16.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.8" /><path d="M8.5 3.5c-1 1 1 2 0 3.2M12.5 3.5c-1 1 1 2 0 3.2" /></>,
  bike: <><circle cx="6" cy="16" r="3.5" /><circle cx="18" cy="16" r="3.5" /><path d="M6 16l4-7h5l3 7M10 9l3 7h-7M13 6h2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4.5 7l7.5 6 7.5-6" /></>,
  arrow: <><path d="M5 12h13" /><path d="M13 7l5 5-5 5" /></>,
  hot: <><path d="M8 20c-2-2.5 2-4.5 0-7M12 20c-2-2.5 2-4.5 0-7M16 20c-2-2.5 2-4.5 0-7" /><path d="M9 9c-1-1.5 1-2.5 0-4M15 9c-1-1.5 1-2.5 0-4" /></>,
  iced: <><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /><path d="M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  bag: <><path d="M6 7h12l1 13.5H5z" /><path d="M6 7l1.5-3.5h9L18 7" /><circle cx="12" cy="12" r="2" /></>,
  scale: <><rect x="3.5" y="13" width="17" height="7" rx="1.5" /><path d="M7 13v-2h10v2" /><path d="M12 16.5h3" /></>,
  grind: <><path d="M8 9h8l-1 11H9z" /><path d="M12 9V6M12 6h5M17 6v-2" /><path d="M7 9h10" /></>,
  thermo: <><path d="M10 4.5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z" /><path d="M12 9v7" /></>,
  timer: <><circle cx="12" cy="13.5" r="7.5" /><path d="M12 13.5V9.5M10 3h4M18.5 6.5l1.3-1.3" /></>,
  drop: <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z" />,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" /></>,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {paths[name]}
    </svg>
  );
}
