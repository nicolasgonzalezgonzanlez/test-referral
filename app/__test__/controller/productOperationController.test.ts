import { productOperationResponse } from '../../src/dtos/productOperation';
import productOperationController from '../../src/server/controller/productOperationController';

describe('Product Operation controller', () => {
  let controller: productOperationController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    controller = new productOperationController();
  });

  it('GetAll Product Operation Controller', async () => {
    const mockResponse: any = {
      messages: [],
      isValid: true,
      data: [
        {
          operationTypeId: 1,
          name: 'Recarga de sube',
          code: 'OP001',
        },
        {
          operationTypeId: 2,
          name: 'Recarga de tomates',
          code: 'OP002',
        },
      ],
    } as unknown as productOperationResponse;

    jest.spyOn(controller, 'getProductOperationByType').mockImplementation(() => mockResponse);
    const result = await controller.getProductOperationByType(1);

    expect(result).toEqual(mockResponse);
  });
});
