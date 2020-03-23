import { getWeeksInMonth } from './index.js'

describe('date-time', () => {
  test('getWeeksInMonth', () => {
    const date1 = new Date(2020, 1, 1)
    const date2 = new Date(2000, 11, 1)
    const date3 = new Date(2020, 11, 1)
    expect(getWeeksInMonth(date1)).toBe(5)
    expect(getWeeksInMonth(date2)).toBe(6)
    expect(getWeeksInMonth(date3)).toBe(5)
  })
})
