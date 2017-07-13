import React from 'react'
import ReactDOM from 'react-dom'
//antd
import { Button } from 'antd';
//lodash
import _ from 'lodash';
//scroll
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
//block
import {ListBlock3} from '../../common/block/index.js';
//request
import Request, {DOMAIN} from '../../../request/index.js';
require('./styles.scss');
class List2 extends React.Component {
  static defaultProps = {

  }
  constructor(props){
    super(props);
    this.state={
      data:[],
      page:{current:1,total:1,size:20},
      dataURL:Request.api.list2,
      loading:false,
    }
  }
  componentWillMount(){
    window.scrollTo(0,0);
    this.getData();
  }
  getData(page){
    let _page = _.cloneDeep(this.state.page);
    let _data = this.state.data;
    this.setState({
      loading:true
    })
    Request.get(this.state.dataURL,{page:(parseInt(page)+1)}).then((data)=>{
      console.log(data)
      _page.total = parseInt(data.datas.totalCount);

      _data = _data.concat(data.datas.data)
      console.log(_data);
      this.setState({
        data:_data,
        page:_page,
        loading:false
      })
    });
  }
  render(){
    return (
      <div>
          <div className='list2-top' style={{'backgroundImage':'url('+ require('./timg.png') +')'}}>
            <div className='content-1200'>
              <div>
                <h1>标题</h1>
                <p>索贝中级视频工程师认证是面向具有一定剪辑基础的传媒类专业学生和初入职场的视频编辑制作人员推出的视频制作能力的认证。获得此项认证，表明学员能够利用专业非编软件完成视频的剪辑、特效编辑、色彩校正、字幕编辑、音频编辑等视频制作，掌握视频制作的基本方法和技能，能够胜任一般节目制作工作。</p>
                <div><Button>进入平台</Button></div>
              </div>
            </div>

          </div>
          <div className='content-1200' style={{marginTop:'50px'}}>
          {
            this.state.data.map((obj,index)=>{
              return (<ListBlock3 title={obj.course_name} content={obj.brief} img={obj.thumb} id={obj.course_id}  key={index} />)
            })
          }
          <div className='add-more'>
            <a href='javascript:void(0);' onClick={()=>{this.getData(this.state.page.current)}}>{this.state.loading?'拼命加载中...':'加载更多'}</a>
          </div>
          </div>
      </div>
    )
  }
}


export default List2
