import { responseDto } from './../../src/dtos/common/responseDto';
import { sectionBannerUpdRequestDto } from './../../src/dtos/sectionBanner/sectionBannerUpdRequestDto';
import { bannerResponseDto } from './../../src/dtos/banner/bannerResponseDto';
import { sectionBannerService } from '../../src/services';
import * as SectionBannerRepository from '../../src/infraestructure/repository/sectionBannerRepository';
import { sectionBannerRequestDto, sectionBannerResponseDto } from '../../src/dtos/sectionBanner';
import { sectionChannelResponseDto } from '../../src/dtos/sectionChannel';
import { sectionBannersRequestDto } from '../../src/dtos/sectionBanner/sectionBannerRequestDto';

describe('Section Banner Service', () => {
    let sectionBannerRepository: SectionBannerRepository.repository;
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        sectionBannerRepository = new SectionBannerRepository.repository();
        jest.spyOn(SectionBannerRepository, 'getSectionBannerRepository').mockImplementation(() => sectionBannerRepository);

    });

    it('should get and map all section banners', async () => {


        const mockResponse: sectionBannerResponseDto[] = [{
            sectionBannerId: 1,
            customUrl: "test",
            customText: "test",
            imgBannerUrl: "test",
            imgDetailUrl: "test",
            sectionActionId: 1,
            bannerId: 1,
            sectionChannelId: 2,
            banner: {
                bannerId: 1, 
                code: "test",
                name: "test"
            } as bannerResponseDto,
            sectionChannel: {
                code: "test", 
                name: "test", 
                sectionChannelId: 1
            } as sectionChannelResponseDto
        }];

        const expected = [{"banner": {"bannerId": 1, "code": "test", "name": "test"}, "bannerId": 1, "customText": "test", "customUrl": "test", "imgBannerUrl": "test", "imgDetailUrl": "test", "sectionActionId": 1, "sectionBannerId": 1, "sectionChannel": {"code": "test", "name": "test", "sectionChannelId": 1}, "sectionChannelId": 2}];


        jest.spyOn(sectionBannerRepository, 'getAllSectionBannerByConfig').mockImplementation(() => Promise.resolve(mockResponse))

        const result = await sectionBannerService.allSectionBannerByConfig(1)

        expect(result).toEqual(expected)
    })

    it('should create a section banner', async () => {

        const mock: sectionBannerRequestDto [] = [{
            customUrl: "test",
            customText: "test",
            imgBannerUrl: "test",
            imgDetailUrl: "test",
            sectionActionId: 1,
            sectionChannelId: 2,
        }];

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        jest.spyOn(sectionBannerRepository, 'postCreateSectionBanner').mockImplementation(() => Promise.resolve());
        const result = await sectionBannerService.createSectionBanner(mock, 1);
    
        expect(result).toEqual(mockResponse);
    });
    


    it('should update a section banner', async () => {
        const mockPromotion: sectionBannerUpdRequestDto = {
            customUrl: "test",
            customText: "test",
            imgBannerUrl: "test",
            imgDetailUrl: "test",
            sectionActionId: 1,
            bannerId: 1,
            sectionChannelId: 2,
        };
    
        const expected = {"isValid": true, "messages": []};

        jest.spyOn(sectionBannerRepository, 'putUpdateSectionBanner').mockImplementation(() => Promise.resolve());
        const result = await sectionBannerService.editSectionBanner(1, mockPromotion);
    
        expect(result).toEqual(expected);
      });
});
