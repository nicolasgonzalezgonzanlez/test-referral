const Validator = require('validatorjs')
import { validationMessages } from '../constants/validation/validationMessages'

const validator = (body: any, rules: any, customMessages: any, callback: any) => {
    const validation = new Validator(body, rules, validationMessages.common.error);

    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export default validator;