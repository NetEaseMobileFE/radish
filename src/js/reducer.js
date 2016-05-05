import * as types from './action_type'
import { List, Map, fromJS } from 'immutable'
const INITIAL_STATE = fromJS({
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
export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_INFO:
      return state.merge(fromJS(action.data.data))
    case types.FETCH_HOT:
      return state.updateIn(['hot', 'list'], videos => videos.concat(action.videos))
    case types.PLAY_VIDEO:
      return state.mergeIn(['video'], fromJS({ playing: action.status, isPlayed: true}))
    case types.RECEIVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.concat(fromJS(action.barrage)))
    case types.REMOVE_BARRAGE:
      return state.updateIn(['barrage', 'list'], b => b.filter(x => action.timestamp - x.timestamp < 5000))
  }
  return state
}