import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
    const { fixed, videoId, status, state } = this.props
    return <div className='record'>
            <div className='info'>
              <div className={'icon '+(state===-1?'delete':'')}></div>
              <p>{state===-1?'抱歉，重播被删除了':'直播刚结束，正在录制'}</p>
           </div>
           <div className='logo'></div>
           <div className='open'>{status && <a href={`http://m.163.com/newsapp/applinks.html?luoboid=${videoId}_${status}`}>立即打开</a>}</div>
    </div>
  }
}
