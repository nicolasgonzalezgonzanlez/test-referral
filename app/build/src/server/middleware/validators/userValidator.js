"use strict";
const validator_1 = require("./validator");
const getUserValidation = (req, res, next) => {
    const validationRule = {
        "user_name": "max:150",
        "email": "max:200|email",
    };
    (0, validator_1.customValidator)(req, res, next, validationRule);
};
module.exports = getUserValidation;
