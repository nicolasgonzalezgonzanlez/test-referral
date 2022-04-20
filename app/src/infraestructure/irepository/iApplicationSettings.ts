import { applicationSettings } from '../entities';
//import { bannerResponseDto, bannerRequestDto } from '../../dtos/banner';

export interface iApplicationSetting {
  getAll(): Promise<any>;
  insertApplicationSettings(applicationSettings: any): Promise<boolean>
}
