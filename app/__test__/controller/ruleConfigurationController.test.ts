import { responseDto } from '../../src/dtos/common';
import RuleConfigurationController from '../../src/server/controller/ruleConfigurationController';
import { ruleConfigurationRequestDto, ruleConfigurationResponse, ruleConfigurationResponseDto, ruleConfigurationUpdRequestDto } from '../../src/dtos/ruleConfiguration';

describe('Rule Configuration controller', () => {
  let controller: RuleConfigurationController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new RuleConfigurationController();
  });

  it('GetById Rule Configuration Controller', async () => {
    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: {
        ruleConfigurationId: 1,
        configTypeLimits: [],
        days: 'Lunes',
        paymentMin: 20,
        isFirstOperation: true,
        isByStore: true,
        promotionId: 1,
        userCondition: {
          userConditionId: null,
        },
        productOperation: {
          productOperatioId: null,
        },
      },
    } as unknown as ruleConfigurationResponse;

    jest.spyOn(controller, 'getRuleConfiguratioonByPromotionId').mockImplementation(() => mockResponse);
    const result = await controller.getRuleConfiguratioonByPromotionId(1);

    expect(result).toEqual(mockResponse);
  });

  it('Create Rule Configuration Controller', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockPromotion: ruleConfigurationRequestDto = {
      days: 'lunes, martes, miercoles',
      typeLimits: [{
        typeLimitId: 1,
        limitValue: 1,
        frequency: "0 0 * * *"
      }],
      paymentMin: 10,
      isFirstOperation: true,
      isByStore: true,
      productOperationId: 1,
      promotionId: 4,
      isMcc: false,
      numberMids: 'cooo1023, cooo345, cooo679',
    };

    jest.spyOn(controller, 'postCreateRuleConfiguration').mockImplementation(() => mockResponse);
    const result = await controller.postCreateRuleConfiguration(mockPromotion);

    expect(result).toEqual(mockResponse);
  });

  it('Update Rule Configuration Service', async () => {
    const mockResponse: any = new responseDto();
    mockResponse.messages = [];
    mockResponse.isValid = true;

    const mockPromotion: any = {
      days: 'lunes, martes, miercoles',
      configTypeLimits: [],
      paymentMin: 10,
      isFirstOperation: true,
      isByStore: true,
      productOperationId: 1,
      promotionId: 4,
      isMcc: false,
      numberMids: 'cooo1023, cooo345, cooo679',
    };

    jest.spyOn(controller, 'putUpdateRuleConfiguration').mockImplementation(() => mockResponse);
    const result = await controller.putUpdateRuleConfiguration(1, mockPromotion);

    expect(result).toEqual(mockResponse);
  });
});
