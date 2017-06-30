import 'whatwg-fetch'

const Request = new Object()

const DOMAIN = 'http://lms.hqyj.chinamcloud.com/'


Request.api = {
    list1:'http://rapapi.org/mockjsdata/21522/list',
    login:'api.php?r=v1/user/sign',//用户登录
}
Request.post = function(url,data){
  return fetch(DOMAIN+url, {
      method: 'POST',
      mode: "cors",
      headers: {
        
      },
      body: JSON.stringify(data)
    }).then((res)=>{return res.json()}).catch((error)=>{console.log(error)})
}
Request.get = function(url){
  return fetch(url)
  .then((res)=>{return res.json()})
}






export default Request;
