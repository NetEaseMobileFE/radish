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
    if (search.from === 'newsapp' || search.f === 'newsapp') {
      const url = `http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_${status}`
      return <a className={"g-header from-newsapp" + (fixed ? ' fixed' : '')} href={url} />
    }
    return <div className={'g-footer' + (fixed ? ' fixed' : '')}>
      {status && <a href={`http://m.163.com/radish/applinks.html?radishId=${videoId}_${status}`} className="open">立即打开</a> }
    </div>
  }
}
