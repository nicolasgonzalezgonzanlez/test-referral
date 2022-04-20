import { DataSource, DataSourceOptions } from 'typeorm'
import config from '../config'
import { applicationSettingsSchema } from '../infraestructure/schemas'

const connectionConfig = () => {
  const dataSourceOptions : DataSourceOptions = {
    ...config.sqlDb,
    entities: [applicationSettingsSchema]
  } as DataSourceOptions;
  
  const AppDataSource = new DataSource(dataSourceOptions)
  AppDataSource.initialize()
    .then(() => {
      // poner un log
      console.log('Data Source has been initialized!')
    })
    .catch((err: any) => {
      console.error('Error during Data Source initialization', err)
    })
  return AppDataSource
}
export { connectionConfig }