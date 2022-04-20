import { typePromotionResponseDto } from '../../src/dtos/typePromotion';
import * as TypePromotionRepository from '../../src/infraestructure/repository/typePromotionRepository';
import { typePromotionService } from '../../src/services';

describe('Type Promotion Service', () => {

    let repository: TypePromotionRepository.repository
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new TypePromotionRepository.repository()
        jest.spyOn(TypePromotionRepository, 'getTypePromotionRepository').mockImplementation(() => repository)
    });

    it('should get all type promotions', async () => {
        const mockResult = [] as typePromotionResponseDto[]
        jest.spyOn(repository, 'getAllTypePromotion').mockImplementation(() => Promise.resolve(mockResult))

        const result = await typePromotionService.getAllTypePromotion()

        expect(result).toEqual(mockResult)
        expect(repository.getAllTypePromotion).toHaveBeenNthCalledWith(1)
    })
})