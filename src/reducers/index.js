

export const isLogin = (state = false, action) => {
  const {type, error} = action;
  if(error){
    return error
  }else{
    return type
  }
}
