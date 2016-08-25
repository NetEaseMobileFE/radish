import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
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
      this.src = 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
    }
    this.refs.img.onload = (e) => {
      if (e.target.naturalWidth < 10) {
        e.target.src = 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
      }
    }
  }
  render() {
    const { nickname, title, isVip } = this.props
    let avatar = this.props.avatar
    if (!avatar || !avatar.match(/^http:\/\//)) {
      avatar = 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
    }
    if (!!avatar.match(/nos/)) {
      avatar = avatar + '&thumbnail=90x90&quality=50'
    } else {
      avatar = `http://s.cimg.163.com/i/${avatar.replace('http://', '')}.${90}x${90}.75.auto.jpg`
    }
    return <div className="anchor-wrap">
      <img ref="img" onError={this.onError} src={avatar} />
      <div className="info">
        <div className="title">{title || '无标题'}</div>
        <div className="nickname">{nickname || '小萝卜'} { isVip && <span className="vip" />}</div>
      </div>
    </div>
  }
}
