import { createMuiTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

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
      hu: {
        BRANDING_POWERED_BY_START: 'Sok szeretettel: ',
        // This key is associated with an empty string by default, but you can override these as well.
        BRANDING_POWERED_BY_END: ' 😊',
      },
    },
    /*
     * This optional property sets the default and fallback language.
     * It can be any string that will be used to fetch translations from the above object.
     * Defaults to "en"
     */
    defaultLanguage: 'hu',
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appName: 'MinasPhone',
    apiDomain: 'http://localhost:8080',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init({
      signInAndUpFeature: {
        // signUpForm: {
        //   formFields: [
        //     {
        //       id: 'email',
        //       label: 'customFieldName',
        //       placeholder: 'Custom value',
        //     },
        //   ],
        // },name
        signUpForm: {
          formFields: [
            {
              id: 'firstName',
              label: 'Όνομα',
              placeholder: 'Where do you live?',
            },
            {
              id: 'lastName',
              label: 'Επώνυμο',
              placeholder: 'Επώνυμο',
              // optional: true,
            },
          ],
        },
      },
    }),
    Session.init(),
  ],
});

import Routes from './navigation/Routes';
// createMuiTheme

// const theme = createTheme();

export const theme = createTheme({
  // mixins: {
  //   toolbar: {},
  // },
  // palette: {
  //   primary: {
  //     main: '#F9ED69',
  //   },
  //   secondary: {
  //     main: '#6A2C70',
  //   },
  //   error: {
  //     main: '#B83B5E',
  //   },
  //   info: {
  //     main: '#F08A5D',
  //   },
  //   success: {
  //     main: '#66bb6a',
  //   },
  //   // secondary: PaletteColor;
  //   // error: PaletteColor;
  //   // warning: PaletteColor;
  //   // info: PaletteColor;
  //   // success: PaletteColor;
  //   // grey: Color;
  //   // text: TypeText;
  //   // divider: TypeDivider;
  //   // action: TypeAction;
  //   background: {
  //     default: '#f9f9f9',
  //     paper: '#ffffff',
  //   },
  //   // getContrastText: (background: string) => string;
  //   // augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
  // },
  // shadows: Shadows;
  // transitions: Transitions;
  // typography: Typography;
  // zIndex: ZIndex;
  // unstable_strictMode?: boolean;
  components: {
    // MuiTypography: {
    //   variants: [
    //     {
    //       props: {
    //         variant: 'body2',
    //       },
    //       style: {
    //         fontSize: 11,
    //       },
    //     },
    //   ],
    // },
  },
});

export type MainThemeType = typeof theme;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
