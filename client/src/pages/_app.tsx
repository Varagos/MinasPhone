import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartProvider';
import '../styles/globals.css';
import React from 'react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from '@/config/supertokens/frontendConfig';
import SuperTokensWebJs from 'supertokens-web-js';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  // SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SuperTokensWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </ThemeProvider>
      </SuperTokensWrapper>
    </CartProvider>
  );
}

export default MyApp;
