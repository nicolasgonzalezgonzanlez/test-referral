import { axiosInstanceCPersonal } from "../../../src/lib/common/axiosInstance";
import { patchEquivalencyCode } from "../../../src/lib/clubPersonal/clubPersonalIntegration";
import fintechClientsService from "../../../src/services/fintechClientsService";

describe('Club Personal integration', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('Club Personal patchEquivalencyCode - success', async () => {

        const mockRes = {
            data: {
                discountCode: "6369020084187589",
                discountName: "Combo Alitas",
                discountId: "5cbe0a39cca9e05a580f5e36",
                partner: "KFC",
                days: [
                    'DOMINGO',
                    'LUNES',
                    'MARTES',
                    'MIERCOLES',
                    'JUEVES',
                    'VIERNES',
                    'SABADO'
                ],
                validTo: "2021-12-31T00:00:00.000Z",
                ValidFor: {
                    startDateTime: "2022-01-27T19:18:14.457Z",
                    endDateTime: ""
                },
                discountPerUser: {
                    typeUser: "BLACK",
                    desc: "30%"
                },
                discountText: ""
            }
        }

        const mockClientServiceRes = {
            clientId: "test",
            email: "test@test",
            document: {
                firstName: "GUILLERMO",
                lastName: "PAEZ",
                number: "22588969",
                country: "ARG",
                birthdate: "1972-01-12",
                gender: "M",
                nationality: "ARG",
                expiration: "2029-01-07"
            },
            phone: {
                country: "+54",
                number: "1127792625",
                e164: "+541127792625",
                validatedAt: "2021-02-08T18:29:35.875Z"
            }
        }


        jest.spyOn(fintechClientsService, "fintechClientsService").mockResolvedValue(mockClientServiceRes)
        jest.spyOn(axiosInstanceCPersonal, 'patch').mockResolvedValue(mockRes);
        const result = await patchEquivalencyCode("test", "test")


        expect(fintechClientsService.fintechClientsService).toHaveBeenCalled();
        expect(result).toEqual(undefined)
    });

    it('Club Personal patchEquivalencyCode - fail', async () => {

        const mockRes = {
            response: {
                data: "error in bhub postTransaction",
                status: 500,
                message: "Socio no existente en UserChannels."
            }
        }

        const mockClientServiceRes = {
            clientId: "test",
            email: "test@test",
            document: {
                firstName: "GUILLERMO",
                lastName: "PAEZ",
                number: "22588969",
                country: "ARG",
                birthdate: "1972-01-12",
                gender: "M",
                nationality: "ARG",
                expiration: "2029-01-07"
            },
            phone: {
                country: "+54",
                number: "1127792625",
                e164: "+541127792625",
                validatedAt: "2021-02-08T18:29:35.875Z"
            }
        }


        jest.spyOn(fintechClientsService, "fintechClientsService").mockResolvedValue(mockClientServiceRes)
        jest.spyOn(axiosInstanceCPersonal, 'patch').mockRejectedValue(mockRes);
        const result = await patchEquivalencyCode("test", "test")

        patchEquivalencyCode("test", "test").then().catch(err => expect(patchEquivalencyCode).toThrowError())

        expect(fintechClientsService.fintechClientsService).toHaveBeenCalled();
    });

});
