"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSettingsSchema = void 0;
const typeorm_1 = require("typeorm");
const audit_1 = require("./audit");
exports.applicationSettingsSchema = new typeorm_1.EntitySchema({
    name: 'application_settings',
    columns: Object.assign({ keys: {
            type: String,
            length: 200,
            primary: true
        }, value: {
            type: String,
            length: 200,
        }, tipo: {
            type: String,
            length: 200,
        } }, audit_1.AuditColumnSchemaPart),
});
