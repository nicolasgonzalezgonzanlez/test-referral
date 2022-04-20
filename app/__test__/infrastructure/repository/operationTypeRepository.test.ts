import { repository } from '../../../src/infraestructure/repository/operationTypeRepository';
import { operationTypeResponseDto } from '../../../src/dtos/operationType';
import { responseDto } from '../../../src/dtos/common';
import { operationType } from '../../../src/infraestructure/entities';


describe('Operation Type repository', () => {
    let repo: repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });
    it('should get all operation types', async () => {
        const mockDbResponse = [
            {
                operation_type_id: 1,
                "name": "Recarga de sube",
                "code": "OP001"
            },
            {
                operation_type_id: 2,
                "name": "Recarga de Celular",
                "code": "OP002"
            }
        ] as operationType[];
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

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));
        const result = await repo.getAllOperationType();

        expect(result).toEqual(mockResponse);
    });

});
