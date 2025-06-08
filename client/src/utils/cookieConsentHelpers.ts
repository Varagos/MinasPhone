/**
 * Utility functions to interact with vanilla-cookieconsent programmatically
 */

import * as CookieConsent from 'vanilla-cookieconsent';

/**
 * Check if a specific cookie category has been accepted by the user
 * @param category - The cookie category to check (e.g., 'analytics', 'marketing')
 * @returns boolean indicating if the category is accepted
 */
export const isCategoryAccepted = (category: string): boolean => {
  if (typeof window === 'undefined') {
    console.log('Server-side check for cookie consent category:', category);
    return false; // Default to false on server-side
  }

  try {
    const isAccepted = CookieConsent.acceptedCategory(category);
    console.log(
      'Client-side check for cookie consent category:',
      category,
      isAccepted
    );
    return isAccepted;
  } catch (error) {
    // Fail silently in production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error checking cookie consent category:', error);
    }
    return false;
  }
};

/**
 * Show the cookie consent modal
 */
export const showCookieConsentModal = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    CookieConsent.show();
  } catch (error) {
    // Fail silently in production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error showing cookie consent modal:', error);
    }
  }
};

/**
 * Show the cookie preferences modal
 */
export const showPreferencesModal = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    CookieConsent.showPreferences();
  } catch (error) {
    // Fail silently in production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error showing preferences modal:', error);
    }
  }
};

/**
 * Get the user's consent status for all categories
 * @returns An object with category names as keys and boolean values indicating consent status
 */
export const getConsentStatus = (): Record<string, boolean> => {
  if (typeof window === 'undefined') {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
    };
  }

  try {
    return {
      necessary: CookieConsent.acceptedCategory('necessary'),
      analytics: CookieConsent.acceptedCategory('analytics'),
      marketing: CookieConsent.acceptedCategory('marketing'),
    };
  } catch (error) {
    // Fail silently in production
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error getting consent status:', error);
    }
    return {
      necessary: true,
      analytics: false,
      marketing: false,
    };
  }
};
