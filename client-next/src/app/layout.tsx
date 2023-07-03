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
              <div style={{ minHeight: '80vh' }}>{children}</div>
            </main>
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
export default RootLayout;
