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
//import { getTransactionTrackingRepository } from '../infraestructure/repository/transactionTrackingRepository';
//import {UserRepository} from '../infraestructure/repository/applicationSettingsRepository'
const applicationSettingsRepository_1 = require("../infraestructure/repository/applicationSettingsRepository");
const repository = new applicationSettingsRepository_1.applicationSettingsRepository();
const insertApplicationSetting = (applicationSettings) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield repository.insertApplicationSettings(applicationSettings);
    return response;
});
const getAllApplicationSetting = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield repository.getAll();
    return response;
});
module.exports = { insertApplicationSetting, getAllApplicationSetting };
