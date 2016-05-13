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
export const isAndroid = !!window.navigator.userAgent.match(/android/i)
export const search = localParam(window.location.href).search
const _params = window.location.href.match(/webapp\/radish\/(\w*)\/(\w*)\/(\w*)/)
export const params = {
  roomId: _params[1],
  videoId: _params[2],
  anchorId: _params[3]
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