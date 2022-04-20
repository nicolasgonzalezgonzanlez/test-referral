import { bannerListItemDto } from './../../src/dtos/banner/bannerResponseDto';
import { bannerService } from '../../src/services';
import * as BannerRepository from '../../src/infraestructure/repository/bannerRepository';
import * as SectionBannerRepository from '../../src/infraestructure/repository/sectionBannerRepository'
import { banner, sectionBanner } from '../../src/infraestructure/entities';
import { bannersListResponse, bannersExternalListResponse, bannerExternalItem } from '../../src/dtos/banner';
import { applicationMessageDto, applicationMessageTypeDto } from '../../src/dtos/common';

describe('Banner Service', () => {
  let bannerRepository: BannerRepository.bannerRepository;
  let sectionBannerRepository: SectionBannerRepository.repository

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    bannerRepository = new BannerRepository.bannerRepository();
    jest.spyOn(BannerRepository, 'getBannerRepository').mockImplementation(() => bannerRepository);

    sectionBannerRepository = new SectionBannerRepository.repository()
    jest.spyOn(SectionBannerRepository, 'getSectionBannerRepository').mockImplementation(() => sectionBannerRepository)
  });

  it('should get and map all banners', async () => {
    const expectedResponse = {
      data: [] as bannerListItemDto[],
      isValid: true,
      messages: [] as applicationMessageDto[],
    } as bannersListResponse;

    jest.spyOn(bannerRepository, 'getBanners').mockImplementation(() => Promise.resolve([] as banner[]));

    const result = await bannerService.getBanners();

    expect(result).toEqual(expectedResponse);
    expect(result.data).toHaveLength(0);
    expect(bannerRepository.getBanners).toHaveBeenNthCalledWith(1);
  });

  it('should get and map all banners with data', async () => {
    const responseFromDb = [
      {
        banner_id: 1,
        name: 'name',
        start_date: new Date('11-02-2023'),
        end_date: new Date('11-02-2023'),
      },
    ] as banner[];
    const mappedResponse = [
      {
        bannerId: 1,
        name: 'name',
        startDate: new Date('11-02-2023'),
        endDate: new Date('11-02-2023'),
        channel: null,
        imgBannerUrl: null,
        section: null,
      },
    ] as bannerListItemDto[];
    const expectedResponse = {
      data: mappedResponse,
      isValid: true,
      messages: [] as applicationMessageDto[],
    } as bannersListResponse;

    jest.spyOn(bannerRepository, 'getBanners').mockImplementation(() => Promise.resolve(responseFromDb));

    const result = await bannerService.getBanners();

    expect(result).toEqual(expectedResponse);
    expect(result.data).toHaveLength(1);
    expect(bannerRepository.getBanners).toHaveBeenNthCalledWith(1);
  });

  it('should get and map banners by channel', async () => {
    const expectedResponse = {
      data: [] as bannerExternalItem[],
      isValid: true,
      messages: [] as applicationMessageDto[],
    } as bannersExternalListResponse;

    jest.spyOn(sectionBannerRepository, 'getBannersByChannelAndSection').mockImplementation(() => Promise.resolve([] as sectionBanner[]));

    const result = await bannerService.getBannersByChannelAndSection('CH001');

    expect(result).toEqual(expectedResponse);
    expect(result.data).toHaveLength(0);
    expect(sectionBannerRepository.getBannersByChannelAndSection).toHaveBeenNthCalledWith(1, 'CH001', undefined);
  });

  it('should get and map banners by channel and section code', async () => {
    const expectedResponse = {
      data: [] as bannerExternalItem[],
      isValid: true,
      messages: [] as applicationMessageDto[],
    } as bannersExternalListResponse;

    jest.spyOn(sectionBannerRepository, 'getBannersByChannelAndSection').mockImplementation(() => Promise.resolve([] as sectionBanner[]));

    const result = await bannerService.getBannersByChannelAndSection('CH001', 'SC001');

    expect(result).toEqual(expectedResponse);
    expect(result.data).toHaveLength(0);
    expect(sectionBannerRepository.getBannersByChannelAndSection).toHaveBeenNthCalledWith(1, 'CH001', 'SC001');
  });
  
  it('should remove a banner by its id', async () => {
    const responserRepository: any = {
      bannerId: 1,
      name: 'name',
      start_date: new Date('11-02-2023'),
      end_date: new Date('11-02-2023'),
      channel: null,
      img_banner_url: null,
      section: null,
    };
    const responseService = { isValid: true, messages: [{ key: '', message: 'Eliminamos el banner con éxito', messageType: 1 }] } as any;
    jest.spyOn(bannerRepository, 'deleteBanner').mockImplementation(() => Promise.resolve(responserRepository));

    const result = await bannerService.deleteBanner(1);

    expect(result).toEqual(responseService);
    expect(bannerRepository.deleteBanner).toHaveBeenNthCalledWith(1, 1);
  });
});
