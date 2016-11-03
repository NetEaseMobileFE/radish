import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Download from './Download'
import { DateHandler } from '../utils'

export default class Record extends React.Component {
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
    const { fixed, videoId, status, state, video, anchor } = this.props
    const difftime = DateHandler.diffdown(video.get('end_time')-video.get('start_time'))
    return <div className='record'>
            <div className='info'>
              <p>{state===-1?'抱歉，直播被删除了':'直播刚结束，正在录制'}</p>
              <div className={'icon '+(state===-1?'delete':'')}></div>
           </div>
           <div className='record-info'>
             <div className='favour-wrap'>
               <div className='info'>点赞人数</div>
               <div className='count'>{video.get('favour')}</div>
             </div>
             <div className='usercount-wrap'>
               <div className='info'>参与人数</div>
               <div className='count'>{video.get('usercount')}</div>
             </div>
             <div className='duration-wrap'>
               <div className='info'>直播时长</div>
               <div className='count'>{difftime.hour+':'+difftime.minute+':'+difftime.second}</div>
             </div>
           </div>
          <p className='tips'>订阅主播，不错过下一次直播</p>
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
