//react
import React from 'react'
import ReactDOM from 'react-dom'
//antd
import { Layout, Menu, Breadcrumb, Icon, Input} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

// redux
import { connect } from 'react-redux'

//style
require('./css/style.scss');

class HomeBox extends React.Component {
  static defaultProps = {
    aaa:'123123'
  }
  constructor(props){
    super(props);
    this.state = {
        current: 'itme1',
        searchVal:'',
      }
  }
  handleClick(e){
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  handleChange(text){
    this.setState({
        searchVal:text,
    })
  }
  render(){
    const {name,itemList} = this.props
    console.log(this.props)
    return (

      <Layout>
      <Header className="header">
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="logo">
          <a href='#'><img className='header-logo' src={require("./img/header-logo.png")} /></a>
        </Menu.Item>
        {itemList.map((obj,index)=>{
          return (<Menu.Item key={'item'+ index}>
            {obj.text}
          </Menu.Item>)
        })}
        <Menu.Item key="itme1">
          {name?name:'演示'}
        </Menu.Item>
        <Menu.Item key="itme2" disabled>
          演示标题
        </Menu.Item>
        <SubMenu title={<span>演示标题</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="itme3">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">演示标题</a>
        </Menu.Item>
      </Menu>
      <div className='header-right'>
        <div className='header-search'>
        <Search
          placeholder="请输入搜索内容..."
          value={this.state.searchVal}
          onChange={(e)=>{this.handleChange(e.target.value)}}
          style={{ width: 200 }}
          onSearch={value => {this.props.searchClick(value)}}
          onPressEnter={e => {this.props.searchClick(e.target.value)}}
        />
        </div>
      </div>
      </Header>
    <Layout>
123123
    </Layout>
  </Layout>
    )
  }
}
let mapStateToProps = (state,ownProps)=>{
  return {
    name:state.search,
    itemList:　[{text:'首页'},{text:'学校简介'},{text:'综合实践教学平台'},{text:'在线学习'}]
  }
}
let mapDispatchToProps = (dispatch,ownProps)=>{
  return {
    searchClick:(value)=>{dispatch({type:'HEAD_SEARCH_CLICK',text:value})}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeBox)
