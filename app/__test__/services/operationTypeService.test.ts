import { operationTypeService } from '../../src/services';
import { operationTypeResponseDto } from '../../src/dtos/operationType';
import * as OperationTypeRepository from '../../src/infraestructure/repository/operationTypeRepository';

describe('Operation Type service', () => {
    let repository: OperationTypeRepository.repository
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new OperationTypeRepository.repository()
        jest.spyOn(OperationTypeRepository, 'getOperationTypeRepository').mockImplementation(() => repository)
    });

    it('should get all operation type', async () => {
        const mockResponse: any = [
            {
                "operationTypeId": 1,
                "name": "Recarga de sube",
                "code": "OP001"
            },
            {
                "operationTypeId": 2,
                "name": "Recarga de Celular",
                "code": "OP002"
            }
        ] as operationTypeResponseDto[];

        jest.spyOn(repository, 'getAllOperationType').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await operationTypeService.getAllOperationTypeService();

        expect(result).toEqual(mockResponse);
        expect(repository.getAllOperationType).toHaveBeenNthCalledWith(1)
    });

});
