//react
import React from 'react'
import ReactDOM from 'react-dom'


//antd
import { Spin } from 'antd';
//router
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

//self-component
import Home from '../component/pages/home/index.js'
import List from '../component/pages/list/index.js'
import Intro from '../component/pages/intro/index.js'
import Detail from '../component/pages/detail/index.js'
import Login from '../component/pages/login/index.js'



class AppRouter extends React.Component{
  constructor(props){
    super(props);
  }
  //router 树
  // + /home/list?element=listblock
  // + /home/list?element=listblock2
  // + /home/intro
  // + /home/detai
  // + /login
  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home}>
            <Route path="list" component={List}></Route>
            <Route path="intro" component={Intro}></Route>
            <Route path="detail" component={Detail}></Route>
          </Route>
          <Route path="login" component={Login}></Route>
        </Route>
      </Router>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (

        <div>

          {this.props.children}
          <div style={{display:'none'}} className='spin-wrap'>
            <Spin spinning={true} size="large"  tip="加载中..." delay={500} ></Spin>
          </div>
        </div>

    )
  }
}

export default AppRouter
