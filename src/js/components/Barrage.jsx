import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class Barrage extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount() {
    /*this.t = setInterval(() => {
      if (this.props.data.size > 0) {
        this.props.removeBarrage(Date.now())
      }
    }, 1000)*/
  }
  componentWillUnmount() {
    clearInterval(this.t)
  }
  render() {
    const data = this.props.data.slice(0, 5)
    console.log(data)
    /*return <div className={'barrage-wrap size-' + data.size}>
      {
        data.map((item, i) => {
          return <div className={'item' + (data.size >= 4 && i < 2 ? (' item' + i) : '')} key={item.get('id')}>
            <img src={optimize(item.get('avatar'))} />
            <div className="info">
              <div className="name">{item.get('name')}{item.get('vip') === 1 && <span className="vip" />}</div>
              <div className="msg">{item.get('msg')}</div>
            </div>
          </div>
        })
      }
    </div>*/
    return <div className={'barrage-wrap size-' + data.size}>
      {
        data.map((item, i) => {
          return <div className={'item' + (data.size >= 4 && i < 2 ? (' item' + i) : '')} key={item.get('id')}>
            <img src={optimize(item.get('avatar'))} />
            <div className="info">
              <div className="name">{item.get('name')}{item.get('vip') === 1 && <span className="vip" />}</div>
              <div className="msg">{item.get('msg')}</div>
            </div>
          </div>
        })
      }

    </div>
  }
}
function optimize(img) {
  let avatar = img || 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
  if (!!avatar.match(/nos/)) {
    avatar = avatar + '&thumbnail=90x90&quality=50'
  } else {
    avatar = `http://s.cimg.163.com/i/${avatar.replace('http://', '')}.${90}x${90}.75.auto.jpg`
  }
  return avatar
}
