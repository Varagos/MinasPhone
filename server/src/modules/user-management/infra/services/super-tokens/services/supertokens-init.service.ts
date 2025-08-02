import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';

import {
  ConfigInjectionToken,
  AuthModuleConfig,
  UserRegisterEventTopicToken,
} from '../config.interface';

import EmailPassword from 'supertokens-node/recipe/emailpassword';
import UserRoles from 'supertokens-node/recipe/userroles';

import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

import { SupertokensUserRolesService } from './roles.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Roles } from '@modules/user-management/application/ports/role-service.port';
import { authConfig } from '@config/auth.config';

const adminEmails = authConfig.superTokens.adminEmails;

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
export class SuperTokensInitService {
  constructor(
    @Inject(ConfigInjectionToken)
    private readonly config: AuthModuleConfig,
    @Inject(UserRegisterEventTopicToken)
    private readonly userRegisteredTopic: string,
    private eventEmitter: EventEmitter2,
    private readonly rolesService: SupertokensUserRolesService,
  ) {
    this.init();
  }

  private async init() {
    // console.log({ apiKey: this.config.apiKey });
    supertokens.init({
      appInfo: this.config.appInfo,
      supertokens: {
        connectionURI: this.config.connectionURI,
        apiKey: this.config.apiKey,
      },
      recipeList: [
        UserRoles.init(),
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
                    const { id, emails, timeJoined } = response.user;

                    let role = Roles.Customer; // TODO: fetch role based on userId
                    if (adminEmails.includes(emails[0])) {
                      role = Roles.Admin;
                    }
                    await new SupertokensUserRolesService().assignRole(
                      id,
                      role,
                    );

                    // // These are the input form fields values that the user used while signing up
                    const formFields = input.formFields;

                    const firstName = formFields[2].value;
                    const lastName = formFields[3].value;
                    /**
                     * TODO: a noticed bug is that the user post-signup does not have the role
                     * assigned to them, inside their session & token.
                     * They have to login again to get the role assigned to them.
                     * This should be fixed.
                     */

                    await UserMetadata.updateUserMetadata(id, {
                      last_name: lastName,
                      first_name: firstName,
                      role,
                    });
                    // post sign up logic
                    const dto: CreateUserDTO = {
                      id,
                      email: emails[0],
                      firstName,
                      lastName,
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
          // apiKey: this.config.apiKey,
          // apiKey: this.config.apiKey
          // apiKey: process.env.SUPER_TOKENS_API_KEY!,
        }),
        UserMetadata.init(),
      ],
    });

    // Create roles
    // UserRolesService.createRole(Roles.Customer, []);
    // UserRolesService.createRole(Roles.Admin, []);
  }
}
