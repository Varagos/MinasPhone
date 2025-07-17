import { get } from 'env-var';
import './dotenv';

export const googleSearchConfig = {
  googleApiKey: get('GOOGLE_API_KEY').required().asString(),
  googleSearchEngineId: get('GOOGLE_SEARCH_ENGINE_ID').required().asString(),
};
