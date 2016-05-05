import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Download extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <div className={'g-header' + (this.props.fixed ? ' fixed' : '')}>
      <div className="logo" />
      <div className="intro">
        <div>萝卜直播</div>
        <div>介绍</div>
      </div>
      <div className="open">立即打开</div>
    </div>
  }
}
