import React, { PropTypes } from 'react'
import { fromJS, List } from 'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Barrage from './Barrage'
import Radish from './Radish'
import Mask from './Mask'
import VideoControls from './VideoControls'
import Count from './Count'

import { params, debounce, fixNumber } from '../utils'

//status: 1,    -1重播删除了 1 正在直播 2 正常结束 3 强制结束  4异常结束  5 重播 6重播录制中

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onPercentChanged = this.onPercentChanged.bind(this)
    this.barrageNumber = 0
    this.state = {
      currentTime : 0,
      duration : 0
    }
  }
  componentWillReceiveProps(nextProps){
    const { isAndroid, isQQ, isIOS } = this.props
    const CH = document.documentElement.clientHeight
    const { video } = nextProps
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    if(isPlayed){
      const videoWrap = this.refs.videoWrap
      const video = this.refs.video
      if(direction===0){
        //video.setAttribute('height', 'auto')
        //video.style.height = 'auto'
        //console.log(rem2px(1))
        videoWrap.style.height = (CH - rem2px(1))+'px'
        if( !(isAndroid && isQQ) ){
          video.style.height = 'auto'
        }
        else{
          video.style.height = (CH - rem2px(1))+'px'
        }
      }
      else{
        video.style.height = 'auto'
      }
    }
  }
  onPercentChanged(percent){
    const video = this.refs.video
    //console.log(percent)
    video.currentTime = video.duration * percent / 100
  }
  componentDidMount() {
    const video = this.refs.video
    if (!video) {
      return
    }
    const { playVideo, showPercent } = this.props
    video.controls=false
    video.setAttribute('webkit-playsinline', true)
    video.setAttribute('playsinline', true)
    video.setAttribute('x-webkit-airplay', true)
    video.addEventListener('playing', (e) => {
      playVideo('playing')
    })
    video.addEventListener('pause', (e) => {
      if (video.readyState !== 4) {
        // 视频为缓冲中
        playVideo('loading') 
      } else {
        playVideo('pause')
      }
    }, false)
    video.addEventListener('ended', (e) => {
      playVideo('ended')
    })
    video.addEventListener('error', (e) => {
      playVideo('error')
    })
    video.addEventListener('play', ()=>{
    })
    // if (this.props.isIOS) {
    //   // video.play()
    //   // ios下默认播放
    //   this.handleClick()
    // }
    video.addEventListener('timeupdate', () => {
      if (this.props.video.get('status') === 5 && video.currentTime) {
        const percent = video.currentTime / video.duration * 100
        //console.log(video.currentTime)
        //console.log(video.duration)
        showPercent(percent)
        this.setState({currentTime:video.currentTime,duration:video.duration})
        const startTime = this.props.video.get('start_time')
        const time = startTime + Math.floor(video.currentTime) * 1000
        let list = []
        /*if (!this.barrages.size) { return }
        this.barrages = this.barrages.filter((x) => {
          if (x.get('timestamp') <= time) {
            list.push(x.set('createTime', Date.now()))
          }
          return x.get('timestamp') > time
        })
        if (list.length) {
          this.props.appendBarrage(list)
        }*/
      }
    }, false)


  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  componentDidUpdate() {
  }
  handleClick() {
    const { room, video, barrage, playVideo, showPercent, fetchBarrage, createConnection } = this.props
    if (!barrage.get('connected') && video.get('status') === 1) {
      // 直播创建websocket
      /*createConnection({
        domain: room.get('domain'),
        port: room.get('port')
      })*/
    }

    if (video.get('playing') === 'playing' && video.get('status') === 5) {
      this.refs.video.pause()
      return
    }
    if (this.refs.video.paused) {
      this.refs.video.play()
    }
    // playVideo('playing')
  }
  render() {
    const { room, video, isAndroid, isQQ, isIOS,  barrage, removeBarrage, showPercent, barrageFadeout } = this.props
    const status = video.get('status')
    const usercount = video.get('usercount')
    const percent = video.get('percent')
    const direction = video.get('direction')
    const isPlayed = video.get('isPlayed')
    let style = { display: 'none' }
    console.log(status)
    //alert((direction===0 && isPlayed))
    if (video.get('isPlayed')) {
      style = {}
    }
    const showVideo = video.get('isPlayed')
    return <div className={'video-wrap' + ((isAndroid && isQQ) ? ' wechat' : '')} onClick={this.handleClick}  ref="videoWrap">
      <div className={'video-inner ' + (video.get('playing') || 'pause') }>
        <video src={video.get('url')} poster={video.get('cover')} ref="video" webkit-playsinline="true" playsinline></video>
      </div>
      {(direction===0 && isPlayed && status!==5) && <Barrage removeBarrage={removeBarrage} barrageFadeout={barrageFadeout} data={barrage.get('list')}  video={video}  room={room} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} sheetName='barrage-outter' />}
      {(status === 5 && isPlayed) && <VideoControls onPercentChanged={this.onPercentChanged} percent={percent} video={video} showPercent={showPercent} currentTime={this.state.currentTime} duration={this.state.duration} handleClick={this.handleClick} />}
      <div className="status">
        <span className={"dec "+(status === 1 ? 'live':'')}>{(status === 5 ? '回顾 ' : '直播 ')}<span></span></span>
        <span className="usercount"><span>{fixNumber(usercount)}</span>参与</span>
      </div>
    </div>
  }
}
Video.propTypes = {
  video: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired
}
