"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditColumnSchemaPart = void 0;
exports.AuditColumnSchemaPart = {
    row_status: {
        type: Boolean,
        nullable: true,
    },
    created_by: {
        type: String,
        length: 100,
        nullable: false,
    },
    updated_by: {
        type: String,
        length: 100,
        nullable: true,
    },
    create_date: {
        type: Date,
        nullable: false,
    },
    updated_date: {
        type: Date,
        nullable: true,
    }
};
exports.default = exports.AuditColumnSchemaPart;
