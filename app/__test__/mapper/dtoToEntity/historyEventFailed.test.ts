import { mockAuditInstance } from "../../mocks/auditInstance"
import { historyEventFailedDto } from "../../../src/dtos/historyEventFailed/historyEventFailedDto"
import { failureType } from "../../../src/helpers/enums/failureType"
import { historyEventFailed } from "../../../src/infraestructure/entities"
import { historyEventFailedDtoToEntity } from "../../../src/mapper/dtoToEntity/historyEventFailed"

describe('History event failed dto to entity mapper', () => {
    it('should convert a dto to an entity successfully', () => {
        const expectedResult = {
            request_message: 'string',
            client_id: 'string',
            promotion_id: 1,
            failure_type: failureType.RuleEvaluator,
            response_message: undefined,
            ...mockAuditInstance()
        } as historyEventFailed
        const dto = {
            requestMessage: 'string',
            clientId: 'string',
            promotionId: 1,
            failureType: failureType.RuleEvaluator,
        } as historyEventFailedDto

        const entity = historyEventFailedDtoToEntity(dto)

        expect(entity).toEqual(expectedResult)
    })
})