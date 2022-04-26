import { userDefault } from './../../constants/common';
import { applicationSettingEntity } from '../schemas/applicationSettingEntity'
import { appDataSource } from '../../server/appDataSource'
import { iApplicationSettingRepository } from '../irepository/iApplicationSettingRepository'
import { applicationSetting } from '../entities';

export const repository = appDataSource.getRepository(applicationSettingEntity)
export class applicationSettingRepository implements iApplicationSettingRepository {
  
  async getAll(): Promise<applicationSetting[]> {
    return repository.find()
  }

  async create(entity: applicationSetting): Promise<applicationSetting> {
    entity.created_by = userDefault;
    entity.create_date = new Date();
    const result = await repository.save(entity);
    return result;
  }
}
