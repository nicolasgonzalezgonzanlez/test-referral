import { fintechClientsService } from '../../src/services';
import { fintechClientsResponseDto, fintechClientsResponse } from '../../src/dtos/fintechClients/fintechClientsResponseDto';
import { responseDto } from '../../src/dtos/common'
import * as fintechClientsRepository from '../../src/infraestructure/repository/fintechClientsRepository';
import * as client from '../../src/lib/client/clientService';

describe('Type Limit service', () => {
    let repository: fintechClientsRepository.repository
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repository = new fintechClientsRepository.repository()
        jest.spyOn(fintechClientsRepository, 'getFintechClientsRepository').mockImplementation(() => repository)
    });

    it('should get a user info from our db', async () => {
        const mockResponse = {
            clientId: "test",
            email: "test@test.com",
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
        } as fintechClientsResponseDto;

        const mockclientResponse = {
            client_id: "test",
            email: "test@test.com",
            document: "1232345456",
            phone: "123345456"
        }

        jest.spyOn(repository, 'getFintechClientById').mockImplementation(() => Promise.resolve(mockResponse));
        jest.spyOn(repository, 'createFintechClients').mockImplementation(() => Promise.resolve(mockResponse));
        jest.spyOn(client, 'getUserInfo').mockImplementation(() => Promise.resolve(mockclientResponse));

        const result = await fintechClientsService.fintechClientsService("test");

        expect(result).toEqual(mockResponse);
        expect(repository.getFintechClientById).toHaveBeenCalledTimes(1)
        expect(repository.createFintechClients).toHaveBeenCalledTimes(0)
    });

    it('should register a new user in our db', async () => {
        const mockResponse = null
        const mockCreateResponse = {
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
        } as fintechClientsResponseDto;

        jest.spyOn(repository, 'getFintechClientById').mockImplementation(() => Promise.resolve(mockResponse));
        jest.spyOn(repository, 'createFintechClients').mockImplementation(() => Promise.resolve(mockCreateResponse));

        const result = await fintechClientsService.fintechClientsService("test");

        expect(result).toEqual(mockCreateResponse);
        expect(repository.getFintechClientById).toHaveBeenCalledTimes(1)
        expect(repository.createFintechClients).toHaveBeenCalledTimes(1)

    });
});
