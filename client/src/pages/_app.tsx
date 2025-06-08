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
        // sameAs: [
        //   'https://www.facebook.com/minasphone',
        //   'https://www.instagram.com/minasphone',
        // ],
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
