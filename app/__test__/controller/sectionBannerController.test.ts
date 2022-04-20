import { responseDto } from '../../src/dtos/common';
import { allsectionBannerResponse, sectionBannerIdResponse } from './../../src/dtos/sectionBanner/sectionBannerResponseDto';
import { sectionBannerRequestDto, sectionBannerResponseDto, sectionBannerUpdRequestDto } from '../../src/dtos/sectionBanner';
import SectionBannerController from '../../src/server/controller/sectionBannerController'
import { sectionBannerService } from '../../src/services';
import { sectionBannersRequestDto } from '../../src/dtos/sectionBanner/sectionBannerRequestDto';
describe('Section Banner Controller', () => {
    let controller: SectionBannerController

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new SectionBannerController();
    });

    it('should get all sections banner by config', async () => {
        const mockResponse = [
            {
                sectionBannerId: 1,
                customUrl: "test",
                customText: "test",
                imgBannerUrl: "test",
                imgDetailUrl: "test",
                sectionActionId: 1,
                bannerId: 1,
                sectionChannelId: 2,
            }
        ] as sectionBannerResponseDto[]
        
        const expectedResponse = new allsectionBannerResponse(mockResponse)
        jest.spyOn(sectionBannerService, 'allSectionBannerByConfig').mockImplementation(() => Promise.resolve(mockResponse))

        const result = await controller.getAllBannerSection(1)

        expect(result).toEqual(expectedResponse)
    })

    it('Create section banner Controller', async () => {
        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;
    
        const mock: sectionBannersRequestDto = {
            sectionBanners: [
                {
                    customUrl: "test",
                    customText: "test",
                    imgBannerUrl: "test",
                    imgDetailUrl: "test",
                    sectionActionId: 1,
                    sectionChannelId: 2,
                }
            ]
        }
        const response: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;
    
        jest.spyOn(sectionBannerService, 'createSectionBanner').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await controller.createBannerSection(mock, 1);
    
        expect(result).toEqual(response);
      });

      it('Update section banner Controller', async () => {
        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;
    
        const mockPromotion: sectionBannerUpdRequestDto = {
            customUrl: "test",
            customText: "test",
            imgBannerUrl: "test",
            imgDetailUrl: "test",
            sectionActionId: 1,
            sectionChannelId: 2,
            bannerId: 1
        };

        const expected = new responseDto([]);
    
        jest.spyOn(sectionBannerService, 'editSectionBanner').mockImplementation(() => mockResponse);
        const result = await controller.putBannerSection(1, mockPromotion);
    
        expect(result).toEqual(expected);
      });
})