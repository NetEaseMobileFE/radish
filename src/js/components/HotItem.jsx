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
      <a href={`http://c.3g.163.com/webapp/radish/${data.get('room_id')}/${data.get('video_id')}/${data.get('user_id')}/${data.get('state')}`}>
        <div className="img-wrap">
          <div className="img-inner" style={{backgroundImage: `url(${data.get('img_url')}&thumbnail=375x0)`}} />
          <span className="status">{data.get('state') === 1 ? '直播' : '回放'}</span>
          <Count favourCount={data.get('like_num')} userCount={data.get('total_num')} />
        </div>
        <Anchor isVip={+data.get('confirm') === 1} avatar={data.get('user_img')} nickname={data.get('user_nickname')} title={data.get('title')} />
      </a>
    </div> 
  }
}
