import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm'
// @ts-ignore
const config_env = require('@telecom-argentina/config');
config_env.config();
import { config } from '../config'
import { applicationSettingEntity, userCodeEntity } from '../infraestructure/schemas'

const dataSourceOptions : DataSourceOptions = {
    ...config.sqlDb,
    entities: [applicationSettingEntity, userCodeEntity],
    migrations: [
      'build/src/migrations/**/*{.js,.ts}'
   ],
   cli: {
    entitiesDir: "build/src/infraestructure/schemas",
    migrationsDir: "src/migrations"
  }
  } as DataSourceOptions;
  
 export const appDataSource = new DataSource(dataSourceOptions)
 appDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((err: any) => {
      console.error('Error during Data Source initialization', err)
    })