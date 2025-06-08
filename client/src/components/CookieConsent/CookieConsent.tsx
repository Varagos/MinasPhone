import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import { cookieConsentConfig } from '@/utils/cookieConsent';

// Import the CSS for vanilla-cookieconsent
import 'vanilla-cookieconsent/dist/cookieconsent.css';

const CookieConsentComponent = (): null => {
  useEffect(() => {
    // Initialize cookie consent only on the client side
    if (typeof window !== 'undefined') {
      // Add a key attribute to prevent hydration mismatches
      CookieConsent.run({
        ...cookieConsentConfig,
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default CookieConsentComponent;
