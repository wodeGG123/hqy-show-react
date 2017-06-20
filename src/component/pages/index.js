//react
import React from 'react'
import ReactDOM from 'react-dom'
//redux
import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'

import {isLogin} from '../../reducers/index.js'




// router
import AppRouter from '../common/router.js'

//styles
import 'antd/dist/antd.css';
import '../../css/antd-cover.scss';


// Reducer => combine
const todoApp = combineReducers({
    isLogin
});
//store
let store = createStore(todoApp);
//render
ReactDOM.render(<Provider store={store}>
    <AppRouter />
  </Provider> ,
  document.getElementById('content')
)
