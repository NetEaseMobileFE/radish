import * as types from './action_type'
import { List, Map, fromJS, Seq } from 'immutable'
import { params, guid } from './utils'

export const INITIAL_STATE = fromJS({
  barrage: {
    list: fromJS([{id:'3a94487c',vip:1,avatar:'http://tva2.sinaimg.cn/crop.0.0.720.720.180/72871b1djw8egxisjn82uj20k00k0765.jpg',name:2,msg:'Iaa',timestamp:1472024664731},{id:'3a94487',avatar:'http://tva2.sinaimg.cn/crop.0.0.720.720.180/72871b1djw8egxisjn82uj20k00k0765.jpg',name:2,msg:'Iaa',timestamp:1472024664731}]),
    all: [],
    connected: false
  },
  anchor: {},
  video: {},
  hot: {
    list: [],
    loading: false
  },
  room: { ...params },
})
function getRoomInfo(data) {
  return {
    domain: data.domain,
    port: data.wsPort,
    userId: data.extend.userId
  }
}
function handleBarrage(list, guid) {
  return List(list.map(item => Map({
    id: guid(),
    avatar: item.body.senderUser.avatar,
    name: item.body.senderUser.nickname,
    msg: item.body.message,
    timestamp: Date.now(),
  })))
}
function handleVideoBarrage(list, guid) {
  return List(list.map(item => Map({
    id: guid(),
    avatar: item.senderUser.avatar,
    name: item.senderUser.nickname,
    msg: item.message,
    timestamp: item.createTime,
  })))
}
export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_INIT_INFO:
      return state.mergeIn(['room'], fromJS(getRoomInfo(action.room)))
    case types.FETCH_INFO:
      return state.mergeDeep(fromJS(action.info))
    case types.FETCH_HOT:
      return state.updateIn(['hot', 'list'], videos => videos.concat(action.videos))
    case types.SET_CONNECTION_STATE:
      return state.setIn(['barrage', 'connected'], action.connected)
    case types.PLAY_VIDEO:
      return state.mergeIn(['video'], fromJS({ playing: action.status, isPlayed: true}))
    case types.RECEIVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => {
        return b.concat(handleBarrage(action.barrage, guid)).slice(-5)
      })
    case types.FETCH_BARRAGE:
      return state.setIn(['barrage', 'all'], handleVideoBarrage(action.barrage, guid))
    case types.APPEND_VIDEO_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.concat(action.barrage))
    case types.REMOVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.filter(x => {
        const time =  x.get('createTime') || x.get('timestamp')
        console.log((new Date(action.timestamp)).getSeconds(), (new Date(time)).getSeconds())
        return action.timestamp - time < 5000
      }))
  }
  return state
}