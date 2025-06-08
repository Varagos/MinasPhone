import { useEffect, useState } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import { cookieConsentConfig } from '@/utils/cookieConsent';
import { GoogleAnalytics } from 'nextjs-google-analytics';

// Import the CSS for vanilla-cookieconsent
import 'vanilla-cookieconsent/dist/cookieconsent.css';

interface CookieConsentComponentProps {
  trackPageViews?: boolean;
}

const CookieConsentComponent = ({
  trackPageViews = true,
}: CookieConsentComponentProps): JSX.Element => {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Initialize cookie consent only on the client side
    if (typeof window !== 'undefined') {
      try {
        // Check if analytics are accepted
        const checkAnalyticsConsent = () => {
          const isAccepted = CookieConsent.acceptedCategory('analytics');
          console.log('Analytics consent status:', isAccepted);
          setHasAnalyticsConsent(isAccepted);
        };

        // Run cookie consent with config
        CookieConsent.run({
          ...cookieConsentConfig,

          // Triggered on first consent and every subsequent page load
          onConsent: ({ cookie }) => {
            checkAnalyticsConsent();
          },

          // Triggered when preferences are modified after consent is given
          onChange: ({ cookie, changedCategories }) => {
            console.log('Changed categories:', changedCategories);

            // Only update state if analytics category was changed
            if (changedCategories.includes('analytics')) {
              checkAnalyticsConsent();
            }
          },
        });

        // Check initial consent status after initialization
        setTimeout(checkAnalyticsConsent, 100);
      } catch (error) {
        console.error('Error initializing cookie consent:', error);
      }
    }
  }, []);

  // Render Google Analytics only if consent is given
  return hasAnalyticsConsent ? (
    <GoogleAnalytics trackPageViews={trackPageViews} />
  ) : (
    <></>
  );
};

export default CookieConsentComponent;
