//react
import React from 'react'
import ReactDOM from 'react-dom'

//self-component
import HomeBox from '../../common/homeBox/index.js'


class Home extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <HomeBox>
          {this.props.children}
        </HomeBox>
      </div>
    )
  }
}


export default Home
