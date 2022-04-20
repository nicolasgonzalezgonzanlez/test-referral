import { productOperationService } from '../../src/services';
import { productOperationResponseDto } from '../../src/dtos/productOperation';
import * as ProductOperationRepository from '../../src/infraestructure/repository/productOperationRepository';


describe('Product Operation Service', () => {
  let repository: ProductOperationRepository.productOperationRepository

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    repository = new ProductOperationRepository.productOperationRepository()
    jest.spyOn(ProductOperationRepository, 'getProductOperationRepository').mockImplementation(() => repository)
  });

  it('should get all operation type', async () => {
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

    jest.spyOn(repository, 'getProductOperationsByType').mockImplementation(() => Promise.resolve(mockResponse));
    const result = await productOperationService.getProductsOperationByType(1);

    expect(result).toEqual(mockResponse);
    expect(repository.getProductOperationsByType).toHaveBeenNthCalledWith(1, 1)
  });
});
