import { axiosInstanceClient } from "../../../src/lib/common/axiosInstance";
import { getUserInfo } from "../../../src/lib/client/clientService";

describe('Client Service integration', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('Get User Info - success', async () => {

        const mockRes = {
            data: {
                user: {
                    document: {
                        number: "123456789"
                    }
                }
            }
        }

        const mockResponse = {
            user: {
                document: {
                    number: "123456789"
                }
            }
        }

        jest.spyOn(axiosInstanceClient, 'get').mockResolvedValue(mockRes);

        const result = await getUserInfo("test")


        expect(axiosInstanceClient.get).toHaveBeenCalled();

        expect(result).toEqual(mockResponse)
    });

    it('TuID Login - fail', async () => {

        const mockRes = {
            response: {
                data: "error in tuid login",
                status: 500,
            }
        }

        jest.spyOn(axiosInstanceClient, 'get').mockRejectedValue(mockRes);

        getUserInfo("test").then().catch(err => expect(getUserInfo).toThrowError())

        expect(axiosInstanceClient.get).toHaveBeenCalled();
    });

});
