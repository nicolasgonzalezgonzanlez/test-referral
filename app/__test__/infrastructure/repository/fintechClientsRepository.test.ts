import { repository } from '../../../src/infraestructure/repository/fintechClientsRepository';
import { fintechClientsResponseDto, allFintechClientsResponse, fintechClientsResponse } from '../../../src/dtos/fintechClients/fintechClientsResponseDto';
import { responseDto } from '../../../src/dtos/common';
import { fintechClients } from '../../../src/infraestructure/entities';
import { validationMessages } from '../../../src/constants/validation';

describe('Fintech Clients repository', () => {
    let repo: repository;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        repo = new repository();
    });
    it('should get all fintech clients', async () => {
        const mockDbResponse = [{
            client_id: "test",
            email: "test@test.com",
            document: '{"firstName":"GUILLERMO","lastName":"PAEZ","number":"22588969","country":"ARG","birthdate":"1972-01-12","gender":"M","nationality":"ARG","expiration":"2029-01-07"}',
            phone: '{"country":"+54","number":"1127792625","e164":"+541127792625","validatedAt":"2021-02-08T18:29:35.875Z"}'
        },
        {
            client_id: "test2",
            email: "test2@test.com",
                document: '{"firstName":"GUILLERMO","lastName":"PAEZ","number":"22588969","country":"ARG","birthdate":"1972-01-12","gender":"M","nationality":"ARG","expiration":"2029-01-07"}',
                phone: '{"country":"+54","number":"1127792625","e164":"+541127792625","validatedAt":"2021-02-08T18:29:35.875Z"}'
            }] as unknown as fintechClients[];
        const mockResponse = [{
            clientId: 'test',
            email: 'test@test.com',
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
        },
        {
            clientId: "test2",
            email: "test2@test.com",
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
            }] as unknown as fintechClientsResponseDto[];

        jest.spyOn(repo, 'find').mockResolvedValue(mockDbResponse);
        const result = await repo.getAllFintechClients();

        expect(result).toEqual(mockResponse);
    });

    it('should get a fintech client by clientId', async () => {
        const mockDbResponse = {
            client_id: "test",
            email: "test@test.com",
            document: '{"firstName":"GUILLERMO","lastName":"PAEZ","number":"22588969","country":"ARG","birthdate":"1972-01-12","gender":"M","nationality":"ARG","expiration":"2029-01-07"}',
            phone: '{"country":"+54","number":"1127792625","e164":"+541127792625","validatedAt":"2021-02-08T18:29:35.875Z"}'
        } as fintechClients;

        const mockResponse = {
            clientId: 'test',
            email: 'test@test.com',
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
        } as unknown as fintechClientsResponseDto;

        jest.spyOn(repo, 'findOne').mockImplementation(() => Promise.resolve(mockDbResponse));
        const result = await repo.getFintechClientById("test");

        expect(result).toEqual(mockResponse);
    });

    it('should create a new fintech client', async () => {
        const mockDbResponse = {
            client_id: "test",
            email: "test@test.com",
            document: '{"firstName":"GUILLERMO","lastName":"PAEZ","number":"22588969","country":"ARG","birthdate":"1972-01-12","gender":"M","nationality":"ARG","expiration":"2029-01-07"}',
            phone: '{"country":"+54","number":"1127792625","e164":"+541127792625","validatedAt":"2021-02-08T18:29:35.875Z"}'
        } as fintechClients;

        const mockResponse = {
            clientId: 'test',
            email: 'test@test.com',
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


        jest.spyOn(repo, 'create').mockImplementation(() => mockDbResponse);
        jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(mockDbResponse));

        const result = await repo.createFintechClients('test', 'test@test.com', '1234567788', '1232453546');

        expect(result).toEqual(mockResponse);
        expect(repo.create).toHaveBeenCalledTimes(1)
        expect(repo.save).toHaveBeenCalledTimes(1)
    });


});
