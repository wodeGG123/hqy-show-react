import React from 'react'
import ReactDOM from 'react-dom'

import {Icon, Button, Tabs} from 'antd'

const TabPane = Tabs.TabPane;

//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';

//request
import Request, {DOMAIN} from '../../../request/index.js';

//tools
import {formatDuring,createMarkup,errorIMGSetting} from '../../common/tools/index.js';

require('./styles.scss')



class Detail extends React.Component {
  static defaultProps = {

  }
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props,context){
    super(props,context);
    console.log(this.context.store.getState())
    const preData = this.context.store.getState().preLoadData;
    if(preData){
      this.state={
          title:preData.title,
          img:preData.img,
          courseNum:preData.courseNum,
          time:preData.time,
          care:preData.care,
          tags:preData.tags,
          content:preData.content,
          typeList:preData.typeList,
          concern:preData.concern,
          id:preData.id
      }
    }else{
      this.state={
          title:'',
          img:'',
          courseNum:'',
          time:'',
          care:'',
          tags:[],
          content:'',
          typeList:[],
          concern:'',
          id:this.props.location.query.id
      }
    }

  }
  handleCare(){
    const _concern = this.state.concern ? false : true;
    Request.get(Request.api.courseCare,{
      type : '0',
      id:this.state.id,
    }).then((data)=>{
      if(data.statusCode == '200'){
        this.setState({
          concern: _concern,
        })
      }
    });
  }
  getData(){
    Request.get(Request.api.detail,{
      id:this.props.location.query.id
    }).then((data)=>{
      console.log(data);
      if(data.statusCode == '200'){
        window.document.title = data.datas.course_name;
        this.setState({
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
        })
      }
    });
  }
  componentWillMount(){
    const { store } = this.context;
    console.log(this.context)

    this.getData();
    window.scrollTo(0,0);
  }

  render(){
    return (
      <div className='content-wrap'>
        <div className='content-1200'><BreadCrumb /></div>
        <div className='content-1200'>
            <div className='detail-top'>
              <div className='detail-img'><img src={this.state.img} onError={errorIMGSetting} /></div>
              <div className='detail-top-right'>
                <h2>{this.state.title}</h2>
                <div >
                    <div className='icon-text-block'>
                      <Icon type="solution" />
                      <span>课时：{this.state.courseNum}课时</span>
                    </div>
                    <div className='icon-text-block'>
                      <Icon type="clock-circle-o" />
                      <span>时长：{this.state.time}</span>
                    </div>
                </div>
                <div className='detail-top-style1'>
                  <h5>学院：</h5>
                  <p>
                    {this.state.typeList.map((obj,index)=>{return (<span key={index}>{obj}</span>)})}
                  </p>
                </div>
                <div className='detail-top-style2'>
                  <h5>标签：</h5>
                  <p>
                    {this.state.tags.map((obj,index)=>{return (<span key={index}>{obj}</span>)})}
                  </p>
                </div>
                <div className='detail-top-bt'>
                  <Button type='primary'>进入学习</Button>
                </div>
              </div>
              <div className='icon-text-block-handle'  style={this.state.concern?{'color':'red'}:{'color':'inherit'}}  onClick={()=>{this.handleCare()}}>
                <Icon type={this.state.concern?'heart':'heart-o'}/>
                <span>{this.state.care}</span>
              </div>
            </div>

            <div className='detail-bottom'>
                <div className='detail-bottom-left'>
                <Tabs defaultActiveKey="1" size="small">
                  <TabPane tab="主页" key="1">
                    <div dangerouslySetInnerHTML={createMarkup(this.state.content)} />
                  </TabPane>
                  <TabPane tab="目录" key="2">
                    <div>


                    </div>

                  </TabPane>
                  <TabPane tab="问答" key="3">Content of tab 3</TabPane>
                </Tabs>
                </div>
                <div className='detail-bottom-right'>
                  <div className='detail-bottom-right-box'>
                      <h3>
                        <Icon type="contacts" />
                        <span>授课教师</span>
                      </h3>
                      <div className='detail-bottom-right-intro'>
                        <div className='detail-bottom-right-intro-thum'><img src={require('./timg.png')} /></div>
                        <div className='detail-bottom-right-intro-text'>
                            <h5>某某某老师</h5>
                            <p>广播电视编导系</p>
                        </div>
                      </div>
                      <div className='detail-bottom-right-intro'>
                        <div className='detail-bottom-right-intro-thum'><img src={require('./timg.png')} /></div>
                        <div className='detail-bottom-right-intro-text'>
                            <h5>某某某老师</h5>
                            <p>广播电视编导系</p>
                        </div>
                      </div>
                  </div>
                  <div className='detail-bottom-right-box'>
                      <h3>
                        <Icon type="contacts" />
                        <span>推荐课程</span>
                      </h3>
                      <div className='detail-bottom-right-intro2'>
                        <h5>某某某老师</h5>
                        <div className='detail-bottom-right-intro-thum'><img src={require('./timg.png')} /></div>
                      </div>
                      <div className='detail-bottom-right-intro2'>
                        <h5>某某某老师</h5>
                        <div className='detail-bottom-right-intro-thum'><img src={require('./timg.png')} /></div>
                      </div>

                  </div>
                </div>
            </div>

        </div>
      </div>
    )
  }
}


export default Detail
