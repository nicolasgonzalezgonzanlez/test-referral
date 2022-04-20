import { campaignRepository } from '../../../src/infraestructure/repository/campaignRepository';
import { responseDto } from '../../../src/dtos/common';
import { campaignRequestDto } from "../../../src/dtos/campaign/campaignRequestDto"
import { campaign } from '../../../src/infraestructure/entities';
import { campaignResponseDto } from '../../../src/dtos/campaign';

describe('Campaign Repository', () => {
    let repo: campaignRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new campaignRepository();
    });
    it('should get all campaigns', async () => {
        const mockDbResponse = [{
            campaign_id: 1,
            name: 'test'
        }] as campaign[]
        const mockResponse = [{
            campaignId: 1,
            name: "test"
        }] as campaignResponseDto[];

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));
        const result = await repo.getAllCampaign();

        expect(result).toEqual(mockResponse);
        expect(repo.find).toHaveBeenCalledTimes(1);
    });

    it('should create a campaign', async () => {
        const mockDbResponse = {
            campaign_id: 1,
            name: 'testCampaign'
        } as campaign
        const mockResponse = {
            campaignId: 1,
            name: 'testCampaign'
        } as campaignResponseDto
        const mockCampaignReq: campaignRequestDto = {
            name: "testCampaign"
        };

        jest.spyOn(repo, 'create').mockImplementation(() => mockDbResponse);
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.createCampaign(mockCampaignReq);

        expect(result).toEqual(mockResponse);
        expect(repo.create).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should update a campaign', async () => {
        const mockDbResponse = {
            campaign_id: 1,
            name: 'test'
        } as campaign
        const mockResponse = {
            campaignId: 1,
            name: 'newName'
        } as campaignResponseDto
        const mockCampaign: campaignRequestDto = {
            name: "newName"
        };

        jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbResponse));
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.editCampaign(1, mockCampaign);

        expect(result).toEqual(mockResponse);
        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should delete a campaign', async () => {
        const mockDbResponse = {
            campaign_id: 1,
            name: 'test'
        } as campaign

        jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbResponse));
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));
        
        await repo.deleteCampaign(1);

        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1);
        expect(repo.save).toHaveBeenCalledTimes(1);
    });
});
