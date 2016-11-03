import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { fixNumber, DateHandler } from '../utils'
import Switch from './Switch'
export default class VideoControls extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.onError = this.onError.bind(this)
    this.onValueChanged = this.onValueChanged.bind(this)
    this.pageX = 0
  }
  onError(e) {
    debugger
  }
  onValueChanged(percent){
    const { onPercentChanged } = this.props
    onPercentChanged(percent)
  }
  componentDidMount(){
    const { isAndroid, isQQ, isIOS, video } = this.props
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    const videoControls = this.refs.videoControls
    if( isPlayed && direction===0 ){
      videoControls.style.width = rem2px(5.02)+'px'
    }
    else {
      videoControls.style.width = rem2px(7.12)+'px'
    }
  }
  render() {
    let { percent, showPercent, currentTime, duration,handleClick } = this.props
    //const { nickname, title, isVip, video, isAndroid,isQQ  } = this.props
    //let avatar = this.props.avatar
    //const usercount = video.get('usercount')

    return <div className="videoControls" ref='videoControls'>
      <div className="play-wrap" onClick={handleClick}>
        <div className="play"></div>
      </div>
      <div className="videoInfo">
        <p className="currentTime">{DateHandler.diffdown(currentTime * 1000).hour+':'+DateHandler.diffdown(currentTime * 1000).minute+':'+DateHandler.diffdown(currentTime * 1000).second}</p>
        <Switch  isOpen={false} onValueChanged={this.onValueChanged} percent={percent} showPercent={showPercent}/>
        <p className="duration">{DateHandler.diffdown(duration * 1000).hour+':'+DateHandler.diffdown(duration * 1000).minute+':'+DateHandler.diffdown(duration * 1000).second}</p>
      </div>
    </div>
  }
}
