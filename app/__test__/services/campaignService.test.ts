import { campaignService } from '../../src/services';
import { campaignResponseDto, campaignRequestDto } from '../../src/dtos/campaign';
import * as campaignRepository from '../../src/infraestructure/repository/campaignRepository'
import { responseDto } from '../../src/dtos/common';

describe('Campaign service', () => {
  let repository: campaignRepository.campaignRepository

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repository = new campaignRepository.campaignRepository()
    jest.spyOn(campaignRepository, 'getCampaignRepository').mockImplementation(() => repository)
  });

  it('should create a campaign', async () => {
    const mockResponse = {
        campaignId: 12,
        name: "test",
    } as campaignResponseDto;

    jest.spyOn(repository, 'createCampaign').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await campaignService.createCampaign({ name: "test" });

    expect(result).toEqual(mockResponse);
    expect(repository.createCampaign).toHaveBeenNthCalledWith(1, {name: 'test'})
  });

  it('should get all campaigns', async () => {
    const mockResponse = [{
        campaignId: 1,
        name: "test"
    }] as campaignResponseDto[];

    jest.spyOn(repository, 'getAllCampaign').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await campaignService.allCampaigns("test");

    expect(result).toEqual(mockResponse);
    expect(repository.getAllCampaign).toHaveBeenNthCalledWith(1, 'test')
  });

  it('should delete a campaign by id', async () => {
    const expectedResult = new responseDto()

    jest.spyOn(repository, 'deleteCampaign').mockImplementation(() => Promise.resolve());
    const result = await campaignService.deleteCampaign(1);

    expect(result).toEqual(expectedResult);
    expect(repository.deleteCampaign).toHaveBeenNthCalledWith(1, 1)
  });

  it('should edit a campaign', async () => {
    const mockResponse: any = {
      campaignId: 8,
      name: 'Test',
    } as campaignResponseDto;

    const mockEditCampaign: campaignRequestDto = {
      name: 'Test',
    };

    jest.spyOn(repository, 'editCampaign').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await campaignService.editCampaign(8, mockEditCampaign);

    expect(result).toEqual(mockResponse);
    expect(repository.editCampaign).toHaveBeenNthCalledWith(1, 8, mockEditCampaign)
  });
});
