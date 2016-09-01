// 易信中，要求全局设置shareData这个变量用于分享
window.shareData = {}
export function setShareData(name = '小萝卜', img = 'http://img6.cache.netease.com/utf8/3g/touch/images/share-logo.png') {
  let url = location.href
  if (url.match(/from=newsapp/)) {
    url += '&f=newsapp'
  }
  window.shareData = {
    imgUrl: img,  
    tImgUrl: img,
    fImgUrl: img,
    wImgUrl: img,
    href: location.href,
    timeLineLink: location.href,
    sendFriendLink: location.href,
    weiboLink: location.href,
    tTitle: name + '正在直播，快来一起看！',
    tContent: '网易萝卜，直播新鲜事',
    fTitle: name + '正在直播，快来一起看！',
    fContent: '网易萝卜，直播新鲜事',
    wContent: name + '正在直播，快来一起看！'
  }
}
export function init() {
  setShareData()
  const callbackUrl = 'http://sps.163.com/func/?func=sharedone&spst=11&modelid=radish'
  document.addEventListener('WeixinJSBridgeReady', function(){
    window.WeixinJSBridge.on('menu:share:appmessage', function(argv){
      window.WeixinJSBridge.invoke('sendAppMessage', {
        "img_url": shareData.imgUrl,
        "link": shareData.href,
        "desc": shareData.fContent,
        "title": shareData.fTitle
      }, function(){
        neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=wx', '', 'sps')
      })
    })

    window.WeixinJSBridge.on('menu:share:timeline', function(){
      window.WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareData.imgUrl,
        "img_width": "80",
        "img_height": "80",
        "link": shareData.href,
        "desc": shareData.tContent,
        "title": shareData.tTitle
      }, function(){
        neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=wx', '', 'sps')
      })
    })
  })
  document.addEventListener('YixinJSBridgeReady', function(){
    window.YixinJSBridge.on('menu:share:appmessage', function(argv){
      window.YixinJSBridge.invoke('sendAppMessage', {
        "img_url": shareData.imgUrl,
        "link": shareData.href,
        "desc": shareData.fContent,
        "title": shareData.fTitle
      }, function(){
        neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=yx', '', 'sps')
      })
    })

    window.YixinJSBridge.on('menu:share:timeline', function(){
      window.YixinJSBridge.invoke('shareTimeline',{
        "img_url": shareData.imgUrl,
        "img_width": "80",
        "img_height": "80",
        "link": shareData.href,
        "desc": shareData.tContent,
        "title": shareData.tTitle
      }, function(){
        neteaseTracker && neteaseTracker(false, callbackUrl + '&spsf=yx', '', 'sps')
      })
    })
  })
}


