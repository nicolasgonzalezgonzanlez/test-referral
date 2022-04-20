import { configTypeLimit } from './../../../src/infraestructure/entities/configTypeLimit';
import { ruleConfigurationRepository } from '../../../src/infraestructure/repository/ruleConfigurationRepository';
import { ruleConfiguration } from '../../../src/infraestructure/entities/ruleConfiguration';
import { ruleConfigurationResponseDto } from '../../../src/dtos/ruleConfiguration';
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder'
import { channelPromotion, configurationStore, historyEvent, promotion, typePromotion } from '../../../src/infraestructure/entities';
import { ruleConfigurationPromotionResponseDto } from '../../../src/dtos/ruleConfiguration/ruleConfigurationResponseDto';

describe('Rule Configuration service', () => {
  let repository: ruleConfigurationRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repository = new ruleConfigurationRepository();
  });

  it('should return a object of ruleConfiguration entities', async () => {
    
    const mockResult: ruleConfiguration  =  
    {
      days: "string",
      limitValue: 0,
      paymentMin: 0,
      isFirstOperation: true,
      isByStore: true,
      userCondition: {
        code: "string",
        name: "string",
        userConditionId: 0
      },
      productOperation: {
        productOperationId: 0,
        code: "string",
        name: "string",
        operationTypeId: 0,
        operationType: {
          operationTypeId: 0,
          name: "string",
          code: "string"
        }
      },
      promotionId: 0,
      typeLimit: {
        code: "string",
        name: "string",
        typeLimitId: 0
      },
      ruleConfigurationId: 0
    } as unknown as ruleConfiguration;

    const createQueryBuilder = mockCreateQueryBuilder(mockResult);
    jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    const result = await repository.getRuleConfigurationById(0)

    expect(result).toEqual(mockResult)
  });

  it('should get rule configuration by promotion id', async () => {
    const mockResponse: any = {
        ruleConfigurationId: 1,
      configTypeLimits: [],
      days: 'Lunes',
        paymentMin: 20,
        isFirstOperation: true,
        isByStore: true,
        promotionId: 1,
        storeIds: [],
        numberMids: '',
      userCondition: { userConditionId: 0, code: 'User 01', name: 'Rule 01' },
        productOperation: {
          productOperationId: 0,
          operationTypeId: 1,
          code: 'Product 01',
          name: 'Rule 01'
        },
        settingCode: { settingCodeId: 0, code: '', name: '' },
        operationType: { operationTypeId: undefined, name: '', code: '' },
    } as unknown  as ruleConfigurationResponseDto;

    const rule_configuration = [] as ruleConfiguration[];
    const channel_promotion = {} as channelPromotion[];
    const type_promotion = {} as typePromotion;
    const history_event= {} as historyEvent[];
    const mockRuleConfig: ruleConfiguration  =  
    {
      rule_configuration_id: 1,
      days: 'Lunes',
      limit_value: 30,
      payment_min: 20,
      is_first_operation: true,
      is_by_store: true,
      promotion_id: 1,
      user_condition: {
        row_status: true,
        user_condition_id: 1,
        code: 'User 01',
        name: 'Rule 01',
        ruleConfiguration: rule_configuration
      },
      type_limit: {
        row_status: true,
        type_limit_id: 1,
        code: 'LT001',
        name: 'Moneda',
        ruleConfiguration: rule_configuration
      },
      product_operation: {
        row_status: true,
        operation_type_id: 1,
        product_operation_id: 1,
        code: 'Product 01',
        name: 'Rule 01',
        operationType: {
          code: "",
          name: "",
          operation_type_id: 0
        },
        ruleConfiguration: rule_configuration
      },
      operation_type:{
        code: "",
        name: "",
        operation_type_id: 0,
        row_status: true
      },
      setting_code: {
        code: "",
        name: "",
        setting_code_id: 0,
        row_status: true
      },
      product_operation_id: 0,
      promotion:{
        name: "string",
        code: "string",
        description: "string",
        end_date: new Date("2022-01-24T20:36:18.575Z"),
        link_tyc: "string",
        ref_promotion: "string",
        information: "string",
        promotion_value: 0,
        equivalency_code: "string",
        start_date:  new Date("2022-01-24T20:36:18.575Z"),
        status: "string",
        high_date:  new Date("2022-01-24T20:36:18.575Z"),
        low_date:  new Date("2022-01-24T20:36:18.575Z"),
        campaign_id: 0,
        img_details_url: "string",
        img_banner_url: "string",
        promotion_id: 0,
        type_promotion_id: 0,
        row_status: true,
        channel_promotion,
        rule_configuration,
        type_promotion: { row_status: true, name: "", code: "", symbol: "", type_promotion_id: 0, promotion: [
          {
            name: "string",
            code: "string",
            description: "string",
            end_date: new Date("2022-01-24T20:36:18.575Z"),
            link_tyc: "string",
            ref_promotion: "string",
            information: "string",
            promotion_value: 0,
            equivalency_code: "string",
            start_date:  new Date("2022-01-24T20:36:18.575Z"),
            status: "string",
            high_date:  new Date("2022-01-24T20:36:18.575Z"),
            low_date:  new Date("2022-01-24T20:36:18.575Z"),
            campaign_id: 0,
            img_details_url: "string",
            img_banner_url: "string",
            promotion_id: 0,
            type_promotion_id: 0,
            channel_promotion,
            type_promotion,
            history_event,
            rule_configuration
          }
        ]},
        history_event,
      },
     setting_code_id: 0,
     type_limit_id: 0,
     user_condition_id: 0,
     row_status: true
    }as unknown as ruleConfiguration;

    jest.spyOn(repository, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockRuleConfig));
    const result = await repository.getRuleConfigurationByPromotionId(1);

    expect(result).toEqual(mockResponse);
  });

  it('should return an array of rule configuration entities', async () => {
    const rule_configuration = [] as ruleConfiguration[];
    const channel_promotion = {} as channelPromotion[];
    const type_promotion = {} as typePromotion;
    const history_event= {} as historyEvent[];
    const mockRules: ruleConfiguration[] | null =  
    [
      {
        rule_configuration_id: 1,
        days: 'Lunes',
        payment_min: 20,
        is_first_operation: true,
        is_by_store: true,
        promotion_id: 1,
        user_condition: {
          row_status: true,
          user_condition_id: 1,
          code: 'User 01',
          name: 'Rule 01',
          ruleConfiguration: rule_configuration
        },
        config_type_limit: [],
        product_operation: {
          row_status: true,
          operation_type_id: 1,
          product_operation_id: 1,
          code: 'Product 01',
          name: 'Rule 01',
          operationType: {
            code: "",
            name: "",
            operation_type_id: 0
          },
          ruleConfiguration: rule_configuration
        },
        operation_type:{
          code: "",
          name: "",
          operation_type_id: 0,
          row_status: true
        },
        setting_code: {
          code: "",
          name: "",
          setting_code_id: 0,
          row_status: true
        },
        product_operation_id: 0,
        promotion:{
          name: "string",
          code: "string",
          description: "string",
          end_date: new Date("2022-01-24T20:36:18.575Z"),
          link_tyc: "string",
          ref_promotion: "string",
          information: "string",
          promotion_value: 0,
          equivalency_code: "string",
          start_date:  new Date("2022-01-24T20:36:18.575Z"),
          status: "string",
          high_date:  new Date("2022-01-24T20:36:18.575Z"),
          low_date:  new Date("2022-01-24T20:36:18.575Z"),
          campaign_id: 0,
          img_details_url: "string",
          img_banner_url: "string",
          promotion_id: 0,
          type_promotion_id: 0,
          row_status: true,
          channel_promotion,
          rule_configuration,
          type_promotion: { row_status: true, name: "", code: "", symbol: "", type_promotion_id: 0, promotion: [
            {
              name: "string",
              code: "string",
              description: "string",
              end_date: new Date("2022-01-24T20:36:18.575Z"),
              link_tyc: "string",
              ref_promotion: "string",
              information: "string",
              promotion_value: 0,
              equivalency_code: "string",
              start_date:  new Date("2022-01-24T20:36:18.575Z"),
              status: "string",
              high_date:  new Date("2022-01-24T20:36:18.575Z"),
              low_date:  new Date("2022-01-24T20:36:18.575Z"),
              campaign_id: 0,
              img_details_url: "string",
              img_banner_url: "string",
              promotion_id: 0,
              type_promotion_id: 0,
              channel_promotion,
              type_promotion,
              history_event,
              rule_configuration
            }
          ]},
          history_event,
        },
        setting_code_id: 0,
       user_condition_id: 0,
       row_status: true
      }

    ];
    const mockPromotions: promotion[] = [
      {
        name: "string",
        code: "string",
        description: "string",
        end_date: new Date("2022-01-24T20:36:18.575Z"),
        link_tyc: "string",
        ref_promotion: "string",
        information: "string",
        promotion_value: 0,
        equivalency_code: "string",
        start_date:  new Date("2022-01-24T20:36:18.575Z"),
        status: "string",
        high_date:  new Date("2022-01-24T20:36:18.575Z"),
        low_date:  new Date("2022-01-24T20:36:18.575Z"),
        campaign_id: 0,
        img_details_url: "string",
        img_banner_url: "string",
        promotion_id: 0,
        type_promotion_id: 0,
        channel_promotion: [{ channel_id: 0, channel_promotion_id: 0, promotion_id: 0, section_id: 0, row_status: true}],
        rule_configuration: mockRules as ruleConfiguration[],
        type_promotion,
        history_event,
      }
    ]
    const expedResult = [{ "arrDays": ["Lunes"], "configTypeLimits": [], "configurationStores": [], "days": "Lunes", "isByStore": true, "isFirstOperation": true, "operationType": { "code": "", "name": "", "operationTypeId": 0 }, "paymentMin": 20, "productOperation": { "code": "Product 01", "name": "Rule 01", "operationTypeId": 1, "productOperationId": 0 }, "promotion": { "description": "string", "equivalencyCode": "string", "name": "string", "promotionId": 0, "promotionValue": 0, "typePromotion": { "code": "", "name": "", "symbol": "", "typePromotionId": 0 } }, "promotionId": 1, "ruleConfigurationId": 1, "settingCode": { "code": "", "name": "", "settingCodeId": 0 }, "userCondition": { "code": "User 01", "name": "Rule 01", "userConditionId": 0 } }] as any as ruleConfigurationPromotionResponseDto; 

    jest.spyOn(repository, 'getPromotionsInProcess').mockImplementation(() => Promise.resolve(mockPromotions));
    jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(mockRules));

    const result = await repository.getRuleConfigurationWithPromotionInProcess();
    expect(result).toEqual(expedResult);
  });

  it('should return null when no rule configurations was found', async () => {
    const rule_configuration = [] as ruleConfiguration[];
    const channel_promotion = {} as channelPromotion[];
    const type_promotion = {} as typePromotion;
    const history_event= {} as historyEvent[];
    const mockRules: ruleConfiguration[] | null =  
    [
      {
        rule_configuration_id: 1,
        days: 'Lunes',
        payment_min: 20,
        is_first_operation: true,
        is_by_store: true,
        promotion_id: 1,
        user_condition: {
          row_status: true,
          user_condition_id: 1,
          code: 'User 01',
          name: 'Rule 01',
          ruleConfiguration: rule_configuration
        },
        config_type_limit: [],
        product_operation: {
          row_status: true,
          operation_type_id: 1,
          product_operation_id: 1,
          code: 'Product 01',
          name: 'Rule 01',
          operationType: {
            code: "",
            name: "",
            operation_type_id: 0
          },
          ruleConfiguration: rule_configuration
        },
        operation_type:{
          code: "",
          name: "",
          operation_type_id: 0,
          row_status: true
        },
        setting_code: {
          code: "",
          name: "",
          setting_code_id: 0,
          row_status: true
        },
        product_operation_id: 0,
        promotion:{
          name: "string",
          code: "string",
          description: "string",
          end_date: new Date("2022-01-24T20:36:18.575Z"),
          link_tyc: "string",
          ref_promotion: "string",
          information: "string",
          promotion_value: 0,
          equivalency_code: "string",
          start_date:  new Date("2022-01-24T20:36:18.575Z"),
          status: "string",
          high_date:  new Date("2022-01-24T20:36:18.575Z"),
          low_date:  new Date("2022-01-24T20:36:18.575Z"),
          campaign_id: 0,
          img_details_url: "string",
          img_banner_url: "string",
          promotion_id: 0,
          type_promotion_id: 0,
          row_status: true,
          channel_promotion,
          rule_configuration,
          type_promotion: { row_status: true, name: "", code: "", symbol: "", type_promotion_id: 0, promotion: [
            {
              name: "string",
              code: "string",
              description: "string",
              end_date: new Date("2022-01-24T20:36:18.575Z"),
              link_tyc: "string",
              ref_promotion: "string",
              information: "string",
              promotion_value: 0,
              equivalency_code: "string",
              start_date:  new Date("2022-01-24T20:36:18.575Z"),
              status: "string",
              high_date:  new Date("2022-01-24T20:36:18.575Z"),
              low_date:  new Date("2022-01-24T20:36:18.575Z"),
              campaign_id: 0,
              img_details_url: "string",
              img_banner_url: "string",
              promotion_id: 0,
              type_promotion_id: 0,
              channel_promotion,
              type_promotion,
              history_event,
              rule_configuration
            }
          ]},
          history_event,
        },
        setting_code_id: 0,
       user_condition_id: 0,
       row_status: true
      }

    ];
    const mockPromotions: promotion[] = [];

    jest.spyOn(repository, 'getPromotionsInProcess').mockImplementation(() => Promise.resolve(mockPromotions));
    jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(mockRules));

    const result = await repository.getRuleConfigurationWithPromotionInProcess();
    expect(result).toEqual(null);
  });

  it('should return null when promotions in process dont have rules', async () => {
    const type_promotion = {} as typePromotion;
    const history_event= {} as historyEvent[];
    const mockPromotions: promotion[] = [
      {
        name: "string",
        code: "string",
        description: "string",
        end_date: new Date("2022-01-24T20:36:18.575Z"),
        link_tyc: "string",
        ref_promotion: "string",
        information: "string",
        promotion_value: 0,
        equivalency_code: "string",
        start_date:  new Date("2022-01-24T20:36:18.575Z"),
        status: "string",
        high_date:  new Date("2022-01-24T20:36:18.575Z"),
        low_date:  new Date("2022-01-24T20:36:18.575Z"),
        campaign_id: 0,
        img_details_url: "string",
        img_banner_url: "string",
        promotion_id: 0,
        type_promotion_id: 0,
        channel_promotion: [{ channel_id: 0, channel_promotion_id: 0, promotion_id: 0, section_id: 0, row_status: true}],
        rule_configuration: [] as ruleConfiguration[],
        type_promotion,
        history_event,
      }
    ]

    jest.spyOn(repository, 'getPromotionsInProcess').mockImplementation(() => Promise.resolve(mockPromotions));

    const result = await repository.getRuleConfigurationWithPromotionInProcess();
    expect(result).toEqual(null);
  });

  it('should create rule configuration', async () => {
    const mockPromotion: ruleConfiguration = {
      rule_configuration_id: 1,
      days: 'string',
      payment_min: 1,
      is_first_operation: true,
      is_by_store: true,
      user_condition_id: 1,
      promotion_id: 1,
      product_operation_id: 1,
      operation_type_id: 1,
      setting_code_id: 1,
      config_type_limit: [] as configTypeLimit[],
    };

    const ruleConfiguration: ruleConfiguration = {
      rule_configuration_id: 1,
      days: 'string',
      payment_min: 1,
      is_first_operation: true,
      is_by_store: true,
      user_condition_id: 1,
      promotion_id: 1,
      product_operation_id: 1,
      operation_type_id: 1,
      setting_code_id: 1,
      config_type_limit: [] as configTypeLimit[],
    };
    const rule: any = {
      rule_configuration_id: 1,
      days: 'string',
      payment_min: 1,
      limit_value: 1,
      is_first_operation: true,
      is_by_store: true,
      user_condition_id: 1,
      promotion_id: 1,
      type_limit_id: 1,
      product_operation_id: 1,
      setting_code_id: 1,
      operation_type_id: 1,
      row_status: true,
      created_by: 'hola',
      updated_by: null,
      create_date: new Date(),
      updated_date: null,
    };
    const mock = () => Promise.resolve(ruleConfiguration);

    jest.spyOn(repository, 'create').mockImplementation(() => rule);

    jest.spyOn(repository, 'save').mockImplementation(mock);

    const result = await repository.saveRuleConfiguration(mockPromotion);

    expect(result).toBe(1);
  });

  it('should validate rule configuration by type limit', async () => {

    const rule: ruleConfiguration = {
      rule_configuration_id: 1,
      days: 'string',
      payment_min: 1,
      is_first_operation: true,
      is_by_store: true,
      user_condition_id: 1,
      promotion_id: 1,
      product_operation_id: 1,
      operation_type_id: 1,
      setting_code_id: 1,
      config_type_limit:[]
    };

    jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(rule));

    const result = await repository.validRuleConfigurationByTypeLimitId(0);
    expect(result).toEqual(false);
  });

  it('should validate rule configuration by user condition', async () => {

    const rule: ruleConfiguration = {
      rule_configuration_id: 1,
      days: 'string',
      payment_min: 1,
      is_first_operation: true,
      is_by_store: true,
      user_condition_id: 1,
      promotion_id: 1,
      product_operation_id: 1,
      operation_type_id: 1,
      setting_code_id: 1,
      config_type_limit: [] as configTypeLimit[],
    };

    jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(rule));

    const result = await repository.validRuleConfigurationByUserConditionId(0);
    expect(result).toEqual(false);
  });
});
