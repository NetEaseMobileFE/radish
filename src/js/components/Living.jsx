import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fromJS } from 'immutable'

import * as actions from '../actions'

import { isAndroid, isQQ, isIOS, params, fixNumber } from '../utils'

import Download from './Download'
import Anchor from './Anchor'
import Video from './Video'
import Hot from './Hot'
import Barrage from './Barrage'
import Radish from './Radish'
import Record from './Record'
import Header from './Header'
import Count from './Count'
import Prevue from './Prevue'
import { setShareData } from '../share'

require('../../css/main.scss')
class Living extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.barrageNumber = 0
  }
  componentDidMount() {
    const { room, createConnection, fetchInitInfo, fetchInfo, fetchHot, fetchBarrage, video, barrage } = this.props
    const status = video.get('status')
    /*fetchInitInfo(params.roomId, params.videoId).then((data) => {
      if( status===1 ){
        createConnection({
          domain: data.domain,
          port: data.wsPort
        })
      }
    })*/
    fetchInfo(params).then((json) => {
      setShareData(json.result.video.title,json.result.video.intro)
      if (!this.timer && json.result.video.status === 5) {
        fetchBarrage(this.barrageNumber).then(() => {
          this.barrages = barrage.get('all')
          console.log(barrage.get('all').toJS())
          console.log(barrage.get('list').toJS())
          this.barrageNumber += 5
        })
        this.timer = setInterval(() => {
          fetchBarrage(this.barrageNumber).then(() => {
            this.barrages = barrage.get('all')
            this.barrageNumber += 5
          })
        }, 1000 * 60 * 5)
      }
      fetchInitInfo(params.roomId, params.videoId).then((data) => {
        console.log(JSON.stringify(json))
        if( json.result.video.status===1 ){
          createConnection({
            domain: data.domain,
            port: data.wsPort
          })
        }
      })
    })

    // fetchHot(1, params)
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  render() {
    const { video, anchor, room, hot, barrage, fetchHot, appendVideoBarrage, fetchBarrage, playVideo, removeBarrage, createConnection, showPercent, barrageFadeout } = this.props
    const status = video.get('status')
    if (!status) {
      return <div />
    }
    if(status === 6 || status === -1){
      return <Record state = {status} status={params.type} anchor={anchor} video={video} videoId={room.get('videoId')} fixed={!(isAndroid && isQQ)} />
    }
    if(status === 7 ||status === 9 || status === 8){
      return <Prevue state = {status} status={params.type} video={video} anchor={anchor} videoId={room.get('videoId')} fixed={!(isAndroid && isQQ)} />
    }
    return <div className="g-container">
      {(status === 1 || status === 5) && <Download fixed={!(isAndroid && isQQ)} videoId={room.get('videoId')} status={params.type} />}
      <Header anchor={anchor} video={video} room={room} playVideo={playVideo} showPercent={showPercent} barrageFadeout={barrageFadeout} fetchBarrage={fetchBarrage} appendBarrage={appendVideoBarrage} createConnection={createConnection} removeBarrage={removeBarrage} status={status} barrage={barrage} isIOS={isIOS} isAndroid={isAndroid} isQQ={isQQ} />
      <Barrage barrageFadeout={barrageFadeout} removeBarrage={removeBarrage} video={video} data={barrage.get('list')}  room={room} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} sheetName='barrage-wrap' />
      <div className="radish">
        { //isAndroid && isQQ && <Count userCount={video.get('usercount')} favourCount={video.get('favour')} />
        }
        <span className="count">{fixNumber(video.get('favour'))}</span>
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
