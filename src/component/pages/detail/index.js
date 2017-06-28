import React from 'react'
import ReactDOM from 'react-dom'

import {Icon, Button, Tabs} from 'antd'

const TabPane = Tabs.TabPane;

//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';



require('./styles.scss')



class Detail extends React.Component {
  static defaultProps = {

  }
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return (
      <div className='content-wrap'>
        <div className='content-1200'><BreadCrumb /></div>
        <div className='content-1200'>
            <div className='detail-top'>
              <div className='detail-img'><img src={require('./timg.png')} /></div>
              <div className='detail-top-right'>
                <h2>节目包装实践与应用</h2>
                <div >
                    <div className='icon-text-block'>
                      <Icon type="solution" />
                      <span>课时：37课</span>
                    </div>
                    <div className='icon-text-block'>
                      <Icon type="clock-circle-o" />
                      <span>时长：2小时18分</span>
                    </div>
                </div>
                <div className='detail-top-style1'>
                  <h5>学院：</h5>
                  <p>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                    <span>广播电视编导</span>
                  </p>
                </div>
                <div className='detail-top-style2'>
                  <h5>标签：</h5>
                  <p>
                    <span>广播电视编导</span>
                  </p>
                </div>
                <div className='detail-top-bt'>
                  <Button type='primary'>进入学习</Button>
                </div>
              </div>
              <div className='icon-text-block-handle'>
                <Icon type="heart-o" />
                <span>117</span>
              </div>
            </div>

            <div className='detail-bottom'>
                <div className='detail-bottom-left'>
                <Tabs defaultActiveKey="1" size="small">
                  <TabPane tab="主页" key="1">Content of tab 1</TabPane>
                  <TabPane tab="目录" key="2">Content of tab 2</TabPane>
                  <TabPane tab="问答" key="3">Content of tab 3</TabPane>
                </Tabs>
                </div>
                <div className='detail-bottom-right'>
                  <div className='detail-bottom-right-box'>
                      <h3></h3>
                  </div>
                </div>
            </div>

        </div>
      </div>
    )
  }
}


export default Detail
