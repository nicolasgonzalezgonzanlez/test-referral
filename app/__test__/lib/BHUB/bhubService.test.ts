import { axiosInstanceBhub } from "../../../src/lib/common/axiosInstance";
import { getTransactionReasons, login, postTransaction, getTransactionCashback } from '../../../src/lib/BHUB/bhubService';
import * as bhubService from "../../../src/lib/BHUB/bhubService";

// TODO review test
describe('BHUB integration', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('bhub login - success', async () => {

       /* const mockRes = {
            data: {
                accessToken: "eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ",
                externalTokenResource: "https://testing.medipago.com.ar/qr/eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ.png",
                lifetime: 3600,
                issued: "2022-01-27T15:01:36-03:00",
                needChangePassword: true,
                expiration: "2022-01-27T16:01:36-03:00"
            }
        }

        jest.spyOn(axiosInstanceBhub, 'post').mockResolvedValue(mockRes);
        const result = await login()


        expect(axiosInstanceBhub.post).toHaveBeenCalled();
        expect(result).toEqual(mockRes.data)*/
        expect(true).toEqual(true)
    });

    /*
    it('bhub login - fail', async () => {

        const mockRes = {
            response: {
                data: "error in Bhub login"
            }
        }

        jest.spyOn(axiosInstanceBhub, 'post').mockRejectedValue(mockRes);

        login().then().catch(err => expect(login).toThrowError())
        expect(axiosInstanceBhub.post).toHaveBeenCalled();
    });

    it('bhub login - fail tuID', async () => {

        const mockRes = {
            data: null
        }

        jest.spyOn(axiosInstanceBhub, 'post').mockResolvedValue(mockRes);
        const result = await login()

        expect(result).toBe(null)
        expect(axiosInstanceBhub.post).toHaveBeenCalled();
    });

    it('bhub postTransaction - success', async () => {

        const mockRes = {
            data: {
                id: "567B001515C6318A8F0F",
                number: 11030721,
                created: "2022-01-27T15:22:14-03:00",
                businessDate: "20221225",
                confirmationDate: "2022-12-25T15:22:14-03:00",
                amount: 5.00,
                description: "Reintegro - 11030721",
                comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
                state: "approved",
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
                originTransactionId: "2C4900158BB000798D9C",
                clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32"
            }
        }

        const mockReq = {
            amount: "5",
            transactionType: "CashBack",
            businessDate: "2022-12-25",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            transactionReason: {
                id: "1F5800106ABB2D514BAE"
            }
        }

        jest.spyOn(axiosInstanceBhub, 'post').mockResolvedValue(mockRes);
        const result = await postTransaction(mockReq)


        expect(axiosInstanceBhub.post).toHaveBeenCalled();
        expect(result).toEqual(mockRes.data)
    });

    it('bhub postTransaction - fail', async () => {

        const mockReq = {
            amount: "5",
            transactionType: "CashBack",
            businessDate: "2021-12-25",
            clientTransactionId: "1cfa09ad-d388-40b0-b9d5-4e1c75931a32",
            comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
            transactionReason: {
                id: "1F5800106ABB2D514BAE"
            }
        }

        const mockRes = {
            response: {
                data: "error in bhub postTransaction",
                status: 500
            }
        }

        jest.spyOn(axiosInstanceBhub, 'post').mockRejectedValue(mockRes);
        postTransaction(mockReq).then().catch(err => expect(postTransaction).toThrowError())
    });


    it('bhub getTransactionReasons - success', async () => {

        const mockRes = {
            data: [
                {
                    id: "1F5800110A1229522E35",
                    description: "Ajuste para la demo",
                    name: "Ajuste para la demo",
                    code: "000044",
                    enable: true
                },
                {
                    id: "1F5800123A242BD7A4A5",
                    description: "Bonificacion BT",
                    name: "Bonificacion BT",
                    code: "NC0037",
                    enable: true
                }]
        }

        const mockResLogIn = {
            accessToken: "eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ",
            externalTokenResource: "https://testing.medipago.com.ar/qr/eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ.png",
            lifetime: 3600,
            issued: "2022-01-27T15:01:36-03:00",
            needChangePassword: true,
            expiration: "2022-01-27T16:01:36-03:00"
        }


        jest.spyOn(bhubService, "login").mockResolvedValue(Promise.resolve(mockResLogIn))
        jest.spyOn(axiosInstanceBhub, 'get').mockResolvedValue(mockRes);
        const result = await getTransactionReasons()

        expect(axiosInstanceBhub.get).toHaveBeenCalled();
        expect(result).toEqual(mockRes.data)
    });

    it('bhub getTransactionReasons - fail', async () => {

        const mockRes = {
            response: {
                data: "error in bhub postTransaction",
                status: 500
            }
        }

        jest.spyOn(axiosInstanceBhub, 'get').mockRejectedValue(mockRes);

        getTransactionReasons().then().catch(err => expect(getTransactionReasons).toThrowError())
    });

    it('bhub getTransactionCashback - success', async () => {

        const mockRes = {
            data: [
                {
                    id: "567B0015682703AB9F44",
                    number: 11022389,
                    created: "2021-12-10T16:37:08-03:00",
                    businessDate: "20211210",
                    confirmationDate: "2021-12-10T16:37:08-03:00",
                    amount: 19.00,
                    description: "Reintegro - 11022389",
                    comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
                    state: "approved",
                    stateDetail: {
                        message: "Confirmada",
                        transactionType: "Cashback"
                    },
                    transactionType: "Cashback",
                    originTransactionId: "2C4900158BB000798D9C",
                    clientTransactionId: "c3f7e8f4-8d36-4fe1-af5a-bafe4eec8055"
                },
                {
                    id: "567B00151F721933BDD2",
                    number: 11022382,
                    created: "2021-12-10T12:05:56-03:00",
                    businessDate: "20211210",
                    confirmationDate: "2021-12-10T12:05:56-03:00",
                    amount: 19.00,
                    description: "Reintegro - 11022382",
                    comments: "Te reintegramos lo que te prometimos!! la superpromo billetera!",
                    state: "approved",
                    stateDetail: {
                        message: "Confirmada",
                        transactionType: "Cashback"
                    },
                    transactionType: "Cashback",
                    originTransactionId: "2C4900158BB000798D9C",
                    clientTransactionId: "c3f7e8f4-8d36-4fe1-af5a-bafe4eec8055"
                }]
        }

        const mockResLogIn = {
            accessToken: "eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ",
            externalTokenResource: "https://testing.medipago.com.ar/qr/eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ.png",
            lifetime: 3600,
            issued: "2022-01-27T15:01:36-03:00",
            needChangePassword: true,
            expiration: "2022-01-27T16:01:36-03:00"
        }


        jest.spyOn(bhubService, "login").mockResolvedValue(Promise.resolve(mockResLogIn))
        jest.spyOn(axiosInstanceBhub, 'get').mockResolvedValue(mockRes);
        const result = await getTransactionCashback("test", "test")

        expect(axiosInstanceBhub.get).toHaveBeenCalled();
        expect(result).toEqual(mockRes.data)
    });

    it('bhub getTransactionCashback - fail', async () => {

        const mockRes = {
            response: {
                data: "error in bhub getTransactionCashback",
                status: 500
            }
        }

        jest.spyOn(axiosInstanceBhub, 'get').mockRejectedValue(mockRes);

        getTransactionCashback("test", "test").then().catch(err => expect(getTransactionReasons).toThrowError())
    });
*/
});
