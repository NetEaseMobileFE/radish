import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class Barrage extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount() {
    this.t = setInterval(() => {
      // if (this.props.data.size > 0) {
      //   this.props.removeBarrage(Date.now())
      // }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.t)
  }
  render() {
    const data = this.props.data.slice(0, 5)

    return <div className={'barrage-wrap size-' + data.size}>
      <ReactCSSTransitionGroup transitionName="item" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {
        data.map((item, i) => {
          return <div className={'item' + (data.size >= 4 && i < 2 ? (' item' + i) : '')} key={item.get('id')}>
            <img src={item.get('avatar')} />
            <div className="info">
              <div className="name">{item.get('name')}</div>
              <div className="msg">{item.get('msg')}</div>
            </div>
          </div>
        })
      }
      </ReactCSSTransitionGroup>
    </div>
  }
}
