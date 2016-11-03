import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { fromJS, List } from 'immutable'
import BarrageItem from './BarrageItem'
export default class Barrage extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.item = null
  }
  componentDidMount() {
    /*this.t = setInterval(() => {
      if (this.props.data.size > 0) {
        this.props.removeBarrage(Date.now())
      }
    }, 1000)*/
    const { video } = this.props
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    if( !isPlayed || (isPlayed && direction!==0) ){
      console.log('isPlayed')
      window.scrollTo(0,document.body.scrollHeight)
    }
    if(isPlayed && direction===0){
      /*setTimeout(()=>{
        this.item = this.findDOMNode(this.refs.item)
        this.item.parentNode.childNodes.style.opacity=0
        //this.refs.item.style.opacity=0
      },2000)*/
    }
  }
  componentDidUpdate(nextProps) {
    const { video } = this.props
    //const { video } = nextProps
    const isPlayed = video.get('isPlayed')
    const direction = video.get('direction')
    if( (!isPlayed || (isPlayed && direction!==0)) && (this.props.data !== nextProps.data) ){
      console.log('isPlayed')
      window.scrollTo(0,document.body.scrollHeight)
    }
    if(isPlayed && direction===0){
      /*setTimeout(()=>{
        this.item = this.findDOMNode(this.refs.item)
        this.item.parentNode.childNodes.style.opacity=0
        //this.refs.item.style.opacity=0
      },2000)*/
    }
  }
  render() {
    const { isAndroid, isQQ, data,video, sheetName, removeBarrage, barrageFadeout } = this.props
    let playing = video.get('playing')
    const direction = video.get('direction')
    const isPlayed = video.get('isPlayed')
    if( direction!==0){playing=''}
    //const data = this.props.data.slice(0, 5)
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
    </div>
     <!--<div className="name">{item.get('name')}{item.get('vip') === 1 && <span className="vip" />}</div>
     <div className="msg">{item.get('msg')}</div>-->

    */
    return <div className={sheetName+' size-' + data.size+' '+playing}>
      {
        data.map((item, i) => {
          return <BarrageItem item={item} video={video} removeBarrage={removeBarrage} barrageFadeout={barrageFadeout} />
        })
      }
    </div>
  }
}
