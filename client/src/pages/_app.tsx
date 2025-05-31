import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartProvider';
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { MessageProvider } from '@/context/messages/Messages';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useRouter } from 'next/router';
import { Metadata } from 'next';

function useDirection(language: string) {
  useEffect(() => {
    document.documentElement.setAttribute(
      'dir',
      language === 'ar' ? 'rtl' : 'ltr'
    );
  }, [language]);
}

export const metadata: Metadata = {
  title: {
    default: 'MinasPhone - Buy Affordable Phones & Accessories',
    template: '%s | MinasPhone',
  },
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
  authors: [{ name: 'MinasPhone Team' }],
  openGraph: {
    type: 'website',
    url: 'https://www.minasphone.gr', // replace with your actual domain
    title: 'MinasPhone - Quality Phones & Money Transfers',
    description:
      'Your one-stop shop for phones, accessories, and money transfer services',
    siteName: 'MinasPhone',
    images: [
      {
        url: 'https://www.minasphone.com/og-image.png', // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'MinasPhone Storefront',
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@MinasPhone', // replace with your actual Twitter handle
  //   creator: '@MinasPhone',
  //   images: 'https://www.minasphone.com/twitter-card.jpg', // replace with your actual Twitter image
  // },
  alternates: {
    canonical: 'https://www.minasphone.gr',
  },
  themeColor: '#3F72AF', // choose a color that matches your brand
  category: 'ecommerce',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon-16x16.png',
    // apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest', // if you have one
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  useDirection(locale || 'en');

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <MessageProvider>
          <CssBaseline />
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <GoogleAnalytics trackPageViews />
            <Component {...pageProps} />
          </main>
          <Footer />
        </MessageProvider>
      </ThemeProvider>
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
