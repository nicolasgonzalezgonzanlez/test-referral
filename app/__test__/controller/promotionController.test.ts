import { promotionRequestDto, promotionRequestFilterDto, promotionRequestUpdateDto, promotionResponseDto } from '../../src/dtos/promotion';
import { applicationMessageDto, applicationMessageTypeDto, responseDto, responseResultDto } from '../../src/dtos/common';
import { allPromotionResponse, promotionResponse } from '../../src/dtos/promotion';
import PromotionController from '../../src/server/controller/promotionController';
import { promotionService } from '../../src/services'
import { validationMessages } from '../../src/constants/validation';
import { detailPromotionResponse } from '../../src/dtos/promotion/promotionResponseDto';

describe('Promotion controller', () => {
  let controller: PromotionController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new PromotionController();
  });

  it('GetAll promotion Controller', async () => {
    const serviceResponse = [
      {
        promotionId: 15,
        name: 'Dev mercados',
        code: '',
        description: '',
        endDate: new Date('2021-10-25T23:30:00.000Z'),
        linkTyc: 'sin términos y condiciones',
        refPromotion: '',
        information: '',
        promotionValue: 0.0,
        equivalencyCode: "ABC123",
        startDate: new Date('2021-10-03T23:30:00.000Z'),
        status: '',
        highDate: new Date('2021-10-01T23:31:00.000Z'),
        lowDate: new Date('2021-10-30T23:31:00.000Z'),
        typePromotion: {
          typePromotionId: 3,
          code: 'TP002',
          name: 'Monto',
          symbol: '$',
        },
        campaignId: 5,
        imgDetailsUrl: '',
        imgBannerUrl: '',
      },
    ] as promotionResponseDto[];

    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: serviceResponse,
    } as unknown as allPromotionResponse;

    const mockFilter: any = {
      filterValue: null,
      highDate: null,
      lowDate: null,
      typePromotionId: null,
    } as promotionRequestFilterDto;

    jest.spyOn(promotionService, 'getAllPromotionService').mockImplementation(() => Promise.resolve(serviceResponse));
    const result = await controller.getAllPromotion(mockFilter);

    expect(result).toEqual(mockResponse);
    expect(promotionService.getAllPromotionService).toHaveBeenCalledTimes(1)
  });

  it('getDynamicPromotions promotion Controller', async () => {
    const serviceResponse = [
      {
        promotionId: 15,
        name: 'Dev mercados',
        code: '',
        description: '',
        endDate: new Date('2021-10-25T23:30:00.000Z'),
        linkTyc: 'sin términos y condiciones',
        refPromotion: '',
        information: '',
        promotionValue: 0.0,
        equivalencyCode: "ABC123",
        startDate: new Date('2021-10-03T23:30:00.000Z'),
        status: '',
        highDate: new Date('2021-10-01T23:31:00.000Z'),
        lowDate: new Date('2021-10-30T23:31:00.000Z'),
        typePromotion: {
          typePromotionId: 3,
          code: 'TP002',
          name: 'Monto',
          symbol: '$',
        },
        campaignId: 5,
        imgDetailsUrl: '',
        imgBannerUrl: '',
      },
    ] as promotionResponseDto[];

    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: serviceResponse,
    } as unknown as allPromotionResponse;


    jest.spyOn(promotionService, 'getDynamicPromotions').mockImplementation(() => Promise.resolve(serviceResponse));
    const result = await controller.getDynamicPromotions('all');

    expect(result).toEqual(mockResponse);
    expect(promotionService.getDynamicPromotions).toHaveBeenCalledTimes(1)
  });

  it('GetById promotion Controller', async () => {
    const serviceResponse = {
      promotionId: 15,
      name: 'Dev mercados',
      code: '',
      description: '',
      endDate: new Date('2021-10-25T23:30:00.000Z'),
      linkTyc: 'sin términos y condiciones',
      refPromotion: '',
      information: '',
      promotionValue: 0.0,
      equivalencyCode: "ABC123",
      startDate: new Date('2021-10-03T23:30:00.000Z'),
      status: '',
      highDate: new Date('2021-10-01T23:31:00.000Z'),
      lowDate: new Date('2021-10-30T23:31:00.000Z'),
      typePromotion: {
        typePromotionId: 3,
        code: 'TP002',
        name: 'Monto',
        symbol: '$',
      },
      campaignId: 5,
      imgDetailsUrl: '',
      imgBannerUrl: '',
    } as promotionResponseDto;

    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: serviceResponse,
    } as unknown as promotionResponse;

    jest.spyOn(promotionService, 'getPromotionByIdService').mockImplementation(() => Promise.resolve(serviceResponse));
    const result = await controller.getPromotionById(1);

    expect(result).toEqual(mockResponse);
    expect(promotionService.getPromotionByIdService).toHaveBeenCalledTimes(1)
    expect(promotionService.getPromotionByIdService).toHaveBeenCalledWith(1)
  });

  it('Create promotion Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockPromotion: promotionRequestDto = {
      name: 'string',
      code: 'string',
      description: 'string',
      endDate: new Date('2021-10-22T16:03:00.312Z'),
      linkTyc: 'string',
      refPromotion: 'string',
      information: 'string',
      equivalencyCode: "ABC123",
      promotionValue: 0,
      startDate: new Date('2021-10-22T18:03:00.312Z'),
      status: 'string',
      highDate: undefined,
      lowDate: undefined,
      typePromotionId: 3,
      campaignId: undefined,
      imgDetailsUrl: 'string',
      imgBannerUrl: 'string',
    };

    jest.spyOn(promotionService, 'createPromotionService').mockImplementation(() => mockResponse);
    const result = await controller.postCreatePromotion(mockPromotion);

    expect(result).toEqual(mockResponse);
    expect(promotionService.createPromotionService).toHaveBeenCalledTimes(1)
    expect(promotionService.createPromotionService).toHaveBeenCalledWith(mockPromotion)
  });

  it('Update promotion Service', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockPromotion: promotionRequestUpdateDto = {
      name: 'string',
      description: 'string',
      endDate: new Date('2021-10-22T16:03:00.312Z'),
      linkTyc: 'string',
      refPromotion: 'string',
      information: 'string',
      startDate: new Date('2021-10-22T18:03:00.312Z'),
      highDate: undefined,
      lowDate: undefined,
      equivalencyCode: "ABC123",
      campaignId: undefined,
      imgDetailsUrl: 'string',
      imgBannerUrl: 'string',
    };

    jest.spyOn(promotionService, 'updatePromotionService').mockImplementation(() => mockResponse);
    const result = await controller.putUpdatePromotion(1, mockPromotion);

    expect(result).toEqual(mockResponse);
    expect(promotionService.updatePromotionService).toHaveBeenNthCalledWith(1, 1, mockPromotion)
  });

  it('Delete promotion Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    jest.spyOn(promotionService, 'deletePromotionService').mockImplementation(() => mockResponse);
    const result = await controller.deletePromotion(1);

    expect(result).toEqual(mockResponse);
    expect(promotionService.deletePromotionService).toHaveBeenNthCalledWith(1, 1)
  });

  it('should get mobile promotion', async () => {
    const serviceResponse: detailPromotionResponse = {
      data: {
        imgDetailsUrl: 'string',
        name: 'PROMO',
        description: 'PROMOCION',
        refPromotion: 'string',
        promotionValue: '10.0',
        promotionSymbol: '%',
        information: 'info',
        days: ['Mi', 'Ju', 'Vi', 'Sa'],
        linkTyc: 'link',
        section: 'name',
      },
      isValid: true,
      messages: [] as applicationMessageDto[]
    } as detailPromotionResponse

    jest.spyOn(promotionService, 'getPromotionByIdAndChannelCode').mockImplementation(() => Promise.resolve(serviceResponse))

    const response: responseDto = await controller.getPromotionByIdAndChannelCode(47, 'C001')

    expect(response).toEqual(serviceResponse)
    expect(response.isValid).toBe(true)
    expect(response.messages).toHaveLength(0)
    expect(promotionService.getPromotionByIdAndChannelCode).toHaveBeenNthCalledWith(1, 47, 'C001')
  })

  it('should get an invalid mobile promotion', async () => {
    const serviceResponse: detailPromotionResponse = {
      data: {},
      isValid: false,
      messages: [{key:'', message: validationMessages.promotion.inactivePromotion, messageType: applicationMessageTypeDto.Error}] as applicationMessageDto[]
    } as detailPromotionResponse

    jest.spyOn(promotionService, 'getPromotionByIdAndChannelCode').mockImplementation(() => Promise.resolve(serviceResponse))

    const response: responseDto = await controller.getPromotionByIdAndChannelCode(47, 'C001')

    expect(response).toEqual(serviceResponse)
    expect(response.isValid).toBe(false)
    expect(response.messages).toHaveLength(1)
    expect(response.messages[0].messageType).toBe(applicationMessageTypeDto.Error)
    expect(promotionService.getPromotionByIdAndChannelCode).toHaveBeenNthCalledWith(1, 47, 'C001')
  })

  it('Deactivate promotion Ok promotion Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    jest.spyOn(promotionService, 'deactivatePromotionService').mockImplementation(() => mockResponse);
    const result = await controller.putDeactivatePromotion(1);

    expect(result).toEqual(mockResponse);
    expect(promotionService.deactivatePromotionService).toHaveBeenNthCalledWith(1, 1)
  });

  it('Deactivate promotion Error promotion Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [{
      key: '',
      message: 'No es posible desactivar la promoción, la misma ya se encuentra inactiva',
      messageType: applicationMessageTypeDto.Error
    }];
    mockResponse.isValid = false;

    jest.spyOn(promotionService, 'deactivatePromotionService').mockImplementation(() => mockResponse);
    const result = await controller.putDeactivatePromotion(1);

    expect(result).toEqual(mockResponse);
    expect(promotionService.deactivatePromotionService).toHaveBeenNthCalledWith(1, 1)
  });

  it('Get promotion counters from service', async () => {
    const mockResponse: any = new responseResultDto();

    jest.spyOn(promotionService, 'getPromotionCounters').mockImplementation(() => mockResponse);
    const result = await controller.getPromotionCounters();

    expect(result).toEqual(mockResponse);
    expect(promotionService.getPromotionCounters).toHaveBeenNthCalledWith(1)
  });
});
