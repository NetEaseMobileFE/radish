import { expect } from 'chai'
import reducer, { INITIAL_STATE as initialState} from '../src/js/reducer'
import * as types from '../src/js/action_type'
import {List, Map, fromJS} from 'immutable';
import { params } from '../src/js/utils'

describe('Test reducer', () => {
  it('should handle FETCH_INIT_INFO', () => {
    const action = {
      type: types.FETCH_INIT_INFO,
      room: {
        "domain": "localhost",
        "wsPort": 9999,
        "extend": {
          "userId": "temp3c628f37-dd30-43c8-875f-10c13c00efa8"
        }
      }
    }
    expect(reducer(initialState, action).get('room')).to.eql(fromJS({
      ...params,
      "domain": "localhost",
      "port": 9999,
      "userId": "temp3c628f37-dd30-43c8-875f-10c13c00efa8"
    }))
  })
  it('should handle FETCH_INFO', () => {
    const action = {
      type: types.FETCH_INFO,
      info: {
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
      }
    }
    const nextState = reducer(undefined, action)
    expect(nextState.get('video')).to.eql(fromJS(action.info.video))
    expect(nextState.get('anchor')).to.eql(fromJS(action.info.anchor))

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
    const barrage = [
      {
        "body": {
          "message": "1",
          "senderUser": {
            "avatar": "avatar",
            "nickname": 'yangjq',
          },
        },
        "header": {
          "actionTime": 1462182193124
        }
      }
    ]
    const expectState = fromJS([
      {
        msg: '1',
        name: 'yangjq',
        avatar: 'avatar',
        timestamp: 1462182193124
      }
    ])
    expect(reducer(initialState, {
      type: types.RECEIVE_BARRAGE,
      barrage: barrage
    }).getIn(['barrage', 'list']).map(item => item.delete('id'))).to.eql(expectState)
  })
  it('should handle FETCH_BARRAGE', () => {
    const barrage = [
      {
        "message":"I",
        "createTime":1461763920130,
        "senderUser":{
          "avatar":"111","nickname":"其实我是个程序猿"
        }
      },
      {
        "message":"Ia",
        "createTime":1461763920130,
        "senderUser":{
          "avatar":"111","nickname":"其实我是个程序猿"
        }
      },
    ]
    expect(reducer(initialState, {
      type: types.FETCH_BARRAGE,
      barrage
    }).getIn(['barrage', 'all']).map(item => item.delete('id'))).to.eql(fromJS([{
      avatar: '111',
      name: '其实我是个程序猿',
      msg: 'I',
      timestamp: 1461763920130,
    }, {
      avatar: '111',
      name: '其实我是个程序猿',
      msg: 'Ia',
      timestamp: 1461763920130,
    }]))
  })
  it('should handle REMOVE_BARRAGE', () => {
    const barrage = [{ timestamp: 1000 }, { timestamp: 2000 }]
    const init = initialState.setIn(['barrage', 'list'], fromJS(barrage))
    expect(reducer(init, {
      type: types.REMOVE_BARRAGE,
      timestamp: 6500
    })).to.eql(init.setIn(['barrage', 'list'], fromJS([{ timestamp: 2000 }])))
  })
})