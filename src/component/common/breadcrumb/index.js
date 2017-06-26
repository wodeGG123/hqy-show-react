import React from 'react'
import ReactDOM from 'react-dom'

import { Breadcrumb } from 'antd';

class BreadCrumb extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (<Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
    )
  }
}


export default BreadCrumb
