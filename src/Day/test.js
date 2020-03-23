import React from 'react'
import { Day } from './index.js'
import renderer from 'react-test-renderer'

const date = new Date(2000, 0, 1)

describe('Day component', () => {
  test('Basic Day', () => {
    const component = renderer.create(<Day date={date} />)
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('Day with children', () => {
    const component = renderer.create(<Day date={date}>{'kids!'}</Day>)
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('Day with full props', () => {
    const component = renderer.create(
      <Day
        date={date}
        contentClassName={'ccn'}
        dateLabelClassName={'dlcn'}
        onClick={() => alert('clicked!')}
        rootClassName={'rcn'}
      >
        {'kids!'}
      </Day>
    )
    let tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
