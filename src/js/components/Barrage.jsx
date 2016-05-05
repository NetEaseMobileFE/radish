import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class Barrage extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <div className="barrage-wrap">
      <ReactCSSTransitionGroup transitionName="item" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {
        this.props.data.slice(0, 5).map((item, i) => {
          return <div className="item" key={i}>
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
