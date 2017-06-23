
import { createStore, combineReducers} from 'redux'


//搜索reducer
const search = (state, action = {type:'',text:''}) => {
  const {type, text} = action;
  console.log('search')
  if(type == 'HEAD_SEARCH_CLICK'){
    console.log('HEAD_SEARCH_CLICK,点击了搜索内容：'+text);
    return text
  }
  return false
}
// Reducer => combine
const reducers = combineReducers({
    search
});
export default reducers;
