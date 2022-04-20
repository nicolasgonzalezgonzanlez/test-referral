import { repository } from '../../../src/infraestructure/repository/userConditionRepository';
import { userConditionResponseDto, userConditionResponse, userConditionRequestDto } from '../../../src/dtos/userCondition';
import { responseDto } from '../../../src/dtos/common';
import { userCondition } from '../../../src/infraestructure/entities';
import * as RuleConfiguration from '../../../src/infraestructure/repository/ruleConfigurationRepository'
import { validationMessages } from '../../../src/constants/validation';

describe('User Condition repository', () => {
    let repo: repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });

    it('should get all user conditions', async () => {
        const mockDbResponse = [{
            name: 'test',
            code: 'C001',
        },
        {
            name: 'test1',
            code: 'C002'
        }] as userCondition[];
        const mockResponse: any = [{
            name: 'test',
            code: 'C001',
        },
        {
            name: 'test1',
            code: 'C002'
        }] as userConditionResponseDto[];

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.getAllUserCondition();

        expect(result).toEqual(mockResponse);
        expect(repo.find).toHaveBeenCalledTimes(1)
    });

    it('should create a user condition', async () => {
        const mockUserCondition: userConditionRequestDto = {
            name: "string",
            code: "string"
        };
        const mockDbResponse = {
            name: 'test1',
            code: 'C002'
        } as userCondition;
        const mockResponse = {
            name: 'test1',
            code: 'C002'
        } as userConditionResponseDto;

        jest.spyOn(repo, 'create').mockImplementation(() => mockDbResponse);
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.createUserCondition(mockUserCondition);

        expect(result).toEqual(mockResponse);
        expect(repo.create).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should update a user condition', async () => {
        const mockUserCondition: userConditionRequestDto = {
            name: "test",
            code: "test"
        };
        const mockDbResponse = {
            name: 'test1',
            code: 'C002'
        } as userCondition;
        const mockResponse = {
            name: 'test',
            code: 'test'
        } as userConditionResponseDto;

        jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbResponse));
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.editUserCondition(1, mockUserCondition);

        expect(result).toEqual(mockResponse);
        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should delete a user condition when its valid and exists', async () => {
        const mockDbResponse = {
            name: 'test1',
            code: 'C002'
        } as userCondition;
        const mockResponse = new responseDto()
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByUserConditionId').mockImplementation(() => Promise.resolve(true))
        jest.spyOn(repo, 'findOne').mockImplementation(() => Promise.resolve(mockDbResponse))
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse))

        const result = await repo.deleteUserCondition(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByUserConditionId).toHaveBeenNthCalledWith(1, 1)
        expect(repo.findOne).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should not delete a user condition when its not valid', async () => {
        const mockResponse = new responseDto()
        mockResponse.messages = [{ key: '', message: validationMessages.userCondition.cantDelete, messageType: 3 }]
        mockResponse.isValid = false
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByUserConditionId').mockImplementation(() => Promise.resolve(false))

        const result = await repo.deleteUserCondition(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByUserConditionId).toHaveBeenNthCalledWith(1, 1)
    });

    it('should not delete a user condition when its valid but it does not exists', async () => {
        const mockResponse = new responseDto()
        mockResponse.messages = [{ key: '', message: validationMessages.userCondition.notFound, messageType: 3 }]
        mockResponse.isValid = false
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByUserConditionId').mockImplementation(() => Promise.resolve(true))
        jest.spyOn(repo, 'findOne').mockImplementation(() => Promise.resolve(undefined))

        const result = await repo.deleteUserCondition(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByUserConditionId).toHaveBeenNthCalledWith(1, 1)
    });

});
