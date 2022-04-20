import historyEventController from '../../src/server/controller/historyEventController';
import { allHistoryEventResponse, allHistoryEventResponseReport } from '../../src/dtos/historyEvent';
import { historyEventService } from '../../src/services';

describe('HistoryEvent controller', () => {

    let controller: historyEventController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new historyEventController();
    });


    it('GetAll historyEvent Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        historyEventId: "1",
                        requestMessage: '{ amount: "5", transactionType: "CashBack", businessDate: "2021-12-25", clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32", comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!", transactionReason: {id: "1F5800106ABB2D514BAE"}}',
                        responseMessage: '{id: "567B001453DF185956C9",number: 11023137,created: "2021-12-22T12:12:23-03:00",businessDate: "20211225",confirmationDate: "2021-12-25T12:12:23-03:00",',
                        clientId: "",
                        amount: 10,
                        transactionStatus: "",
                        promotionId: "",
                        refund: "",
                        promotion: ""
                    }
                ]
            } as unknown as allHistoryEventResponse;

        const mockServiceResponse = [{
            historyEventId: "1",
            requestMessage: '{ amount: "5", transactionType: "CashBack", businessDate: "2021-12-25", clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32", comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!", transactionReason: {id: "1F5800106ABB2D514BAE"}}',
            responseMessage: '{id: "567B001453DF185956C9",number: 11023137,created: "2021-12-22T12:12:23-03:00",businessDate: "20211225",confirmationDate: "2021-12-25T12:12:23-03:00",',
            clientId: "",
            amount: 10,
            transactionStatus: "",
            promotionId: "",
            refund: "",
            promotion: ""
        }]

        jest.spyOn(historyEventService, 'allHistoryEvents').mockResolvedValue(mockServiceResponse as never);
        const result = await controller.getAllHistoryEvent();

        expect(result).toEqual(mockResponse);
    });

    it('Get historyEvent report', async () => {
        const mockResponse: any = [{
            updateDate: '2022-01-19T19:33:55.327Z',
            clientId: '802ee938-c9c8-4186-ac9f-f905cd62fde5',
            code: 'sube1991122',
            name: 'Recarga Sube',
            startDate: '2022-01-19T14:49:00.000Z',
            endDate: '2022-02-28T14:49:00.000Z',
            refPromotion: '',
            promotionValue: '20.00',
            days: 'Todos los días',
            productOperation: 11,
            id: '567B0014D58D2C8ACF63',
            number: 11030446,
            confirmationDate: '2022-01-19T16:33:55-03:00',
            amount: 0,
            comments: 'Recarga Sube',
            stateDetailMessage: 'Confirmada',
            transactionType: 'Cashback',
            transactionReasonCode: 'NC0602',
            transactionReasonName: 'Credito CB PDS',
            originTransactionId: '2D060014BF9D2572909D'
        }]

        jest.spyOn(historyEventService, 'allHistoryEventsReport').mockResolvedValue(mockResponse as never);
        const result = await controller.getAllHistoryEventReport('2022-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 'csv', 0);

        expect(result).toEqual(mockResponse);
    });

});
