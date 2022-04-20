import { typeLimitRequestDto } from '../../src/dtos/typeLimit';
import { responseDto } from '../../src/dtos/common';
import { allTypeLimitResponse } from '../../src/dtos/typeLimit';
import typeLimitController from '../../src/server/controller/typeLimitController';

describe('TypeLimit controller', () => {

    let controller: typeLimitController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new typeLimitController();
    });


    it('GetAll typeLimit Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        name: "test",
                        code: "TL001"
                    }
                ]
            } as unknown as allTypeLimitResponse;

        jest.spyOn(controller, 'getAllTypeLimit').mockImplementation(() => mockResponse);
        const result = await controller.getAllTypeLimit();

        expect(result).toEqual(mockResponse);
    });


    it('Create typeLimit Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockTypeLimit: typeLimitRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(controller, 'postcreateTypeLimit').mockImplementation(() => mockResponse);
        const result = await controller.postcreateTypeLimit(mockTypeLimit);

        expect(result).toEqual(mockResponse);
    });

    it('Update Typelimit Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockTypeLimit: typeLimitRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(controller, 'editTypeLimit').mockImplementation(() => mockResponse);
        const result = await controller.editTypeLimit(1, mockTypeLimit);

        expect(result).toEqual(mockResponse);
    });

    it('Delete typeLimit Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;


        jest.spyOn(controller, 'deleteTypeLimit').mockImplementation(() => mockResponse);
        const result = await controller.deleteTypeLimit(1);

        expect(result).toEqual(mockResponse);
    });

});
