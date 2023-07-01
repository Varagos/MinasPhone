/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environmentFile: any = {
  development: '../.env.development',
  test: '../.env.test',
  production: '../.env.prod',
};
if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set');
}
// use .env or .env.test depending on NODE_ENV variable
const envPath = path.resolve(__dirname, environmentFile[process.env.NODE_ENV]);
dotenv.config({ path: envPath });

export async function getMigrator() {
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;
  const dbEndpointId = process.env.DB_ENDPOINT_ID;
  console.log('env:', process.env.NODE_ENV);

  const dbUrl = !dbEndpointId
    ? `postgres://${dbUsername}:${dbPassword}@${dbHost}/${dbName}`
    : `postgres://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?options=project%3D${dbEndpointId}&sslmode=require`;

  console.log('envPath', envPath);
  console.log('dbUrl', dbUrl);
  const pool = await createPool(dbUrl);

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName: 'migration',
    slonik: pool,
  } as any);

  return { pool, migrator };
}
