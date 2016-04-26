import * as actions from './constants'
export function fetchAnchor(anchorId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: actions.FETCH_ANCHOR,
        anchorId
      })
      resolve()
    })
  }
}