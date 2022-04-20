import { repository } from '../../../src/infraestructure/repository/typeLimitRepository';
import { typeLimitRequestDto, typeLimitResponseDto} from '../../../src/dtos/typeLimit';
import { responseDto } from '../../../src/dtos/common';
import { typeLimit } from '../../../src/infraestructure/entities';
import * as RuleConfiguration from '../../../src/infraestructure/repository/ruleConfigurationRepository'
import { validationMessages } from '../../../src/constants/validation';

describe('Type Limit repository', () => {
    let repo: repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });
    it('should get all type limits', async () => {
        const mockDbResponse = [{
            name: 'test',
            code: 'TL001',
        },
        {
            name: 'test1',
            code: 'TL002'
        }] as typeLimit[];
        const mockResponse = [{
            name: 'test',
            code: 'TL001',
        },
        {
            name: 'test1',
            code: 'TL002'
        }] as typeLimitResponseDto[];

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));
        const result = await repo.getAllTypeLimit();

        expect(result).toEqual(mockResponse);
        expect(repo.find).toHaveBeenCalledTimes(1)
    });

    it('should create a type limit', async () => {
        const mockDbResponse = {
            type_limit_id: 1,
            name: 'test1',
            code: 'TL002'
        } as typeLimit;
        const mockResponse = {
            typeLimitId: 1,
            name: 'test1',
            code: 'TL002'
        } as typeLimitResponseDto;
        const mockTypeLimit: typeLimitRequestDto = {
            name: "string",
            code: "string"
        };

        jest.spyOn(repo, 'create').mockImplementation(() => mockDbResponse);
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.createTypeLimit(mockTypeLimit);

        expect(result).toEqual(mockResponse);
        expect(repo.create).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should update a type limit', async () => {
        const mockDbResponse = {
            type_limit_id: 1,
            name: 'test1',
            code: 'TL002'
        } as typeLimit;
        const mockResponse = {
            typeLimitId: 1,
            name: 'test',
            code: 'test'
        } as typeLimitResponseDto;
        const mockTypeLimit: typeLimitRequestDto = {
            name: "test",
            code: "test"
        };

        jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbResponse));
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.editTypeLimit(1, mockTypeLimit);

        expect(result).toEqual(mockResponse);
        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should delete a type limit when its valid and exists', async () => {
        const mockDbResponse = {
            type_limit_id: 1,
            name: 'test1',
            code: 'TL002'
        } as typeLimit
        const mockResponse = new responseDto()
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByTypeLimitId').mockImplementation(() => Promise.resolve(true))
        jest.spyOn(repo, 'findOne').mockImplementation(() => Promise.resolve(mockDbResponse))
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse))

        const result = await repo.deleteTypeLimit(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByTypeLimitId).toHaveBeenNthCalledWith(1, 1)
        expect(repo.findOne).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should not delete a type limit when its not valid', async () => {
        const mockResponse = new responseDto()
        mockResponse.messages = [{ key: '', message: validationMessages.typeLimit.cantDelete, messageType: 3 }]
        mockResponse.isValid = false
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByTypeLimitId').mockImplementation(() => Promise.resolve(false))

        const result = await repo.deleteTypeLimit(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByTypeLimitId).toHaveBeenNthCalledWith(1, 1)
    });

    it('should not delete a type limit when its valid but it does not exists', async () => {
        const mockResponse = new responseDto()
        mockResponse.messages = [{ key: '', message: validationMessages.typeLimit.notFound, messageType: 3 }]
        mockResponse.isValid = false
        const ruleConfigRepo = new RuleConfiguration.ruleConfigurationRepository()
        jest.spyOn(RuleConfiguration, 'getRuleConfigurationRepository').mockImplementation(() => ruleConfigRepo)
        jest.spyOn(ruleConfigRepo, 'validRuleConfigurationByTypeLimitId').mockImplementation(() => Promise.resolve(true))
        jest.spyOn(repo, 'findOne').mockImplementation(() => Promise.resolve(undefined))

        const result = await repo.deleteTypeLimit(1);

        expect(result).toEqual(mockResponse);
        expect(ruleConfigRepo.validRuleConfigurationByTypeLimitId).toHaveBeenNthCalledWith(1, 1)
    });
});
