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
    logo: require("./img/header-logo.png"),
    itemList:　[
      {text:'首页',href:'/'},
      {text:'学校简介',href:'#'},
      {text:'综合实践教学平台',href:'#',subMenu:[
        {text:'综合',href:'#'},
        {text:'实践',href:'#'},
        {text:'管理',href:'#'},
        {text:'教学',href:'#'},
      ]},
      {text:'在线学习',href:'#'}
    ],
    footer:{name:'大学名称',text:['大学地址地址','邮编：12312983','电话：123123 34324324']}
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
          <a href='/'><img className='header-logo' src={this.props.logo} /></a>
        </Menu.Item>
        {itemList.map((obj,index)=>{
          if(obj.subMenu){
          return (<SubMenu key={'item'+ index} title={<span>演示标题</span>}>{obj.subMenu.map((subObj,subIndex)=>{
              return (<Menu.Item key={'sub-item'+subIndex}><a href={subObj.href}>{subObj.text}</a></Menu.Item>)
            })}</SubMenu>)
          }else{
            return (<Menu.Item key={'item'+ index}>
              <a href={obj.href}>{obj.text}</a>
            </Menu.Item>)
          }
        })}
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
      {this.props.children}
    </Layout>
    <footer>
      <span>{this.props.footer.name}</span>
      {this.props.footer.text.map((obj,index)=>{
        return(<span key={index}>{obj}</span>)
      })}
    </footer>
  </Layout>
    )
  }
}
let mapStateToProps = (state,ownProps)=>{
  return {
    name:state.search,
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
