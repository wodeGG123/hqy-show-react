//react
import React from 'react'
import ReactDOM from 'react-dom'

//router
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

//self-component
import Home from '../component/pages/home/index.js'

class AppRouter extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
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
      <div>{this.props.children}</div>
    )
  }
}

export default AppRouter
