import { NextIntlClientProvider } from 'next-intl';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { getLocale } from 'next-intl/server';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '@/_components/Navbar/Navbar';
import Footer from '@/_components/Footer/Footer';
import theme from '@/_theme';
import { Metadata } from 'next';
import { CartProvider } from '@/context/CartProvider';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'greek-ext'],
  display: 'swap',
  variable: '--font-roboto',
});

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
  themeColor: '#3F72AF',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
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
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={roboto.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <NextIntlClientProvider>
              <CartProvider>
                <CssBaseline />
                <Navbar />
                <main style={{ minHeight: '80vh' }}>{children}</main>
                <Footer />
              </CartProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
