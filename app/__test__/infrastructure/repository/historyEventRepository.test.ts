import { repository } from '../../../src/infraestructure/repository/historyEventRepository';
import { historyEventResponseDto, historyEventResponseReport } from '../../../src/dtos/historyEvent';
import { responseDto } from '../../../src/dtos/common';
import { TCreateHistoryEvent, TPostTransactionResponse } from '../../../src/lib/BHUB/types';
import { historyEvent } from '../../../src/infraestructure/entities';
import { mockCreateQueryBuilder } from '../../mocks/createQueryBuilder';
import * as mapper from '../../../src/mapper/entityToDTO/historyEvent';

describe('History Event repository', () => {
    let repo: repository;


    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });
    it('should get all history events', async () => {
        const mockDbResponse = [{
            history_event_id: 1,
            request_message: '{ amount: "5", transactionType: "CashBack", businessDate: "2021-12-25", clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32", comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!", transactionReason: {id: "1F5800106ABB2D514BAE"}}',
            response_message: '{id: "567B001453DF185956C9",number: 11023137,created: "2021-12-22T12:12:23-03:00",businessDate: "20211225",confirmationDate: "2021-12-25T12:12:23-03:00",',
            client_id: "",
            amount: 10,
            transaction_status: '',
            promotion_id: 1,
            refund: 10
        }] as historyEvent[]
        const mockResponse = [{
            historyEventId: 1,
            requestMessage: '{ amount: "5", transactionType: "CashBack", businessDate: "2021-12-25", clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32", comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!", transactionReason: {id: "1F5800106ABB2D514BAE"}}',
            responseMessage: '{id: "567B001453DF185956C9",number: 11023137,created: "2021-12-22T12:12:23-03:00",businessDate: "20211225",confirmationDate: "2021-12-25T12:12:23-03:00",',
            clientId: "",
            amount: 10,
            transactionStatus: "",
            promotionId: 1,
            refund: 10,
        }] as historyEventResponseDto[];

        jest.spyOn(repo, 'find').mockImplementation(() => Promise.resolve(mockDbResponse));
        const result = await repo.getAllHistoryEvent();

        expect(result).toEqual(mockResponse);
        expect(repo.find).toHaveBeenCalledTimes(1)
    });

    it('should create a history event', async () => {
        const mockHistoryEvent: TCreateHistoryEvent = {
            requestMessage: {
                amount: "5",
                transactionType: "CashBack",
                businessDate: "2021-12-25",
                clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
                comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
                transactionReason: {
                    id: "1F5800106ABB2D514BAE"
                }
            },
            responseMessage: "",
            bhubResponse: null
        };
        const mockDbResponse = {
            history_event_id: 1,
            amount: 5,
            refund: +mockHistoryEvent.requestMessage.amount,
            promotion_id: 0,
            client_id: '',
            request_rule_message: '{test:test}',
            request_message: JSON.stringify(mockHistoryEvent.requestMessage)
        } as historyEvent
        const mockResponse = {
            historyEventId: 1,
            amount: 5,
            refund: +mockHistoryEvent.requestMessage.amount,
            promotionId: 0,
            clientId: '',
            requestMessage: JSON.stringify(mockHistoryEvent.requestMessage)
        } as historyEventResponseDto

        jest.spyOn(repo, 'create').mockImplementation(() => mockDbResponse);
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.createHistoryEvent(mockHistoryEvent, 5, 0, 1, "{test:test}", '');

        expect(result).toEqual(mockResponse);
        expect(repo.create).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should update a history event', async () => {
        const mockDbResponse = {
            history_event_id: 1,
            promotion_id: 1,
            response_message: 'sarasa',
            refund: 100,
            transaction_status: 'status'
        } as historyEvent
        const mockHistoryEvent: TPostTransactionResponse = {
            id: "567B001453DF185956C9",
            number: 11023137,
            created: "2021-12-22T12:12:23-03:00",
            businessDate: "20211225",
            confirmationDate: "2021-12-25T12:12:23-03:00",
            amount: 5.00,
            description: "Reintegro - 11023137",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            state: "approved",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            stateDetail: {
                message: "Confirmada",
                transactionType: "Cashback"
            },
            transactionType: "Cashback",
            transactionReason: {
                id: "1F5800106ABB2D514BAE",
                description: "Debito baja",
                name: "Debito baja",
                code: "ND0044",
                enable: true
            },
            originTransactionId: "2C4900158BB000798D9C"
        };
        const mockDbSaveResponse = {
            history_event_id: 1,
            promotion_id: 1,
            response_message: JSON.stringify(mockHistoryEvent),
            refund: mockHistoryEvent.amount,
            transaction_status: mockHistoryEvent.state
        } as historyEvent
        const mockResponse = {
            historyEventId: 1,
            promotionId: 1,
            responseMessage: JSON.stringify(mockHistoryEvent),
            refund: mockHistoryEvent.amount,
            transactionStatus: mockHistoryEvent.state
        } as historyEventResponseDto

        jest.spyOn(repo, 'findOneOrFail').mockImplementation(() => Promise.resolve(mockDbResponse));
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbSaveResponse));
        const result = await repo.updateHistoryEvent(1, mockHistoryEvent);

        expect(result).toEqual(mockResponse);
        expect(repo.findOneOrFail).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });

    it('should be first operation if no history event is found', async () => {


        let queryBuilder: any = {
            createQueryBuilder: () => queryBuilder,
            select: () => queryBuilder,
            innerJoin: () => queryBuilder,
            where: () => queryBuilder,
            andWhere: () => queryBuilder,
            getOne: () => Promise.resolve({} as historyEvent)
        }


        jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => queryBuilder);

        const result = await repo.checkIsFirstOperationInternal("1", 'OP001', "1")

        expect(result).toBe(false)
    })

    it('should not be first operation if a history event is found', async () => {

        // const createQueryBuilder = mockCreateQueryBuilder(undefined)
        let queryBuilder: any = {
            createQueryBuilder: () => queryBuilder,
            select: () => queryBuilder,
            innerJoin: () => queryBuilder,
            where: () => queryBuilder,
            andWhere: () => queryBuilder,
            getOne: () => undefined
        }


        jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => queryBuilder)

        const result = await repo.checkIsFirstOperationInternal("2", 'OP002', "1")

        expect(result).toBe(true)
    })

    it('should get historyEvent report', async () => {
        const mockResponse = [{
            clientId: '802ee938-c9c8-4186-ac9f-f905cd62fde5',
            code: 'sube1991122',
            name: 'Recarga Sube',
            startDate: '19/01/2022 14:49:00',
            endDate: '28/02/2022 14:49:00',
            refPromotion: '',
            promotionValue: '20.00',
            typePromotion: 'Porcentaje %',
            days: 'Todos los días',
            productOperation: "test",
            id: '567B0014D58D2C8ACF63',
            number: 11030446,
            confirmationDate: "19/01/2022 16:33:55",
            amount: 0,
            comments: 'Recarga Sube',
            stateDetailMessage: 'Confirmada',
            transactionType: 'Cashback',
            transactionReasonCode: 'NC0602',
            transactionReasonName: 'Credito CB PDS',
            originTransactionId: '2D060014BF9D2572909D'
        }] as unknown as historyEventResponseReport[]
        const mockDbResponse = [{
            response_message: '{"id":"567B0014D58D2C8ACF63","number":11030446,"created":"2022-01-19T16:33:55-03:00","businessDate":"20220119","confirmationDate":"2022-01-19T16:33:55-03:00","amount":0,"description":"Reintegro - 11030446","comments":"Recarga Sube","state":"approved","stateDetail":{"message":"Confirmada","transactionType":"Cashback"},"transactionType":"Cashback","transactionReason":{"id":"1F58001203D026EA97E0","description":"Credito CB PDS","name":"Credito CB PDS","code":"NC0602","enable":true},"originTransactionId":"2D060014BF9D2572909D","clientTransactionId":"e44cd5f5-d487-4d93-a463-bfab55f8b449"}',
            client_id: '802ee938-c9c8-4186-ac9f-f905cd62fde5',
            updated_date: '2022-01-19T19:33:55.327Z',
            promotion: {
                promotion_id: 162,
                name: 'Recarga Sube',
                code: 'sube1991122',
                end_date: '2022-02-28T14:49:00.000-03:00',
                ref_promotion: '',
                promotion_value: '20.00',
                start_date: '2022-01-19T14:49:00.000-03:00',
                type_promotion: {
                    name: 'Porcentaje',
                    symbol: '%'
                },
                rule_configuration: [{
                    name: 'Credito CB PDS',
                    code: 'NC0602',
                    days: 'sunday,monday,tuesday,wednesday,thursday,friday,saturday',
                    product_operation: {
                        name: 'test'
                    }
                }]
            }
        }] as unknown[];


        let createQueryBuilder: any = {
            select: () => createQueryBuilder,
            innerJoin: () => createQueryBuilder,
            leftJoinAndSelect: () => createQueryBuilder,
            innerJoinAndSelect: () => createQueryBuilder,
            orderBy: () => createQueryBuilder,
            andWhere: () => createQueryBuilder,
            where: () => createQueryBuilder,
            getMany: () => mockDbResponse
        }
        const andWhereMock = jest.fn(() => createQueryBuilder)
        createQueryBuilder.andWhere = andWhereMock
        jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
        jest.spyOn(mapper, "historyEventEntityToEventReport").mockReturnValue(mockResponse[0])
        const result = await repo.getHistoryEventReport('2022-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 4);

        expect(result).toEqual(mockResponse);
        expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1)
    });

});
