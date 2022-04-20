import { operationTypeResponseDto } from '../../src/dtos/operationType';
import { productOperationResponseDto } from '../../src/dtos/productOperation';
import { promotionResponseDto } from '../../src/dtos/promotion';
import { ruleConfigurationPromotionResponseDto } from '../../src/dtos/ruleConfiguration/ruleConfigurationResponseDto';
import { settingCodeResponseDto } from '../../src/dtos/settingCode/settingCodeResponseDto';
import { typeLimitResponseDto } from '../../src/dtos/typeLimit';
import { userConditionResponseDto } from '../../src/dtos/userCondition';
import { getMoneyRefundByPromotion } from './../../src/server/RulesEngine/refundValidator';


describe('Rule Engine - refundValidator', () => {

    it('should return the refund amount if the conditions are met. Onboarding.', () => {
        const expectedPromotion = {
            arrDays: ['Lunes'],
            days: 'Lunes',
            limitValue: 400,
            paymentMin: 20,
            isFirstOperation: true,
            isByStore: true,
            configurationStores: [],
            userCondition: { userConditionId: 0, code: 'C0001', name: 'Rule 01' } as userConditionResponseDto,
            productOperation: {
                productOperationId: 0,
                operationTypeId: 1,
                code: 'Product 01',
                name: 'Rule 01',
            } as productOperationResponseDto,
            operationType: { code: '', name: '', operationTypeId: 0 } as operationTypeResponseDto,
            promotionId: 1,
            typeLimit: {
                typeLimitId: 0,
                code: 'LT001',
                name: 'Moneda',
            } as typeLimitResponseDto,
            ruleConfigurationId: 1,
            promotion: {
                promotionId: 0,
                promotionValue: 10.00,
                name: 'string',
                description: 'string',
                equivalencyCode: 'string',
                typePromotion: { code: '', name: '', symbol: '', typePromotionId: 0 }
            } as promotionResponseDto,
            settingCode: { settingCodeId: 0, code: '', name: '' } as settingCodeResponseDto,
        } as unknown as ruleConfigurationPromotionResponseDto

        const result = getMoneyRefundByPromotion(255, expectedPromotion);

        expect(result).toEqual("10.00")
    });

    it('should return the refund amount if the conditions are met. Not Onboarding - Type Promotion Percentaje.', () => {
        const expectedPromotion = {
            arrDays: ['Lunes'],
            days: 'Lunes',
            configTypeLimits: [{ code: 1 }],
            paymentMin: 20,
            isFirstOperation: true,
            isByStore: true,
            configurationStores: [],
            userCondition: { userConditionId: 0, code: 'C0002', name: 'Rule 01' } as userConditionResponseDto,
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
                promotionValue: 10.00,
                name: 'string',
                description: 'string',
                equivalencyCode: 'string',
                typePromotion: { code: 'TP001', name: '', symbol: '', typePromotionId: 0 }
            } as promotionResponseDto,
            settingCode: { settingCodeId: 0, code: '', name: '' } as settingCodeResponseDto,
        } as unknown as ruleConfigurationPromotionResponseDto

        const result = getMoneyRefundByPromotion(4000, expectedPromotion);

        expect(result).toEqual("400.00")
    });

    it('should return the refund amount if the conditions are met. Not Onboarding - Type Promotion Fixed Amount .', () => {
        const expectedPromotion = {
            arrDays: ['Lunes'],
            days: 'Lunes',
            limitValue: 30,
            paymentMin: 20,
            isFirstOperation: true,
            isByStore: true,
            configurationStores: [],
            userCondition: { userConditionId: 0, code: 'C0002', name: 'Rule 01' } as userConditionResponseDto,
            productOperation: {
                productOperationId: 0,
                operationTypeId: 1,
                code: 'Product 01',
                name: 'Rule 01',
            } as productOperationResponseDto,
            operationType: { code: '', name: '', operationTypeId: 0 } as operationTypeResponseDto,
            promotionId: 1,
            typeLimit: {
                typeLimitId: 0,
                code: 'LT001',
                name: 'Moneda',
            } as typeLimitResponseDto,
            ruleConfigurationId: 1,
            promotion: {
                promotionId: 0,
                promotionValue: 80.00,
                name: 'string',
                description: 'string',
                equivalencyCode: 'string',
                typePromotion: { code: 'TP002', name: '', symbol: '', typePromotionId: 0 }
            } as promotionResponseDto,
            settingCode: { settingCodeId: 0, code: '', name: '' } as settingCodeResponseDto,
        } as unknown as ruleConfigurationPromotionResponseDto



        const result = getMoneyRefundByPromotion(45000, expectedPromotion);

        expect(result).toEqual("80.00")
    });
})