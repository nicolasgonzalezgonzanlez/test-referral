"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const process_1 = __importDefault(require("process"));
const log_1 = require("../constants/log");
const logger = require('@telecom-argentina/logger');
const pkg = require('../../package.json');
// On server internal error.
const onServerError = () => logger.error({ message: `Server error` });
// On server start.
const onListen = (port) => {
    logger.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name}`);
    logger.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
};
// When the process receive kill signal.
const onProcessKill = (server) => {
    logger.info(log_1.messages.events.info.onProcessKillMessage);
    setTimeout(() => {
        logger.info(log_1.messages.events.info.finishServer);
        server.close(() => process_1.default.exit(0));
    }, 180);
};
// When in the server happen a uncaugth exception.
const onException = (err) => logger.error({ message: err });
const modules = {
    onListen,
    onProcessKill,
    onServerError,
    onException,
};
module.exports = modules;
