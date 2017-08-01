import React from 'react'
import ReactDOM from 'react-dom'

import { Player } from 'video-react';

//lodash
import _ from 'lodash';
//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';
import chatInit from './chat.js';
//ant-d
import { Tabs, Input } from 'antd';
const TabPane = Tabs.TabPane;
//scroll
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
//dateFormat
var dateFormat = require('dateformat');
//NProgress
import NProgress from 'nprogress';
require('../../../css/nprogress.css');
//request
import Request, {DOMAIN} from '../../../request/index.js';

function callback(key) {
  console.log(key);
}

require('./styles.scss');


class Play extends React.Component {
  static defaultProps = {

  }
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props){
    super(props);
    this.state={
      videoURL:'',
      chat:null,
      message:'',
      chatContent:[
        // {
        //   type:0,
        //   name:'',
        //   content:'系统消息001',
        //   time:'',
        //   thumb:'',
        // },
        // {
        //   type:1,
        //   name:'董小姐',
        //   content:'hello Mis D',
        //   time:'16:46:04',
        //   thumb:require('../../../img/timg.png'),
        // },
        // {
        //   type:2,
        //   name:'panda.cn',
        //   content:'hello panda.cn',
        //   time:'16:46:04',
        //   thumb:require('../../../img/timg.png'),
        // },
      ]
    }
  }
  sendMessage(){

    let _chatContent = _.cloneDeep(this.state.chatContent);
    let now = new Date();
    let that = this;
    let userInfo = this.context.store.getState().userInfo;
    if(that.state.message == ''){
      return false;
    }else{
      this.state.chat.sendMessage({
        message:this.state.message,
        sender:(userInfo.realname || userInfo.username),
      },function(data){
        _chatContent.push({
          type:1,
          name:'我',
          // (userInfo.realname || userInfo.username),
          content:that.state.message,
          time:dateFormat(now, "HH:MM:ss"),
          thumb:require('../../../img/timg.png'),
        });

        that.setState({
          chatContent:_chatContent,
          message:'',
        })
      })
    }

  }
  reFreshIscroll(){
    this.refs.iScroll.withIScroll(function(iScroll) {
       iScroll.scrollTo(0,iScroll.maxScrollY)
     })
  }
  componentWillMount(){
    NProgress.start();
    let that = this;
    //初始化聊天室
    //由于获得userid需要时间，所以使用定时器，获得信息成功则退出循环
    let _it = setInterval(function(){
      let _userInfo = that.context.store.getState().userInfo;
      console.log(_userInfo);
      if(_userInfo){
        clearInterval(_it);
        NProgress.done(function(){
          NProgress.remove();
        });
        //state.chat 是初始化后返回的一个对象 里面有自带的方法
        //chatInit() 第二个参数是自定义的监听接收到消息后的回调函数
        that.setState({
          chat:chatInit({
            room: that.props.location.query.room,
            userInfo: _userInfo,
          },{
            receiveMessage:function(data){
              let _chatContent = _.cloneDeep(that.state.chatContent);
              let now = new Date();
              _chatContent.push({
                //data.messageDirection 值为1代表自己发送的消息，2代表其他人发送的消息
                type:(data.messageDirection == '1')?1:2,
                name:(data.messageDirection == '1')?'我':data.content.extra,
                content:data.content.content,
                time:dateFormat(now, "HH:MM:ss"),
                thumb:require('../../../img/timg.png'),
              });
              that.setState({
                chatContent:_chatContent,
              })

            }
          })
        })
      }

    },1000)
    //获取视频信息
    let preLoadData = this.context.store.getState().preLoadData;
    if(preLoadData){
      console.log(preLoadData.play.video[0].vodAddress.clips[0].urls[0]);
      this.setState({
        videoURL:preLoadData.play.video[0].vodAddress.host+preLoadData.play.video[0].vodAddress.clips[0].urls[0]
      })
    }else{
      //预加载播放数据
      Request.get(Request.api.learn,{id:this.props.location.query.id}).then((data)=>{
        console.log(data);
        this.setState({
          videoURL:data.datas.play.video[0].vodAddress.host+data.datas.play.video[0].vodAddress.clips[0].urls[0]
        })
      })
    }

  }
  render(){
    return (
      <div>
      <div className='content-1200'><BreadCrumb /></div>
      <div className='content-1200 player-wrap'>
        <div className='player-box'>
          {this.state.videoURL?<Player>
              <source src={this.state.videoURL} />
            </Player>:<div></div>}

        </div>
        <div className='player-tools'>
        <Tabs defaultActiveKey="1" onChange={callback}>
  <TabPane tab="互动交流" key="1">
    <div className='chat-box'>
      <div className='chat-content'>

      <ReactIScroll ref="iScroll" iScroll={iScroll} onRefresh={()=>{this.reFreshIscroll()}}
                 options={{
        mouseWheel: true,
        scrollbars: true,
      }}
                 onScrollStart={this.onScrollStart}>
          <div>
          {
            this.state.chatContent.map((obj,index)=>{
              switch (obj.type) {
                case 0:return(<div key={index} className='chat-system-message'><p>{obj.content}</p></div>);break;
                case 1:return(<div key={index} className='chat-user-message-myself'>
                  <div>
                    <h5><b>{obj.name}</b><span>{obj.time}</span></h5>
                    <p>{obj.content}</p>
                  </div>
                  <img src={obj.thumb} />
                </div>);break;
                case 2:return(<div key={index} className='chat-user-message-enemy'>
                  <img src={obj.thumb} />
                  <div>
                    <h5><b>{obj.name}</b><span>{obj.time}</span></h5>
                    <p>{obj.content}</p>
                  </div>
                </div>);break;
                default:return (<div></div>)
              }

            })
          }
          </div>

          </ReactIScroll>

      </div>
      <div className='chat-tools'>
         <Input placeholder="输入内容..." value={this.state.message} onChange={(e)=>{this.setState({message:e.target.value})}} onPressEnter={()=>{this.sendMessage()}} addonAfter={<a href='javascript:void(0);' onClick={()=>{this.sendMessage()}}>发送</a>} />

      </div>
    </div>

  </TabPane>
  <TabPane tab="课程目录" key="2">Content of Tab Pane 2</TabPane>
  <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
</Tabs>
        </div>
      </div>
      </div>
    )
  }
}


export default Play
