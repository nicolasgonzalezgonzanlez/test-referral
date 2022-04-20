import { applicationMessageDto } from './applicationMessageDto';
import { applicationMessageTypeDto } from './applicationMessageTypeDto';
export interface iResponseDto {
    verifyIsValid():void;
}
export class responseDto implements iResponseDto {
    
    messages: applicationMessageDto[] = [];
    isValid: boolean = this.getIsValid();
    constructor(messages?:applicationMessageDto[] ) {
        if(messages){
            this.messages = messages;
        }            
    }

    create(messages: applicationMessageDto[] = []): responseDto
    {
        return new responseDto(messages);
    }

    createOne(message: applicationMessageDto)
    {
        if (message == null)
            return this.create();
        return this.create([{ ...message}]);
    }

    createWithData<T>(data: T): responseResultDto<T>
    {
        return this.createData(data, []);
    }

    createGeneric<T>(message: applicationMessageDto): responseResultDto<T>
    {
        let data = {} as unknown as T;
        if (!message){
            return this.createWithData(data);
        }                

        return this.createData(data, [{ ...message }]);
    }

    createData<T>(data:T, messages: applicationMessageDto[] = [])
    {
        return new responseResultDto<T>(data, messages);
    }

    verifyIsValid():void {
        this.isValid = this.getIsValid();
    }

    getIsValid(): boolean {
        return !(this.messages.filter(m=>m.messageType===applicationMessageTypeDto.Error).length>0);
    }
  }
  
  export class responseResultDto<T> extends responseDto {  
      data: T = {} as unknown as T;
      constructor(data?: T, messages?: applicationMessageDto[]){
        super(messages);
        if(data){
            this.data = data;
        }            
      }
  }

