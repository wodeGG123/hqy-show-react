import 'whatwg-fetch'

const Request = new Object();

Request.api = {
    list1:'http://rapapi.org/mockjsdata/21522/list'
}
Request.post = function(){
    fetch('http://rapapi.org/mockjsdata/21522/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Hubot',
        login: 'hubot',
      })
    }).then((data)=>{console.log(data)})
}
Request.get = function(url){
  return fetch(url)
  .then((res)=>res.json())

}






export default Request;
