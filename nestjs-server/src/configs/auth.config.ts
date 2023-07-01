import { get } from 'env-var';
import './dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration
console.log(
  'SUPER_TOKENS_CONNECTION_URI:',
  process.env.SUPER_TOKENS_CONNECTION_URI,
  process.env,
);

export const authConfig = {
  superTokens: {
    connectionURI:
      get('ST_DOCKER_URI').asString() || get('ST_HOST').required().asString(),
    apiKey: get('SUPER_TOKENS_API_KEY').required().asString(),
    adminEmails: get('SUPER_TOKENS_ADMIN_EMAILS').required().asArray(),
    // 'mark.girgis13@gmail.com', 'admin@minasphone.gr'
  },
};
console.log('authConfig', authConfig);
