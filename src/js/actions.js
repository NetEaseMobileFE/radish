import * as actions from './action_type'
import { jsonp } from './utils'

export function fetchInitInfo(roomId) {
  return (dispatch) => {
    // return jsonp({ src: 'http://f2e.developer.163.com/ybduan/radish/init.json', callback: 'jsonp_init' })
    return jsonp({ src: `http://qa.vdispatch.ws.netease.com/api/center/loginserver/distributeAnony.ac?roomId=${roomId}`, callback: 'jsonp_init' })
      .then((json) => {
        dispatch({
          type: actions.FETCH_INIT_INFO,
          room: json.data
        })
        return json.data
      })
  }
}

export function fetchInfo(ids) {
  return (dispatch) => {
    const { videoId, roomId, anchorId } = ids
    return jsonp({ src: `http://qa.vlive.ws.netease.com/api/live/video/beforeEnterWebRoom.ac?videoId=${videoId}&roomId=${roomId}&userId=${anchorId}`, callback: 'jsonp_room' })
    // return jsonp({ src: 'http://f2e.developer.163.com/ybduan/radish/room.json', callback: 'jsonp_room' })
      .then((json) => {
        dispatch({
          type: actions.FETCH_INFO,
          info: json.result
        })
      })
  }
}

export function fetchHot(page = 1) {
  return (dispatch) => {
    return jsonp({ src: 'http://f2e.developer.163.com/ybduan/radish/hot.json', callback: 'jsonp_hot' })
      .then((json) => {
        dispatch({
          type: actions.FETCH_HOT,
          videos: json.result.videos
        })
      })
  }
}

export function playVideo(status) {
  return {
    type: actions.PLAY_VIDEO,
    status
  }
}

function appendBarrage(barrage) {
  return {
    type: actions.RECEIVE_BARRAGE,
    barrage
  }
}

export function createConnection(option) {
  return (dispatch, getState) => {
    const { roomId, userId, videoId } = getState().get('room').toJS()
    const connection = new WebSocket(`ws://${option.domain}:${option.port}/websocket`)
    // When the connection is open, send some data to the server
    connection.onopen = () => {
      
      console.log('connected')
      connection.send(JSON.stringify({
        "timestamp": '' + Date.now(),
        "videoId": +videoId,
        "userId": userId,
        "action": "enter",
        "roomId": +roomId
      })) // Send the message 'Ping' to the server
    }

    // Log errors
    connection.onerror = (error) => {
      console.log('WebSocket Error ',  error)
    }

    // Log messages from the server
    connection.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.respType === 'dashboard') {
        // 进入聊天室
        dispatch({
          type: actions.SET_CONNECTION_STATE,
          connected: true
        })
      } else if (data.respType === 'groupChatMsg') {
        // 聊天内容
        dispatch(appendBarrage(data.respBody.list))
      }
    }
    return connection
  }
}
export function removeBarrage(timestamp) {
  return {
    type: actions.REMOVE_BARRAGE,
    timestamp
  }
}
