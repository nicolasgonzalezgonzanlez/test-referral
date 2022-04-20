import { typePromotionResponseDto } from "../../../src/dtos/typePromotion";
import { typePromotion } from "../../../src/infraestructure/entities";
import { repository } from "../../../src/infraestructure/repository/typePromotionRepository";

describe('Type Promotion Repository', () => {
    let repo: repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });

    it('should get all type promotions', async () => {
        const mockDbResponse = [{
            type_promotion_id: 1,
            code: 'code',
            name: 'name',
        }] as typePromotion[]
        const mockResponse = [{
            typePromotionId: 1,
            code: 'code',
            name: 'name',
        }] as typePromotionResponseDto[]

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse))

        const result = await repo.getAllTypePromotion()

        expect(result).toEqual(mockResponse)
        expect(repo.find).toHaveBeenCalledTimes(1)
    })
})