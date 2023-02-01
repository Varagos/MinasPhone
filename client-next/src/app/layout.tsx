'use client';
import Link from 'next/link';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme, { darkTheme } from '@/config/theme';
import { EmotionCache } from '@emotion/cache';
import createEmotionCache from '../config/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import Navbar from '@/components/Navbar/Navbar';

const clientSideEmotionCache = createEmotionCache();

function RootLayout({
  children,
  emotionCache = clientSideEmotionCache,
}: {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}) {
  return (
    <html lang="en">
      <head />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>
            <main>
              <Navbar />
              <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
              </nav>
              {children}
            </main>
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
export default RootLayout;
