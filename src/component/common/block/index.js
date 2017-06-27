import React from 'react'
import ReactDOM from 'react-dom'

import {Icon} from 'antd'



require('./styles.scss')

class ListBlock extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    content:'模块内容',
    ps:'模块附加信息',
    bt:'查看详情',
  }
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='ListBlock'>
        <div className='ListBlock-left'>
          <img src={this.props.img} />
        </div>
        <div className='ListBlock-right'>
          <h3><a href='#'>{this.props.title}</a></h3>
          <p>{this.props.content}</p>
          <div>{this.props.ps}</div>
          <a href="#" className='ListBlock-bt'>{this.props.bt}</a>
        </div>
      </div>
    )
  }
}

class ListBlock2 extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    content:'模块内容',
    ps:'模块附加信息',
    bt:'查看详情',
  }
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='ListBlock2'>
        <div className='ListBlock2-img'><img src={this.props.img}/></div>
        <div className='ListBlock2-bottom'>
          <h4><a href='#'>AE梨子路径学习</a></h4>
          <div className='ListBlock2-status'>
            <div className='icon-text-block'>
              <Icon type="clock-circle-o" />
              <span>8课时</span>
            </div>
            <div className='icon-text-block'>
              <Icon type="user" />
              <span>117</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListBlock
export { ListBlock2 }
