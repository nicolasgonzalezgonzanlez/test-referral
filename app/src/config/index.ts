import { TConfig } from './types';

const config: TConfig = {
  server: {
    port: process.env.SERVER_PORT,
    killTimeout: process.env.SERVER_KILLTIMEOUT,
  },
  sqlDb: {
    type: process.env.TYPEORM_CONNECTION || 'postgres',
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: process.env.TYPEORM_LOGGING,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
  },
  corsUrls: process.env.CORS_URLS,
  internalApiUrl: process.env.INTERNAL_API_URL,
};

export { config }
