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
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSettingsRepository = exports.repository = void 0;
const applicationSettings_1 = require("../schemas/applicationSettings");
const connectionConfig_1 = require("../../server/connectionConfig");
exports.repository = (0, connectionConfig_1.connectionConfig)().getRepository(applicationSettings_1.applicationSettingsSchema);
class applicationSettingsRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.repository.find();
        });
    }
    insertApplicationSettings(applicationSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keys, value, tipo } = applicationSettings;
            const now = new Date();
            const res = yield exports.repository.createQueryBuilder()
                .insert()
                .into(applicationSettings_1.applicationSettingsSchema)
                .values({
                keys,
                value,
                tipo,
                created_by: 'nicotest',
                create_date: now,
                row_status: true
            })
                .execute();
            console.log(res);
            return true;
        });
    }
}
exports.applicationSettingsRepository = applicationSettingsRepository;
