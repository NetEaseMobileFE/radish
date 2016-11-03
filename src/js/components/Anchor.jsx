import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { fixNumber } from '../utils'
export default class Anchor extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.onError = this.onError.bind(this)
  }
  onError(e) {
    debugger
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.refs.img.onerror = function(e) {
      //this.src = 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
    }
    this.refs.img.onload = (e) => {
      if (e.target.naturalWidth < 60) {
        //e.target.src = 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
      }
    }
  }
  render() {
    const { nickname, title, isVip, video, videoId, isAndroid,isQQ,   } = this.props
    let avatar = this.props.avatar
    const usercount = video.get('usercount')
    const status = video.get('status')
    console.log(avatar)
    if (!avatar || !avatar.match(/^http:\/\//)) {
      avatar = 'http://img5.cache.netease.com/utf8/radish/images/avatar-grey.png'
    }
    /*if (!!avatar.match(/nos/)) {
      avatar = avatar + '&thumbnail=90x90&quality=50'
    } else {
      avatar = `http://s.cimg.163.com/i/${avatar.replace('http://', '')}.${90}x${90}.75.auto.jpg`
    }*/
    return <div className="anchor-wrap">
      <img ref="img" onError={this.onError} src={avatar} />
      <div className="info">
        <div className="nickname">{nickname || '小萝卜'} { isVip && <span className="vip" />}</div>
        <div className="subscribe-count">{video.get('subscribeCount')+'订阅'}</div>
      </div>
      <div className='subscribe'><a href={`http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_1`}>+ 订阅</a></div>
    </div>
  }
}
