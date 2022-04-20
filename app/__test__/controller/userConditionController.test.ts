import { userConditionRequestDto, userConditionResponseDto } from '../../src/dtos/userCondition';
import { responseDto } from '../../src/dtos/common';
import { allUserConditionResponse, userConditionResponse } from '../../src/dtos/userCondition';
import userConditionController from '../../src/server/controller/userConditionController';

describe('Promotion controller', () => {

    let controller: userConditionController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new userConditionController();
    });


    it('GetAll userCondition Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        name: "test",
                        code: "C0001"
                    }
                ]
            } as unknown as allUserConditionResponse;

        jest.spyOn(controller, 'getAllUserCondition').mockImplementation(() => mockResponse);
        const result = await controller.getAllUserCondition();

        expect(result).toEqual(mockResponse);
    });


    it('Create userCondition Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockUserCondition: userConditionRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(controller, 'postcreateUserCondition').mockImplementation(() => mockResponse);
        const result = await controller.postcreateUserCondition(mockUserCondition);

        expect(result).toEqual(mockResponse);
    });

    it('Update UserCondition Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;

        const mockUserCondition: userConditionRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(controller, 'editUserCondition').mockImplementation(() => mockResponse);
        const result = await controller.editUserCondition(1, mockUserCondition);

        expect(result).toEqual(mockResponse);
    });

    it('Delete UserCondition Controller', async () => {

        const mockResponse: any = new responseDto();
        mockResponse.messages = [];
        mockResponse.isValid = true;


        jest.spyOn(controller, 'deleteUserCondition').mockImplementation(() => mockResponse);
        const result = await controller.deleteUserCondition(1);

        expect(result).toEqual(mockResponse);
    });

});
