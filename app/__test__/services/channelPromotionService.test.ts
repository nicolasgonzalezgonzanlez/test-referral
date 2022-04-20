import { channelPromotionService } from '../../src/services/';
import { channelPromotionResponseDto } from '../../src/dtos/channelPromotion/';
import * as channelPromotion from '../../src/infraestructure/repository/channelPromotionRepository';
import * as promotionRepository from '../../src/infraestructure/repository/promotionRepository';

import { applicationMessageTypeDto, responseDto } from '../../src/dtos/common';
import { validationMessages } from '../../src/constants/validation';

describe('Channel Promotion Service', () => {

  let chPromoRepository: channelPromotion.channelPromotionRepository;
  let promoRepository: promotionRepository.promotionRepository;


  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    chPromoRepository = new channelPromotion.channelPromotionRepository();
    jest.spyOn(channelPromotion, 'getChannelPromotionRepository').mockImplementation(() => chPromoRepository);
    promoRepository = new promotionRepository.promotionRepository();
    jest.spyOn(promotionRepository, 'getPromotionRepository').mockImplementation(() => promoRepository);
  });

  test('get channel promotion for channelId', async () => {
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

    jest.spyOn(chPromoRepository, 'getChannelPromotionId').mockImplementation(() => Promise.resolve(mockResponse));

    const result = await channelPromotionService.getChannelPromotionIdService('31');

    expect(result).toEqual(mockResponse);
    expect(chPromoRepository.getChannelPromotionId).toHaveBeenNthCalledWith(1, "31")

  });

  it('should create a channel promotion if its valid', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockReq = { promotionId: 1, channelId: 1, sectionId: 1 }

    jest.spyOn(chPromoRepository, 'postCreateChannelPromotion').mockImplementation(() => Promise.resolve(mockResponse));
    jest.spyOn(chPromoRepository, 'verifyCreateChannelPromotionId').mockImplementation(() => Promise.resolve(true));

    const result = await channelPromotionService.postChannelPromotionService(mockReq);

    expect(result).toEqual(mockResponse);
    expect(result.isValid).toBe(true);
    expect(result.messages).toHaveLength(0);
    expect(chPromoRepository.postCreateChannelPromotion).toHaveBeenCalled()
    expect(chPromoRepository.verifyCreateChannelPromotionId).toHaveBeenCalled()
  });

  it('should create a channel promotion if it is not valid', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.channelPromotion.cantCreate,
        messageType: applicationMessageTypeDto.Error,
      },
    ];
    mockResponse.isValid = false;

    const mockReq = { promotionId: 1, channelId: 1, sectionId: 1 }

    jest.spyOn(chPromoRepository, 'verifyCreateChannelPromotionId').mockImplementation(() => Promise.resolve(false));

    const result = await channelPromotionService.postChannelPromotionService(mockReq);

    expect(result).toEqual(mockResponse);
    expect(result.isValid).toBe(false);
    expect(result.messages).toHaveLength(1);
    expect(chPromoRepository.verifyCreateChannelPromotionId).toHaveBeenCalledTimes(1)
  });

  it('should delete channel promotion for id if it is not valid', async () => {
    const mockResponse: any = {
      messages: [],
      isValid: true,
    } as unknown;

    jest.spyOn(promoRepository, 'isValidPromotion').mockImplementation(() => Promise.resolve(false));
    jest.spyOn(chPromoRepository, 'deleteChannelPromotionId').mockImplementation(() => Promise.resolve());

    const result = await channelPromotionService.deleteChannelPromotionForChannelService(5, 31);

    expect(result).toEqual(mockResponse);
    expect(result.isValid).toBe(true);
    expect(result.messages).toHaveLength(0);
    expect(promoRepository.isValidPromotion).toHaveBeenNthCalledWith(1, 31)
    expect(chPromoRepository.deleteChannelPromotionId).toHaveBeenNthCalledWith(1, 5)
  });

  it('should not delete channel promotion for id if it is valid', async () => {
    const mockResponse = new responseDto();
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.channelPromotion.cantDelete,
        messageType: applicationMessageTypeDto.Error,
      },
    ]
    mockResponse.isValid = false

    jest.spyOn(promoRepository, 'isValidPromotion').mockImplementation(() => Promise.resolve(true));

    const result = await channelPromotionService.deleteChannelPromotionForChannelService(5, 31);

    expect(result).toEqual(mockResponse);
    expect(result.isValid).toBe(false);
    expect(result.messages).toHaveLength(1);
    expect(promoRepository.isValidPromotion).toHaveBeenNthCalledWith(1, 31)
  });

});
