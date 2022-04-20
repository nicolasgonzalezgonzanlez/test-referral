import { applicationSettingsSchema } from '../schemas/applicationSettings'
import { connectionConfig } from '../../server/connectionConfig'
import {iApplicationSetting} from '../irepository/iApplicationSettings'

export const repository = connectionConfig().getRepository(applicationSettingsSchema)

export class applicationSettingRepository implements iApplicationSetting {
  async getAll(): Promise<any> {
    return repository.find()
  }
  async insertApplicationSettings(applicationSettings: any): Promise<boolean> {
    const { keys, value, type_key } = applicationSettings
    const now = new Date()
    const {identifiers} = await repository.createQueryBuilder()
    .insert()
    .into(applicationSettingsSchema)
    .values({
      keys,
      value,
      type_key,
      created_by: 'nicotest',
      create_date: now,
      row_status: true
    })
    .execute()
  
    return identifiers.length > 0
  }
}
