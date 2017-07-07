
import { createStore, combineReducers} from 'redux'


//搜索reducer
const search = (state, action = {type:'',text:''}) => {
  const {type, text} = action;
  if(type == 'HEAD_SEARCH_CLICK'){
    console.log('HEAD_SEARCH_CLICK,点击了搜索内容：'+text);
    return text
  }
  return false
}

//数据预加载
const preLoadData = (state, action = {type:'',data:{}}) => {
  const {type, data} = action;
  if(type == 'PRE_LOAD_DATA'){

    console.log('PRE_LOAD_DATA');
    return data
  }
  return false
}
// Reducer => combine
const reducers = combineReducers({
    search,
    preLoadData,
});
export default reducers;
