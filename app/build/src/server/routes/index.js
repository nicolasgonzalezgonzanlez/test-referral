"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const health_1 = __importDefault(require("./health"));
const applicationSettings_routes_1 = __importDefault(require("./applicationSettings.routes"));
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.use('/health', health_1.default);
router.use('/api/applicationSettings', applicationSettings_routes_1.default);
router.use(middleware_1.errorHandler);
router.get('*', middleware_1.notFound);
module.exports = router;
