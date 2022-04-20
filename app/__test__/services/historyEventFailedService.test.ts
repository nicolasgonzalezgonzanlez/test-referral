import { failureType } from '../../src/helpers/enums/failureType';
import { historyEventFailed } from '../../src/infraestructure/entities';
import { historyEventFailedService } from '../../src/services'
import * as historyEventFailedRepository from '../../src/infraestructure/repository/historyEventFailedRepository'
import { historyEventFailedDto } from '../../src/dtos/historyEventFailed/historyEventFailedDto';
import { mockAuditInstance } from '../mocks/auditInstance';

describe('History event failed Service', () => {
  let historyEventFailedRepo: historyEventFailedRepository.HistoryEventFailedRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    historyEventFailedRepo = new historyEventFailedRepository.HistoryEventFailedRepository();
    jest.spyOn(historyEventFailedRepository, 'getHistoryEventFailedRepository').mockImplementation(() => historyEventFailedRepo);
  });

  it('should create a history event failed register', async () => {
    const historyEventFailedReq = {
        request_message: 'string',
        client_id: 'string',
        promotion_id: 1,
        failure_type: failureType.RuleEvaluator,
        ...mockAuditInstance()
    } as historyEventFailed

    const dto = {
        requestMessage: 'string',
        clientId: 'string',
        promotionId: 1,
        failureType: failureType.RuleEvaluator,
    } as historyEventFailedDto
    jest.spyOn(historyEventFailedRepo, 'createHistoryEventFailed').mockImplementation(() => Promise.resolve())

    await historyEventFailedService.createHistoryEventFailed(dto.clientId, dto.promotionId, dto.requestMessage, dto.failureType)

    expect(historyEventFailedRepo.createHistoryEventFailed).toHaveBeenNthCalledWith(1, historyEventFailedReq)
  })
})