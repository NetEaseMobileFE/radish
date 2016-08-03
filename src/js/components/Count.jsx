import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { fixNumber } from '../utils'
export default class Count extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { favourCount, userCount } = this.props
    return <div className="m-count">
      <span className="favourcount">{fixNumber(favourCount)}</span>
      <span className="usercount">{fixNumber(userCount)}</span>
    </div>
  }
}
