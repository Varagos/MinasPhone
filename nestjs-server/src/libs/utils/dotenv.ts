import { config } from 'dotenv';
import * as path from 'path';

const mapEnvsToEnvFiles: any = {
  development: '../../../../.development.env',
  test: '../../../../.env.test',
  production: '../../../../.env',
};

// Initializing dotenv
const envPath: string = path.resolve(
  __dirname,
  mapEnvsToEnvFiles[process.env.NODE_ENV!] || '../../../../.env',
);
console.log('envPath', envPath);
config({ path: envPath });
