import * as settingCodeRepo from '../../src/infraestructure/repository/settingCodeRepository'
import { applicationMessageTypeDto } from '../../src/dtos/common/applicationMessageTypeDto';
import { settingCodeResponseDto } from '../../src/dtos/settingCode/settingCodeResponseDto';
import { settingCode } from '../../src/infraestructure/entities/settingCode';
import { settingCodeService } from '../../src/services';
import { settingCodeRequestDto } from '../../src/dtos/settingCode/settingCodeRequestDto';
import { mockAuditInstance, mockAuditUpdInstance } from '../mocks/auditInstance';

describe('Setting code Service', () => {
    let settingCodeRepository: settingCodeRepo.settingCodeRepository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        settingCodeRepository = new settingCodeRepo.settingCodeRepository();
        jest.spyOn(settingCodeRepo, 'getSettingCodeRepository').mockImplementation(() => settingCodeRepository);
    });

    describe('Get all setting codes', () => {
        it('should get all setting codes', async () => {
            const mockResult: settingCode[] = [
              {
                  setting_code_id: 2,
                  code: '02020202',
                  name: 'nombreMock'
              },
              {
                  setting_code_id: 1,
                  code: '02020202',
                  name: 'nombreMock'
              }
            ]
            const expectedResult: settingCodeResponseDto[] = [
              {
                  settingCodeId: 2,
                  code: '02020202',
                  name: 'nombreMock'
              },
              {
                  settingCodeId: 1,
                  code: '02020202',
                  name: 'nombreMock'
              }
            ]

            jest.spyOn(settingCodeRepository, 'getSettingCodes').mockImplementation(() => Promise.resolve(mockResult))

            const result = await settingCodeService.getAllSettingCodes()

            expect(result).toEqual(expectedResult)
        })
    })

    describe('Create setting code', () => {
        it('should send an entity and create a setting code successfully', async () => {
            jest.spyOn(settingCodeRepository, 'createSettingCode').mockImplementation(() => Promise.resolve())
            const input: settingCodeRequestDto = { code: '02020202', name: 'nombreMock' }
            const parsedInput: settingCode = { code: '02020202', name: 'nombreMock', ...mockAuditInstance() } as settingCode
            const response = await settingCodeService.createSettingCode(input)

            expect(response.isValid).toBe(true)
            expect(settingCodeRepository.createSettingCode).toHaveBeenCalledWith(parsedInput)
        })
    })

    describe('Update setting code', () => {
        it('should update a setting code successfully', async () => {
            jest.spyOn(settingCodeRepository, 'updateSettingCode').mockImplementation(() => Promise.resolve())
            const input: settingCodeRequestDto = { code: '02020202', name: 'updateMock' }
            const parsedInput: settingCode = { code: '02020202', name: 'updateMock', ...mockAuditUpdInstance() } as settingCode
            const response = await settingCodeService.updateSettingCode(2, input)

            expect(response.isValid).toBe(true)
            expect(settingCodeRepository.updateSettingCode).toHaveBeenCalledWith(2, parsedInput)
        })
    })

    describe('Delete setting code', () => {
        it('should delete a setting code if there is not a related rule', async () => {
            jest.spyOn(settingCodeRepository, 'hasRelatedRules').mockImplementation(() => Promise.resolve(false))
            jest.spyOn(settingCodeRepository, 'deleteSettingCode').mockImplementation(() => Promise.resolve())
            
            const response = await settingCodeService.deleteSettingCode(2)

            expect(response.isValid).toBe(true)
            expect(response.messages).toHaveLength(0)
            expect(settingCodeRepository.hasRelatedRules).toHaveBeenCalledWith(2)
            expect(settingCodeRepository.deleteSettingCode).toHaveBeenCalledWith(2)
        })
        it('should not delete a setting code if there is a related rule', async () => {
            jest.spyOn(settingCodeRepository, 'hasRelatedRules').mockImplementation(() => Promise.resolve(true))
            jest.spyOn(settingCodeRepository, 'deleteSettingCode').mockImplementation(() => Promise.resolve())
            
            const response = await settingCodeService.deleteSettingCode(2)

            expect(response.isValid).toBe(false)
            expect(response.messages).toHaveLength(1)
            expect(response.messages[0].messageType).toBe(applicationMessageTypeDto.Error)
            expect(settingCodeRepository.hasRelatedRules).toHaveBeenCalledWith(2)
            expect(settingCodeRepository.deleteSettingCode).not.toHaveBeenCalled()
        })
    })
})