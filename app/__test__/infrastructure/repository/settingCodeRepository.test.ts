import { mockCQBForUpdateAndDelete } from './../../mocks/createQueryBuilder';
import { settingCode } from '../../../src/infraestructure/entities/settingCode';
import { settingCodeRepository } from "../../../src/infraestructure/repository/settingCodeRepository"
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder'

describe('Setting code repository', () => {
    let repository: settingCodeRepository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new settingCodeRepository();
    });

    describe('Get all setting codes', () => {
        it('should return a list of setting code entities', async () => {
            const mockResult: settingCode[] = [
              {
                  setting_code_id: 2,
                  code: '02020202',
                  name: 'nombreMock'
              },
              {
                  setting_code_id: 1,
                  code: '02020202',
                  name: 'nombreMock'
              }
            ]
            const createQueryBuilder = mockCreateQueryBuilder(mockResult)
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

            const result = await repository.getSettingCodes()

            expect(result).toEqual(mockResult)
            expect(result).toHaveLength(2)
        })
        it('should return an empty list', async () => {
            const mockResult: settingCode[] = []
            const createQueryBuilder = mockCreateQueryBuilder(mockResult)
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

            const result = await repository.getSettingCodes()

            expect(result).toEqual(mockResult)
            expect(result).toHaveLength(0)
        })
    })

    describe('Create setting code', () => {
        it('should create a setting code successfully', async () => {
            const saveMock = Promise.resolve({} as unknown as settingCode)
            jest.spyOn(repository, 'save').mockImplementation(() => saveMock)

            await repository.createSettingCode({} as unknown as settingCode)

            expect(repository.save).toHaveBeenCalled()
            expect(repository.save).toHaveBeenCalledWith({})
        })
    })

    describe('Update setting code', () => {
        it('should update a setting code successfully', async () => {
            const queryBuilder = mockCQBForUpdateAndDelete()
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => queryBuilder)

            await repository.updateSettingCode(2, {} as unknown as settingCode)

            expect(repository.createQueryBuilder).toHaveBeenCalled()
        })
    })

    describe('Delete setting code', () => {
        it('should delete a setting code successfully', async () => {
            const queryBuilder = mockCQBForUpdateAndDelete()
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => queryBuilder)

            await repository.deleteSettingCode(2)

            expect(repository.createQueryBuilder).toHaveBeenCalled()
        })
    })

    describe('Setting code has related rules', () => {
        it('should return true if setting code has one or more rules related', async () => {
            const queryBuilder = mockCreateQueryBuilder(2)
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => queryBuilder)

            const result = await repository.hasRelatedRules(2)

            expect(repository.createQueryBuilder).toHaveBeenCalled()
            expect(result).toBe(true)
        })
        it('should return false if setting code has no rules related', async () => {
            const queryBuilder = mockCreateQueryBuilder(0)
            jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => queryBuilder)

            const result = await repository.hasRelatedRules(2)

            expect(repository.createQueryBuilder).toHaveBeenCalled()
            expect(result).toBe(false)
        })
    })
})