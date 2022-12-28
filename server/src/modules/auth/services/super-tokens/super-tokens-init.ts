import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import UserRoles from 'supertokens-node/recipe/userroles';

import Dashboard from 'supertokens-node/recipe/dashboard';
import { CreateUserDTO } from '../../useCases/createUser/CreateUserDTO.js';
import { createUserUseCase } from '../../useCases/createUser/index.js';
import { Roles, UserRolesService } from './roles/index.js';

const adminEmails = ['mark.girgis13@gmail.com'];

export const supertokensInit = () => {
  // console.log(
  //   'process.env.SUPER_TOKENS_CONNECTION_URI!',
  //   process.env.SUPER_TOKENS_CONNECTION_URI!,
  // );
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
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              signUpPOST: async function (input) {
                if (originalImplementation.signUpPOST === undefined) {
                  throw Error('Should never come here');
                }

                // First we call the original implementation of signUpPOST.
                const response = await originalImplementation.signUpPOST(input);

                // Post sign up response, we check if it was successful
                if (response.status === 'OK') {
                  const { id, email, timeJoined } = response.user;

                  let role = Roles.Customer; // TODO: fetch role based on userId
                  if (adminEmails.includes(email)) {
                    role = Roles.Admin;
                  }
                  await UserRolesService.addRoleToUser(id, role);

                  // // These are the input form fields values that the user used while signing up
                  const formFields = input.formFields;
                  // post sign up logic
                  const dto: CreateUserDTO = {
                    id,
                    email,
                    firstName: formFields[2].value,
                    lastName: formFields[3].value,
                    timeJoined,
                  };
                  await createUserUseCase.execute(dto);
                }
                return response;
              },
            };
          },
        },
      }), // initializes signin / sign up features
      /**
       * {
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: async function (input) {
                const userId = input.userId;
                // const email
                const userInfo = await EmailPassword.getUserById(userId);
                // console.log({ userInfo });
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
      }
       */
      Session.init(),
      Dashboard.init({
        apiKey: process.env.SUPER_TOKENS_API_KEY!,
      }),
      UserRoles.init(),
    ],
  });

  // Create roles
  UserRolesService.createRole(Roles.Customer, []);
  UserRolesService.createRole(Roles.Admin, []);
};
