import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Mask extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <div className="video-mask">
      <div className="logo">
        直播刚结束，正在录制...
      </div>
      <div className="intro">
        <div>萝卜直播</div>
        <div>介绍</div>
      </div>
      <div className="open">
        <span />
        立即打开
      </div>
    </div>
  }
}
