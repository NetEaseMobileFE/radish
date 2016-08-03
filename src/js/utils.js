function localParam(search, hash) {
  search = search || window.location.search
  hash = hash || window.location.hash
  let fn = function(str,reg){
    if(str){
      let data = {}
      str.replace(reg,function( $0, $1, $2, $3 ){
        if($3) {
          data[ $1 ] = $3
        }
      })
      return data
    }
  }
  return {search: fn(search,new RegExp( "([^?=&]+)(=([^&]*))?", "g" ))||{},hash: fn(hash,new RegExp( "([^#=&]+)(=([^&]*))?", "g" ))||{}}  
}
export function jsonp(option = { src: '', callback: 'jsonp' }){
  return new Promise((resolve, reject) => {
    let script = document.createElement("script")
    let src = option.src
    if (src.indexOf('callback') < 0){
      if (src.indexOf('?') > 0) {
        src += '&'
      } else {
        src += '?'
      }
      src += `callback=${option.callback}`
    }
    script.src = src
    script.charset = 'utf-8'
    script.onload = function(){ 
      this.onload = null
      this.onerror = null
      this.parentNode.removeChild(this)
    }
    script.onerror = function(error){
      this.onload = null
      this.onerror = null
      this.parentNode.removeChild(this)
      reject({src: this.src, error: error})
    }
    window[option.callback] = (data) => {
      window[option.callback] = null
      resolve(data)
    }
    document.head.appendChild(script)
  })
}
export function fixNumber(number) {
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + '万'
  }
  return number
}
export function optImg(url, width, height) {
  let avatar = url || 'http://img5.cache.netease.com/utf8/radish/images/avatar9090.png'
  if (!!avatar.match(/nos/)) {
    avatar = avatar + `&thumbnail=${width}x${height}&quality=50`
  } else {
    avatar = `http://s.cimg.163.com/i/${avatar.replace('http://', '')}.${width}x${height}.75.auto.jpg`
  }
  return avatar
}

const nav = window.navigator.userAgent
export const isWechat = !!nav.match(/micromessenger/gi)
export const isQQ = !!nav.match(/qq/gi)
export const isAndroid = !!nav.match(/android/i)
export const isIOS = !!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export const isNewsapp = !!nav.match(/newsapp/i)
export const search = localParam(window.location.href).search

const _params = window.location.href.match(/webapp\/radish\/(\w*)\/(\w*)\/(\w*)(?:\/(\w*))?/)
export const params = {
  roomId: _params[1],
  videoId: _params[2],
  anchorId: _params[3],
  type: _params[4]
}
// 生成uid
export function guid() {
  return s4() + s4()
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function debounce(func, wait) {
  var time = 0;
  return function() {
    var args, context;
    context = this;
    args = arguments;
    if (Date.now() - time < wait) {
      return;
    }
    time = Date.now();
    func.apply(context, args);
  };
}

export const requestAnimationFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()
export const cancelAnimationFrame = (() => {
  return window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function(timer) {
      timer && clearTimeout(timer)
    }
})()
