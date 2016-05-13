import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Anchor from './Anchor'
import Count from './Count'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  render() {
    const data = this.props.data
    return <div className="hot-item">
      <div className="img-wrap">
        <img src={data.get('img_url')} />
        <span className="status">{data.get('state') === 1 && '重播'}{data.get('state') === 2 && '直播'}</span>
        <Count favourCount={data.get('like_num')} userCount={data.get('total_num')} />
      </div>
      <Anchor avatar={data.get('user_img')} nickname={data.get('user_nickname')} title={data.get('title')} />

    </div> 
  }
}
