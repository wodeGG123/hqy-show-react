import React from 'react'
import ReactDOM from 'react-dom'

import { Breadcrumb } from 'antd';

class BreadCrumb extends React.Component {
  static defaultProps = {
    data:[{
      nameID:0,
      url:'/'
    }],
    nameMap:['首页','列表','列表2']
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  constructor(props,router){
    super(props,router);
  }
  handleClick(url){
    this.context.router.push(url)
  }
  render(){
    return (<Breadcrumb style={{ margin: '12px 0' }}>
              {this.props.data.map((obj,index)=>{return (<Breadcrumb.Item key={index}>
                {obj.url?<a href="javascript:void(0);" onClick={()=>{this.handleClick(obj.url)}}>{this.props.nameMap[obj.nameID]}</a>:<span>{obj.name}</span>}
                </Breadcrumb.Item>
              )})}
            </Breadcrumb>
    )
  }
}


export default BreadCrumb
