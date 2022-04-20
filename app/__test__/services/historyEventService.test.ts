import { historyEventService } from '../../src/services';
import * as historyEventRepository from '../../src/infraestructure/repository/historyEventRepository'
import { historyEventResponseDto, historyEventResponseReport } from '../../src/dtos/historyEvent';

describe('History Event Service', () => {

    let repository: historyEventRepository.repository

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new historyEventRepository.repository()
        jest.spyOn(historyEventRepository, 'getHistoryEventRepository').mockImplementation(() => repository)
    });

    it('should get all history events', async () => {
        const mockResponse = [{
            historyEventId: 1,
            requestMessage: '{ amount: "5", transactionType: "CashBack", businessDate: "2021-12-25", clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32", comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!", transactionReason: {id: "1F5800106ABB2D514BAE"}}',
            responseMessage: '{id: "567B001453DF185956C9",number: 11023137,created: "2021-12-22T12:12:23-03:00",businessDate: "20211225",confirmationDate: "2021-12-25T12:12:23-03:00",',
            clientId: "",
            amount: 10,
            transactionStatus: "",
            promotionId: 1,
            refund: 10
        }] as historyEventResponseDto[];

        jest.spyOn(repository, 'getAllHistoryEvent').mockImplementation(() => Promise.resolve(mockResponse));
        const result = await historyEventService.allHistoryEvents();

        expect(result).toEqual(mockResponse);
        expect(repository.getAllHistoryEvent).toHaveBeenNthCalledWith(1)
    });

    it('should get a history report', async () => {
        const mockResponse = [{
            clientId: 'test',
            code: 'test',
            name: 'test',
            startDate: '01/01/2022 00:00:00',
            endDate: '01/01/2022 00:00:00',
            refPromotion: 'test',
            promotionValue: 'test',
            typePromotion: 'Porcentje %',
            days: 'todos los dias',
            productOperation: 'test',
            id: 'test',
            number: 'test',
            confirmationDate: '01/01/2022 00:00:00',
            amount: '100',
            comments: 'test',
            stateDetailMessage: 'test',
            transactionType: 'test',
            transactionReasonName: 'test',
            transactionReasonCode: 'test',
            originTransactionId: 'test'
        }] as historyEventResponseReport[];

        jest.spyOn(repository, 'getHistoryEventReport').mockImplementation(() => Promise.resolve(mockResponse) as never);
        const result = await historyEventService.allHistoryEventsReport('2022-01-01T00:00:00.000Z', '2022-02-01T00:00:00.000Z', 4, 'csv');

        expect(result).toEqual(mockResponse);
        expect(repository.getHistoryEventReport).toHaveBeenNthCalledWith(1, '2022-01-01T00:00:00.000Z', '2022-02-01T00:00:00.000Z', 4)
    });

    it('should valid if can use the promotion by transactionLimit', async () => {

    jest.spyOn(repository, 'checkCanUseThePromotionByTransactionLimit').mockImplementation(() => Promise.resolve(true));
    
    const result = await historyEventService.checkCanUseThePromotionByTransactionLimit(
        { 
            clientId:"fd8c1a11-5e8b-49ad-996c-26c9410b5e2e",
            promotionId:161,
            limitByTransaction:1,
            frequency:"0 0 * * *",
            startPromotionDate: new Date("2022-03-01T05:16:39.982Z"), 
            endPromotionDate:new Date("2022-03-31T05:16:39.982Z" )
    });

        expect(result).toEqual(true);
    });
});
