import React from 'react'
import ReactDOM from 'react-dom'



require('./styles.scss')

class ListBlock extends React.Component {

  static defaultProps = {
    img:require('./timg.png'),
    title:'模块标题',
    content:'模块内容',
    ps:'模块附加信息',
    bt:'查看详情',
  }
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='ListBlock'>
        <div className='ListBlock-left'>
          <img src={this.props.img} />
        </div>
        <div className='ListBlock-right'>
          <h3><a href='#'>{this.props.title}</a></h3>
          <p>{this.props.content}</p>
          <div>{this.props.ps}</div>
          <a href="#" className='ListBlock-bt'>{this.props.bt}</a>
        </div>
      </div>
    )
  }
}


export default ListBlock
