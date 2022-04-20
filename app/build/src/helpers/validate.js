"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator = require('validatorjs');
const validationMessages_1 = require("../constants/validation/validationMessages");
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, validationMessages_1.validationMessages.common.error);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
exports.default = validator;
