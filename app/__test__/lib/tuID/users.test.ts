import { axiosInstanceTuId } from "../../../src/lib/common/axiosInstance";
import { login } from "../../../src/lib/tuID/users";
import { AES, enc } from "crypto-js";

describe('TuID integration', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('TuId login - success', async () => {

        const mockResToken = {
            data: {
                access_token: "76434420119feb4d81e0cc1afcb4de4bd84d628dde8170f1aba593c2dfa1ab79",
                expires_in: 3600,
                expires_at: 1643319362,
                scopes: "auth",
                status: "Success",
                success: true
            }
        }

        const mockRes = {
            data: {
                status: "Success",
                success: true,
                message: "Login successful",
                totalSize: 2,
                records: {
                    user: [
                        {
                            dn: "cn=FIN000001,ou=Personas,ou=Usuarios,o=Telecom",
                            uid: "FIN000001",
                            fullname: "test test",
                            givenname: "test",
                            sn: "test",
                            mail: "test@test.COM"
                        }
                    ],
                    roles: [
                        {
                            dn: "cn=test,cn=Back",
                            tvaluev: "admin",
                            tname: "Administrador",
                            tsystemname: "Personal Pay - Backo QA",
                            tapplicationname: "Back Office"
                        }
                    ],
                    status: true
                },
                requested_uri: "/api/v2/users/tuid/auth"
            }
        }

        const mockResponse = {
            data: {
                access_token: "76434420119feb4d81e0cc1afcb4de4bd84d628dde8170f1aba593c2dfa1ab79",
                expires_at: 1643319362,
                expires_in: 3600,
                scopes: "auth",
                status: "Success",
                success: true
            },
            tuIdUser: {
                message: "Login successful",
                records: {
                    roles: [{
                        dn: "cn=test,cn=Back",
                        tapplicationname: "Back Office",
                        tname: "Administrador",
                        tsystemname: "Personal Pay - Backo QA",
                        tvaluev: "admin"
                    }],
                    status: true, user: [
                        {
                            dn: "cn=FIN000001,ou=Personas,ou=Usuarios,o=Telecom",
                            uid: "FIN000001",
                            fullname: "test test",
                            givenname: "test",
                            sn: "test",
                            mail: "test@test.COM"
                        }
                    ]
                },
                requested_uri: "/api/v2/users/tuid/auth",
                status: "Success",
                success: true, totalSize: 2
            }
        }

        jest.spyOn(AES, 'decrypt').mockResolvedValue("test" as never)
        jest.spyOn(axiosInstanceTuId, 'get').mockResolvedValue(mockResToken);
        jest.spyOn(axiosInstanceTuId, 'post').mockResolvedValue(mockRes);

        const result = await login("test", "test")


        expect(axiosInstanceTuId.get).toHaveBeenCalled();
        expect(axiosInstanceTuId.post).toHaveBeenCalled();

        expect(result).toEqual(mockResponse)
    });

    it('TuID Login - fail', async () => {

        const mockRes = {
            response: {
                data: "error in tuid login",
                status: 500,
            }
        }

        jest.spyOn(axiosInstanceTuId, 'get').mockRejectedValue(mockRes);

        login("test", "test").then().catch(err => expect(login).toThrowError())

        expect(axiosInstanceTuId.get).toHaveBeenCalled();
    });

});
