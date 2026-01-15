import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Use dynamic metadata so server-rendered metadata can be localized via cookie
export async function generateMetadata(): Promise<Metadata> {
  const { getTranslationsForLang } = await import('@/lib/translations')

  // Resolve language robustly: try cookies(), then headers(), with defensive checks for different runtime shapes.
  let lang = 'en'
  try {
    const nh = await import('next/headers')

    // 1) Try cookies() if available (handle both sync and Promise shapes)
    if (typeof nh.cookies === 'function') {
      const ckCandidate = nh.cookies()
      const ck = await Promise.resolve(ckCandidate)
      if (ck) {
        if (typeof ck.get === 'function') {
          const c = ck.get('cv_locale')
          if (c && (c as any).value) lang = (c as any).value
        } else if ((ck as any)['cv_locale']) {
          const c = (ck as any)['cv_locale']
          if (typeof c === 'string') lang = c
          else if (c && c.value) lang = c.value
        }
      }
    }

    // 2) Fallback: try headers() and parse cookie header (handle Promise or sync)
    if (lang === 'en' && typeof nh.headers === 'function') {
      const hCandidate = nh.headers()
      const h = await Promise.resolve(hCandidate)
      const cookieHeader = typeof h.get === 'function' ? (h.get('cookie') || h.get('Cookie') || '') : ((h as any)['cookie'] || (h as any)['Cookie'] || '')
      const match = (cookieHeader || '').match(/(?:^|; )cv_locale=([^;]+)/)
      if (match) lang = decodeURIComponent(match[1])
    }
  } catch (e) {
    // ignore and keep default lang
    if (process.env.NODE_ENV !== 'production') console.warn('[i18n] Could not read cookies/headers in generateMetadata:', e)
  }

  const tmap = getTranslationsForLang(lang)

  return {
    title: `TrueAutoCheck - ${tmap['banner_title'] || "Check any car's history"}`,
    description: tmap['banner_subtitle'] || "Trust data, not words. Check any car's history in seconds",
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      images: [
        { url: 'https://bolt.new/static/og_default.png' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        { url: 'https://bolt.new/static/og_default.png' },
      ],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <LayoutWrapper>
          <main>{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
