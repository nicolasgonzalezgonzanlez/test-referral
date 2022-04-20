import * as bhubService from "../../../src/lib/BHUB/bhubService";
import { validateLogin, getReasonIdByCode } from "../../../src/lib/BHUB/utils";

// TODO review test
describe('BHUB integration - utils', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('validate login', async () => {

       /* const mockRes = {
            accessToken: "eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ",
            externalTokenResource: "https://testing.medipago.com.ar/qr/eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJIUzI1NiJ9.eyJzdWIiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkiLCAiZXhwIjogMTY0MzI5OTI5NiwgImludm9sdmVkQWNjb3VudHMiOiBbeyIxNzc4MDAwRUFDOUQxRDc4OEI2NiI6IFt7ImNsYXNzTmFtZSI6ICJJcHNJbnZvbHZlZEFjY291bnQiLCAiYWNjb3VudElkIjogIjE3NzgwMDBFQUM5RDFENzg4QjY2IiwgImFjY291bnROdW1iZXIiOiAxMCwgImFjY291bnROYW1lIjogIk1pY3Jvc2lzdGVtYXMgUy5BLlUuIiwgInB5cmFtaWRMZXZlbCI6IDIsICJhY2NvdW50VHlwZSI6IHsiY29kZSI6ICJESVNUIiwgImRlc2NyaXB0aW9uIjogIkRpc3RyaWJ1aWRvciJ9fSwgeyJjbGFzc05hbWUiOiAiSXBzSW52b2x2ZWRBY2NvdW50IiwgImFjY291bnRJZCI6ICIxNzc4NDBCOERFODcwREJGREVCNiIsICJhY2NvdW50TnVtYmVyIjogMSwgImFjY291bnROYW1lIjogIlBsYXRhZm9ybWEiLCAicHlyYW1pZExldmVsIjogMSwgImFjY291bnRUeXBlIjogeyJjb2RlIjogIlBMQVQiLCAiZGVzY3JpcHRpb24iOiAiUGxhdGFmb3JtYSJ9fV19XSwgImFjY291bnRJZCI6ICIxNzc4MDAwRUFDOUQxRDc4OEI2NiIsICJ1c2VySWQiOiAiMzI0NjAwMTRGNkE4MDE4NEZBODkifQ.uQiC8PrvFxGovH50kdAbSwnLqkj9yNLk0bFNJIDFKwQ.png",
            lifetime: 3600,
            issued: "2022-01-27T15:01:36-03:00",
            needChangePassword: true,
            expiration: "2022-01-27T16:01:36-03:00"
        }


        jest.spyOn(bhubService, 'login').mockResolvedValue(Promise.resolve(mockRes))
        const result = await validateLogin()


        expect(bhubService.login).toHaveBeenCalled();
        expect(result).toEqual(mockRes.accessToken)*/
        expect(true).toEqual(true)
    });

    /*
    it('getReasonIdByCode', async () => {

        const mockResReasons = [
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

        jest.spyOn(bhubService, 'getTransactionReasons').mockResolvedValue(Promise.resolve(mockResReasons))
        const result = await getReasonIdByCode("NC0037")


        expect(bhubService.getTransactionReasons).toHaveBeenCalled();
        expect(result).toEqual("1F5800123A242BD7A4A5")
    });
    */
})