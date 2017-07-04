import 'whatwg-fetch'

const Request = new Object()

const DOMAIN = 'http://lms.hqyj.chinamcloud.com/'

let Strorage = window.localStorage

Request.api = {
    list1:'api.php?r=v1/study/list&type=1',//课程列表
    login:'api.php?r=v1/user/sign',//用户登录
    userInfo:'api.php?r=v1/user/info', //用户详细信息
    nav:'api.php?r=v1/app/nav', //站点导航信息
}
Request.post = function(url,data){
  return fetch(DOMAIN+url, {
      method: 'POST',
      mode: "cors",
      headers: new Headers({
        "auth-token": Strorage.userToken
      }),
      body: JSON.stringify(data)
    }).then((res)=>{return res.json()}).catch((error)=>{console.log(error)})
}
Request.get = function(url,page){
  return fetch(DOMAIN+url+'&page='+page,{
      method: 'get',
      mode: "cors",
      headers: new Headers({
        "auth-token": Strorage.userToken
      })
  })
  .then((res)=>{return res.json()}).catch((error)=>{console.log(error)})
}





export {Strorage, DOMAIN};
export default Request;
