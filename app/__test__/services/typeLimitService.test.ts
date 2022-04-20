import { typeLimitService } from '../../src/services';
import { typeLimitRequestDto, typeLimitResponseDto } from '../../src/dtos/typeLimit';
import { responseDto } from '../../src/dtos/common'
import * as TypeLimitRepository from '../../src/infraestructure/repository/typeLimitRepository';

describe('Type Limit service', () => {
    let repository: TypeLimitRepository.repository
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new TypeLimitRepository.repository()
        jest.spyOn(TypeLimitRepository, 'getTypeLimitRepository').mockImplementation(() => repository)
    });

    it('should get all type limit', async () => {
        const mockResponse = [{
            name: 'test',
            code: 'TL001',
            typeLimitId: 1,
        },
        {
            name: 'test1',
            code: 'TL002',
            typeLimitId: 2,
        }] as typeLimitResponseDto[];

        jest.spyOn(repository, 'getAllTypeLimit').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await typeLimitService.allTypeLimitService();

        expect(result).toEqual(mockResponse);
        expect(repository.getAllTypeLimit).toHaveBeenCalledTimes(1)
    });

    it('should create a type limit', async () => {
        const mockResponse = {
            name: 'test1',
            code: 'TL002',
            typeLimitId: 2,
        } as typeLimitResponseDto

        const mockTypeLimit: typeLimitRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(repository, 'createTypeLimit').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await typeLimitService.createTypeLimitService(mockTypeLimit);

        expect(result).toEqual(mockResponse);
        expect(repository.createTypeLimit).toHaveBeenNthCalledWith(1, mockTypeLimit)
    });

    it('should edit a type limit', async () => {
        const mockResponse = {
            name: 'test1',
            code: 'TL002',
            typeLimitId: 2,
        } as typeLimitResponseDto
        const mockEditCampaign: typeLimitRequestDto = {
            name: 'Test2',
            code: 'test2'
        };

        jest.spyOn(repository, 'editTypeLimit').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await typeLimitService.editTypeLimitService(1, mockEditCampaign);

        expect(result).toEqual(mockResponse);
        expect(repository.editTypeLimit).toHaveBeenNthCalledWith(1, 1, mockEditCampaign)
    });

    it('should delete a type limit', async () => {
        const mockResponse: any = new responseDto();

        jest.spyOn(repository, 'deleteTypeLimit').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await typeLimitService.deleteTypeLimitService(1);

        expect(result).toEqual(mockResponse);
        expect(repository.deleteTypeLimit).toHaveBeenNthCalledWith(1, 1)
    });

});
