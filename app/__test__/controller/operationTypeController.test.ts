import { operationTypeResponse } from '../../src/dtos/operationType';
import operationTypeController from '../../src/server/controller/operationTypeController';

describe('OperationType controller', () => {

    let controller: operationTypeController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new operationTypeController();
    });


    it('GetAll OperationType Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        "operationTypeId": 1,
                        "name": "Recarga de sube",
                        "code": "OP001"
                      },
                ]
            } as unknown as operationTypeResponse;

        jest.spyOn(controller, 'getAllOperationType').mockImplementation(() => mockResponse);
        const result = await controller.getAllOperationType();

        expect(result).toEqual(mockResponse);
    });

});
