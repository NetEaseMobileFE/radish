import * as actions from './action_type'
import fetch from 'isomorphic-fetch';

export function fetchInfo(anchorId) {
  return (dispatch) => {
    return fetch('http://abc.163.com:3100/room.json')
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: actions.FETCH_INFO,
          data: json
        })
      })
  }
}

export function fetchHot(page = 1) {
  return (dispatch) => {
    return fetch(`http://abc.163.com:3100/hot.json?page=${page}`)
      .then(response => response.json())
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

export function createConnection() {
  return (dispatch) => {
    const connection = new WebSocket('ws://223.252.202.69:9999')
    // When the connection is open, send some data to the server
    connection.onopen = function () {
      dispatch({
        type: actions.SET_CONNECTION_STATE,
        connected: true
      })
      connection.send({"timestamp":"1459514381260","videoId":1,"userId":"1","random":"-2678371613059681964","action":"enter","roomId":1}); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error ',  error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      console.log('Server: ', e.data);
      dispatch(appendBarrage(e.data))
    };
    return connection
  }
}

function removeBarrage(time) {
  return {
    type: actions.REMOVE_BARRAGE,
    time
  }
}
