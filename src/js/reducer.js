import * as actions from './constants'
import { List, Map, fromJS } from 'immutable'
const INITIAL_STATE = fromJS({
  anchor: {},
  room: {},
  video: {},
  hot: []
})
export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_ANCHOR:
      return state.set('anchor', Map({ anchorId: action.anchorId}))
    case actions.PLAY_VIDEO:
      return state.setIn(['video', 'playing'], action.status)
  }
  return state
}