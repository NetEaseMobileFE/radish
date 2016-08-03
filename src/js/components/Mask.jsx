import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Mask extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const { roomId, videoId, status, type } = this.props
    console.log(this.props)
    let href = 'http://m.163.com/radish/applinks.html'
    if (status !== -1) {
      href += `?radishId=${videoId}_${type}`
    }
    return <div className="video-mask">
      { status === 6 && <div className="logo">直播刚结束，正在录制...</div> }
      { status === -1 && <div className="info">抱歉，重播被删除了</div> }
      <div className="intro">
        <div>网易萝卜</div>
        <div>直播新鲜事</div>
      </div>
      <a href={href} className="open"><span />立即打开</a>
    </div>
  }
}
