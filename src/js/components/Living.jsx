import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import { isAndroid, params } from '../utils'

import Download from './Download'
import Anchor from './Anchor'
import Video from './Video'
import Hot from './Hot'

require('../../css/main.scss')
const { width, height } = document.documentElement.dataset
class Living extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  componentDidMount() {
    this.props.fetchInitInfo(params.roomId)
    this.props.fetchInfo(params)
    this.props.fetchHot()
  }
  render() {
    const { video, anchor, room, hot, barrage, fetchHot, playVideo, removeBarrage, createConnection } = this.props
    return <div className="g-container">
      {video.get('status') !== 3 && <Download fixed={!isAndroid} />}
      <Video video={video} room={room} isAndroid={isAndroid} playVideo={playVideo} removeBarrage={removeBarrage} createConnection={createConnection} barrage={barrage} width={width} height={height} />
      <Anchor avatar={anchor.get('avatar')} nickname={anchor.get('nickname')} title={video.get('title')} />
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
