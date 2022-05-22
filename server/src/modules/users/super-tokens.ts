import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

export const supertokensInit = () => {
  console.log(
    'process.env.SUPER_TOKENS_CONNECTION_URI!',
    process.env.SUPER_TOKENS_CONNECTION_URI!,
  );
  supertokens.init({
    framework: 'express',
    supertokens: {
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: process.env.SUPER_TOKENS_CONNECTION_URI!,
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      apiKey: process.env.SUPER_TOKENS_API_KEY,
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/session/appinfo
      appName: 'MinasPhone',
      apiDomain: 'http://localhost:8080',
      websiteDomain: 'http://localhost:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({
        signUpFeature: {
          formFields: [
            {
              id: 'firstName',
            },
            {
              id: 'lastName',
            },
          ],
        },
      }), // initializes signin / sign up features
      Session.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: async function (input) {
                const userId = input.userId;
                // const email
                const userInfo = await EmailPassword.getUserById(userId);
                console.log({ userInfo });
                const { email } = userInfo!;

                const adminEmails = ['markos.girgis13@gmail.com'];
                let role = 'customer'; // TODO: fetch role based on userId
                if (adminEmails.includes(email)) {
                  role = 'admin';
                }

                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  role,
                  email,
                };

                return originalImplementation.createNewSession(input);
              },
            };
          },
        },
      }),
    ],
  });
};
