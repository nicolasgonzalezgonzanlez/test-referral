import { TPostTransactionResponse } from '../../src/lib/BHUB/types';
import { bhubCashbackService } from '../../src/services';
import * as historyEvent from '../../src/infraestructure/repository/historyEventRepository';
import * as bhub from "../../src/lib/BHUB/bhubService";
import * as club from "../../src/lib/clubPersonal/clubPersonalIntegration";

describe('BHUB cashback service', () => {
    let hisEventRepository: historyEvent.repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        hisEventRepository = new historyEvent.repository();
        jest.spyOn(historyEvent, 'getHistoryEventRepository').mockImplementation(() => hisEventRepository);

    });

    it('Post Cashback service', async () => {
        const mockResponse: any = {
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
        } as TPostTransactionResponse;

        const mockBody = {
            amount: "5",
            transactionType: "CashBack",
            businessDate: "2021-12-25",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            transactionReason: {
                id: "1F5800106ABB2D514BAE"
            }
        }


        const mockResPosttrans = {
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
            originTransactionId: "2C4900158BB000798D9C",
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
            }
        }

        const mockClubRes = {
            discountCode: "string",
            discountName: "string",
            discountId: "string",
            partner: "string",
            days: ["lunes"],
            validTo: "string",
            discountText: "string",
            discountPerUser: {
                typeUser: "string",
                desc: "string"
            },
            ValidFor: {
                startDateTime: "string",
                endDateTime: "string"
            }
        }

        jest.spyOn(bhub, 'postTransaction').mockResolvedValue(mockResPosttrans);
        jest.spyOn(club, 'patchEquivalencyCode').mockResolvedValue();
        jest.spyOn(hisEventRepository, 'createHistoryEvent').mockImplementation(() => mockResponse);
        jest.spyOn(hisEventRepository, 'updateHistoryEvent').mockImplementation(() => mockResponse);
        const result = await bhubCashbackService.postCashback(mockBody, 0, 1, "{test:test1}", "ABC123", "clientId", 5);

        expect(result).toEqual(mockResponse);
        expect(hisEventRepository.createHistoryEvent).toHaveBeenNthCalledWith(1, {
            bhubResponse: null,
            requestMessage: mockBody,
            responseMessage: null,
        },
            5,
            0,
            1,
            "{test:test1}",
            "clientId")
        expect(hisEventRepository.updateHistoryEvent).toHaveBeenNthCalledWith(1, undefined, mockResPosttrans)
    });

    it('Post Cashback service - fail', async () => {
        const mockResponse: any = {
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
        } as TPostTransactionResponse;

        const mockBody = {
            amount: "5",
            transactionType: "CashBack",
            businessDate: "2021-12-25",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            transactionReason: {
                id: "1F5800106ABB2D514BAE"
            }
        }

        const mockresponse = {
            isValid: false,
            messages: [
                {
                    key: "",
                    message: "ocurrio un error al enviar el cashback a bhub",
                    messageType: 3
                }]
        }

        jest.spyOn(bhub, 'postTransaction').mockResolvedValue(null);
        jest.spyOn(hisEventRepository, 'createHistoryEvent').mockImplementation(() => mockResponse);
        const result = await bhubCashbackService.postCashback(mockBody, 0, 1,"{test:test2}", "ABC123", "clientId", 5);
        expect(result).toEqual(mockresponse);
        expect(hisEventRepository.createHistoryEvent).toHaveBeenNthCalledWith(1, {
            bhubResponse: null,
            requestMessage: mockBody,
            responseMessage: null,
        }, 
            5,
            0,
            1,
            "{test:test2}",
            "clientId")
    });

    it('Post Cashback service - fail', async () => {
        const mockResponse: any = {
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
        } as TPostTransactionResponse;

        const mockBody = {
            amount: "5",
            transactionType: "",
            businessDate: "2021-12-25",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            transactionReason: {
                id: "1F5800106ABB2D514BAE"
            }
        }

        const mockresponse = {
            isValid: false,
            messages: [
                {
                    key: "",
                    message: "Los campos transactionType, amount y clientTransactionId son requeridos",
                    messageType: 3
                }]
        }

        const result = await bhubCashbackService.postCashback(mockBody, 0, 1, "{test:test3}", "ABC123", "clientId", 5);

        expect(result).toEqual(mockresponse);
    });
});
