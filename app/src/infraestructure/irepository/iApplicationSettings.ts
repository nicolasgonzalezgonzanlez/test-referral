export interface iApplicationSetting {
  getAll(): Promise<any>;
  insertApplicationSettings(applicationSettings: any): Promise<boolean>
}
