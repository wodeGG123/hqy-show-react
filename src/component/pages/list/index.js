//react
import React from 'react'
import ReactDOM from 'react-dom'


//antd
import { Row, Col, Pagination } from 'antd';
//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';
import ListBlock from '../../common/block/index.js';



class List extends React.Component{
  static defaultProps = {
    data:[{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  }
  constructor(props){
    super(props);
  }
  onChange(){

  }
  render(){
    console.log(this.props.location.query.element);
    const _element = this.props.location.query.element;
    function getElement(obj,index){
      switch (_element) {
        case 'listblock':  return <ListBlock key={index}/>
          break;
        default:
      }
    }
    return (
      <div className='content-wrap'>
        <div className='content-1200'><BreadCrumb /></div>
        <div className='content-1200'>

          <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
            {
              this.props.data.map((obj,index)=>{
                return (getElement(obj,index))
              })
            }

          </div>
          <div style={{display:'flex',justifyContent:'center',padding:'30px'}}>
            <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default List
