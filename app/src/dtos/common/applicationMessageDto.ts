import { applicationMessageTypeDto }  from './applicationMessageTypeDto';
export class applicationMessageDto {
    key: string= '';
    message: string = '';
    messageType: applicationMessageTypeDto = applicationMessageTypeDto.Success;

    constructor(key: string, message: string, messageType: applicationMessageTypeDto){
        this.key = key;
        this.message = message;
        this.messageType = messageType;
    }
}