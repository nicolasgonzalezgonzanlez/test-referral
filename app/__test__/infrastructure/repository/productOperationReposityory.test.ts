import { productOperationRepository } from '../../../src/infraestructure/repository/productOperationRepository';
import { productOperationResponseDto } from '../../../src/dtos/productOperation';
import { productOperation } from '../../../src/infraestructure/entities';

describe('Product Operation repository', () => {
  let repo: productOperationRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repo = new productOperationRepository();
  });
  it('should get all product operations', async () => {
    const mockDbResponse: any = [
      {
        product_operation_id: 1,
        name: 'Recarga de sube',
        code: 'OP001',
      },
      {
        product_operation_id: 2,
        name: 'Recarga de tomate',
        code: 'OP002',
      },
    ] as productOperation[];
    const mockResponse: any = [
      {
        productOperationId: 1,
        name: 'Recarga de sube',
        code: 'OP001',
      },
      {
        productOperationId: 2,
        name: 'Recarga de tomate',
        code: 'OP002',
      },
    ] as productOperationResponseDto[];

    jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));
    const result = await repo.getProductOperationsByType(1);

    expect(result).toEqual(mockResponse);
    expect(repo.find).toHaveBeenCalledTimes(1)
  });
});
