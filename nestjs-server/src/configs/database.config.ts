import { get } from 'env-var';
import '../libs/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host: get('DB_HOST').required().asString(),
  port: get('DB_PORT').required().asIntPositive(),
  username: get('DB_USERNAME').required().asString(),
  password: get('DB_PASSWORD').required().asString(),
  database: get('DB_NAME').required().asString(),
  endpointId: get('DB_ENDPOINT_ID').asString(),
};
console.log({ databaseConfig });

const postgresConnectionUri = !databaseConfig.endpointId
  ? `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}/${databaseConfig.database}`
  : `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}/${databaseConfig.database}?options=project%3D${databaseConfig.endpointId}&sslmode=require`;

export { postgresConnectionUri };
