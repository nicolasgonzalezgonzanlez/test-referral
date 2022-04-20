import { sectionBannerUpdRequestDto } from './../../../src/dtos/sectionBanner/sectionBannerUpdRequestDto';
import { sectionBannerResponseDto } from './../../../src/dtos/sectionBanner/sectionBannerResponseDto';
import { repository } from "../../../src/infraestructure/repository/sectionBannerRepository"
import { sectionBanner } from '../../../src/infraestructure/entities';
import { bannerResponseDto } from '../../../src/dtos/banner';
import { sectionChannelResponseDto } from '../../../src/dtos/sectionChannel';
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder';

describe('Section Banner repository', () => {
    let sectionBannerRepository: repository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        sectionBannerRepository = new repository();
    });
   

    it('should get all banner section', async () => {

        const mockDBResponse = [
            {
                section_banner_id: 1,
                custom_url: "test",
                custom_text: "test",
                img_banner_url: "test",
                img_detail_url: "test",
                section_action_id: 1,
                banner_id: 1,
                section_channel_id: 2,
                banner: {
                    banner_id: 1,
                    code: "test",
                    name: "test",
                },
                section_channel: {
                    section_channel_id: 1,
                    code: "test",
                    name: "test"
                }
            }
        ] as sectionBanner[]

        
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

        jest.spyOn(sectionBannerRepository, 'find').mockImplementation(() => Promise.resolve(mockDBResponse));

        const result = await sectionBannerRepository.getAllSectionBannerByConfig(1);

        expect(result).toEqual(mockResponse)
        expect(sectionBannerRepository.find).toHaveBeenCalledTimes(1)
    });

    it('should get banners by channel', async () => {
        const mockDbResponse = [
          {
            section_banner_id: 1,
            banner: {
                name: 'test',
            }
          },
        ] as sectionBanner[];
    
        const createQueryBuilderMock = mockCreateQueryBuilder(mockDbResponse);
    
        jest.spyOn(sectionBannerRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilderMock);
        const result = await sectionBannerRepository.getBannersByChannelAndSection('CH001');
    
        expect(result).toEqual(mockDbResponse);
        expect(sectionBannerRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      });

    it('should get banners by channel and section', async () => {
        const mockDbResponse = [
          {
            section_banner_id: 1,
            banner: {
              name: 'test'
            },
          },
        ] as sectionBanner[];
    
        const createQueryBuilderMock = mockCreateQueryBuilder(mockDbResponse);
    
        jest.spyOn(sectionBannerRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilderMock);
        const result = await sectionBannerRepository.getBannersByChannelAndSection('CH001', 'SC001');
    
        expect(result).toEqual(mockDbResponse);
        expect(sectionBannerRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      });


    it('should update a Section Banner', async () => {
        const mockDbRequest= {
            section_banner_id: 1,
            custom_url: "test",
            custom_text: "test",
            img_banner_url:"test",
            img_detail_url:"test",
            banner_id: 1,
            section_channel_id: 1,
            section_action_id: 1
        } as sectionBanner

        const mockRequest: sectionBannerUpdRequestDto = {
            customUrl: "test",
            customText:"test",
            imgBannerUrl:"test",
            imgDetailUrl:"test",
            sectionActionId: 1,
            sectionChannelId: 1,
            bannerId: 1
        };

        jest.spyOn(sectionBannerRepository, 'create').mockImplementation(() => mockDbRequest);
        jest.spyOn(sectionBannerRepository, 'findOne').mockImplementation(() => Promise.resolve(mockDbRequest));
        jest.spyOn(sectionBannerRepository, 'save').mockImplementation(() => Promise.resolve(mockDbRequest));

        const result = await sectionBannerRepository.putUpdateSectionBanner(1, mockRequest);

        expect(result).toEqual(undefined);
    });
})