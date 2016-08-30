import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Anchor from './Anchor'
import Video from './Video'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { anchor, video, room, playVideo, fetchBarrage, appendBarrage, createConnection, removeBarrage, status, barrage, isIOS, isAndroid, isQQ } = this.props
    return <div className='header'>
      <Video video={video} room={room} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} playVideo={playVideo} appendBarrage={appendBarrage} fetchBarrage={fetchBarrage} removeBarrage={removeBarrage} createConnection={createConnection} barrage={barrage} status={status} />
      <Anchor avatar={anchor.get('avatar')} isVip={+anchor.get('confirm') === 1} nickname={anchor.get('nickname')} title={video.get('title')} isQQ={isQQ} isIOS={isIOS} isAndroid={isAndroid} video={video}/>
    </div>
  }
}
