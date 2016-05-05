import { shallow } from 'enzyme'
import { expect } from 'chai'
import Download from '../../src/js/components/Download'
import React from 'react'

describe('Download Header', () => {
  it('should have fixed class when props.fixed is true', () => {
    const app = shallow(<Download fixed />)
    expect(app.find('.g-header').hasClass('fixed')).to.equal(true)
  })
})