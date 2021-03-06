import 'whatwg-fetch'

const Request = new Object()

const DOMAIN = 'http://lms.hqyj.chinamcloud.com/'

let Strorage = window.localStorage

Request.api = {
    list1:'api.php?r=v1/content/list',//内容列表
    list2:'api.php?r=v1/study/list&type=1',//课程列表
    login:'api.php?r=v1/user/sign',//用户登录
    userInfo:'api.php?r=v1/user/info', //用户详细信息
    nav:'api.php?r=v1/app/nav', //站点导航信息
    site:'api.php?r=v1/app/site',//网站信息
    detail:'api.php?r=v1/study/view',//课程详情
    learn:'api.php?r=v1/study/learn',//课程学习
    intro:'api.php?r=v1/content/view',//课程详情
    courseCare:'api.php?r=v1/study/concern',//课程关注操作
    chatToken:'api.php?r=v1/rongcloud/token',//获取融云token
}
Request.post = function(url,data){
  let _headers = {};
  if(Strorage.userToken){
    _headers = new Headers({
      "auth-token": Strorage.userToken
    })
  }
  return fetch(DOMAIN+url, {
      method: 'POST',
      mode: "cors",
      headers: _headers,
      body: JSON.stringify(data)
    }).then((res)=>{return res.json()}).catch((error)=>{console.log(error)})
}
Request.get = function(url,data){
  let _headers = {};
  if(Strorage.userToken){
    _headers = new Headers({
      "auth-token": Strorage.userToken
    })
  }

  let _url = DOMAIN+url
  //json 转 url 参数
  if(data){
    _url += '&'+ Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
  }
  return fetch(_url,{
      method: 'get',
      mode: "cors",
      headers: _headers
  })
  .then((res)=>{return res.json()}).catch((error)=>{console.log(error)})
}

export {Strorage, DOMAIN};
export default Request;
