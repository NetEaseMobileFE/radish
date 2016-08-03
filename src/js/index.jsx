import React from 'react'
import { render } from 'react-dom'
// import CSSModules from 'react-css-modules'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
require('es6-promise').polyfill()

import Living from './components/Living'
import '../css/main.scss'
import reducer from './reducer'
import { init } from './share'
init()

const store = compose(
  applyMiddleware(thunk), 
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer)
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextReducer = require('./reducer').default
    store.replaceReducer(nextReducer)
  })
}

render(
  <Provider store={store}>
    <Living />
  </Provider>
  , document.getElementById('root')
)