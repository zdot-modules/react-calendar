import React from 'react'
import Calendar from './index.js'
import renderer from 'react-test-renderer'

describe('Main calendar', () => {
  test('Basic Calendar without a provided date', () => {
    const component = renderer.create(<Calendar />)
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('Basic Calendar with a provided date', () => {
    const component = renderer.create(
      <Calendar date={new Date(2010, 10, 10)} />
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
