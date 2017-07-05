//react
import React from 'react'
import ReactDOM from 'react-dom'
//antd
import { Layout, Menu, Breadcrumb, Dropdown, Icon, Input} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;
//lodash
import _ from 'lodash'

// redux
import { connect } from 'react-redux'
//request
import Request, {DOMAIN,Strorage} from '../../../request/index.js';

//style
require('./css/style.scss');

class HomeBox extends React.Component {
  static defaultProps = {

    footer:{name:'大学名称',text:['大学地址地址','邮编：12312983','电话：123123 34324324']},

  }
  constructor(props){
    super(props);
    this.state = {
        logo: require("./img/header-logo.png"),
        current: 'itme1',
        searchVal:'',
        itemList:　[],
        userLogin:false,
        user:{name:'华栖云教',menu:[{title:'个人中心',url:'/#/'},{title:'我的课程',url:'/#/'}]},
      }
  }
  componentWillMount(){
    this.getLogin()

  }
  getLogin(){

    if(Strorage.userToken){
      let _user = _.cloneDeep(this.state.user);
      Request.get(Request.api.userInfo).then((data)=>{
        if(data.statusCode == '200'){
          _user.name = (data.datas.realname || data.datas.username)
          this.setState({
            userLogin:true,
            user:_user,
          })
        }

      })
    }

    Request.get(Request.api.nav).then((data)=>{
      if(data.statusCode == '200'){
        this.setState({
          itemList:data.datas
        })
      }
    })

    Request.get(Request.api.site).then((data)=>{
      if(data.statusCode == '200'){
        if(data.datas.logo){
          this.setState({
            logo : DOMAIN+data.datas.logo
          })
        }
      }
    })
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
  handleEXIT(){
    Strorage.removeItem('userLogin')
    this.setState({
      userLogin:false,
    })
  }
  render(){
    const {name,itemList} = this.state
    const userMenu = (
      <Menu>
        {
          this.state.user.menu.map((obj,index)=>{
            return (<Menu.Item key={index}>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">{obj.title}</a>
            </Menu.Item>)
          })
        }
        <Menu.Divider />
        <Menu.Item key="99">
          <a  href="javascripg:void(0)" onClick={()=>{this.handleEXIT()}}>退出</a>
        </Menu.Item>
      </Menu>
    );

    function getMenu(obj){
      return obj.map((obj,index)=>{
        if(obj.children){
        return (<SubMenu key={'item'+ Math.random()} title={<span>{obj.name}</span>}>{
            getMenu(obj.children)
        }</SubMenu>)
        }else{
          return (<Menu.Item key={'item'+ Math.random()}>
            <a href={'/#'+obj.route}>{obj.name}</a>
          </Menu.Item>)
        }
      })
    }
    return (

      <Layout>
      <Header className="header">
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="logo">
          <a href='/'><img className='header-logo' onError={(e)=>{e.target.src = require('./img/header-logo.png')}} src={this.state.logo} /></a>
        </Menu.Item>
        {getMenu(itemList)}
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

        <div className='userBlock'>
        {
          this.state.userLogin ? <Dropdown overlay={userMenu}>
            <a className="ant-dropdown-link" href="#">
              {this.state.user.name} <Icon type="down" />
            </a>
          </Dropdown> : <a href="/#/login" >登录</a>
        }

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
