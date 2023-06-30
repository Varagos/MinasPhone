import { config } from 'dotenv';
import * as path from 'path';

console.log(`Current environment: ${process.env.NODE_ENV}`);
const mapEnvsToEnvFiles: any = {
  development: '../../.development.env',
  test: '../../.env.test',
  production: '../../.env.prod',
  'development:docker': '../../.development.docker.env',
};

// Initializing dotenv
const envPath: string = path.resolve(
  __dirname,
  mapEnvsToEnvFiles[process.env.NODE_ENV!] || '../../.env.prod',
);
console.log('envPath', envPath);
config({ path: envPath });
