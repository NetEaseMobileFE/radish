import { expect } from 'chai'
import reducer from '../src/js/reducer'
import * as types from '../src/js/constants'
import {List, Map, fromJS} from 'immutable';

describe('Test reducer', () => {
  const initialState = fromJS({
    anchor: {},
    room: {},
    video: {},
    hot: []
  })
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState)
  })
  it('should handle FETCH_ANCHOR', () => {
    expect(reducer(undefined, {
      type: types.FETCH_ANCHOR, 
      anchorId: 'anchorId'
    })).to.eql(initialState.set('anchor', Map({ anchorId: 'anchorId' })))
  })
  it('should handle PLAY_VIDEO', () => {
    let status = true
    expect(reducer(undefined, {
      type: types.PLAY_VIDEO,
      status
    })).to.eql(initialState.setIn(['video', 'playing'], status))
    status = false
    expect(reducer(undefined, {
      type: types.PLAY_VIDEO,
      status
    })).to.eql(initialState.setIn(['video', 'playing'], status))
  })
})