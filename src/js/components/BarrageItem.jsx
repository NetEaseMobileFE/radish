import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { fromJS, List } from 'immutable'
export default class BarrageItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { video,removeBarrage, barrageFadeout,item } = this.props
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    const timestamp = video.get('timestamp')
    const id = item.get('id')

    if (isPlayed && direction === 0) {
      setTimeout(()=> {
        this.refs.item.style.opacity = 0
        //removeBarrage(timestamp)
        barrageFadeout(true,id)
      }, 2000)
    }
  }

  componentDidUpdate() {
    const { video, removeBarrage,barrageFadeout,item } = this.props
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    const timestamp = video.get('timestamp')
    const id = item.get('id')
    if (isPlayed && direction === 0) {
      setTimeout(()=> {
        this.refs.item.style.opacity = 0
        //removeBarrage(timestamp)
        barrageFadeout(true,id)
      }, 2000)
    }
  }

  render() {
    const { video, removeBarrage,barrageFadeout,item } = this.props
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    const fadeout =(item.get('fadeout') && (isPlayed && direction === 0)) ? 'fadeout' : ''
    //return <div className={fadeout+' item'} key={item.get('id')} ref='item'>
    // return <div className={fadeout+' item'} key={item.get('id')} ref='item'>
    return <div className={'item'} key={item.get('id')} ref='item'>
      <img src={optimize(item.get('avatar'))}/>
      <div className="info">
        <span className="name">{item.get('name') + '：'}</span>
        {item.get('vip') === 1 && <span className="vip"/>}
        <span className="msg">{item.get('msg')}</span>
      </div>
    </div>
  }

}
function optimize(img) {
  let avatar = img || 'http://img5.cache.netease.com/utf8/radish/images/avatar-grey.png'
  if (!!avatar.match(/nos/)) {
    if(!!avatar.match(/\?imageView/i)) {
      avatar += '?imageView'
    }
    avatar = avatar + '&thumbnail=68x68&quality=50'
  } else {
    avatar = `http://s.cimg.163.com/i/${avatar.replace('http://', '')}.${68}x${68}.75.auto.jpg`
  }
  return avatar
}
