import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';

import {
  ConfigInjectionToken,
  AuthModuleConfig,
  UserRegisterEventTopicToken,
} from './config.interface';

import EmailPassword from 'supertokens-node/recipe/emailpassword/index.js';
import UserRoles from 'supertokens-node/recipe/userroles/index.js';

import Dashboard from 'supertokens-node/recipe/dashboard/index.js';
import { Roles, UserRolesService } from './roles/index.js';
import { EventEmitter2 } from '@nestjs/event-emitter';

const adminEmails = ['mark.girgis13@gmail.com'];

// const dto: CreateUserDTO = {
//   id,
//   email,
//   firstName: formFields[2].value,
//   lastName: formFields[3].value,
//   timeJoined,
// };
interface CreateUserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  timeJoined: number;
}

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken)
    private readonly config: AuthModuleConfig,
    @Inject(UserRegisterEventTopicToken)
    private readonly userRegisteredTopic: string,
    private eventEmitter: EventEmitter2,
  ) {
    this.init();
  }

  private async init() {
    supertokens.init({
      appInfo: this.config.appInfo,
      supertokens: {
        connectionURI: this.config.connectionURI,
        apiKey: this.config.apiKey,
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
              // eslint-disable-next-line @typescript-eslint/no-this-alias
              const self = this;
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  // First we call the original implementation of signUpPOST.
                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

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
                    self.eventEmitter.emit(self.userRegisteredTopic, dto);
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init(),
        Dashboard.init({
          apiKey: process.env.SUPER_TOKENS_API_KEY!,
        }),
        UserRoles.init(),
      ],
    });

    // Create roles
    // UserRolesService.createRole(Roles.Customer, []);
    // UserRolesService.createRole(Roles.Admin, []);
  }
}
