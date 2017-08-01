//react
import React from 'react'
import ReactDOM from 'react-dom'

//antd
import { Form, Icon, Input, Button, Checkbox,message} from 'antd';
const FormItem = Form.Item;

//self-component
import Request,{Strorage} from  '../../../request/index.js';


//router
import { browserHistory } from 'react-router'

require('./styles.scss')




class NormalLoginForm extends React.Component {

  //ask context from react
  static contextTypes = {
    router: React.PropTypes.object
  }
  static defaultProps = {
        destination:null,
  }
  constructor(props,context){
    super(props,context);
    this.state={

    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Request.post(Request.api.login,{username:values.userName,password:values.password}).then((data)=>{
          if(data.statusCode == '200'){

             //bug:直接/login会钉死在login页面
             if(this.props.destination){
               this.context.router.push(this.props.destination)
             }else{
                this.context.router.goBack()
             }

             //是否保持登录状态
             if(values.remember){
               Strorage.userToken = data.datas.token;
             }else{
               Strorage.removeItem('userToken');
             }


          }else{
             message.error('用户名或密码错误！')
          }
        })
      }

    });
  }
  componentWillMount(){
      window.document.title = '用户登录';
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem style={{marginBottom:'10px'}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
        </FormItem>
        <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        </FormItem>

      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


class Login extends React.Component {
  static defaultProps = {
    title:'开放式云工具平台',
    logo:require('./logo.png'),
    logoName:'华栖云教',
    logoPs:'开放式云工具平台',
    title2:'用户登录',
  }
  constructor(props){
    super(props);

    this.state={

    }
  }
  render(){

    return (
      <div className='login-wrap'>
        <div className='login-content'>
          <h1>{this.props.title}</h1>
          <div>
            <div className='login-left'>
              <div><img src={this.props.logo} /></div>
              <h2>{this.props.logoName}</h2>
              <h3>{this.props.logoPs}</h3>
            </div>
            <div className='login-right'>
              <h2>{this.props.title2}</h2>
              <div>
                <WrappedNormalLoginForm destination={this.props.location.query.destination} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Login
