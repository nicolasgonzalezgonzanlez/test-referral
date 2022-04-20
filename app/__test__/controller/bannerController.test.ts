import { applicationMessageDto } from '../../src/dtos/common';
import bannerController from '../../src/server/controller/bannerController';
import { bannersListResponse, bannerListItemDto, bannersExternalListResponse, bannerExternalItem } from '../../src/dtos/banner';
import { bannerService } from '../../src/services';

describe('Banner controller', () => {
  let controller: bannerController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new bannerController();
  });

  it('should get all banners', async () => {
    const mockResponse: any = {
      messages: [] as applicationMessageDto[],
      isValid: true,
      data: [
        {
          bannerId: 1,
          name: 'test',
        },
      ] as bannerListItemDto[],
    } as bannersListResponse;

    jest.spyOn(bannerService, 'getBanners').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await controller.getBanners();

    expect(result).toEqual(mockResponse);
  });

  it('should get banners by channel and section', async () => {
    const mockResponse: any = {
      messages: [] as applicationMessageDto[],
      isValid: true,
      data: [
        {
          bannerId: 1,
          bannerName: 'test',
        },
      ] as bannerExternalItem[],
    } as bannersExternalListResponse;

    jest.spyOn(bannerService, 'getBannersByChannelAndSection').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await controller.getBannersByChannelAndSection('', '');

    expect(result).toEqual(mockResponse);
  });
  it('should remove a banner based on an ID', async () => {
    const mockResponse: any = {
      messages: [] as applicationMessageDto[],
      isValid: true,
      data: [
        {
          key: '',
          message: 'el banner fue eliminado correctamente',
          messageType: 1,
        },
      ] as any,
    };

    jest.spyOn(bannerService, 'deleteBanner').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await controller.deleteBanner(1);

    expect(result).toEqual(mockResponse);
  });
});
