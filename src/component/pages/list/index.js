//react
import React from 'react'
import ReactDOM from 'react-dom'
//lodash
import _ from 'lodash'
//antd
import { Row, Col, Pagination ,Radio, Button} from 'antd';
const RadioGroup = Radio.Group;
//self-component
import BreadCrumb from '../../common/breadcrumb/index.js';
import ListBlock,{ListBlock2} from '../../common/block/index.js';


require('./styles.scss');

class List extends React.Component{
  static defaultProps = {
    data:[{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    filter:[
      {
        title:'按院系分类',
        items:[{
          value:0,
          label:'不限',
        },
        {
          value:1,
          label:'电视编辑与导播实验中心',
        },
        {
          value:2,
          label:'大学外语教学部',
        },
        {
          value:3,
          label:'社会科学教学部',
        },
        {
          value:4,
          label:'电影学院播音主持与艺术学院',
        },
        {
          value:5,
          label:'新媒体学院新闻与传播学院',
        }
        ],
      },
      {
        title:'按课程类型',
        items:[{
          value:0,
          label:'不限',
        },
        {
          value:1,
          label:'公开课',
        },
        {
          value:2,
          label:'虚拟仿真课',
        }
        ],
      }
    ],
  }
  constructor(props){
    super(props);
    this.state={
        filterVal:[
          {
            value:0,
          },
          {
            value:0,
          }
        ]
    }
  }
  onChange = (e,index) => {
    let _filterVal = _.cloneDeep(this.state.filterVal);
    _filterVal[index].value = e.target.value;
    this.setState({
      filterVal: _filterVal,
    });
  }

  render(){
    console.log(this.props.location.query.element);
    const _element = this.props.location.query.element;
    function getElement(obj,index){
      switch (_element) {
        case 'listblock':  return <ListBlock key={index}/>
          break;
        case 'listblock2':  return <ListBlock2 key={index}/>
          break;
        default:
      }
    }

    const _remainder = 4-this.props.data.length%4;
    const _remainder_block = []
    for(let i = 0;i<_remainder;i++){
      _remainder_block.push('');
    }



    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
      <div className='content-wrap'>
        <div className='content-1200'><BreadCrumb /></div>
        <div className='content-1200'>
          <div className='filter-box'>
            <div>
            <h3>全部分类</h3>
            {
              this.props.filter.map((obj,index)=>{
                return (<div key={index} className='filter-item'>
                  <h4>{obj.title}</h4>
                  <div>
                  <RadioGroup options={obj.items} onChange={(e)=>{this.onChange(e,index)}} value={this.state.filterVal[index].value} />
                  </div>
                </div>)
              })
            }
            </div>
            <div style={{marginTop:'20px'}}>
            <h3>排序方式</h3>
            <div className='sort-box' style={{marginTop:'10px'}}>
              <Button type='primary'>按发布时间</Button>
              <Button type='default'>按学习人数</Button>
              <Button type='default'>按喜欢人数</Button>
            </div>
            </div>
          </div>

          <div className='flex-block'>
            {
              this.props.data.map((obj,index)=>{
                return (getElement(obj,index))
              })
            }
            {
              _remainder_block.map((obj,index)=>{
                return <div style={{width:'280px'}} key={index}></div>
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
