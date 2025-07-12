'use client';

import { useTranslations } from 'next-intl';
import { Link as NavigationLink } from '@/i18n/navigation';
import { Home, Mail, Phone, Clock, Facebook, Linkedin } from 'lucide-react';
import ContactRow from './ContactRow/ContactRow';
import dynamic from 'next/dynamic';

// Dynamically import CookieSettings with SSR disabled
const CookieSettings = dynamic(
  () => import('@/components/CookieConsent/CookieSettings'),
  { ssr: !!false }
);

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 sm:px-10 py-8 sm:py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Links column */}
            <div>
              <h3 className="border-b border-white pb-2 mb-4">
                {t('USEFUL_LINKS')}
              </h3>

              <div className="my-4">
                <NavigationLink
                  href="/information/user-terms"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('TERMS_AND_CONDITIONS')}
                </NavigationLink>
              </div>

              <div className="my-4">
                <NavigationLink
                  href="/information/privacy-policy"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('PRIVACY_POLICY')}
                </NavigationLink>
              </div>

              <div className="my-4">
                <NavigationLink
                  href="/information/cookie-policy"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('COOKIE_POLICY')}
                </NavigationLink>
              </div>

              {/* <div className="my-4">
                <NavigationLink
                  href="/information/delivery-and-costs"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('DELIVERY_AND_COSTS')}
                </NavigationLink>
              </div> */}

              {/* <div className="my-4">
                <NavigationLink
                  href="/information/payment-methods"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('PAYMENT_METHODS')}
                </NavigationLink>
              </div> */}

              {/* <div className="my-4">
                <NavigationLink
                  href="/account"
                  className="text-white hover:text-gray-300 no-underline"
                >
                  {t('MY_ACCOUNT')}
                </NavigationLink>
              </div> */}

              <div className="my-4">
                <CookieSettings
                  label={t('COOKIE_SETTINGS')}
                  className="text-white hover:text-gray-300 no-underline"
                />
              </div>
            </div>

            {/* Contact column */}
            <div>
              <h3 className="border-b border-white pb-2 mb-6">
                {t('CONTACT.TITLE')}
              </h3>

              <ContactRow
                icon={<Home className="h-5 w-5" />}
                header={t('CONTACT.ADDRESS.TITLE')}
                details={
                  <p className="text-sm">
                    {t('CONTACT.ADDRESS.VALUE')}
                    <br /> {t('CONTACT.ADDRESS.POSTAL')}
                  </p>
                }
              />

              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                header="Email :"
                details={
                  <p className="text-sm">
                    <a
                      className="text-white hover:text-gray-300"
                      href="mailto:support@minasphone.gr"
                    >
                      {'support@minasphone.gr'}
                    </a>
                  </p>
                }
              />

              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                header="Τηλέφωνο :"
                details={
                  <p className="text-sm">
                    <a
                      className="text-white hover:text-gray-300"
                      href="tel:+302109224764"
                    >
                      {'2109224764'}
                    </a>
                  </p>
                }
              />

              <ContactRow
                icon={<Clock className="h-5 w-5" />}
                header={t('CONTACT.HOURS.TITLE')}
                details={
                  <table className="text-sm">
                    <tbody>
                      <tr>
                        <td className="pr-4">{t('CONTACT.HOURS.FIRST_ROW')}</td>
                        <td>
                          {'10:00 - 15:30,'}
                          <br /> {'18:00 - 21:00'}
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          {t('CONTACT.HOURS.SECOND_ROW')}
                        </td>
                        <td>{'10:00 - 15:30'}</td>
                      </tr>
                    </tbody>
                  </table>
                }
              />
            </div>

            {/* Social icons column */}
            <div className="flex items-center justify-center">
              <Facebook className="h-8 w-8 mr-4 cursor-pointer hover:text-gray-300" />
              <Linkedin className="h-8 w-8 cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="text-center bg-gray-900 text-white py-8">
        <strong>MINAS PHONE</strong> &reg; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
