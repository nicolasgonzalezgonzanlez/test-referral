"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { errorHandler } = require('@telecom-argentina/microservice-middlewares');
const authRestrict_1 = require("./authRestrict");
const notFound_1 = __importDefault(require("./notFound"));
const modules = { notFound: notFound_1.default, errorHandler, authRestrict: authRestrict_1.authRestrict };
module.exports = modules;
