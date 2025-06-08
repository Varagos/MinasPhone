import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const cookieConsentConfig: CookieConsentConfig = {
  // Specify the cookie domain
  cookie: {
    name: 'minas_phone_cookie_consent',
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'minasphone.gr',
    expiresAfterDays: 365,
    sameSite: 'Lax',
    path: '/',
  },

  /**
   *     type ConsentModalLayout =
        'box'
        | 'box wide'
        | 'box inline'
        | 'cloud'
        | 'cloud inline'
        | 'bar'
        | 'bar inline'
   */
  // Specify the GUI options
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom right',
      flipButtons: false,
      equalWeightButtons: true,
    },
    preferencesModal: {
      layout: 'box',
      // position: 'left right',
      flipButtons: false,
      equalWeightButtons: true,
    },
  },

  // Categories and services
  categories: {
    necessary: {
      enabled: true, // this category is enabled by default
      readOnly: true, // this category cannot be disabled
    },
    analytics: {
      enabled: false,
      readOnly: false,
      autoClear: {
        cookies: [
          {
            name: /^_ga/, // regex: all cookies that start with '_ga'
          },
          {
            name: '_gid', // exact cookie name
          },
        ],
      },
    },
    // marketing: {
    //   enabled: false,
    //   readOnly: false,
    // },
  },

  // Language settings
  language: {
    default: 'el',
    autoDetect: 'browser', // document will match our selected language, but needs re-render if lang changes
    translations: {
      en: {
        consentModal: {
          title: 'We use cookies',
          description:
            'We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/information/privacy-policy">Privacy Policy</a>',
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          sections: [
            {
              title: 'Cookie usage',
              description:
                'We use cookies to ensure the basic functionalities of the website and to enhance your online experience.',
            },
            {
              title: 'Strictly necessary cookies',
              description:
                'These cookies are essential for the proper functioning of the website and cannot be disabled.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analytics cookies',
              description:
                'These cookies collect information about how you use our website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.',
              linkedCategory: 'analytics',
            },
            // {
            //   title: 'Marketing cookies',
            //   description:
            //     'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.',
            //   linkedCategory: 'marketing',
            // },
            {
              title: 'More information',
              description:
                'For any queries in relation to our policy on cookies and your choices, please <a href="/contact">contact us</a>.',
            },
          ],
        },
      },
      el: {
        consentModal: {
          title: 'Χρησιμοποιούμε cookies',
          description:
            'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία περιήγησής σας στον ιστότοπό μας, να αναλύσουμε την κίνηση του ιστότοπού μας και να κατανοήσουμε από πού προέρχονται οι επισκέπτες μας.',
          acceptAllBtn: 'Αποδοχή όλων',
          acceptNecessaryBtn: 'Απόρριψη όλων',
          showPreferencesBtn: 'Διαχείριση προτιμήσεων',
          footer:
            '<a href="/information/privacy-policy">Πολιτική Απορρήτου</a>',
        },
        preferencesModal: {
          title: 'Προτιμήσεις cookies',
          acceptAllBtn: 'Αποδοχή όλων',
          acceptNecessaryBtn: 'Απόρριψη όλων',
          savePreferencesBtn: 'Αποθήκευση προτιμήσεων',
          closeIconLabel: 'Κλείσιμο',
          sections: [
            {
              title: 'Χρήση cookies',
              description:
                'Χρησιμοποιούμε cookies για να διασφαλίσουμε τις βασικές λειτουργίες του ιστότοπου και να βελτιώσουμε την online εμπειρία σας.',
            },
            {
              title: 'Απολύτως απαραίτητα cookies',
              description:
                'Αυτά τα cookies είναι απαραίτητα για τη σωστή λειτουργία του ιστότοπου και δεν μπορούν να απενεργοποιηθούν.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies ανάλυσης',
              description:
                'Αυτά τα cookies συλλέγουν πληροφορίες σχετικά με τον τρόπο που χρησιμοποιείτε τον ιστότοπό μας, ποιες σελίδες επισκεφτήκατε και ποιους συνδέσμους κάνατε κλικ. Όλα τα δεδομένα είναι ανώνυμα και δεν μπορούν να χρησιμοποιηθούν για την ταυτοποίησή σας.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Περισσότερες πληροφορίες',
              description:
                'Για οποιαδήποτε απορία σχετικά με την πολιτική μας για τα cookies και τις επιλογές σας, παρακαλούμε <a href="/contact">επικοινωνήστε μαζί μας</a>.',
            },
          ],
        },
      },
    },
  },
};
