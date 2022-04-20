import { responseDto } from '../../../src/dtos/common/responseDto';

describe("response dto test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("create", () => {
        let messages = [{
            key: '1',
            message: 'message 1',
            messageType: 1
        }, {
            key: '2',
            message: 'message 2',
            messageType: 1
        }]

        let resMock = { isValid: true, messages: [{ key: "1", message: "message 1", messageType: 1 }, { key: "2", message: "message 2", messageType: 1 }] }

        const res = new responseDto
        expect(res.create(messages)).toEqual(resMock)
    })

    it("createOne", () => {
        let message = {
            key: '',
            message: '',
            messageType: 1
        }

        let resMock = { isValid: true, messages: [{ key: "", message: "", messageType: 1 }] }

        const res = new responseDto
        expect(res.createOne(message)).toEqual(resMock)
    })


    it("createWithData", () => {

        let data = {}

        let resMock = { data: {}, isValid: true, messages: [] }

        const res = new responseDto
        expect(res.createWithData(data)).toEqual(resMock)
    })

    it("createGeneric", () => {
        let messages = {
            key: '',
            message: '',
            messageType: 1
        }

        let resMock = { data: {}, isValid: true, messages: [{ key: "", message: "", messageType: 1 }] }

        const res = new responseDto
        expect(res.createGeneric(messages)).toEqual(resMock)
    })
})