import applicationSettingController from '../../src/server/controller/applicationSettingController'
import {applicationSettingService} from '../../src/services/'
describe('Application setting controller', () => {
  let controller: applicationSettingController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new applicationSettingController();
  });

  it('should insertApplicationSettings', async () => { 
    const mockResponse: any = {

    }
    jest.spyOn(applicationSettingService, 'getAllApplicationSetting').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await controller.getAllApplicationSettings();

    expect(result).toEqual(mockResponse);

  })

})