import { applicationSettingsService } from '../../services';
import { Route, Post, Controller, Body, Tags, Get, Security } from 'tsoa';

@Route('applicationSettings')
@Tags('applicationSettings')
export default class applicationSettingsController extends Controller {
  @Post('/')
  public async insertApplicationSettings(@Body() body: any): Promise<any> {
    const res = await applicationSettingsService.insertApplicationSetting(body);
    return res;
  }
  @Get('/')
  public async getAllApplicationSettings(): Promise<any> {
    const res = await applicationSettingsService.getAllApplicationSetting();
    return res;
  }
}
