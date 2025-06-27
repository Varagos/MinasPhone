import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Roboto } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Metadata, Viewport } from 'next';
import { CartProvider } from '@/context/CartProvider';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import dynamic from 'next/dynamic';
import { ToastProvider } from '@/context/ToastProvider';

// Dynamically import CookieConsent with SSR disabled
const CookieConsentComponent = dynamic(
  () => import('@/components/CookieConsent/CookieConsent'),
  { ssr: !!false }
);

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'greek-ext'],
  display: 'swap',
  variable: '--font-roboto',
});

export const viewport: Viewport = {
  themeColor: '#3F72AF',
};

export const metadata: Metadata = {
  title: 'MinasPhone - Buy Affordable Phones & Accessories',
  description:
    'MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!',
  keywords: [
    'affordable phones',
    'used phones',
    'phone accessories',
    'MoneyGram',
    'Ria money transfer',
    'smartphones',
    'mobile phones',
    'cheap phones',
    'phone repairs',
    'phone cases',
    'screen protectors',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'MinasPhone - Buy Affordable Phones & Accessories',
    description:
      'MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!',
    type: 'website',
    url: 'https://www.minasphone.gr',
    siteName: 'MinasPhone',
    images: [
      {
        url: 'https://www.minasphone.gr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MinasPhone Storefront',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.minasphone.gr',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={roboto.variable}>
      <body>
        <NextIntlClientProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <main style={{ minHeight: '80vh' }}>{children}</main>
              <Footer />
              <CookieConsentComponent />
            </CartProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
