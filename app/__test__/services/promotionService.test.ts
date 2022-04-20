import * as promotionRepository from '../../src/infraestructure/repository/promotionRepository';
import * as channelPromotion from '../../src/infraestructure/repository/channelPromotionRepository';
import * as ruleConfigurationRepository from '../../src/infraestructure/repository/ruleConfigurationRepository'
import { promotionService } from '../../src/services';
import { promotionRequestDto, promotionRequestFilterDto, promotionRequestUpdateDto, promotionResponse, promotionResponseDto } from '../../src/dtos/promotion';
import { applicationMessageTypeDto, responseDto, responseResultDto } from '../../src/dtos/common';
import { detailPromotionResponse } from '../../src/dtos/promotion/promotionResponseDto';
import { validationMessages } from '../../src/constants/validation';
import { promotionForChannelCodeResponseDto } from '../../src/dtos/channelPromotion';
import { promotion } from '../../src/infraestructure/entities';
import { promotionCounterDto } from '../../src/dtos/promotion/promotionCountersDto';

describe('Promotion service', () => {
  let promoRepository: promotionRepository.promotionRepository;
  let chPromoRepository: channelPromotion.channelPromotionRepository;
  let ruleRepository: ruleConfigurationRepository.ruleConfigurationRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    chPromoRepository = new channelPromotion.channelPromotionRepository();
    jest.spyOn(channelPromotion, 'getChannelPromotionRepository').mockImplementation(() => chPromoRepository);

    promoRepository = new promotionRepository.promotionRepository();
    jest.spyOn(promotionRepository, 'getPromotionRepository').mockImplementation(() => promoRepository);

    ruleRepository = new ruleConfigurationRepository.ruleConfigurationRepository();
    jest.spyOn(ruleConfigurationRepository, 'getRuleConfigurationRepository').mockImplementation(() => ruleRepository);
  });

  it('should get all promotions', async () => {
    const mockResponse: any = [
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

    const mockFilter: any = {
      filterValue: null,
      highDate: null,
      lowDate: null,
      typePromotionId: null,
    } as promotionRequestFilterDto;

    jest.spyOn(promoRepository, 'getAllPromotion').mockImplementation(() => mockResponse);
    const result = await promotionService.getAllPromotionService(mockFilter);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.getAllPromotion).toHaveBeenNthCalledWith(1, mockFilter)
  });

  it('should get promotion by id', async () => {
    const mockResponse: any = {
      promotionId: 15,
      name: 'Dev mercados',
      code: '',
      description: '',
      endDate: new Date('2021-10-25T23:30:00.000Z'),
      linkTyc: 'sin términos y condiciones',
      refPromotion: '',
      information: '',
      promotionValue: 0.0,
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

    jest.spyOn(promoRepository, 'getPromotionById').mockImplementation(() => mockResponse);
    const result = await promotionService.getPromotionByIdService(1);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.getPromotionById).toHaveBeenNthCalledWith(1, 1)
  });

  it('should create a promotion when is valid', async () => {
    const repoResponse = {
      promotionId: 15,
      name: 'Dev mercados',
      code: '',
      description: '',
      endDate: new Date('2021-10-25T23:30:00.000Z'),
      linkTyc: 'sin términos y condiciones',
      refPromotion: '',
      information: '',
      promotionValue: 0.0,
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
    } as promotionResponseDto

    const mockResponse: any = new promotionResponse(null);
    mockResponse.messages = [];
    mockResponse.isValid = true;
    mockResponse.data = repoResponse

    const mockPromotion: promotionRequestDto = {
      name: 'string',
      code: 'string',
      description: 'string',
      endDate: new Date('2021-10-22T16:03:00.312Z'),
      linkTyc: 'string',
      refPromotion: 'string',
      information: 'string',
      promotionValue: 0,
      equivalencyCode: "ABC123",
      startDate: new Date('2021-10-22T18:03:00.312Z'),
      status: 'string',
      highDate: undefined,
      lowDate: undefined,
      typePromotionId: 3,
      campaignId: undefined,
      imgDetailsUrl: 'string',
      imgBannerUrl: 'string',
    };

    jest.spyOn(promoRepository, 'validExistPromotion').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(promoRepository, 'postCreatePromotion').mockImplementation(() => Promise.resolve(repoResponse));
    jest.spyOn(promoRepository, 'getPromotionById').mockImplementation(() => Promise.resolve(repoResponse));
    const result = await promotionService.createPromotionService(mockPromotion);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validExistPromotion).toHaveBeenNthCalledWith(1, mockPromotion.startDate, mockPromotion.endDate, mockPromotion.typePromotionId, mockPromotion.name)
    expect(promoRepository.postCreatePromotion).toHaveBeenNthCalledWith(1, mockPromotion)
  });

  it('should not create a promotion when is not valid', async () => {
    const mockResponse: any = new promotionResponse(null);
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.promotion.validateSameDates,
        messageType: applicationMessageTypeDto.Error,
      },
    ];
    mockResponse.isValid = false;

    const mockPromotion: promotionRequestDto = {
      name: 'string',
      code: 'string',
      description: 'string',
      endDate: new Date('2021-10-22T16:03:00.312Z'),
      linkTyc: 'string',
      refPromotion: 'string',
      information: 'string',
      promotionValue: 0,
      equivalencyCode: "ABC123",
      startDate: new Date('2021-10-22T18:03:00.312Z'),
      status: 'string',
      highDate: undefined,
      lowDate: undefined,
      typePromotionId: 3,
      campaignId: undefined,
      imgDetailsUrl: 'string',
      imgBannerUrl: 'string',
    };
    jest.spyOn(promoRepository, 'validExistPromotion').mockImplementation(() => Promise.resolve(false));

    const result = await promotionService.createPromotionService(mockPromotion);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validExistPromotion).toHaveBeenNthCalledWith(1, mockPromotion.startDate, mockPromotion.endDate, mockPromotion.typePromotionId, mockPromotion.name)
  });

  it('should update a promotion', async () => {
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

    jest.spyOn(promoRepository, 'putUpdatePromotion').mockImplementation(() => Promise.resolve());
    const result = await promotionService.updatePromotionService(1, mockPromotion);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.putUpdatePromotion).toHaveBeenNthCalledWith(1, 1, mockPromotion)
  });

  it('should delete a promotion when its valid', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const dbResponse = {
      promotion_id: 1,
      promotion_value: 1,
    } as promotion

    jest.spyOn(promoRepository, 'validateForDeletePromotion').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(promoRepository, 'getPromotionByIdWithRelations').mockImplementation(() => Promise.resolve(dbResponse))
    jest.spyOn(promoRepository, 'deletePromotion').mockImplementation(() => Promise.resolve());

    const result = await promotionService.deletePromotionService(1);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validateForDeletePromotion).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.getPromotionByIdWithRelations).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.deletePromotion).toHaveBeenCalledTimes(1)
  });

  it('should delete a promotion when its valid - with relations', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const dbResponse = {
      promotion_id: 1,
      promotion_value: 1,
      channel_promotion: [{
        channel_promotion_id: 1,
      }],
      rule_configuration: [{
        rule_configuration_id: 1,
        configuration_store: [{
          configuration_store_id: 1
        }],
        config_type_limit: [{
          config_type_limit_id: 1
        }]
      }]
    } as promotion

    jest.spyOn(promoRepository, 'validateForDeletePromotion').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(promoRepository, 'getPromotionByIdWithRelations').mockImplementation(() => Promise.resolve(dbResponse))
    jest.spyOn(promoRepository, 'deletePromotion').mockImplementation(() => Promise.resolve());

    const result = await promotionService.deletePromotionService(1);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validateForDeletePromotion).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.getPromotionByIdWithRelations).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.deletePromotion).toHaveBeenCalledTimes(1)
  });

  it('should not delete a promotion when not exists', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.promotion.invalidPromotion,
        messageType: applicationMessageTypeDto.Error,
      },
    ];
    mockResponse.isValid = false;

    jest.spyOn(promoRepository, 'validateForDeletePromotion').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(promoRepository, 'getPromotionByIdWithRelations').mockImplementation(() => Promise.resolve(undefined))

    const result = await promotionService.deletePromotionService(1);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validateForDeletePromotion).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.getPromotionByIdWithRelations).toHaveBeenNthCalledWith(1, 1)
  });

  it('should not delete a promotion when it is not valid', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.promotion.validateForDelete,
        messageType: applicationMessageTypeDto.Error,
      },
    ];
    mockResponse.isValid = false;

    jest.spyOn(promoRepository, 'validateForDeletePromotion').mockImplementation(() => Promise.resolve(false));

    const result = await promotionService.deletePromotionService(1);

    expect(result).toEqual(mockResponse);
    expect(promoRepository.validateForDeletePromotion).toHaveBeenNthCalledWith(1, 1)
  });


  it('should get promotions with a channel code', async () => {
    
    const repoReponse = [{
      promotionId: 1,
      name: 'string',
      imgBannerUrl: 'string',
    }] as promotionForChannelCodeResponseDto[]

    jest.spyOn(chPromoRepository,'getPromotionForChannelCode').mockImplementation(() => Promise.resolve(repoReponse));
    const result = await promotionService.getPromotionForChannelCodeService('C001');
    expect(result).toEqual(repoReponse)
    expect(chPromoRepository.getPromotionForChannelCode).toHaveBeenNthCalledWith(1, 'C001', undefined)
  })

  it('should deactivate a promotion when is valid', async () => {
    const repositoryResult: any = new responseDto();
    repositoryResult.messages = [];
    repositoryResult.isValid = true;

    const validationResponseOk: Promise<boolean> = new Promise((resolve) => resolve(true));

    jest.spyOn(promoRepository, 'isValidPromotion').mockImplementation(() => validationResponseOk);
    jest.spyOn(promoRepository, 'putDeactivatePromotion').mockImplementation(() => repositoryResult);

    const result = await promotionService.deactivatePromotionService(1);

    expect(result).toEqual(repositoryResult);
    expect(promoRepository.isValidPromotion).toHaveBeenNthCalledWith(1, 1)
    expect(promoRepository.putDeactivatePromotion).toHaveBeenNthCalledWith(1, 1)
  });

  it('should not deactivate a promotion when is already inactive', async () => {
    const repositoryResult: any = new responseDto();
    repositoryResult.messages = [
      {
        key: '',
        message: 'No es posible desactivar la promoción, la misma no se encuentra vigente',
        messageType: applicationMessageTypeDto.Error,
      },
    ];
    repositoryResult.isValid = false;

    const validationResponseFalse: Promise<boolean> = new Promise((resolve) => resolve(false));

    jest.spyOn(promoRepository, 'isValidPromotion').mockImplementation(() => validationResponseFalse);

    const result = await promotionService.deactivatePromotionService(1);

    expect(result).toEqual(repositoryResult);
    expect(promoRepository.isValidPromotion).toHaveBeenNthCalledWith(1, 1)
  });

  it('should return a valid mobile promotion', async () => {
    const serviceResult: any = {
      imgDetailsUrl: 'string',
      name: 'PROMO',
      description: 'PROMOCION',
      refPromotion: 'string',
      promotionValue: '10.0',
      promotionSymbol: '%',
      information: 'info',
      days: ['Miércoles', 'Lunes'],
      linkTyc: 'link',
      section: 'name',
    };
    const repositoryResult: any = {
      imgDetailsUrl: 'string',
      name: 'PROMO',
      description: 'PROMOCION',
      refPromotion: 'string',
      promotionValue: '10.0',
      promotionSymbol: '%',
      information: 'info',
      days: ['wednesday', 'monday'],
      linkTyc: 'link',
      section: 'name',
    };

    jest.spyOn(chPromoRepository, 'getPromotionDetailByIdAndChannelCode').mockImplementation(() => repositoryResult);

    const response: detailPromotionResponse = await promotionService.getPromotionByIdAndChannelCode(47, 'C001');

    expect(response.isValid).toBe(true);
    expect(response.data).toEqual(serviceResult);
  });

  it('should return an invalid mobile promotion', async () => {
    jest.spyOn(chPromoRepository, 'getPromotionDetailByIdAndChannelCode').mockImplementation();

    const response: detailPromotionResponse = await promotionService.getPromotionByIdAndChannelCode(47, 'C001');

    expect(response.isValid).toBe(false);
    expect(response.data).toEqual({});
    expect(response.messages).toHaveLength(1);
  });

  it('should get promotion counters', async () => {
    
    const activePromosOk = [{
      promotion_id: 1,
      name: 'string',
      img_banner_url: 'string',
    }] as promotion[]

    const allPromosMock = [{}] as promotionResponseDto[]

    const expectedResponse = {
      activePromotions: 1,
      todayPromotions: 1,
      totalPromotions: 1
    } as promotionCounterDto

    const expectedResult = new responseResultDto(expectedResponse)

    jest.spyOn(promoRepository, 'getAllPromotion').mockImplementation(() => Promise.resolve(allPromosMock));
    jest.spyOn(promoRepository, 'getTodayPromotions').mockImplementation(() => Promise.resolve(allPromosMock));
    jest.spyOn(ruleRepository, 'getPromotionsInProcess').mockImplementation(() => Promise.resolve(activePromosOk));

    const result = await promotionService.getPromotionCounters();
    expect(result).toEqual(expectedResult)
    expect(promoRepository.getAllPromotion).toHaveBeenNthCalledWith(1, {})
    expect(promoRepository.getTodayPromotions).toHaveBeenNthCalledWith(1)
    expect(ruleRepository.getPromotionsInProcess).toHaveBeenNthCalledWith(1)
  })
});
