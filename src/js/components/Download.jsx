import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { search } from '../utils'
export default class Download extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { fixed, videoId, status } = this.props
    return <div className='g-footer fixed'>
      {status && <a href={`http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_${status}`} className="open"></a> }
    </div>
  }
}
