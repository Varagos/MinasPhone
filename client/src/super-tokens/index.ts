import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { store } from '../redux/store';
import { userFetched, userSignedIn } from '../redux/userSlice';
import { gr } from './translations/greek';

export default function init() {
  SuperTokens.init({
    languageTranslations: {
      // This object contains all translation related options
      translations: {
        // These are the displayed translation strings for each language
        // The property names define the language code of the translations
        en: {
          // Here each key is a translation key and the value is the string that will be displayed
          // Setting the value to undefined will either display the translation from the default language or the translation key
          BRANDING_POWERED_BY_START: 'We ❤️ ',
          // If you added a custom label or placeholder you can also provide translation for them if necessary
          // You can also use these to provide translations for your component overrides
          MY_CUSTOM_LABEL: 'Age',
        },
        gr,
      },
      /*
       * This optional property sets the default and fallback language.
       * It can be any string that will be used to fetch translations from the above object.
       * Defaults to "en"
       */
      defaultLanguage: 'gr',
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
      appName: 'MinasPhone',
      apiDomain: process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080',
      websiteDomain: process.env.REACT_APP_WEB_URL ?? 'http://localhost:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'firstName',
                label: 'Όνομα',
                placeholder: 'Όνομα',
              },
              {
                id: 'lastName',
                label: 'Επώνυμο',
                placeholder: 'Επώνυμο',
              },
            ],
          },
        },
        onHandleEvent: async (context) => {
          if (context.action === 'SESSION_ALREADY_EXISTS') {
            // TODO:
          } else {
            if (context.action === 'SUCCESS') {
              store.dispatch(userSignedIn());
              const userId = await Session.getUserId();
              const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
              store.dispatch(userFetched({ ...accessTokenPayload, userId }));

              if (context.isNewUser) {
                // TODO: Sign up
              } else {
                // TODO: Sign in
              }
            }
          }
        },
      }),
      Session.init(),
    ],
  });
}
