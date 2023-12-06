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

function useDirection(language: string) {
  useEffect(() => {
    document.documentElement.setAttribute(
      'dir',
      language === 'ar' ? 'rtl' : 'ltr'
    );
  }, [language]);
}

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
