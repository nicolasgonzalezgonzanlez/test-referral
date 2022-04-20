import { DataSource } from 'typeorm'
import config from '../config'
import { applicationSettingsSchema } from '../infraestructure/schemas'

const connectionConfig = () => {
  const AppDataSource = new DataSource({
    ...config.sqlDb,
    entities: [applicationSettingsSchema],
  })
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