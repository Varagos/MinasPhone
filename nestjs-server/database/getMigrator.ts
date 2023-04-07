/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environmentFile: any = {
  development: '../.development.env',
  test: '../.env.test',
  production: '../.env',
};
// use .env or .env.test depending on NODE_ENV variable
const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV ? environmentFile[process.env.NODE_ENV] : '../.env',
);
dotenv.config({ path: envPath });

export async function getMigrator() {
  const dbUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
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
