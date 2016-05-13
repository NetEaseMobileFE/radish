import * as types from './action_type'
import { List, Map, fromJS } from 'immutable'
import { params, guid } from './utils'

const INITIAL_STATE = fromJS({
  barrage: {
    list: [],
    connected: true
  },
  anchor: {},
  video: {},
  hot: {
    list: [],
    loading: false
  },
  room: { ... params }
})
function getRoomInfo(data) {
  return {
    domain: data.domain,
    port: data.wsPort,
    userId: data.extend.userId
  }
}
// 这里很纠结，需要给每条弹幕增加一个id
// 为了性能考虑，只遍历一次list，只能在这里增加这个id属性了
// 但为了保证纯函数特性，把guid当做参数传进去吧。
function handleBarrage(list, guid) {
  return list.map((item) => {
    return {
      id: guid(),
      avatar: item.body.senderUser.avatar,
      name: item.body.senderUser.nickname,
      msg: item.body.message,
      timestamp: item.header.actionTime,
    }
  })
}
export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_INIT_INFO:
      return state.mergeIn(['room'], fromJS(getRoomInfo(action.room)))
    case types.FETCH_INFO:
      return state.merge(fromJS(action.info))
    case types.FETCH_HOT:
      return state.updateIn(['hot', 'list'], videos => videos.concat(action.videos))
    case types.PLAY_VIDEO:
      return state.mergeIn(['video'], fromJS({ playing: action.status, isPlayed: true}))
    case types.RECEIVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.concat(fromJS(handleBarrage(action.barrage, guid))).slice(-5))
    case types.REMOVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.filter(x => {
        return action.timestamp - x.get('timestamp') < 5000
      }))
  }
  return state
}