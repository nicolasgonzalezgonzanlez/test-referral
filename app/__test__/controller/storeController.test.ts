import storeController from '../../src/server/controller/storeController';

describe('Store controller', () => {

    let controller: storeController;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        controller = new storeController();
    });


    it('GetAll Store Controller', async () => {
        const mockResponse: any =
            {
                messages: [],
                isValid: true,
                data: [
                    {
                        "name": "TEST",
                        "number": "0000"
                    },
                    {
                        "name": "STORE 1",
                        "number": "123456"
                    },
                    {
                        "name": "ABDUC",
                        "number": "HHHT"
                    }
                ]
            } as unknown as storeController;

        jest.spyOn(controller, 'getAllStores').mockImplementation(() => mockResponse);
        const result = await controller.getAllStores();

        expect(result).toEqual(mockResponse);
    });

});
