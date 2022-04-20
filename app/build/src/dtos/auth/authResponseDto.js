"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResponse = exports.allAuthResponse = void 0;
const common_1 = require("../common");
class allAuthResponse extends common_1.responseDto {
    constructor(data, messages) {
        super(messages);
        this.data = {};
        if (data) {
            this.data = data;
        }
    }
}
exports.allAuthResponse = allAuthResponse;
class authResponse extends common_1.responseDto {
    constructor(data, messages) {
        super(messages);
        this.data = {};
        if (data) {
            this.data = data;
        }
    }
}
exports.authResponse = authResponse;
