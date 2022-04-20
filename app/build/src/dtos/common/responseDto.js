"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseResultDto = exports.responseDto = void 0;
const applicationMessageTypeDto_1 = require("./applicationMessageTypeDto");
class responseDto {
    constructor(messages) {
        this.messages = [];
        this.isValid = this.getIsValid();
        if (messages) {
            this.messages = messages;
        }
    }
    create(messages = []) {
        return new responseDto(messages);
    }
    createOne(message) {
        if (message == null)
            return this.create();
        return this.create([Object.assign({}, message)]);
    }
    createWithData(data) {
        return this.createData(data, []);
    }
    createGeneric(message) {
        let data = {};
        if (!message) {
            return this.createWithData(data);
        }
        return this.createData(data, [Object.assign({}, message)]);
    }
    createData(data, messages = []) {
        return new responseResultDto(data, messages);
    }
    verifyIsValid() {
        this.isValid = this.getIsValid();
    }
    getIsValid() {
        return !(this.messages.filter(m => m.messageType === applicationMessageTypeDto_1.applicationMessageTypeDto.Error).length > 0);
    }
}
exports.responseDto = responseDto;
class responseResultDto extends responseDto {
    constructor(data, messages) {
        super(messages);
        this.data = {};
        if (data) {
            this.data = data;
        }
    }
}
exports.responseResultDto = responseResultDto;
