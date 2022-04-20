export abstract class audit {
    created_by?: string;
    updated_by?: string | null;
    create_date?: Date;
    updated_date?: Date | null;
    row_status?: boolean;
}

