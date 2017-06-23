//styles
import 'antd/dist/antd.css';
import './css/antd-cover.scss';

//react
import React from 'react'
import ReactDOM from 'react-dom'
//redux
import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'

import reducers from './reducers/index.js'

// router
import AppRouter from './routers/index.js'

//store
let store = createStore(reducers);
//render
ReactDOM.render(<Provider store={store}>
    <AppRouter />
  </Provider> ,
  document.getElementById('content')
)
