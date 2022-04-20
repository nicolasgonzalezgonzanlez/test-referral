import { sectionResponse, sectionResponseDto } from '../../src/dtos/section';
import SectionController from '../../src/server/controller/sectionController'
import { sectionService } from '../../src/services';
describe('Section Controller', () => {
    let controller: SectionController

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new SectionController();
    });

    it('should get all sections', async () => {
        const mockResponse = [
            {
                sectionId: 1,
                name: 'string',
                routeName: 'string',
            }
        ] as sectionResponseDto[]
        const expectedResponse = new sectionResponse(mockResponse)
        jest.spyOn(sectionService, 'getAllSectionService').mockImplementation(() => Promise.resolve(mockResponse))

        const result = await controller.getAllSections()

        expect(result).toEqual(expectedResponse)
        expect(sectionService.getAllSectionService).toHaveBeenNthCalledWith(1)
    })
})