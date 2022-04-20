"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const statusCode_1 = require("../../constants/statusCode");
const applicationSettingsController_1 = __importDefault(require("../controller/applicationSettingsController"));
// @ts-ignore
//import logger from '@telecom-argentina/logger';
const router = (0, express_1.Router)();
const controller = new applicationSettingsController_1.default();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDto = yield controller.insertApplicationSettings(req.body);
        res.status(statusCode_1.ok).json(responseDto);
    }
    catch (ex) {
        next(ex);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDto = yield controller.getAllApplicationSettings();
        res.status(statusCode_1.ok).json(responseDto);
    }
    catch (ex) {
        next(ex);
    }
}));
module.exports = router;
