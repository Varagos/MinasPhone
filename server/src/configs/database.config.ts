import { get } from 'env-var';
import './dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host:
    get('DB_DOCKER_HOST').asString() || get('DB_HOST').required().asString(),
  port: get('DB_PORT').required().asIntPositive(),
  username: get('DB_USERNAME').required().asString(),
  password: get('DB_PASSWORD').required().asString(),
  database: get('DB_NAME').required().asString(),
  endpointId: get('DB_ENDPOINT_ID').asString(),
  connectionUri: get('DB_CONNECTION_URI').asString(),
};
// console.log({ databaseConfig });

const { username, password, host, database, endpointId } = databaseConfig;

const postgresConnectionUri = databaseConfig.connectionUri
  ? databaseConfig.connectionUri
  : !databaseConfig.endpointId
  ? `postgres://${username}:${password}@${host}/${database}`
  : `postgres://${username}:${password}@${host}/${database}?options=project%3D${endpointId}&sslmode=require`;
console.log({ databaseConfig });

console.log({ postgresConnectionUri });

export { postgresConnectionUri };
