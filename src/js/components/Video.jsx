import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.refs.video.setAttribute('webkit-playsinline', true)
  }
  handleClick() {
    if (this.props.video.get('playing')) {
      return
    }
    this.refs.video.play()
    this.props.playVideo(true)
  }
  render() {
    return <div className="video-wrap" onClick={this.handleClick}>
      <video src={video.get('url')} poster={video.get('cover')} ref="video" />
    </div>
  }
}
Video.propTypes = {
  video: PropTypes.object.isRequired,
  playVideo: PropTypes.func.isRequired
};
