import React from 'react'
import ReactDOM from 'react-dom'
//antd
import {Icon,Button} from 'antd'

//dateFormat
var dateFormat = require('dateformat');
//redux
import { connect } from 'react-redux'
//request
import Request, {DOMAIN} from '../../../request/index.js';
//tools
import {formatDuring,createMarkup,errorIMGSetting} from '../../common/tools/index.js';


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
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  }
  constructor(props,context){
    super(props,context);
  }

  getDefaultIMG(e){
    e.target.src = require('./timg.png');
  }

  handleClick(url){
      Request.get(Request.api.intro,{
        id: this.props.id
      }).then((data)=>{
        console.log(data);
        if(data.statusCode == '200'){
          const transedData = {
            title : data.datas.title,
            time : dateFormat(data.datas.created_at,'yyyy-mm-dd HH:MM:ss'),
            content : data.datas.description,
          }
          this.context.store.dispatch({
            type: 'PRE_LOAD_DATA',
            data: transedData,
          });
          this.context.router.push(url);
        }
      });
  }

  render(){
    return (
      <div className='ListBlock'>
        <div className='ListBlock-left'>
          <img src={this.props.img} onError={this.getDefaultIMG} />
        </div>
        <div className='ListBlock-right'>
          <h3><a onClick={(e)=>{this.handleClick('/home/intro?id='+this.props.id)}} href='javascript:void(0);'>{this.props.title}</a></h3>
          <p>{this.props.content}</p>
          <div>{dateFormat(parseInt(this.props.ps)*1000,"yyyy年mm月dd日 HH:MM:ss")}</div>
          <a onClick={(e)=>{this.handleClick('/home/intro?id='+this.props.id)}} href='javascript:void(0);' className='ListBlock-bt'>{this.props.bt}</a>
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
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,

  }
  constructor(props,context){
    super(props,context);
  }
  getDefaultIMG(e){
    e.target.src = require('./timg.png');
  }
  handleClick(url){
      Request.get(Request.api.detail,{
        id: this.props.id
      }).then((data)=>{
        console.log(data);
        if(data.statusCode == '200'){
          const transedData = {
            title:data.datas.course_name,
            img:DOMAIN+data.datas.thumb,
            courseNum:data.datas.learnnumber,
            time:formatDuring(data.datas.auth_count_time),
            care:data.datas.likenumber,
            typeList:Object.values(data.datas.typeList),
            tags:data.datas.object?data.datas.object.split(','):[],
            content:data.datas.description,
            concern:data.datas.concern,
            id:data.datas.course_id,
          }
          this.context.store.dispatch({
            type: 'PRE_LOAD_DATA',
            data: transedData,
          });
          this.context.router.push(url);
        }
      });
  }
  render(){
    return (
      <div className='ListBlock2'>
        <div className='ListBlock2-img'><img src={this.props.img} onError={this.getDefaultIMG} /></div>
        <div className='ListBlock2-bottom'>
          <h4><a href='javascript:void(0);' onClick={(e)=>{this.handleClick('/home/detail?id='+this.props.id)}}>{this.props.title}</a></h4>
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

class ListBlock3 extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    content:'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
    button:'实验详情',
    id:'',
  }
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,

  }
  constructor(props,context){
    super(props,context);
  }
  getDefaultIMG(e){
    e.target.src = require('./timg.png');
  }
  handleClick(url){
      Request.get(Request.api.detail,{
        id: this.props.id
      }).then((data)=>{
        console.log(data);
        if(data.statusCode == '200'){
          const transedData = {
            title:data.datas.course_name,
            img:DOMAIN+data.datas.thumb,
            courseNum:data.datas.learnnumber,
            time:formatDuring(data.datas.auth_count_time),
            care:data.datas.likenumber,
            typeList:Object.values(data.datas.typeList),
            tags:data.datas.object?data.datas.object.split(','):[],
            content:data.datas.description,
            concern:data.datas.concern,
            id:data.datas.course_id,
          }
          this.context.store.dispatch({
            type: 'PRE_LOAD_DATA',
            data: transedData,
          });
          this.context.router.push(url);
        }
      });
  }
  render(){
    return (
      <div className='ListBlock3'>
          <div className='ListBlock3-img'>
            <img src={this.props.img} onError={(e)=>{errorIMGSetting(e)}} />
          </div>
          <div className='ListBlock3-right'>
            <h3>{this.props.title}</h3>
            <p>{this.props.content}</p>
            <div><Button type="primary" onClick={(e)=>{this.handleClick('/home/detail?id='+this.props.id)}}>{this.props.button}</Button></div>
          </div>
      </div>
    )
  }
}

export default ListBlock
export { ListBlock2, ListBlock3}
