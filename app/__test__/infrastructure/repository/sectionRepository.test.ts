import { repository } from "../../../src/infraestructure/repository/sectionRepository"
import { section } from '../../../src/infraestructure/entities';
import { sectionResponseDto } from '../../../src/dtos/section';

describe('Section repository', () => {
    let sectionRepository: repository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        sectionRepository = new repository();
    });

    it('should get all sections, empty result', async () => {
        const mockResponse = [] as sectionResponseDto[]
        jest.spyOn(sectionRepository, 'find').mockImplementation(() => Promise.resolve([] as section[]))

        const result = await sectionRepository.getAllSection()

        expect(result).toEqual(mockResponse)
        expect(sectionRepository.find).toHaveBeenCalledTimes(1)
    })

    it('should get all sections, one result', async () => {
        const mockResponse = [
            {
                sectionId: 1,
                name: 'string',
                routeName: 'string',
            }
        ] as sectionResponseDto[];
        const mockDbResponse = [
            {
                section_id: 1,
                name: 'string',
                route_name: 'string',
            }
        ] as section[];
        jest.spyOn(sectionRepository, 'find').mockImplementation(() => Promise.resolve(mockDbResponse))

        const result = await sectionRepository.getAllSection()

        expect(result).toEqual(mockResponse)
        expect(sectionRepository.find).toHaveBeenCalledTimes(1)
    })
})