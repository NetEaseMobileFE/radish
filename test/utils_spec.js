import { expect } from 'chai'
import jsdom from 'jsdom'
import { isAndroid, search, params, jsonp } from '../src/js/utils'
import * as types from '../src/js/action_type'
import {List, Map, fromJS} from 'immutable'

describe('Test utils', () => {
  it('should be an android device', () => {
    expect(isAndroid).to.equal(true)
  })
  it('should return params', () => {
    expect(params).to.eql({
      roomId: 'roomid',
      videoId: 'videoid',
      anchorId: 'anchorid'
    })
  })
  it('should return search', () => {
    expect(search).to.eql({
      param1: "1",
      param2: "2"
    })
  })
  it('should handle jsonp request', () => {
    jsonp({
      src: '11',
      callback: 'jsonp'
    }).then((data) => {
      expect(data).to.eql({ a: 1 })
    })
    global.window.jsonp({ a: 1 })
  })
})