import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Anchor extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { avatar, nickname, title } = this.props
    return <div className="anchor-wrap">
      <img src={avatar} />
      <div className="info">
        <div className="nickname">{nickname}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  }
}
