
import { createStore, combineReducers} from 'redux'


//搜索reducer
const search = (state=false, action = {type:'',text:''}) => {
  const {type, text} = action;
  if(type == 'HEAD_SEARCH_CLICK'){
    console.log('HEAD_SEARCH_CLICK,点击了搜索内容：'+text);
    return text
  }
  return state
}
//用户登录信息
const userInfo = (state=false, action = {type:'',data:{}}) => {
  const {type, data} = action;
  if(type == 'USER_INFO'){
    return data
  }
  return state
}

//数据预加载
const preLoadData = (state=false, action = {type:'',data:{}}) => {
  const {type, data} = action;
  if(type == 'PRE_LOAD_DATA'){
    return data
  }
  return state
}
// Reducer => combine
const reducers = combineReducers({
    search,
    userInfo,
    preLoadData,
});
export default reducers;
