import { expect } from 'chai'
import reducer from '../src/js/reducer'
import * as types from '../src/js/action_type'
import {List, Map, fromJS} from 'immutable';

describe('Test reducer', () => {
  const initialState = fromJS({
    barrage: {
      list: [],
      connected: false
    },
    anchor: {},
    video: {},
    hot: {
      list: [],
      loading: false
    }
  })
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState)
  })
  it('should handle FETCH_INFO', () => {
    const action = {
      type: types.FETCH_INFO,
      data: {
        data: {
          "anchor": {
            "avatar": "http://uc.douyutv.com/upload/avatar/001/18/47/73_avatar_small.jpg",
            "nickname": "主播昵称"
          },
          "video": {
            "url": "http://bmw2.thefront.com.cn/m2_2016/media/final.mp4",
            "cover": "http://imgsize.ph.126.net/?imgurl=http://img6.cache.netease.com/3g/2016/4/28/20160428143153833af.jpg_750x380x1x85.jpg&enlarge=true",
            "status": 1,
            "title": "视频标题"
          }
        },
        status: 'success'
      }
    }
    expect(reducer(undefined, action)).to.eql(initialState.merge(fromJS(action.data.data)))

  })
  it('should handle FETCH_HOT', () => {
    const action = {
      type: types.FETCH_HOT,
      videos: ['video1']
    }
    expect(reducer(initialState, action)).to.eql(initialState.setIn(['hot', 'list'], List(action.videos)))
    const initState = initialState.setIn(['hot', 'list'], List(['video0']))
    expect(reducer(initState, action).getIn(['hot', 'list'])).to.eql(List(['video0', 'video1']))

  })
  it('should handle PLAY_VIDEO', () => {
    let status = true
    const initial = initialState.setIn(['video', 'url'], 'mp4')
    expect(reducer(initial, {
      type: types.PLAY_VIDEO,
      status
    })).to.eql(initial.setIn(['video', 'playing'], status).setIn(['video', 'isPlayed'], true))
    status = false
    expect(reducer(initial, {
      type: types.PLAY_VIDEO,
      status
    })).to.eql(initial.setIn(['video', 'playing'], status).setIn(['video', 'isPlayed'], true))
  })
  it('should handle RECEIVE_BARRAGE', () => {
    const barrage = [{ msg: 1 }]
    expect(reducer(initialState, {
      type: types.RECEIVE_BARRAGE,
      barrage: barrage
    })).to.eql(initialState.setIn(['barrage', 'list'], fromJS(barrage)))
  })
  it('should handle REMOVE_BARRAGE', () => {
    const barrage = [{ timestamp: 1000 }, { timestamp: 2000 }]
    const init = initialState.setIn(['barrage', 'list'], fromJS(barrage))
    expect(reducer(init, {
      type: types.REMOVE_BARRAGE,
      timestamp: 6000
    })).to.eql(init.setIn(['barrage', 'list'], fromJS([{ timestamp: 2000 }])))
  })

})