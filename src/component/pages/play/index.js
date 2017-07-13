import React from 'react'
import ReactDOM from 'react-dom'

import { Player } from 'video-react';

require('./styles.scss');

class Play extends React.Component {
  static defaultProps = {

  }
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return (
      <div>
        <Player>
          <source src="/src/video/bd.mp4" />
        </Player>
      </div>

    )
  }
}


export default Play
