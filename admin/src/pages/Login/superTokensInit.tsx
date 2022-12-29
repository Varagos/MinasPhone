import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import { apiBaseUrl } from '../../config';

SuperTokens.init({
  appInfo: {
    apiDomain: apiBaseUrl,
    apiBasePath: '/auth',
    appName: 'MinasPhone',
  },
  recipeList: [Session.init(), EmailPassword.init()],
});
