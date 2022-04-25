import { applicationSetting } from "../entities";

export interface iApplicationSettingRepository {
  getAll(): Promise<applicationSetting[]>;
  create(entity: applicationSetting): Promise<applicationSetting>
}
