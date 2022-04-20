import { authResponse } from '../../src/dtos/auth/authResponseDto';
import { authService } from '../../src/services';
import * as log from "../../src/lib/tuID/users";
import jwt from "jwt-simple";
import { validationMessages } from '../../src/constants/validation';
import { applicationMessageTypeDto } from '../../src/dtos/common';
import config from '../../src/config/index'
import { TuIDLoginResponse } from '../../src/lib/tuID/types';

jest.mock('crypto-js', () => {
    return {
        AES: {
            decrypt: jest.fn(() => 'test')
        },
        enc: jest.fn().mockReturnThis(),
    };
});

jest.mock('../../src/config/index.ts', () => {
    const originalConfig = jest.requireActual('../../src/config/index.ts')

    return {
        ...originalConfig,
        axiosTuID: {
            secret: 'secreto'
        }
    }
})

describe('Auth Service', () => {


    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should login a user successfully', async () => {
        const mockRes = new authResponse({
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJOYW1lIjoidGVzdCIsImV4cGlyZXNJbiI6OTk5OTk5LCJleHBpcmVzQXQiOjk5OTk5OSwidHVJZFRva2VuIjoic3RyaW5nIiwic2NvcGVzIjoic3RyaW5nIiwicm9sZXMiOlsic3RyaW5nIl0sInVzZXIiOnsiZnVsbG5hbWUiOiJzdHJpbmciLCJnaXZlbm5hbWUiOiJzdHJpbmciLCJ1aWQiOiJzdHJpbmciLCJtYWlsIjoic3RyaW5nIn19.NZdcl8Ju5c9JRlJisuF875aIIXq1gHRAcGx_q6IvbT0",
        })

        const mockTuidRes = {
            data: {
                access_token: "string",
                expires_in: 999999,
                expires_at: 999999,
                scopes: "string",
                status: "string",
                success: true
            },
            tuIdUser: {
                status: "string",
                success: true,
                message: "string",
                totalSize: 2,
                records: {
                    user: [{
                        dn: "string",
                        uid: "string",
                        fullname: "string",
                        givenname: "string",
                        sn: "string",
                        mail: "string"
                    }],
                    roles: [{
                        dn: "string",
                        tvalue: "string",
                        tname: "string",
                        tsystemname: "string",
                        tapplicationname: "string"
                    }],
                    status: true,
                },
                requested_uri: "string"
            }
        }
        jest.spyOn(jwt, 'encode').mockReturnValue("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJOYW1lIjoidGVzdCIsImV4cGlyZXNJbiI6OTk5OTk5LCJleHBpcmVzQXQiOjk5OTk5OSwidHVJZFRva2VuIjoic3RyaW5nIiwic2NvcGVzIjoic3RyaW5nIiwicm9sZXMiOlsic3RyaW5nIl0sInVzZXIiOnsiZnVsbG5hbWUiOiJzdHJpbmciLCJnaXZlbm5hbWUiOiJzdHJpbmciLCJ1aWQiOiJzdHJpbmciLCJtYWlsIjoic3RyaW5nIn19.NZdcl8Ju5c9JRlJisuF875aIIXq1gHRAcGx_q6IvbT0" as never);
        jest.spyOn(log, 'login').mockResolvedValue(mockTuidRes);

        const result = await authService.loginService("test", "test");

        expect(result).toEqual(mockRes);
    });

    it('should failed login when tuID login fails', async () => {
        const mockRes = new authResponse(null)
        mockRes.messages = [{ key: '', message: validationMessages.user.wrongPassword, messageType: applicationMessageTypeDto.Error }]
        mockRes.isValid = false

        const mockTuIdResponse = {
            data: null,
            tuIdUser: null
        }

        jest.spyOn(log, 'login').mockImplementation(() => Promise.resolve(mockTuIdResponse))

        const result = await authService.loginService("test", "test");

        expect(result).toEqual(mockRes);
        expect(log.login).toHaveBeenNthCalledWith(1, "test", 'test')
    });

    it('should create a token successfully', async () => {

        const mockTuidRes = {
            data: {
                access_token: "string",
                expires_in: 999999,
                expires_at: 999999,
                scopes: "string",
                status: "string",
                success: true
            },
            tuIdUser: {
                status: "string",
                success: true,
                message: "string",
                totalSize: 2,
                records: {
                    user: [{
                        dn: "string",
                        uid: "string",
                        fullname: "string",
                        givenname: "string",
                        sn: "string",
                        mail: "string"
                    }],
                    roles: [{
                        dn: "string",
                        tvalue: "string",
                        tname: "string",
                        tsystemname: "string",
                        tapplicationname: "string"
                    }],
                    status: true,
                },
                requested_uri: "string"
            }
        }

        const result = await authService.createToken(mockTuidRes.data, mockTuidRes.tuIdUser)

        expect(typeof result).toBe('string')
        expect(result).not.toBeFalsy()
    })

    it('should create a token successfully without roles', async () => {

        const mockTuidRes = {
            data: {
                access_token: "string",
                expires_in: 999999,
                expires_at: 999999,
                scopes: "string",
                status: "string",
                success: true
            },
            tuIdUser: {
                status: "string",
                success: true,
                message: "string",
                totalSize: 2,
                requested_uri: "string"
            } as TuIDLoginResponse
        }

        const result = await authService.createToken(mockTuidRes.data, mockTuidRes.tuIdUser)

        expect(typeof result).toBe('string')
        expect(result).not.toBeFalsy()
    })
});
