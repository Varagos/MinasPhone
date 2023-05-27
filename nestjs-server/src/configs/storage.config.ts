import { get } from 'env-var';
import '../libs/utils/dotenv';
import { join } from 'path';

// https://github.com/Sairyss/backend-best-practices#configuration

export const storageConfig = {
  gcp_bucket_name: get('GCP_BUCKET_NAME').required().asString(),
  gcp_project_id: get('GCP_PROJECT_ID').required().asString(),
};

// GOOGLE_APPLICATION_CREDENTIALS contains the relative path, use path join, and update the environment variable
let GOOGLE_APPLICATION_CREDENTIALS = get('GOOGLE_APPLICATION_CREDENTIALS')
  .required()
  .asString();
// Use path join
console.log({
  cwd: process.cwd(),
  GOOGLE_APPLICATION_CREDENTIALS,
});
GOOGLE_APPLICATION_CREDENTIALS = join(
  process.cwd(),
  get('GOOGLE_APPLICATION_CREDENTIALS').required().asString(),
);

// Update the environment variable
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;

console.log(
  'new GOOGLE_APPLICATION_CREDENTIALS: ',
  GOOGLE_APPLICATION_CREDENTIALS,
);
