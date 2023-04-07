import { get } from 'env-var';
import '../libs/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration
console.log(
  'SUPER_TOKENS_CONNECTION_URI:',
  process.env.SUPER_TOKENS_CONNECTION_URI,
);

export const authConfig = {
  superTokens: {
    connectionURI: get('SUPER_TOKENS_CONNECTION_URI').required().asString(),
    apiKey: get('SUPER_TOKENS_API_KEY').required().asString(),
  },
};
console.log('authConfig', authConfig);
