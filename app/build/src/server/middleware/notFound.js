"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// @ts-ignore
const logger_1 = __importDefault(require("@telecom-argentina/logger"));
/**
 * Not found controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const notFound = (req, res) => {
    logger_1.default.info({ url: req.url, method: req.method, message: `Not found` });
    res.status(404).json({ error: 'Route not found.' });
};
module.exports = notFound;
