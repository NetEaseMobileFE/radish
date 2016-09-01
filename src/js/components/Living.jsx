import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fromJS } from 'immutable'

import * as actions from '../actions'

import { isAndroid, isQQ, isIOS, params } from '../utils'

import Download from './Download'
import Anchor from './Anchor'
import Video from './Video'
import Hot from './Hot'
import Barrage from './Barrage'
import Radish from './Radish'
import Record from './Record'
import Header from './Header'
import Count from './Count'
import { setShareData } from '../share'

require('../../css/main.scss')
class Living extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  componentDidMount() {
    const { room, createConnection, fetchInitInfo, fetchInfo, fetchHot } = this.props
    fetchInitInfo(params.roomId, params.videoId).then((data) => {
      createConnection({
        domain: data.domain,
        port: data.wsPort
      })
    })
    fetchInfo(params).then((json) => {
      setShareData(json.result.anchor.nickname)
    })
    // fetchHot(1, params)
  }
  render() {
    const { video, anchor, room, hot, barrage, fetchHot, appendVideoBarrage, fetchBarrage, playVideo, removeBarrage, createConnection } = this.props
    const status = video.get('status')
    if (!status) {
      return <div />
    }
    if(status === 6 || status === -1){
      return <Record state = {status} status={params.type} videoId={room.get('videoId')} fixed={!(isAndroid && isQQ)} />
    }
    return <div className="g-container">
      {(status === 1 || status === 5) && <Download fixed={!(isAndroid && isQQ)} videoId={room.get('videoId')} status={params.type} />}
      <Header anchor={anchor} video={video} room={room} playVideo={playVideo} fetchBarrage={fetchBarrage} appendBarrage={appendVideoBarrage} createConnection={createConnection} removeBarrage={removeBarrage} status={status} barrage={barrage} isIOS={isIOS} isAndroid={isAndroid} isQQ={isQQ} />
      <Barrage removeBarrage={removeBarrage} data={barrage.get('list')}  video={video} room={room} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} />
      <div className="radish">
        { //isAndroid && isQQ && <Count userCount={video.get('usercount')} favourCount={video.get('favour')} />
        }
        <span className="count">{video.get('favour')}</span>
      </div>
      { //status === 1 && video.get('isPlayed') && <Radish favour={video.get('favour')} />
      }
      <Radish favour={video.get('favour')} />
    </div>
  }
}

export default connect(
  state => ({
    barrage: state.get('barrage'),
    anchor: state.get('anchor'),
    video: state.get('video'),
    room: state.get('room'),
    hot: state.get('hot'),
  }),
  actions
)(Living);
