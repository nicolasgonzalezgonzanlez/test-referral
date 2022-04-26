import { applicationSettingService } from '../../services';
import { Route, Post, Controller, Body, Tags, Get, Security } from 'tsoa';

@Route('applicationSettings')
@Tags('applicationSettings')
export default class applicationSettingsController extends Controller {
  @Post('/')
  public async insertApplicationSettings(@Body() body: any): Promise<any> {
    const res = await applicationSettingService.insertApplicationSetting(body);
    return res;
  }
  @Get('/')
  public async getAllApplicationSettings(): Promise<any> {
    const res = await applicationSettingService.getAllApplicationSetting();
    return res;
  }
}
