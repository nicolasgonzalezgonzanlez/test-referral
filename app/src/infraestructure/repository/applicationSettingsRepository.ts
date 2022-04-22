import { applicationSettingEntity } from '../schemas/applicationSettingEntity'
import { appDataSource } from '../../server/appDataSource'
import {iApplicationSetting} from '../irepository/iApplicationSettings'

export const repository = appDataSource.getRepository(applicationSettingEntity)
export class applicationSettingRepository implements iApplicationSetting {
  
  async getAll(): Promise<any> {
    return repository.find()
  }

  async insertApplicationSettings(applicationSettings: any): Promise<boolean> {
    const { keys, value, type_key, description } = applicationSettings
    const now = new Date()
    const {identifiers} = await repository.createQueryBuilder()
    .insert()
    .into(applicationSettingEntity)
    .values({
      keys,
      value,
      type_key,
      description,
      created_by: 'nicotest',
      create_date: now,
      row_status: true
    })
    .execute()
  
    return identifiers.length > 0
  }
}
