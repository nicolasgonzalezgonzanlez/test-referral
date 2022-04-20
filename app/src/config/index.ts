import { TConfig } from './types';

const config: any = {
  server: {
    port: process.env.SERVER_PORT,
    killTimeout: process.env.SERVER_KILLTIMEOUT,
  },
  sqlDb: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
  },
  corsUrls: process.env.CORS_URLS,
  internalApiUrl: process.env.INTERNAL_API_URL,
};

export = config;
