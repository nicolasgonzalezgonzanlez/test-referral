import {applicationSettingsRepository} from '../infraestructure/repository/applicationSettingsRepository'

const repository = new applicationSettingsRepository();

const insertApplicationSetting = async (applicationSettings: any): Promise<any> => {
  const response = await repository.insertApplicationSettings(applicationSettings)
  return response;
};

const getAllApplicationSetting = async (): Promise<any> => {
  const response = await repository.getAll()
  return response;
};

export = { insertApplicationSetting, getAllApplicationSetting };