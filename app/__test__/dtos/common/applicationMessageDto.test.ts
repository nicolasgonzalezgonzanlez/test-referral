import { applicationMessageDto } from "../../../src/dtos/common/applicationMessageDto";

describe("application message dto test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    it('application message dto / success', () => {
        const mockValue = { key: "1", message: "message 1", messageType: 1 }

        const dto = new applicationMessageDto('1', 'message 1', 1);
        expect(dto).toEqual(mockValue)
    })
})