import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Download from './Download'
import { DateHandler } from '../utils'

export default class Prevue extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    //const { video, isAndroid, isQQ } = this.props
    //const data = this.props.data.slice(0, 5)
    //const status = video.get('status')
    const { fixed, video,videoId, status, state, anchor,isAndroid,isQQ } = this.props
    const start_time = new Date(video.get('start_time'))
    let startTimeStr = start_time.getFullYear()+'-'+DateHandler.dbl00((start_time.getMonth()+1))+'-'+DateHandler.dbl00(start_time.getDate())+' '+DateHandler.dbl00(start_time.getHours())+':'+DateHandler.dbl00(start_time.getMinutes())
    //return <div className='prevue'>
    return <div className={'prevue '+((state===9 || state===7)?'prevue-abnormal':'')}>
      <div className='title'>{video.get('title')}</div>
      {(state===9 || state===7) && <div className='pre-abnormal-icon'></div>}
      {state===8 && <div className='pre-info'>{`${startTimeStr}开始`}</div>}
      {state===8 && <div className='alarm'><a href={`http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_1`}></a></div>}
      {(state===9 || state===7) && <div className='pre-abnormal'>直播马上开始</div>}
      <div className='anchor'>
        <div className='avatar'><img src={anchor.get('avatar')} /></div>
        <div className='info'>
          <div className='nickname'>{anchor.get('nickname')}</div>
          <div className='subscribe-count'>{video.get('subscribeCount')+'订阅'}</div>
        </div>
        <div className='subscribe'><a href={`http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_1`}>+ 订阅</a></div>
      </div>
      <Download fixed={fixed} videoId={videoId} status={status}/>
    </div>
  }
}
