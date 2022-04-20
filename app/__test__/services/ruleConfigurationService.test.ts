import * as configTypeLimits from './../../src/infraestructure/repository/configTypeLimitRepository';
import * as ruleConfiguration from '../../src/infraestructure/repository/ruleConfigurationRepository';
import * as promotion from '../../src/infraestructure/repository/promotionRepository';
import { ruleConfigurationService } from '../../src/services';
import { ruleConfigurationRequestDto, ruleConfigurationResponse, ruleConfigurationResponseDto, ruleConfigurationUpdRequestDto } from '../../src/dtos/ruleConfiguration';
import { applicationMessageTypeDto, responseDto } from '../../src/dtos/common';
import { validationMessages } from '../../src/constants/validation';
import { configTypeLimit, configurationStore, ruleConfiguration as ruleConfigurationEntity } from '../../src/infraestructure/entities'
import { ruleConfigurationPromotionResponseDto } from '../../src/dtos/ruleConfiguration/ruleConfigurationResponseDto';

describe('Rule Configuration service', () => {
  let ruleConfigurationRepository: ruleConfiguration.ruleConfigurationRepository;
  let promotionRepository: promotion.promotionRepository;
  let configTypeLimitRepository: configTypeLimits.configTypeLimitRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    ruleConfigurationRepository = new ruleConfiguration.ruleConfigurationRepository();
    jest.spyOn(ruleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigurationRepository);
    promotionRepository = new promotion.promotionRepository();
    jest.spyOn(promotion, 'getPromotionRepository').mockImplementation(() => promotionRepository);
  });

  it('should get Rule Configuration by promotion id', async () => {
    const mockResponseDto: any = {
      ruleConfigurationId: 1,
      days: 'Lunes',
      configTypeLimits: [{
        configTypeLimitId: 1,
        limitValue: 1,
        typeLimitId: 1,
        ruleConfigurationId: 1
      }],
      paymentMin: 20,
      isFirstOperation: true,
      isByStore: true,
      promotionId: 1,
      userCondition: {
        userConditionId: 1,
        code: 'User 01',
        name: 'Rule 01',
      },
      productOperation: {
        productOperationId: 1,
        operationTypeId: 1,
        code: 'Product 01',
        name: 'Rule 01',
      },
    } as ruleConfigurationResponseDto;

    const mockResponse = new ruleConfigurationResponse();
    mockResponse.data = mockResponseDto;

    jest.spyOn(ruleConfigurationRepository, 'getRuleConfigurationByPromotionId').mockImplementation(() => Promise.resolve(mockResponseDto));
    const result = await ruleConfigurationService.getRuleConfigurationByPromotionIdService(1);

    expect(result).toEqual(mockResponse);
    expect(ruleConfigurationRepository.getRuleConfigurationByPromotionId).toHaveBeenCalled();
    expect(ruleConfigurationRepository.getRuleConfigurationByPromotionId).toHaveBeenCalledTimes(1);
  });

  it('should warn while getting Rule Configuration by promotion id', async () => {
    const mockResponse = new ruleConfigurationResponse();
    mockResponse.messages = [
      {
        key: '',
        message: validationMessages.ruleConfiguration.noRuleForPromotion,
        messageType: applicationMessageTypeDto.Warning,
      }
    ]
    mockResponse.isValid = true

    jest.spyOn(ruleConfigurationRepository, 'getRuleConfigurationByPromotionId').mockImplementation(() => Promise.reject());
    const result = await ruleConfigurationService.getRuleConfigurationByPromotionIdService(1);

    expect(result).toEqual(mockResponse);
    expect(ruleConfigurationRepository.getRuleConfigurationByPromotionId).toHaveBeenCalledTimes(1);
  });

  it('should get promotions in process', async () => {
    const mockResponse = [] as ruleConfigurationPromotionResponseDto[]

    jest.spyOn(ruleConfigurationRepository, 'getRuleConfigurationWithPromotionInProcess').mockImplementation(() => Promise.resolve(mockResponse))

    const result = await ruleConfigurationService.getPromotionsInProcess()

    expect(result).toEqual(mockResponse)
    expect(ruleConfigurationRepository.getRuleConfigurationWithPromotionInProcess).toHaveBeenCalledTimes(1)
  })

  describe('Create Rule Configuration', () => {
    test('should create rule configuration if isByStore is not true', async () => {
      const mockResponse: any = new responseDto();
      mockResponse.messages = [];
      mockResponse.isValid = true;

      const mockPromotion: ruleConfigurationRequestDto = {
        days: 'monday, tuesday, wednesday',
        typeLimits: [],
        paymentMin: 10,
        isFirstOperation: true,
        isByStore: false,
        productOperationId: 1,
        promotionId: 4,
        isMcc: false,
      };
      const promiseMock = () => Promise.resolve(1);

      jest.spyOn(ruleConfigurationRepository, 'saveRuleConfiguration').mockImplementation(promiseMock);

      const result = await ruleConfigurationService.saveRuleConfiguration(mockPromotion);

      expect(result).toEqual(mockResponse);
      expect(ruleConfigurationRepository.saveRuleConfiguration).toHaveBeenCalled()
      expect(ruleConfigurationRepository.saveRuleConfiguration).toHaveBeenCalledTimes(1)
    });
    test('should validate product operation, if true creates rule configuration', async () => {
      const mockResponse: any = new responseDto();
      mockResponse.messages = [];
      mockResponse.isValid = true;

      const mockPromotion: ruleConfigurationRequestDto = {
        days: 'monday, tuesday, wednesday',
        typeLimits: [],
        paymentMin: 10,
        isFirstOperation: true,
        isByStore: true,
        productOperationId: 1,
        isMcc: true,
        promotionId: 4,
      };

      jest.spyOn(ruleConfigurationRepository, 'productOperationIsStore').mockImplementation(() => Promise.resolve(true))
      jest.spyOn(ruleConfigurationRepository, 'saveRuleConfiguration').mockImplementation(() => Promise.resolve(1));

      const result = await ruleConfigurationService.saveRuleConfiguration(mockPromotion);

      expect(result).toEqual(mockResponse);
      expect(ruleConfigurationRepository.productOperationIsStore).toHaveBeenCalledTimes(1)
      expect(ruleConfigurationRepository.saveRuleConfiguration).toHaveBeenCalledTimes(1)
    });

    test('should validate product operation, if false return error message', async () => {
      const mockResponse: any = new responseDto();
      mockResponse.messages = [
        {
          key: '',
          message: validationMessages.ruleConfiguration.validProductOperationByStore,
          messageType: applicationMessageTypeDto.Error,
        },
      ];
      mockResponse.isValid = false;

      const mockPromotion: ruleConfigurationRequestDto = {
        days: 'monday, tuesday, wednesday',
        typeLimits: [],
        paymentMin: 10,
        isFirstOperation: true,
        isByStore: true,
        productOperationId: 1,
        isMcc: true,
        promotionId: 4,
      };
      jest.spyOn(ruleConfigurationRepository, 'productOperationIsStore').mockImplementation(() => Promise.resolve(false))

      const result = await ruleConfigurationService.saveRuleConfiguration(mockPromotion);

      expect(result).toEqual(mockResponse);
      expect(ruleConfigurationRepository.productOperationIsStore).toHaveBeenCalledTimes(1)
    });
  });

  describe('Update Rule Configuration', () => {
    test('should return error message if promotion is valid', async () => {
      const mockResponse: any = new responseDto();
      mockResponse.messages = [
        {
          key: '',
          message: validationMessages.ruleConfiguration.validateDates,
          messageType: applicationMessageTypeDto.Error,
        },
      ];
      mockResponse.isValid = false;

      const mockPromotion: ruleConfigurationUpdRequestDto = {
        days: 'monday, tuesday, wednesday',
        typeLimits: [],
        paymentMin: 10,
        isFirstOperation: true,
        isByStore: true,
        productOperationId: 1,
        promotionId: 4,
        isMcc: true,
        storeIds: '1, 2, 3, 4, 5, 6',
      };

      jest.spyOn(promotionRepository, 'isValidPromotion').mockImplementation(() => Promise.resolve(true));

      const result = await ruleConfigurationService.updateRuleConfiguration(62, mockPromotion);

      expect(result).toEqual(mockResponse);
      expect(promotionRepository.isValidPromotion).toHaveBeenCalledTimes(1)
    });

    test('should validate promotion is not valid and current rule configuration does not exist', async () => {
      const mockResponse: any = new responseDto();
      mockResponse.messages = [
        {
          key: '',
          message: validationMessages.ruleConfiguration.noRuleConfiguration,
          messageType: applicationMessageTypeDto.Error,
        },
      ];
      mockResponse.isValid = false;

      const mockPromotion: ruleConfigurationUpdRequestDto = {
        days: 'monday, tuesday, wednesday',
        typeLimits: [],
        paymentMin: 10,
        isFirstOperation: true,
        isByStore: true,
        productOperationId: 1,
        promotionId: 4,
        isMcc: true,
        storeIds: '1, 2, 3, 4, 5, 6',
      };

      jest.spyOn(promotionRepository, 'isValidPromotion').mockImplementation(() => Promise.resolve(false));
      jest.spyOn(ruleConfigurationRepository, 'getRuleConfigurationById').mockImplementation(() => Promise.resolve(undefined));

      const result = await ruleConfigurationService.updateRuleConfiguration(62, mockPromotion);

      expect(result).toEqual(mockResponse);
      expect(promotionRepository.isValidPromotion).toHaveBeenCalledTimes(1)
      expect(ruleConfigurationRepository.getRuleConfigurationById).toHaveBeenCalledTimes(1)
    });


  });
});
