import { settingCode } from '../../../src/infraestructure/entities';
import { settingCodeRequestDto } from "../../../src/dtos/settingCode/settingCodeRequestDto"
import { settingCodeDtoToEntity } from "../../../src/mapper/dtoToEntity"
import { mockAuditInstance, mockAuditUpdInstance } from '../../mocks/auditInstance';
import { settingCodeDtoUpdateToEntity } from '../../../src/mapper/dtoToEntity/settingCode';

describe('Dto to entity Mapper', () => {

    describe('setting code dto to entity', () => {
        it('should convert dto to an entity successfully', () => {
            const dto: settingCodeRequestDto = {
                name: 'nombre',
                code: 'code'
            }
            const expected: settingCode = {
                name: 'nombre',
                code: 'code',
                ...mockAuditInstance()
            } as settingCode

            const response = settingCodeDtoToEntity(dto)

            expect(response).toEqual(expected)
            expect(response).toHaveProperty('row_status', true)
            expect(response).toHaveProperty('created_by', "MOCK_USER")
        })
    })

    describe('setting code dto on update to entity', () => {
        it('should convert dto to an entity successfully', () => {
            const dto: settingCodeRequestDto = {
                name: 'nombre',
                code: 'code'
            }

            const expected: settingCode = {
                name: 'nombre',
                code: 'code',
                ...mockAuditUpdInstance()
            } as settingCode

            const response = settingCodeDtoUpdateToEntity(dto)

            expect(response).toEqual(expected)
            expect(response).toHaveProperty('updated_by', "MOCK_USER")
        })
    })
})