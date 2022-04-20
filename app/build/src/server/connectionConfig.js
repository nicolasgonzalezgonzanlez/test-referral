"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionConfig = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
const schemas_1 = require("../infraestructure/schemas");
const connectionConfig = () => {
    const AppDataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, config_1.default.sqlDb), { entities: [schemas_1.applicationSettingsSchema] }));
    AppDataSource.initialize()
        .then(() => {
        console.log('Data Source has been initialized!');
    })
        .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
    return AppDataSource;
};
exports.connectionConfig = connectionConfig;
