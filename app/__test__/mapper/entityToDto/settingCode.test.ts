import { settingCode } from '../../../src/infraestructure/entities';
import { mockAuditInstance } from '../../mocks/auditInstance';
import { settingCodeEntityToDto } from '../../../src/mapper/entityToDTO';
import { settingCodeResponseDto } from '../../../src/dtos/settingCode/settingCodeResponseDto';

describe('Entity to dto Mapper', () => {

    describe('setting code dto to entity', () => {
        it('should convert dto to an entity successfully', () => {
            const entity: settingCode = {
                name: 'nombre',
                code: 'code',
                setting_code_id: 4,
                ...mockAuditInstance()
            } as settingCode
            const expected: settingCodeResponseDto = {
                settingCodeId: 4,
                name: 'nombre',
                code: 'code'
            }

            const response = settingCodeEntityToDto(entity)

            expect(response).toEqual(expected)
            expect(response).not.toHaveProperty('row_status', true)
            expect(response).not.toHaveProperty('created_by', "MOCK_USER")
        })
    })
})