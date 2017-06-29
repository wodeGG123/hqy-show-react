//react
import React from 'react'
import ReactDOM from 'react-dom'

//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';

//ant-d
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

require('./styles.scss');
class Intro extends React.Component{

  static defaultProps = {
    single:false,
  }

  constructor(props){
    super(props);
  }
  createMarkup() {
    return {__html: '<div class="am-panel-bd"><p class="color-style3" style="line-height: 30px;">为每个直播教室提供一路高质量流媒体直播通道，并将前端的手机App，课程录屏与直播软件、E-Studio切换台等信号源，通过高质量、低延迟的直播流数据，与后端的手机App，微信、网站、OTT等多种观看平台对接。实现面向专业教学的直播教室服务。</p><p style="padding-top: 60px;padding-bottom: 100px;"><img src="http://hqyj.chinamcloud.com/mlv/img/temp/zbxq-img1.jpg" alt=""></p></div>'};
  }

  getData(){
    
  }
  render(){
    return (
      <div className='content-wrap'>
        <div className='content-1200'><BreadCrumb /></div>
        <div className='content-1200 back-white'>
        {this.props.single?<div className='intro-wrap-single'>
        <div className='intro-contet'>
            <h2>学校简介</h2>
            <h5>日期：2017-03-30 10:21:23</h5>
            <div className='intro-contet-1'>
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
        </div>
        </div>:<div className='intro-wrap'>
            <div className='intro-left'><Sider /></div>
            <div className='intro-contet'>
                <h2>学校简介</h2>
                <h5>日期：2017-03-30 10:21:23</h5>
                <div className='intro-contet-1'>
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </div>

        </div>}

        </div>
      </div>
    )
  }
}
class Sider extends React.Component {
  state = {
    current: '1',
    openKeys: [],
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 240 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        <Menu.Item key="1">简介</Menu.Item>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}


export default Intro
