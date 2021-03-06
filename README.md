# 萝卜回流页

[![Build Status](https://travis-ci.org/NetEaseMobileFE/radish.svg?branch=master)](https://travis-ci.org/NetEaseMobileFE/radish)
## 准备
必要条件：安装NODE.JS
```bash
npm i -g webpack gulp coffee-script --registry=https://registry.npm.taobao.org
git clone https://github.com/NetEaseMobileFE/radish.git
cd zeus
npm i --registry=https://registry.npm.taobao.org
```
测试打包必要条件：  

1. 开通F2E SERVER，f2e没有缓存切存在外网访问域名，适合测试使用。（开通此服务器账号联系ybduan）。  
2. 登录F2E，在自己的目录下mkdir zeus.
3. 拷贝`.profile.sample`内容到`.profile`， `__YOURF2ENAME__`填入上述账号。  

正式打包必要条件：  
`.profile`文件中`img`为CDN ftp,请填入相应账号方便打包部署。
## 命令
###1. 启动服务
```
npm start
```
###2.测试打包
```
gulp test
```
此命令会打包同时部署生成的资源到f2e server上。  
****
###3. 正式打包
```
gulp deploy
```
此命令会打包同时部署资源到img6.cache.netease.com上，同时会带上hash或时间戳。
###代码风格校验
```
npm i -g eslint-cli
npm run lint
```
代码风格参照https://github.com/airbnb/javascript.

## 技术点
整体架构：[React](http://reactjs.org)+[redux](http://redux.js.org)+[babel](http://babeljs.io)+[webpack](https://webpack.github.io)。  
