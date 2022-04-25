import { applicationSettingRequestDto } from '../dtos/applicationSetting';
import {applicationSettingRepository} from '../infraestructure/repository/applicationSettingsRepository'

const repository = new applicationSettingRepository();

const createApplicationSetting = async (applicationSetting: applicationSettingRequestDto): Promise<any> => {
  const response = await repository.create(applicationSetting)
  return response;
};

const getAllApplicationSetting = async (): Promise<any> => {
  const response = await repository.getAll()
  return response;
};

export = { createApplicationSetting, getAllApplicationSetting };