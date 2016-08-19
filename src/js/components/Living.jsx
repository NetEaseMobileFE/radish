import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import { isAndroid, isQQ, isIOS, params } from '../utils'

import Download from './Download'
import Anchor from './Anchor'
import Video from './Video'
import Hot from './Hot'
import { setShareData } from '../share'

require('../../css/main.scss')
class Living extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  componentDidMount() {
    const { room, createConnection, fetchInitInfo, fetchInfo, fetchHot } = this.props
    fetchInitInfo(params.roomId, params.videoId)
    fetchInfo(params).then((json) => {
      setShareData(json.result.anchor.nickname, json.result.anchor.avatar)
    })
    // fetchHot(1, params)
  }
  render() {
    const { video, anchor, room, hot, barrage, fetchHot, appendVideoBarrage, fetchBarrage, playVideo, removeBarrage, createConnection } = this.props
    const status = video.get('status')
    if (!status) {
      return <div />
    }
    return <div className="g-container">
      {(status === 1 || status === 5) && <Download fixed={!(isAndroid && isQQ)} videoId={room.get('videoId')} status={params.type} />}
      <Video video={video} room={room} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} playVideo={playVideo} appendBarrage={appendVideoBarrage} fetchBarrage={fetchBarrage} removeBarrage={removeBarrage} createConnection={createConnection} barrage={barrage} />
      <Anchor avatar={anchor.get('avatar')} isVip={+anchor.get('confirm') === 1} nickname={anchor.get('nickname')} title={video.get('title')} />
      <Hot hot={hot} fetchMore={fetchHot} />
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
