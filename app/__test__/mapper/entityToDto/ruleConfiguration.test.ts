import { channelPromotion, configurationStore, historyEvent, ruleConfiguration, store, typePromotion } from '../../../src/infraestructure/entities';
import { settingCodeResponseDto } from '../../../src/dtos/settingCode/settingCodeResponseDto';
import { ruleConfigurationResponseDto } from '../../../src/dtos/ruleConfiguration';
import { ruleConfigurationEntityToDto, ruleConfigurationPromotionEntityToDto } from '../../../src/mapper/entityToDTO/ruleConfiguration';
import { productOperationResponseDto } from '../../../src/dtos/productOperation';
import { ruleConfigurationPromotionResponseDto } from '../../../src/dtos/ruleConfiguration/ruleConfigurationResponseDto';
import { typeLimitResponseDto } from '../../../src/dtos/typeLimit';
import { userConditionResponseDto } from '../../../src/dtos/userCondition';
import { operationTypeResponseDto } from '../../../src/dtos/operationType';
import { promotionResponseDto } from '../../../src/dtos/promotion';

describe('Entity to dto Mapper', () => {
    describe('Rule configuration entity to dto', () => {
        let entity: ruleConfiguration
        
        beforeEach(() => {
            entity = {
                rule_configuration_id: 1,
                days: 'Lunes',
                payment_min: 20,
                is_first_operation: true,
                is_by_store: true,
                promotion_id: 1,
                configuration_store: [] as configurationStore[],
                user_condition: {
                    row_status: true,
                    user_condition_id: 1,
                    code: 'User 01',
                    name: 'Rule 01',
                    ruleConfiguration: [] as ruleConfiguration[]
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
                    ruleConfiguration: [] as ruleConfiguration[]
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
                setting_code_id: 0,
                user_condition_id: 0,
                row_status: true
            } as ruleConfiguration;
        })

        it('should convert an entity to dto successfully', () => {
            const expected = {
                "days": "Lunes",
                "configTypeLimits": [],
                "isByStore": true,
                "isFirstOperation": true,
                numberMids: "",
                "operationType": {
                    "code": "",
                    "name": "",
                    "operationTypeId": undefined
                },
                "paymentMin": 20, 
                productOperation: {
                    "code": "Product 01",
                    "name": "Rule 01",
                    "operationTypeId": 1,
                    "productOperationId": 0,
                } as productOperationResponseDto,
                "promotionId": 1,
                "ruleConfigurationId": 1,
                "settingCode": {
                    "code": "",
                    "name": "",
                    "settingCodeId": 0
                },
                storeIds: [],
                "userCondition": {
                    "code": "User 01", 
                    "name": "Rule 01", 
                    "userConditionId": 0
                }
            } as unknown as ruleConfigurationResponseDto

            const response: any = ruleConfigurationEntityToDto(entity)

            expect(response).toEqual(expected)
            expect(response.storeIds).toHaveLength(0)
            expect(response.numberMids).toBe('')
        })

        it('should convert an entity to dto with storeIds convertion successfully', () => {
            entity.configuration_store = [{
                    configuration_store_id: 1,
                    store_id: 24,
                    store: {
                        store_id: 24,
                        name: 'name',
                        number: '11',
                    } as store,
                    row_status: true,
                },
                {
                    configuration_store_id: 2,
                    row_status: false,
                    store: {
                        store_id: 22,
                        name: 'name',
                        number: '11',
                    } as store,
                    store_id: 22,
            }] as configurationStore[]
            const expected = {
                "days": "Lunes",
                "configTypeLimits": [],
                "isByStore": true,
                "isFirstOperation": true,
                numberMids: "",
                "operationType": {
                    "code": "",
                    "name": "",
                    "operationTypeId": undefined
                },
                "paymentMin": 20, 
                productOperation: {
                    "code": "Product 01",
                    "name": "Rule 01",
                    "operationTypeId": 1,
                    "productOperationId": 0,
                } as productOperationResponseDto,
                "promotionId": 1,
                "ruleConfigurationId": 1,
                "settingCode": {
                    "code": "",
                    "name": "",
                    "settingCodeId": 0
                },
                storeIds: [{
                    storeId: 24,
                    name: 'name',
                    number: '11',
                }], 
                "userCondition": {
                    "code": "User 01", 
                    "name": "Rule 01", 
                    "userConditionId": 0
                }
            } as unknown as ruleConfigurationResponseDto

            const response: any = ruleConfigurationEntityToDto(entity)

            expect(response).toEqual(expected)
            expect(response.storeIds).toHaveLength(1)
            expect(response.numberMids).toBe('')
        })

        it('should convert an entity to dto with numberMids convertion successfully', () => {
            entity.configuration_store = [{
                    configuration_store_id: 1,
                    number_mid: '1010000,1010020',
                    row_status: true,
                },
                {
                    configuration_store_id: 2,
                    row_status: false,
                    store: {
                        store_id: 22,
                        name: 'name',
                        number: '11',
                    } as store,
                    store_id: 22,
            }] as configurationStore[]
            const expected = {
                "days": "Lunes",
                "configTypeLimits": [],
                "isByStore": true,
                "isFirstOperation": true,
                numberMids: '1010000,1010020',
                "operationType": {
                    "code": "",
                    "name": "",
                    "operationTypeId": undefined
                },
                "paymentMin": 20, 
                productOperation: {
                    "code": "Product 01",
                    "name": "Rule 01",
                    "operationTypeId": 1,
                    "productOperationId": 0,
                } as productOperationResponseDto,
                "promotionId": 1,
                "ruleConfigurationId": 1,
                "settingCode": {
                    "code": "",
                    "name": "",
                    "settingCodeId": 0
                },
                storeIds: [],
                "userCondition": {
                    "code": "User 01", 
                    "name": "Rule 01", 
                    "userConditionId": 0
                }
            } as unknown as ruleConfigurationResponseDto

            const response: any = ruleConfigurationEntityToDto(entity)

            expect(response).toEqual(expected)
            expect(response.storeIds).toHaveLength(0)
            expect(response.numberMids).toBe('1010000,1010020')
        })
    })

    describe('Rule configuration entity to promotion rule dto', () => {
        it('should convert an entity to promotion rule config dto successfully', () => {
            const rule_configuration = [] as ruleConfiguration[];
            const channel_promotion = {} as channelPromotion[];
            const type_promotion = {} as typePromotion;
            const history_event= {} as historyEvent[];
            const entity: ruleConfiguration = {
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
            } as unknown as ruleConfiguration;
            
            const expectedPromotion = {
                arrDays: ['Lunes'],
                days: 'Lunes',
                configTypeLimits: [],
                paymentMin: 20,
                isFirstOperation: true,
                isByStore: true,
                configurationStores: [],
                userCondition: { userConditionId: 0, code: 'User 01', name: 'Rule 01' } as userConditionResponseDto,
                productOperation: {
                    productOperationId: 0,
                    operationTypeId: 1,
                    code: 'Product 01',
                    name: 'Rule 01',
                } as productOperationResponseDto,
                operationType: { code: '', name: '', operationTypeId: 0 } as operationTypeResponseDto,
                promotionId: 1,
                ruleConfigurationId: 1,
                promotion: {
                    promotionId: 0,
                    promotionValue: 0,
                    name: 'string',
                    description: 'string',
                    equivalencyCode: 'string',
                    typePromotion: { code: '', name: '', symbol: '', typePromotionId: 0 }
                } as promotionResponseDto,
                settingCode: { settingCodeId: 0, code: '', name: '' } as settingCodeResponseDto,
            } as unknown as ruleConfigurationPromotionResponseDto

            const response = ruleConfigurationPromotionEntityToDto(entity)

            expect(response).toEqual(expectedPromotion)
        })

        it('should convert an entity to promotion rule config dto with configuration stores convertion successfully', () => {
            const rule_configuration = [] as ruleConfiguration[];
            const channel_promotion = {} as channelPromotion[];
            const type_promotion = {} as typePromotion;
            const history_event= {} as historyEvent[];
            const entity: ruleConfiguration = {
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
            configuration_store: [{
                row_status: false,
            },{
                row_status: true,
                number_mid: '1231231,1231231',
                store_id: 213,
                rule_configuration_id: 1,
            }] as configurationStore[],
            row_status: true
            } as unknown as ruleConfiguration;
            
            const expectedPromotion = {
                arrDays: ['Lunes'],
                days: 'Lunes',
                configTypeLimits: [],
                paymentMin: 20,
                isFirstOperation: true,
                isByStore: true,
                configurationStores: [{
                    rowStatus: true,
                    numberMid: '1231231,1231231',
                    //storeId: 213,
                    ruleConfigurationId: 1,
                    store: undefined,
                    configurationStoreId: undefined,
                }],
                userCondition: { userConditionId: 0, code: 'User 01', name: 'Rule 01' } as userConditionResponseDto,
                productOperation: {
                    productOperationId: 0,
                    operationTypeId: 1,
                    code: 'Product 01',
                    name: 'Rule 01',
                } as productOperationResponseDto,
                operationType: { code: '', name: '', operationTypeId: 0 } as operationTypeResponseDto,
                promotionId: 1,
                ruleConfigurationId: 1,
                promotion: {
                    promotionId: 0,
                    promotionValue: 0,
                    name: 'string',
                    description: 'string',
                    equivalencyCode: 'string',
                    typePromotion: { code: '', name: '', symbol: '', typePromotionId: 0 }
                } as promotionResponseDto,
                settingCode: { settingCodeId: 0, code: '', name: '' } as settingCodeResponseDto,
            } as unknown as ruleConfigurationPromotionResponseDto

            const response = ruleConfigurationPromotionEntityToDto(entity)

            expect(response).toEqual(expectedPromotion)
            expect(response.configurationStores).toHaveLength(1)

        })
    })
})