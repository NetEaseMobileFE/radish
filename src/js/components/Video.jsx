import React, { PropTypes } from 'react'
import { fromJS } from 'Immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Barrage from './Barrage'

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
    if (!this.props.video.get('isPlayed')) {
      this.props.createConnection()
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
    const { video, isAndroid, width, height } = this.props
    let barrage = fromJS({
      connected: true,
      list: [
        {
          avatar: 'http://s.cimg.163.com/i/imgm.ph.126.net/KvHXVyD-i7LJQ6jYOhRCwA==/6608184729702751290.jpg.66x66.50.auto.jpg',
          name: '呵'.repeat(1),
          msg: '哈'.repeat(10)
        },{
          avatar: 'http://s.cimg.163.com/i/imgm.ph.126.net/KvHXVyD-i7LJQ6jYOhRCwA==/6608184729702751290.jpg.66x66.50.auto.jpg',
          name: '呵'.repeat(2),
          msg: '哈'.repeat(11)
        },{
          avatar: 'http://s.cimg.163.com/i/imgm.ph.126.net/KvHXVyD-i7LJQ6jYOhRCwA==/6608184729702751290.jpg.66x66.50.auto.jpg',
          name: '呵'.repeat(3),
          msg: '哈'.repeat(13)
        },{
          avatar: 'http://s.cimg.163.com/i/imgm.ph.126.net/KvHXVyD-i7LJQ6jYOhRCwA==/6608184729702751290.jpg.66x66.50.auto.jpg',
          name: '呵'.repeat(4),
          msg: '哈'.repeat(14)
        },{
          avatar: 'http://s.cimg.163.com/i/imgm.ph.126.net/KvHXVyD-i7LJQ6jYOhRCwA==/6608184729702751290.jpg.66x66.50.auto.jpg',
          name: '呵'.repeat(5),
          msg: '哈'.repeat(25)
        },

      ]
    })
    let style = { display: 'none' }
    if (video.get('isPlayed')) {
      style = {}
    }
    return <div className={'video-wrap' + (isAndroid ? ' android' : '')} onClick={this.handleClick} style={{width: +width, height: +height}}>
      {
        !video.get('isPlayed') && !video.get('playing') && <div className="video-placeholder" style={{backgroundImage: `url(${video.get('cover')})`}} />
      }
      <video src={video.get('url')} ref="video" style={style} />
      { video.get('status') === 2 && <span className="status">重播</span> }
      { video.get('status') === 2 && <span onClick={this.handleBtnClick} className={'btn-pause' + (video.get('playing') ? '' : ' paused')}>
        <span className="button">
          <span className="left" />
          <span className="right" />
          <span className="triangle-1" />
          <span className="triangle-2" />
        </span>
      </span> }
      <span className="favour">{video.get('favour')}</span>
      { video.get('status') === 1 && <span className="count">{video.get('usercount')}</span> }
      { barrage && barrage.get('connected') && barrage.get('list').size > 0 && <Barrage data={barrage.get('list')} />}
    </div>
  }
}
Video.propTypes = {
  video: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired
}
