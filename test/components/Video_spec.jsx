import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Video from '../../src/js/components/Video'
import { Map, fromJS } from 'immutable'

describe('Live video', () => {
  const video = Map({
    url: 'http://bmw2.thefront.com.cn/m2_2016/media/final.mp4',
    cover: 'http://bmw2.static.thefront.com.cn/2016/m2_2016/img/masker.jpg',
    status: 1,
    favour: 1000,
    playing: false
  })
  const barrage = fromJS({
    connected: false,
    list: []
  })
  it('should have android class when props.android is true', () => {
    const app = shallow(<Video isAndroid video={video} />)
    expect(app.find('.video-wrap').hasClass('android')).to.equal(true)
  })
  it('should be a replay when video`s status is 5 ', () => {
    const app = shallow(<Video video={video.set('status', 5)} />)
    expect(app.find('.status')).to.have.length(1)
    expect(app.find('.btn-pause')).to.have.length(1)
    expect(app.find('.btn-pause').hasClass('paused')).to.equal(true)

  })
  it('should not have paused class when video`s playing is true', () => {
    const app = shallow(<Video isAndroid={false} video={video.set('playing', true).set('status', 5)} />)
    expect(app.find('.btn-pause')).to.have.length(1)
    expect(app.find('.btn-pause').hasClass('paused')).to.equal(false)
  })
  it('should be a live  when video`s status is 1 ', () => {
    const app = shallow(<Video video={video.set('status', 1)} />)
    expect(app.find('.count')).to.have.length(1)
    expect(app.find('.btn-pause')).to.have.length(0)
    expect(app.find('.status')).to.have.length(0)
  })
  
})
