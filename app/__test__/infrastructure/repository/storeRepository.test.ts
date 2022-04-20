import { mockCreateQueryBuilder } from './../../mocks/createQueryBuilder';
import { storeRepository } from '../../../src/infraestructure/repository/storeRepository';
import { storeResponseDto } from '../../../src/dtos/store';
import { store } from '../../../src/infraestructure/entities';


describe('Store Repository', () => {
    let repo: storeRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new storeRepository();
    });
    it('should get all stores with filter value', async () => {
        const mockDbResponse = [{
            store_id: 1,
            name: "Recarga de sube",
            number: '23'
        }] as store[]
        const mockResponse = [{
            storeId: 1,
            name: "Recarga de sube",
            number: '23'
        }] as storeResponseDto[];

        let createQueryBuilder: any = {
            select: () => createQueryBuilder,
            orderBy: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getRawMany: () => mockDbResponse
        }
        const andWhereMock = jest.fn(() => createQueryBuilder)
        createQueryBuilder.andWhere = andWhereMock
        jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        const result = await repo.getAllStores('Recarga');

        expect(result).toEqual(mockResponse);
        expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1)
        expect(andWhereMock).toHaveBeenCalledTimes(1)
    });

    it('should get all stores without filter value', async () => {
        const mockDbResponse = [{
            store_id: 1,
            name: "Recarga de sube",
            number: '23'
        }] as store[]
        const mockResponse = [{
            storeId: 1,
            name: "Recarga de sube",
            number: '23'
        }] as storeResponseDto[];

        let createQueryBuilder: any = {
            select: () => createQueryBuilder,
            orderBy: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getRawMany: () => mockDbResponse
        }
        const andWhereMock = jest.fn(() => createQueryBuilder)
        createQueryBuilder.andWhere = andWhereMock
        jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

        const result = await repo.getAllStores('');

        expect(result).toEqual(mockResponse);
        expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1)
        expect(andWhereMock).not.toHaveBeenCalled()
    });

});
