import { channelPromotionPaymentResponse, channelPromotionResponseDto } from '../../src/dtos/channelPromotion/';
import ChannelPromotionController from '../../src/server/controller/channelPromotionController';
import { channelPromotionRequestDto } from '../../src/dtos/channel';
import { responseDto } from '../../src/dtos/common';


describe('channel promotion controller', () => {
  let controller: ChannelPromotionController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new ChannelPromotionController();
  });
  it('get channel promotion for promotion id', async () => {
    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: {
        channelPromotionId: 3,
        channelName: 'Mobile app',
        sectionName: 'barcode',
        sectionRouteName: 'home/discountBarcode',
      },
    } as unknown as channelPromotionResponseDto;

    jest.spyOn(controller, 'getChannelPromotionId').mockImplementation(() => mockResponse);
    const result = await controller.getChannelPromotionId('31');

    expect(result).toEqual(mockResponse);
  });

  it('Create channel promotion Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockPromotion: channelPromotionRequestDto = {
      promotionId: 1,
      channelId: 1,
      sectionId: 1
    };

    jest.spyOn(controller, 'postCreateChannelPromotion').mockImplementation(() => mockResponse);
    const result = await controller.postCreateChannelPromotion(mockPromotion);

    expect(result).toEqual(mockResponse);
  });

  it('delete channel promotion for id', async () => {
    const mockResponse: any = {
      messages: [],
      isValid: true,
    } as unknown;

    jest.spyOn(controller, 'deleteChannelPromotionForChannel').mockImplementation(() => mockResponse);
    const result = await controller.deleteChannelPromotionForChannel(5, 31);

    expect(result).toEqual(mockResponse);
  });
});
