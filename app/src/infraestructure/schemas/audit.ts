import {EntitySchemaColumnOptions} from "typeorm";

export const AuditColumnSchemaPart = {
    row_status: {
        type: Boolean,
        nullable: true,
    } as EntitySchemaColumnOptions,
    created_by: {
        type: String,
        length: 100,
        nullable: false,
    } as EntitySchemaColumnOptions,
    updated_by: {
        type: String,
        length: 100,
        nullable: true,
    } as EntitySchemaColumnOptions,
    create_date: {
        type: Date,
        nullable: false,
    },
    updated_date: {
        type: Date,
        nullable: true,
    } as EntitySchemaColumnOptions
};

export default AuditColumnSchemaPart;