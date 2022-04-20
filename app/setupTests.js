const utils = require('./src/helpers/util')
const auditInstanceMocks = require('./__test__/mocks/auditInstance')

jest.mock('./src/swagger.json', () => ({
  host: 'someHost'
}), { virtual: true })

jest.spyOn(utils, 'getCurrentUser').mockImplementation(() => 'MOCK_USER')
jest.spyOn(utils, 'auditInstance').mockImplementation(() => auditInstanceMocks.mockAuditInstance())
jest.spyOn(utils, 'auditUpdInstance').mockImplementation(() => auditInstanceMocks.mockAuditUpdInstance())