import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { requestAnimationFrame, cancelAnimationFrame } from '../utils'
export default class Radish extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.draw = this.draw.bind(this)
    this.radishes = []
    this.number = 0
    this.timer = null
    this.initialCount = 0
    this.radishDelta = 0
  }
  componentDidMount() {
    const canvas = this.refs.canvas
    this.ctx = canvas.getContext('2d')
    setTimeout(() => {
      this.width = canvas.offsetWidth
      this.height = canvas.offsetHeight
      canvas.width = this.width
      canvas.height = this.height
      this.delta = this.width - document.querySelector('.radish').offsetLeft - 20
    }, 2000)
  }
  componentDidUpdate() {
    // 初始化点赞数
    if (this.initialCount === 0 && this.props.favour !== 0) {
      this.initialCount = this.props.favour
    }
    // 当前点赞数少于接口点赞数
    const delta = this.props.favour - this.initialCount - this.number
    if (delta) {
      let array = []
      // 同时最多30个
      for (let i = 0; i < delta && i < 30; i++) {
        array.push(new RadishItem(this.ctx, this.width - this.delta, this.height-20))
      }
      this.radishes = this.radishes.concat(array)
      this.number += delta
      !this.timer && this.draw()
    }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.timer)
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)  // 清空canvas区域
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.radishes = this.radishes.filter((r) => {
      if (r.y <= this.height) {
        r.draw()
      }
      return r.y <= this.height
    })
    if (this.radishes.length) {
      this.timer = requestAnimationFrame(this.draw)
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height)  // 清空canvas区域
      cancelAnimationFrame(this.timer)
      this.timer = null
    }
  }
  render() {
    return (
      <div className="canvas">
        <canvas ref="canvas"></canvas>
      </div>
    )
  }
}
class RadishItem {
  constructor(ctx, width, height) {
    this.x = 0
    this.y = 0
    this.width = width
    this.height = height
    this.path = this.getRandomPath(width)
    this.percent = 0
    this.ctx = ctx
    this.img = new Image()
    this.img.src = `http://img6.cache.netease.com/utf8/radish/images/radish-icon-${Math.floor(Math.random() * 5) + 1}.png`
    // this.img.src = 'http://findicons.com/files/icons/2015/24x24_free_application/24/heart.png'
  }
  draw() {
    this.percent++
    const percent = this.percent / 100
    const xy = getQuadraticBezierXYPoint(this.path[0], this.path[1], this.path[2], percent)
    // console.log(this.ctx)
    this.x = xy.x
    this.y = xy.y
    this.ctx.save()  // 保存画布当前的状态
    this.ctx.translate(xy.x, xy.y)  // 将（0，0）位置设置为当前曲线轨迹上的（x, y）
    this.ctx.rotate(-percent * Math.PI)
    this.ctx.drawImage(this.img, 0, 0, 20, 26)  // 萝卜
    this.ctx.restore()  // 取出画布之前保存的状态
  }
  getRandomPath(x) {
    const xStart = x - 20  // 从距离最右边20个像素的位置开始
    const xEnd = xStart - Math.random() * 300  // 萝卜起始x和结束x之间的范围为200像素

    // 起始点、控制点、结束点
    return [{
      x: xStart,
      y: this.height
    }, {
      x: (xStart + xEnd) / 2,
      y: Math.floor((Math.random() * this.height) - this.height)
    }, {
      x: xEnd,
      y: this.height
    }]
  }
}

// x = (1-k)^2 * x1 + 2(1-k)k * x2 + k^2 * x3
// y = (1-k)^2 * y1 + 2(1-k)k * y2 + k^2 * y3
/**
 * [获取曲线点坐标]
 * @param  {[type]} startPt   [起始点坐标]
 * @param  {[type]} controlPt [控制点坐标]
 * @param  {[type]} endPt     [终点坐标]
 * @param  {[type]} percent   [斜率相关系数]
 */
function getQuadraticBezierXYPoint(startPt, controlPt, endPt, percent) {
  const x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x
  const y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y
  return ({
    x,
    y
  })
}
