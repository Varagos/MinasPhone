import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartProvider';
import '../styles/globals.css';
import React from 'react';
import { MessageProvider } from '@/context/messages/Messages';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <MessageProvider>
          <CssBaseline />
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </MessageProvider>
      </ThemeProvider>
    </CartProvider>
  );
}

export default appWithTranslation(MyApp);
