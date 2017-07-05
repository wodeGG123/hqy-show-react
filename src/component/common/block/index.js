import React from 'react'
import ReactDOM from 'react-dom'
//antd
import {Icon} from 'antd'

//dateFormat
var dateFormat = require('dateformat');

require('./styles.scss')

class ListBlock extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    content:'模块内容',
    ps:'',
    id:'',
    bt:'查看详情',
  }
  constructor(props){
    super(props);
  }
  getDefaultIMG(e){
    e.target.src = require('./timg.png');
  }
  render(){
    return (
      <div className='ListBlock'>
        <div className='ListBlock-left'>
          <img src={this.props.img} onError={this.getDefaultIMG} />
        </div>
        <div className='ListBlock-right'>
          <h3><a href={'/#/home/intro?id='+this.props.id}>{this.props.title}</a></h3>
          <p>{this.props.content}</p>
          <div>{dateFormat(parseInt(this.props.ps)*1000,"yyyy年mm月dd日 HH:MM:ss")}</div>
          <a href={'/#/home/intro?id='+this.props.id} className='ListBlock-bt'>{this.props.bt}</a>
        </div>
      </div>
    )
  }
}

class ListBlock2 extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    courseNum:'',
    learnNum:'',
    id:'',
  }
  constructor(props){
    super(props);
  }
  getDefaultIMG(e){
    e.target.src = require('./timg.png');
  }
  render(){
    return (
      <div className='ListBlock2'>
        <div className='ListBlock2-img'><img src={this.props.img} onError={this.getDefaultIMG} /></div>
        <div className='ListBlock2-bottom'>
          <h4><a href={'/#/home/detail?id='+this.props.id}>{this.props.title}</a></h4>
          <div className='ListBlock2-status'>
            <div className='icon-text-block'>
              <Icon type="clock-circle-o" />
              <span>{this.props.courseNum}课时</span>
            </div>
            <div className='icon-text-block'>
              <Icon type="user" />
              <span>{this.props.learnNum}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListBlock
export { ListBlock2 }
