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
  const dbConnectionUri = process.env.DB_CONNECTION_URI;
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;
  console.log('env:', process.env.NODE_ENV);

  // Use DB_CONNECTION_URI if available, otherwise construct from parts
  const dbUrl = dbConnectionUri
    ? dbConnectionUri
    : `postgres://${dbUsername}:${dbPassword}@${dbHost}/${dbName}`

  console.log('envPath', envPath);
  // console.log('dbUrl', dbUrl);
  const pool = await createPool(dbUrl);

  const migrator = new SlonikMigrator({
    migrationsPath: path.resolve(__dirname, 'migrations'),
    migrationTableName: 'migration',
    slonik: pool,
    logger: console,
  });

  return { pool, migrator };
}
