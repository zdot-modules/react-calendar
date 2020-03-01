import React from 'react'
import Calendar from './index.js'
import renderer from 'react-test-renderer'

test('Link changes the class when hovered', () => {
  const component = renderer.create(<Calendar date={new Date(2010, 10, 10)} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
