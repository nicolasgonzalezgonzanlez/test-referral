import { failureType } from '../../../src/helpers/enums/failureType';
import { historyEventFailed, promotion } from '../../../src/infraestructure/entities';
import { HistoryEventFailedRepository } from './../../../src/infraestructure/repository/historyEventFailedRepository';
describe('History event failed Repository', () => {
    let repository: HistoryEventFailedRepository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new HistoryEventFailedRepository();
    });

    it('should create a history event failed register', async () => {
        const historyEventFailedReq = {
            request_message: 'string',
            response_message: 'string',
            client_id: 'string',
            promotion_id: 1,
            failure_type: failureType.RuleEvaluator,
            promotion: {} as promotion,
        } as historyEventFailed
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve({} as historyEventFailed))

        await repository.createHistoryEventFailed(historyEventFailedReq)

        expect(repository.save).toHaveBeenNthCalledWith(1, historyEventFailedReq)
    })
})