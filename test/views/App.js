import React from 'react'
import { shallow } from 'enzyme'
import assert from 'assert'
import UI from '../../src/views'

// unit tests for the App component
describe('UI component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<UI />)
      assert.equal(wrapper.length, 1)
    })
  })
})
