import { settingCodeRequestDto } from './../../src/dtos/settingCode/settingCodeRequestDto';
import { settingCodeListReponse, settingCodeResponseDto } from './../../src/dtos/settingCode/settingCodeResponseDto';
import SettingCodeController from '../../src/server/controller/settingCodeController';
import { applicationMessageDto, responseDto } from '../../src/dtos/common';
import { settingCodeService } from '../../src/services';

describe('Setting code Controller', () => {
    let controller: SettingCodeController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new SettingCodeController();
    });

    describe('Get all setting codes', () => {
        it('should return a response with data', async () => {
            const mockServiceResponse: settingCodeResponseDto[] = [
                    {
                        settingCodeId: 2,
                        code: '02020202',
                        name: 'nombreMock'
                    }
                ]
            const expectedResponse: settingCodeListReponse = {
                data: [
                    {
                        settingCodeId: 2,
                        code: '02020202',
                        name: 'nombreMock'
                    }
                ],
                isValid: true,
                messages: [] as applicationMessageDto[]
            } as settingCodeListReponse

            jest.spyOn(settingCodeService, 'getAllSettingCodes').mockImplementation(() => Promise.resolve(mockServiceResponse))

            const response = await controller.getAllSettingCodes()

            expect(response.data).toEqual(expectedResponse.data)
            expect(response.isValid).toEqual(expectedResponse.isValid)
            expect(settingCodeService.getAllSettingCodes).toHaveBeenCalledTimes(1)
        })
    })

    describe('Create setting code', () => {
        it('should create a setting code', async () => {
            const body: settingCodeRequestDto = {
                code: 'codigo',
                name: 'name',
            } 
            const mockResponse: responseDto = {
                isValid: true,
                messages: [] as applicationMessageDto[]
            } as responseDto

            jest.spyOn(settingCodeService, 'createSettingCode').mockImplementation(() => Promise.resolve(mockResponse))

            const response = await controller.createSettingCode(body)

            expect(response.isValid).toBe(true)
            expect(response.messages).toHaveLength(0)
            expect(settingCodeService.createSettingCode).toHaveBeenCalledWith(body)
            expect(settingCodeService.createSettingCode).toHaveBeenCalledTimes(1)
        })
    })

    describe('Update setting code', () => {
        it('should create a setting code', async () => {
            const body: settingCodeRequestDto = {
                code: 'codigo',
                name: 'name',
            } 
            const mockResponse: responseDto = {
                isValid: true,
                messages: [] as applicationMessageDto[]
            } as responseDto

            jest.spyOn(settingCodeService, 'updateSettingCode').mockImplementation(() => Promise.resolve(mockResponse))

            const response = await controller.updateSettingCode(1, body)

            expect(response.isValid).toBe(true)
            expect(response.messages).toHaveLength(0)
            expect(settingCodeService.updateSettingCode).toHaveBeenCalledWith(1, body)
            expect(settingCodeService.updateSettingCode).toHaveBeenCalledTimes(1)
        })
    })

    describe('Delete setting code', () => {
        it('should delete a setting code', async () => {
            const mockResponse: responseDto = {
                isValid: true,
                messages: [] as applicationMessageDto[]
            } as responseDto

            jest.spyOn(settingCodeService, 'deleteSettingCode').mockImplementation(() => Promise.resolve(mockResponse))

            const response = await controller.deleteSettingCode(1)

            expect(response.isValid).toBe(true)
            expect(response.messages).toHaveLength(0)
            expect(settingCodeService.deleteSettingCode).toHaveBeenCalledWith(1)
            expect(settingCodeService.deleteSettingCode).toHaveBeenCalledTimes(1)
        })
    })
})