import React from 'react'
import { render } from 'react-dom'
// import CSSModules from 'react-css-modules'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
require('es6-promise').polyfill()

import Living from './components/Living'
import styles from '../css/main.scss'
import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
render(
  <Provider store={store}>
    <Living />
  </Provider>
  , document.getElementById('root')
)