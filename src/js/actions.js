import * as actions from './action_type'
import { jsonp } from './utils'

export function fetchInitInfo(roomId, videoId) {
  return (dispatch) => {
    // return jsonp({ src: `http://qa.vdispatch.ws.netease.com/api/center/loginserver/distributeAnony?roomId=${roomId}&videoId=${videoId}`, callback: 'jsonp_init' })
    return jsonp({ src: `http://luobodispatch.v.163.com/api/center/loginserver/distributeAnony?roomId=${roomId}&videoId=${videoId}`, callback: 'jsonp_init' })
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
    const { videoId, roomId, anchorId, type = 1 } = ids
    // return jsonp({ src: `http://qa.vlive.ws.netease.com/api/web/beforeEnterWebRoom?videoId=${videoId}&roomId=${roomId}&userId=${anchorId}&type=${type}`, callback: 'jsonp_room' })
    return jsonp({ src: `http://luoboapi.v.163.com/api/web/beforeEnterWebRoom?videoId=${videoId}&roomId=${roomId}&userId=${anchorId}&type=${type}`, callback: 'jsonp_room' })
      .then((json) => {
        dispatch({
          type: actions.FETCH_INFO,
          info: json.result
        })
        return Promise.resolve(json)
      })
  }
}

export function fetchHot(page = 1, params) {
  return (dispatch) => {
    return jsonp({ src: `http://luoboapi.v.163.com/api/web/list/hotwebVideos?num=10&currpage=${page}&videoId=${params.videoId}&type=${params.type}`, callback: 'jsonp_hot' })
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
export function appendVideoBarrage(barrage) {
  return {
    type: actions.APPEND_VIDEO_BARRAGE,
    barrage
  }
}
export function fetchBarrage(page) {
  return (dispatch, getState) => {
    const videoId = getState().get('room').get('videoId')
    return jsonp({ src: `http://luoboapi.v.163.com/api/list/comment/getVideoComment.net?videoId=${videoId}&startTime=${page * 5}&endTime=${page * 5 + 5}`, callback: 'barrage' })
      .then((json) => {
        if (json.result && json.result.list) {
          dispatch({
            type: actions.FETCH_BARRAGE,
            barrage: json.result.list
          })
          return Promise.resolve(json.result.list)
        }
        return Promise.resolve(null)
      })
  }
}
export function createConnection(option) {
  return (dispatch, getState) => {
    const { roomId, userId, videoId } = getState().get('room').toJS()
    const connection = new WebSocket(`ws://${option.domain}:${option.port}/websocket`)
    // When the connection is open, send some data to the server
    connection.onopen = () => {
      dispatch({
        type: actions.SET_CONNECTION_STATE,
        connected: true
      })
      connection.send(JSON.stringify({
        "timestamp": '' + Date.now(),
        "videoId": +videoId,
        "userId": userId,
        "action": "enter",
        "roomId": +roomId
      }))
    }

    // Log errors
    connection.onerror = (error) => {
      console.log('WebSocket Error ',  error)
    }

    // Log messages from the server
    connection.onmessage = (e) => {
      const data = JSON.parse(e.data)
      switch (data.respType) {
        case 'dashboard':
          // 进入聊天室
          return dispatch({
            type: actions.SET_CONNECTION_STATE,
            connected: true
          })
        case 'groupChatMsg':
          // 聊天内容
          return dispatch(appendBarrage(data.respBody.list))
        case 'enter': 
          // 进入直播室人数加一
          return dispatch({
            type: actions.FETCH_INFO,
            info: {
              video: {
                usercount: getState().get('video').get('usercount') + 1
              }
            }
          })
        case 'exit': 
          // 进入直播室人数加一
          const _usercount = getState().get('video').get('usercount')
          return dispatch({
            type: actions.FETCH_INFO,
            info: {
              video: {
                usercount: _usercount > 1 ? _usercount - 1 : 0
              }
            }
          })
        case 'roomNumberUpdateMsg':
          // 观看人数
          return dispatch({
            type: actions.FETCH_INFO,
            info: {
              video: {
                usercount: data.respBody.onlineNum
              }
            }
          })
        case 'roomvote':
          // 点赞人数
          return dispatch({
            type: actions.FETCH_INFO,
            info: {
              video: {
                favour: data.respBody.num
              }
            }
          })
        case 'reportVideo':
          if (data.respCode === 113) {
            alert('重复举报')
          } else {
            alert('举报成功')
          }
        case 'beforeCloseMsg':
          // 重复账号
          alert('重复账号')
        case 'finishVideo':
          // 直播结束
          alert('直播结束')
          window.location.reload()
          return 
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
