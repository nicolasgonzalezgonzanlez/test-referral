import { applicationMessageDto, responseDto } from "../common";

export interface iAuthResponseDto {
    token?: string;
    hash?: string
}

export class allAuthResponse extends responseDto {

    data: iAuthResponseDto[] = {} as unknown as iAuthResponseDto[];
    constructor(data: iAuthResponseDto[], messages?: applicationMessageDto[]) {
        super(messages);
        if (data) {
            this.data = data;
        }
    }
}

export class authResponse extends responseDto {

    data: iAuthResponseDto = {} as unknown as iAuthResponseDto;
    constructor(data: iAuthResponseDto | null, messages?: applicationMessageDto[]) {
        super(messages);
        if (data) {
            this.data = data;
        }
    }
}
