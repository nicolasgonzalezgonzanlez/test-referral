"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMessageDto = void 0;
const applicationMessageTypeDto_1 = require("./applicationMessageTypeDto");
class applicationMessageDto {
    constructor(key, message, messageType) {
        this.key = '';
        this.message = '';
        this.messageType = applicationMessageTypeDto_1.applicationMessageTypeDto.Success;
        this.key = key;
        this.message = message;
        this.messageType = messageType;
    }
}
exports.applicationMessageDto = applicationMessageDto;
