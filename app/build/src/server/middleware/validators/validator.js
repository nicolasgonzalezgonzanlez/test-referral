"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customValidatorForData = exports.customValidator = void 0;
const common_1 = require("../../../dtos/common");
const validate_1 = __importDefault(require("../../../helpers/validate"));
const errorParser = (err, customMessage) => {
    let k = typeof err === 'object' ? Object.keys(err.errors) : '';
    let arr = [];
    Object.values(err.errors).forEach((e, i) => {
        let key = k[i];
        let message = `${e}`;
        if (customMessage && customMessage.hasOwnProperty(key)) {
            message = customMessage[key];
        }
        arr.push({
            key,
            message,
            messageType: common_1.applicationMessageTypeDto.Error,
        });
    });
    return arr;
};
const customValidator = (req, res, next, rules, customMessage) => {
    (0, validate_1.default)(req.body, rules, {}, (err, status) => {
        if (!status) {
            let response = new common_1.responseDto(errorParser(err, customMessage));
            response.isValid = false;
            res.status(412).send(response);
        }
        else {
            next();
        }
    });
};
exports.customValidator = customValidator;
const customValidatorForData = (data, res, next, rules) => {
    (0, validate_1.default)(data, rules, {}, (err, status) => {
        if (!status) {
            let response = new common_1.responseDto(errorParser(err));
            response.isValid = false;
            res.status(412).send(response);
        }
        else {
            next();
        }
    });
};
exports.customValidatorForData = customValidatorForData;
