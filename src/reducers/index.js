

export const isLogin = (state = false, action = {type:'111',error:false}) => {
  const {type, error} = action;
  console.log(action);
  if(error){
    return error
  }else{
    return type
  }
}
