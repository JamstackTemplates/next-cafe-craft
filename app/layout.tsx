import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/work-sans';
import '@fontsource-variable/caveat';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { cafe } from '../content/cafe';
import { site } from '../lib/site';
import './tailwind.input.css';

// Absolute URLs only when the deployed URL is known at build time. Never fall back to localhost.
const socialImage = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${cafe.name} — ${cafe.tagline}` }] : undefined;
const description = site.description || cafe.introduction;

export const metadata: Metadata = {
  title: { default: `${cafe.name} — ${cafe.tagline}`, template: `%s — ${cafe.name}` },
  description,
  applicationName: site.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${cafe.name} — ${cafe.tagline}`,
    description,
    ...(site.url ? { url: `${site.url}/` } : {}),
    images: socialImage,
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8dcc6' },
    { media: '(prefers-color-scheme: dark)', color: '#16100c' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body>
        <ThemeProvider>
          {/* Shared ink filter: gives stamps and stains slightly imperfect, hand-pressed edges. */}
          <svg className="absolute size-0" aria-hidden="true" focusable="false">
            <filter id="ink-rough" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="rough" />
              {/* Speckle: small gaps where the ink didn't take, like a real rubber stamp. */}
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="3" result="speck" />
              <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3.2 2.4" result="mask" />
              <feComposite in="rough" in2="mask" operator="in" />
            </filter>
          </svg>
          <a className="absolute -top-16 left-4 z-[200] rounded-ui bg-ink px-4 py-2.5 font-semibold text-bg no-underline focus:top-4" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
