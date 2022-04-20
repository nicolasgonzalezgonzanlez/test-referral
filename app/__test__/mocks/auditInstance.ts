export const mockAuditInstance = () => {
    return {
        row_status: true,
        created_by: "MOCK_USER",
        updated_by: null,
        create_date: new Date('2021-12-09T05:07:19.846Z'),
        updated_date: null,
    };
}

export const mockAuditUpdInstance = () => {
    return {
        updated_by: "MOCK_USER",
        updated_date: new Date('2021-12-09T05:07:19.846Z'),
    };
}