import { useEffect, useState } from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { isCategoryAccepted } from '@/utils/cookieConsentHelpers';

interface ConsentAwareAnalyticsProps {
  trackPageViews?: boolean;
}

/**
 * A component that only renders Google Analytics when the user has consented to analytics cookies
 */
const ConsentAwareAnalytics = ({
  trackPageViews = true,
}: ConsentAwareAnalyticsProps) => {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check if the user has consented to analytics cookies
    const checkConsent = () => {
      const hasConsent = isCategoryAccepted('analytics');
      setHasAnalyticsConsent(hasConsent);
    };

    // Check consent initially
    checkConsent();

    // Set up an event listener for cookie consent changes
    if (typeof window !== 'undefined') {
      document.addEventListener('cookieconsent_status_change', checkConsent);

      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener(
          'cookieconsent_status_change',
          checkConsent
        );
      };
    }
  }, []);

  // Only render Google Analytics if the user has consented
  if (!hasAnalyticsConsent) {
    return null;
  }

  return <GoogleAnalytics trackPageViews={trackPageViews} />;
};

export default ConsentAwareAnalytics;
