import React, { PropTypes } from 'react'
import { fromJS, List } from 'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Barrage from './Barrage'
import Radish from './Radish'
import Mask from './Mask'
import Count from './Count'

import { params, debounce } from '../utils'

//status: 1,    -1重播删除了 1 正在直播 2 正常结束 3 强制结束  4异常结束  5 重播 6重播录制中

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.barrageNumber = 0
  }
  componentDidMount() {
    const video = this.refs.video
    if (!video) {
      return
    }
    const playVideo = this.props.playVideo
    video.setAttribute('webkit-playsinline', true)
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
    // if (this.props.isIOS) {
    //   // video.play()
    //   // ios下默认播放
    //   this.handleClick()
    // }
    video.addEventListener('timeupdate', () => {
      if (this.props.video.get('status') === 5 && video.currentTime) {
        const startTime = this.props.video.get('start_time')
        const time = startTime + Math.floor(video.currentTime) * 1000
        let list = []
        if (!this.barrages.size) { return }
        this.barrages = this.barrages.filter((x) => {
          if (x.get('timestamp') <= time) {
            list.push(x.set('createTime', Date.now()))
          }
          return x.get('timestamp') > time
        })
        if (list.length) {
          this.props.appendBarrage(list)
        }
      }
    }, false)

  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  componentDidUpdate() {
    if (!this.timer && this.props.video.get('status') === 5) {
      this.props.fetchBarrage(this.barrageNumber).then(() => {
        this.barrages = this.props.barrage.get('all')
        this.barrageNumber += 5
      })
      this.timer = setInterval(() => {
        this.props.fetchBarrage(this.barrageNumber).then(() => {
          this.barrages = this.props.barrage.get('all')
          this.barrageNumber += 5
        })
      }, 1000 * 60 * 5)
    }
  }
  handleClick() {
    const { room, video, barrage, playVideo, fetchBarrage, createConnection } = this.props
    if (!barrage.get('connected') && video.get('status') === 1) {
      // 直播创建websocket
      createConnection({
        domain: room.get('domain'),
        port: room.get('port')
      })
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
    const { room, video, isAndroid, isQQ,  barrage, removeBarrage } = this.props
    const status = video.get('status')
    let style = { display: 'none' }
    if (video.get('isPlayed')) {
      style = {}
    }
    const showVideo = video.get('isPlayed')
    if (status === 6 || status === -1) {
      return <div className="video-wrap">
        <div className={'video-placeholder' + (status === 6 ? ' recording' : '') + (status === -1 ? ' deleted' : '')}>
          <img src={video.get('cover')} />
        </div>
        <Mask roomId={room.get('roomId')} videoId={room.get('videoId')} type={params.type} status={status} />
      </div>
    }
    return <div className={'video-wrap' + ((isAndroid && isQQ) ? ' wechat' : '')} onClick={this.handleClick}>
      <div className={'video-inner ' + (video.get('playing') || 'pause') }>
        <video src={video.get('url')} poster={video.get('cover')} ref="video" />
      </div>
      { status === 1 && video.get('isPlayed') && <Radish favour={video.get('favour')} /> }
      { !(isAndroid && isQQ) && <span className="status">{status === 5 ? '回放' : '直播'}</span> }
    </div>
  }
}
Video.propTypes = {
  video: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired
}
