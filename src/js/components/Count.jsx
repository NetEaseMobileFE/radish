import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Count extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { favourCount, userCount } = this.props
    return <div className="m-count">
      <span className="favourcount">{favourCount}</span>
      <span className="usercount">{userCount}</span>
    </div>
  }
}
