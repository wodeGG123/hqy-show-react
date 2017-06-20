//react
import React from 'react'
import ReactDOM from 'react-dom'
//redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let store = createStore(todoApp);


//styles
import 'antd/dist/antd.css';
import '../../css/antd-cover.scss';


// Reducer
function todoApp(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

import AppRouter from '../common/router.js'
ReactDOM.render(<Provider store={store}>
    <AppRouter />
  </Provider> ,
  document.getElementById('content')
)
