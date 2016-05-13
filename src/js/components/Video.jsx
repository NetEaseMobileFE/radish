import React, { PropTypes } from 'react'
import { fromJS } from 'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Barrage from './Barrage'
import Mask from './Mask'
import Count from './Count'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  componentDidMount() {
    this.refs.video.setAttribute('webkit-playsinline', true)
  }
  handleClick() {
    const { room, video, playVideo, createConnection } = this.props
    if (!video.get('isPlayed')) {
      createConnection({
        domain: room.get('domain'),
        port: room.get('port')
      })
    }
    if (this.props.video.get('playing')) {
      return
    }
    this.refs.video.play()
    this.props.playVideo(true)
  }
  handleBtnClick(e) {
    e.preventDefault()
    const { playVideo, video } = this.props
    if (video.get('playing')) {
      this.refs.video.pause()
    } else {
      this.refs.video.play()
    }
    playVideo(!video.get('playing'))
  }
  render() {
    const { video, isAndroid, width, height, barrage, removeBarrage } = this.props
    let style = { display: 'none' }
    if (video.get('isPlayed')) {
      style = {}
    }
    if (video.get('status') === 6) {
      return <div className="video-wrap" style={{width: +width, height: +height}}>
        <div className="video-placeholder" style={{backgroundImage: `url(${video.get('cover')})`}} />
        <Mask />
      </div>
    }
    return <div className={'video-wrap' + (isAndroid ? ' android' : '')} onClick={this.handleClick} style={{width: +width, height: +height}}>
      {
        !video.get('isPlayed') && !video.get('playing') && <div className="video-placeholder" style={{backgroundImage: `url(${video.get('cover')})`}} />
      }
      <video src={video.get('url')} ref="video" style={style} />
      { video.get('status') === 5 && !isAndroid && <span className="status">重播</span> }
      { video.get('status') === 5 && !isAndroid && <span onClick={this.handleBtnClick} className={'btn-pause' + (video.get('playing') ? '' : ' paused')}>
        <span className="button">
          <span className="left" />
          <span className="right" />
          <span className="triangle-1" />
          <span className="triangle-2" />
        </span>
      </span> }
      { isAndroid && <Count userCount={video.get('usercount')} favourCount={video.get('favour')} /> }
      { !isAndroid && <span className="favour">{video.get('favour')}</span> }
      { !isAndroid && video.get('status') === 1 && <span className="count">{video.get('usercount')}</span> }
      { !isAndroid && video.get('status') === 1 && barrage && barrage.get('connected') && <Barrage removeBarrage={removeBarrage} data={barrage.get('list')} />}
    </div>
  }
}
Video.propTypes = {
  video: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired
}
