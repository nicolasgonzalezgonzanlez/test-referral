import { userConditionService } from '../../src/services';
import { userConditionRequestDto, userConditionResponseDto } from '../../src/dtos/userCondition';
import { responseDto } from '../../src/dtos/common'
import * as UserConditionRepository from '../../src/infraestructure/repository/userConditionRepository'

describe('User Condition service', () => {
    let repository: UserConditionRepository.repository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new UserConditionRepository.repository()
        jest.spyOn(UserConditionRepository, 'getUserConditionRepository').mockImplementation(() => repository)
    });

    it('should get all user conditions', async () => {
        const mockResponse = [{
            name: 'test',
            code: 'C001',
        },
        {
            name: 'test1',
            code: 'C002'
        }] as userConditionResponseDto[];

        jest.spyOn(repository, 'getAllUserCondition').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await userConditionService.getAllUserConditionService();

        expect(result).toEqual(mockResponse);
        expect(repository.getAllUserCondition).toHaveBeenNthCalledWith(1)
    });

    it('should create a user condition', async () => {
        const mockResponse = {
            name: 'test1',
            code: 'C002'
        } as userConditionResponseDto

        const mockTUserCondition: userConditionRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(repository, 'createUserCondition').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await userConditionService.createUserCondition(mockTUserCondition);

        expect(result).toEqual(mockResponse);
        expect(repository.createUserCondition).toHaveBeenNthCalledWith(1, mockTUserCondition)
    });

    it('should edit a user condition', async () => {
        const mockResponse = {
            name: 'test1',
            code: 'C002'
        } as userConditionResponseDto

        const mockEditCampaign: userConditionRequestDto = {
            name: 'Test2',
            code: 'test2'
        };

        jest.spyOn(repository, 'editUserCondition').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await userConditionService.editUserCondition(1, mockEditCampaign);

        expect(result).toEqual(mockResponse);
        expect(repository.editUserCondition).toHaveBeenNthCalledWith(1, 1, mockEditCampaign)
    });

    it('should delete a user condition', async () => {
        const mockResponse = new responseDto();

        jest.spyOn(repository, 'deleteUserCondition').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await userConditionService.deleteUserCondition(1);

        expect(result).toEqual(mockResponse);
        expect(repository.deleteUserCondition).toHaveBeenNthCalledWith(1, 1)
    });
});
