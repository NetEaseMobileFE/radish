import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './HotItem'

export default class Hot extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.fetchMore = this.fetchMore.bind(this)
  }
  fetchMore() {
    this.props.fetchMore(2)
  }
  render() {
    const hot = this.props.hot
    return <div className="hot-list">
      <div className="title">热门直播</div>
      {
        hot.get('list') && hot.get('list').map((item, i) => {
          return <Item data={Map(item)} key={i} />
        })
      }
      {
        hot.get('list') && hot.get('list').size >= 10 && hot.get('list').size < 20 && <div onClick={this.fetchMore} className="loadmore">{hot.get('loading') ? '正在加载' : '加载更多'}</div>
      }
    </div> 
  }
}
