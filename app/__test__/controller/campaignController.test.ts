import { campaignRequestDto } from '../../src/dtos/campaign';
import { responseDto } from '../../src/dtos/common';
import { allCampaignResponse } from '../../src/dtos/campaign';
import campaignController from '../../src/server/controller/campaignController';

describe('TypeLimit controller', () => {

    let controller: campaignController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new campaignController();
    });


    it('GetAll campaign Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        campaignId: 1,
                        code: "test"
                    }
                ]
            } as unknown as allCampaignResponse;

        jest.spyOn(controller, 'getAllCampaign').mockImplementation(() => mockResponse);
        const result = await controller.getAllCampaign();

        expect(result).toEqual(mockResponse);
    });


    it('Create campaign Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockCampaign: campaignRequestDto = {
            name: "string",
        };

        jest.spyOn(controller, 'postCreateCampaign').mockImplementation(() => mockResponse);
        const result = await controller.postCreateCampaign(mockCampaign);

        expect(result).toEqual(mockResponse);
    });

    it('Update campaign Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockCampaign: campaignRequestDto = {
            name: "string",
        };

        jest.spyOn(controller, 'editCampaign').mockImplementation(() => mockResponse);
        const result = await controller.editCampaign(1, mockCampaign);

        expect(result).toEqual(mockResponse);
    });

    it('Delete campaign Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;


        jest.spyOn(controller, 'deleteCampaign').mockImplementation(() => mockResponse);
        const result = await controller.deleteCampaign(1);

        expect(result).toEqual(mockResponse);
    });

});
