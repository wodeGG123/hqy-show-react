//styles
import 'antd/dist/antd.css';
import './css/antd-cover.scss';

//react
import React from 'react'
import ReactDOM from 'react-dom'
//redux
import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'

import {isLogin} from './reducers/index.js'

// router
import AppRouter from './component/common/router.js'

// Reducer => combine
const todoApp = combineReducers({
    isLogin
});
const todo = combineReducers({
    todoApp
});
//store
let store = createStore(todo);
//render
ReactDOM.render(<Provider store={store}>
    <AppRouter />
  </Provider> ,
  document.getElementById('content')
)
