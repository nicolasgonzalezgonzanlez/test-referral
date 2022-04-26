import { applicationSettingService } from '../../services';
import { Route, Post, Controller, Body, Tags, Get, Security } from 'tsoa';
import { applicationSettingRequestDto } from '../../dtos/applicationSetting';

@Route('applicationSetting')
@Tags('applicationSetting')
export default class applicationSettingsController extends Controller {
  @Post('/')
  public async createApplicationSetting(@Body() body: applicationSettingRequestDto): Promise<any> {
    const res = await applicationSettingService.createApplicationSetting(body);
    return res;
  }
  @Get('/')
  public async getAllApplicationSettings(): Promise<any> {
    const res = await applicationSettingService.getAllApplicationSetting();
    return res;
  }
}
