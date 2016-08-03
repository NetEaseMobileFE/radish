import { isNewsapp } from './utils'

export function login() {
  return new Promise((resolve, reject) => {
    const iframe = document.querySelector('iframe[name="scheme"]')
    window.__newsapp_userinfo_done = (rs) => {
      window.__newsapp_userinfo_done = null
      if (rs) {
        doVerifyCookie() ? resolve(rs) : iframe.src = 'login://'
      } else {
        frame.src = "login://"
      }
    }
    window.__newsapp_login_done = (rs) => {
      window.__newsapp_login_done = null
      if (rs) {
        resolve(rs)
      } else {
        resolve(false)
      }
    }
    window.__newsapp_login_canceled = () => {
      resolve(false)
    }
    if (isNewsapp) {
      iframe.src = 'userinfo://'
    } else {
      resolve(doVerifyCookie())
    }

  })
}
export function setShareData(shareData, channel) {
  const id = document.getElementById.bind(document)
  id('__newsapp_sharetext').textContent = shareData.wbText
  id('__newsapp_sharephotourl').textContent = shareData.wbPhoto
  id('__newsapp_sharewxtext').textContent = shareData.wxText
  id('__newsapp_sharewxtitle').textContent = shareData.wxTitle
  id('__newsapp_sharewxurl').textContent = shareData.wxUrl
  id('__newsapp_sharewxthumburl').textContent = shareData.wxPhoto
}
export default function init() {
  const frag = document.createDocumentFragment()

  const schemeIframe = document.createElement('iframe')
  schemeIframe.style.display = 'none'
  schemeIframe.name = 'scheme'
  frag.appendChild(schemeIframe)

  const shareDom = document.createElement('div')
  shareDom.style.display = 'none'
  shareDom.innerHTML = `
    <div style="display:none" id="__newsapp_sharetext">网易新闻客户端-微博分享</div>
    <div style="display:none" id="__newsapp_sharephotourl">http://img1.cache.netease.com/lady/luoma/001jifen/00bingo/0314/00.jpg</div><!--微博分享图片-->
    <div style="display:none" id="__newsapp_sharewxtext">网易新闻客户端-微信分享摘要</div>
    <div style="display:none" id="__newsapp_sharewxtitle">网易新闻客户端-微信分享标题</div>
    <div style="display:none" id="__newsapp_sharewxurl">http://m.163.com/newsapp</div>
    <div style="display:none" id="__newsapp_sharewxthumburl">http://img1.cache.netease.com/3g/newsapp/newapp201312/images/news_app_download_logo.png</div>
  `
  frag.appendChild(shareDom)

  document.body.appendChild(frag)
}
function getCookie(sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
function doVerifyCookie(){
  var S_INFO = getCookie('S_INFO'),
    S_INFO = S_INFO && S_INFO.split('|'),
    P_INFO = getCookie('P_INFO'),
    P_INFO = P_INFO && P_INFO.split('|');
  return (S_INFO && (P_INFO[2]!='2'));
}