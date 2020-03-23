import React from 'react'
import { Week } from './index.js'
import renderer from 'react-test-renderer'

const date = new Date(2000, 0, 1)
const monthDate = new Date(2000, 1, 1)
const Day = () => 'day comp'

describe('Week component', () => {
  test('Basic Week', () => {
    const component = renderer.create(
      <Week date={date} displayForMonth={monthDate} />
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('Week with Day component', () => {
    const component = renderer.create(
      <Week date={date} displayForMonth={monthDate} DayComponent={Day} />
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('Week with full props', () => {
    const component = renderer.create(
      <Week
        date={date}
        displayForMonth={monthDate}
        DayComponent={Day}
        rootClassName={'rcn'}
      />
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
