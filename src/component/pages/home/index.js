//react
import React from 'react'
import ReactDOM from 'react-dom'

//self-component
import HomeBox from '../../common/homeBox/index.js'

//router
import {Link} from 'react-router'

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const _tempHome = (<div>
      <Link to="/home/list?element=listblock">list1</Link>
      <span>||</span>
      <Link to="/home/list?element=listblock2">list2</Link>
      <span>||</span>
      <Link to="/home/detail?id=546">detail</Link>
      <span>||</span>
      <Link to="/home/intro?id=1047">intro</Link>
      <span>||</span>
      <Link to="/home/play?room=room181">play</Link>
      <span>||</span>
      <Link to="/">Home</Link>
    </div>)
    return (
      <div>
        <HomeBox>
          {this.props.children||_tempHome}
        </HomeBox>
      </div>
    )
  }
}


export default Home
