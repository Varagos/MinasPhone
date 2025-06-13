import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import theme from '@/lib/theme';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CartProvider } from '@/context/CartProvider';
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { MessageProvider } from '@/context/messages/Messages';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import CookieConsent with SSR disabled
const CookieConsentComponent = dynamic(
  () => import('@/components/CookieConsent/CookieConsent'),
  { ssr: false }
);

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

  // Schema.org structured data for Organization and LocalBusiness
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.minasphone.gr/#organization',
        name: 'MinasPhone',
        url: 'https://www.minasphone.gr',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.minasphone.gr/logo.svg',
          width: 180,
          height: 60,
        },
        sameAs: [
          'https://maps.app.goo.gl/QhHR3xDir67jEUmw5',
          'https://www.vrisko.gr/details/172_1f0655_d4jb1_5ce6b4k_ga_6d_2',
          // 'https://www.facebook.com/minasphone',
          // 'https://www.instagram.com/minasphone',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.minasphone.gr/#localbusiness',
        name: 'MinasPhone',
        image: 'https://www.minasphone.gr/store-front.jpg',
        telephone: '+302109213456',
        email: 'info@minasphone.gr',
        url: 'https://www.minasphone.gr',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Dimitrakopoulou 87',
          addressLocality: 'Athens',
          addressRegion: 'Attika',
          postalCode: '11741',
          addressCountry: 'GR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '37.9638',
          longitude: '23.7293',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '21:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '15:00',
          },
        ],
        priceRange: '€€',
        servesCuisine: 'Electronics Store',
      },
    ],
  };

  return (
    <AppCacheProvider {...{ Component, pageProps }}>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <MessageProvider>
          {/* Add Schema.org JSON-LD structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
          <CssBaseline />
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <Component {...pageProps} />
          </main>
          <Footer />
          {/* Cookie Consent Component */}
          <CookieConsentComponent />
          </MessageProvider>
        </ThemeProvider>
      </CartProvider>
    </AppCacheProvider>
  );
}

export default appWithTranslation(MyApp);
