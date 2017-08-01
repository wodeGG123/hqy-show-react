// require('../../../js/RongIMLib-2.2.5.min.js');



//self-component
import Request,{Strorage} from  '../../../request/index.js';

//融云参考资料
//http://www.rongcloud.cn/docs/web.html
//http://www.rongcloud.cn/docs/web_api_demo.html
//http://www.rongcloud.cn/docs/api/js/RongIMClient.html

//由于webpack打包使用了严格模式 融云SDK采用在index.html中直接引用
function chatInit(param,callbackFN){
    //user secret
    RongIMClient.init("kj7swf8okh9d2");
    //获取token
    Request.post(Request.api.chatToken,{"userId": param.userInfo.id, "name":(param.userInfo.realname || param.userInfo.username),"portraitUri":"123456"}).then((data)=>{
      if(data.statusCode == '200'){
        var token = data.datas.token;
          // 设置连接监听状态 （ status 标识当前连接状态 ）
          // 连接状态监听器
          RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
              switch (status) {
                  case RongIMLib.ConnectionStatus.CONNECTED:
                      console.log('链接成功');
                      break;
                  case RongIMLib.ConnectionStatus.CONNECTING:
                      console.log('正在链接');
                      break;
                  case RongIMLib.ConnectionStatus.DISCONNECTED:
                      console.log('断开连接');
                      break;
                  case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                      console.log('其他设备登录');
                      break;
                  case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                      console.log('域名不正确');
                      break;
                  case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    console.log('网络不可用');
                    break;
                  }
          }});
         // 消息监听器
         RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 判断消息类型
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 消息内容
                        callbackFN.receiveMessage(message);
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载
                        // message.content.content 格式为 AMR 格式的 base64 码
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                       // message.content.content => 图片缩略图 base64。
                       // message.content.imageUri => 原图 URL。
                       break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                       // message.content.extension => 讨论组中的人员。
                       break;
                    case RongIMClient.MessageType.LocationMessage:
                       // message.content.latiude => 纬度。
                       // message.content.longitude => 经度。
                       // message.content.content => 位置图片 base64。
                       break;
                    case RongIMClient.MessageType.RichContentMessage:
                       // message.content.content => 文本消息内容。
                       // message.content.imageUri => 图片 base64。
                       // message.content.url => 原图 URL。
                       break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                       break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                       break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                       break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                       break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                       break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                       break;
                    default:
                        // do something...
                }
            }
        });

          //连接服务器
            RongIMClient.connect(token, {
                  onSuccess: function(userId) {
                    //加入聊天室
                    var chatRoomId = param.room; // 聊天室 Id。
                    var count = 10;// 拉取最近聊天最多 50 条。
                    RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
                      onSuccess: function() {
                        // 加入聊天室成功。
                      },
                      onError: function(error) {

                        console.log('加入聊天室失败')
                        // 加入聊天室失败
                      }
                    });
                    //加入聊天室


                  },
                  onTokenIncorrect: function() {
                    console.log('token无效');
                  },
                  onError:function(errorCode){
                        let info = '';
                        switch (errorCode) {
                          case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                          case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                          case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                          case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                          case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                        }
                        console.log(errorCode);
                      }
                });
                //连接服务器
      }

    })
  //发送消息
    function sendMessage(options,callback){
     //设置消息内容
     var msg = new RongIMLib.TextMessage({content:options.message,extra:options.sender});
     var conversationtype = RongIMLib.ConversationType.CHATROOM; // 单聊,其他会话选择相应的消息类型即可。
     var targetId = param.room; // 目标 Id
     RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                   onSuccess: function (message) {
                       //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                       callback(message);
                   },
                   onError: function (errorCode,message) {
                       var info = '';
                       switch (errorCode) {
                           case RongIMLib.ErrorCode.TIMEOUT:
                               info = '超时';
                               break;
                           case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                               info = '未知错误';
                               break;
                           case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                               info = '在黑名单中，无法向对方发送消息';
                               break;
                           case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                               info = '不在讨论组中';
                               break;
                           case RongIMLib.ErrorCode.NOT_IN_GROUP:
                               info = '不在群组中';
                               break;
                           case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                               info = '不在聊天室中';
                               break;
                           default :
                               info = x;
                               break;
                       }
                       console.log('发送失败:' + info);
                   }
               }
           );

    }
  //发送消息


    return {
      sendMessage:sendMessage,
    }
 }





export default chatInit
