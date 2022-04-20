import { parseDays } from "../../src/helpers/util"

describe('utils file', () => {
    describe('parseDays', () => {
        it('should parse an array of two days', () => {
            const arrayDays = ['wednesday', 'monday']

            const result: string[] = parseDays(arrayDays)

            expect(result).toHaveLength(2)
            expect(result[0]).toEqual('Miércoles')
            expect(result[1]).toEqual('Lunes')
        })

        it('should return "Day to Day" format when array is >= 4 and has consecutives days', () => {
            const wedToSat = ['wednesday', 'thursday', 'friday', 'saturday']
            const monToFri = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

            const wedToSatResult: string[] = parseDays(wedToSat)
            const monToFriResult: string[] = parseDays(monToFri)
            
            expect(wedToSatResult).toHaveLength(1)
            expect(monToFriResult).toHaveLength(1)
            expect(wedToSatResult[0]).toEqual('Miércoles a Sábado')
            expect(monToFriResult[0]).toEqual('Lunes a Viernes')
        })

        it('should return "Todos los días" when array is full', () => {
            const arrayDays = ['wednesday', 'thursday', 'friday', 'saturday', 'monday', 'tuesday', 'sunday']

            const result: string[] = parseDays(arrayDays)
            
            expect(result).toHaveLength(1)
            expect(result[0]).toEqual('Todos los días')
        })
    })
})