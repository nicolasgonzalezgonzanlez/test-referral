import * as sectionRepository from '../../src/infraestructure/repository/sectionRepository'
import { sectionResponseDto } from '../../src/dtos/section/sectionResponseDto';
import { sectionService } from '../../src/services';

describe('Section service', () => {
    let sectionRepo: sectionRepository.repository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        sectionRepo = new sectionRepository.repository();
        jest.spyOn(sectionRepository, 'getSectionRepository').mockImplementation(() => sectionRepo)
    });

    it('should get all sections', async () => {
        const mockResponse = [
            {
                sectionId: 1,
                name: 'string',
                routeName: 'string',
            }
        ] as sectionResponseDto[]
        jest.spyOn(sectionRepo, 'getAllSection').mockImplementation(() => Promise.resolve(mockResponse))

        const result = await sectionService.getAllSectionService()

        expect(result).toEqual(mockResponse)
        expect(sectionRepo.getAllSection).toHaveBeenNthCalledWith(1)
    })
})