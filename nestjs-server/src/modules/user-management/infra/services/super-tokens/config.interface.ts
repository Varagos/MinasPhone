import { Type } from '@nestjs/common';
import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export const UserRegisterEventTopicToken = 'UserRegisterEventTopicToken';

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
  userRegisteredEventName: string;
};
