import { storeService } from '../../src/services';
import { storeResponseDto } from '../../src/dtos/store';
import * as storeRepository from '../../src/infraestructure/repository/storeRepository';

describe('Store Service', () => {
    let repository: storeRepository.storeRepository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new storeRepository.storeRepository()
        jest.spyOn(storeRepository, 'getStoreRepository').mockImplementation(() => repository)
    });

    it('should get all stores', async () => {
        const mockResponse = [{
            name: "Recarga de sube",
            number: "23",
        }] as storeResponseDto[];

        jest.spyOn(repository, 'getAllStores').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await storeService.allStores(mockResponse);

        expect(result).toEqual(mockResponse);
        expect(repository.getAllStores).toHaveBeenCalledTimes(1)
    });

});
