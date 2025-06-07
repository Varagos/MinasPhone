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
import Head from 'next/head';

function useDirection(language: string) {
  useEffect(() => {
    document.documentElement.setAttribute(
      'dir',
      language === 'ar' ? 'rtl' : 'ltr'
    );
  }, [language]);
}

// Default metadata for the site

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  useDirection(locale || 'en');

  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <MessageProvider>
          <Head>
            <title>MinasPhone - Buy Affordable Phones & Accessories</title>
            <meta name="description" content="MinasPhone offers quality new & used phones, phone accessories, and reliable money transfer services (MoneyGram & Ria). Best deals in town!" />
            <meta name="keywords" content="affordable phones, used phones, phone accessories, MoneyGram, Ria money transfer, smartphones, mobile phones, cheap phones, phone repairs, phone cases, screen protectors" />
            <meta name="author" content="MinasPhone Team" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.minasphone.gr" />
            <meta property="og:title" content="MinasPhone - Quality Phones & Money Transfers" />
            <meta property="og:description" content="Your one-stop shop for phones, accessories, and money transfer services" />
            <meta property="og:site_name" content="MinasPhone" />
            <meta property="og:image" content="https://www.minasphone.com/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="MinasPhone Storefront" />
            <link rel="canonical" href="https://www.minasphone.gr" />
            <meta name="theme-color" content="#3F72AF" />
            <meta name="robots" content="index, follow" />
          </Head>
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
