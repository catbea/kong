import { Dialog } from 'vant';
import router from '@/router/'
//监听新消息事件
// var msgList = [];
// var dateStart = null;
// var dateEnd = null;
var toAccount = '';
var fromAccount = '';
var selSess = '';
var callbackaddMsgFunction = ''
var callbackaddMsgCountFunction = ''
var callbackaDynamicsFunction = ''


//是否开启控制台打印日志,默认开启，选填
var isLogOn = false;

export
{
  onSendMsg,
  initMsg,
  callbackaddMsg,
  setToAccount,
  webimLogin,
  callbackaddMsgCount,
  callbackDynamics
}

function initMsg(toAcc, msgFunction) {
  toAccount = toAcc;
  callbackaddMsgFunction = msgFunction
  selSess = new webim.Session(webim.SESSION_TYPE.C2C, toAccount, toAccount, '', Math.round(new Date().getTime() / 1000));
  webim.setAutoRead(selSess, true, true);

  var msg = onSendMsg("11", true, 4, "");
}

//设置发送对象
function setToAccount(toAcc) {
  toAccount = toAcc;
}

// 监听消息添加消息方法
function callbackaddMsg(fun) {
  callbackaddMsgFunction = fun
}

// 监听消息添未读消息数量
function callbackaddMsgCount(fun) {
  callbackaddMsgCountFunction = fun

}

// 监听动态消息
function callbackDynamics(fun) {
  callbackaDynamicsFunction = fun
}

//监听新消息事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
  // console.log( newMsgList, '[newMsgList]-'+toAccount)
  var  newMsg;
  var msgList = []
  //获取所有聊天会话
  var sessMap = webim.MsgStore.sessMap();
  for (var j in newMsgList) {//遍历新消息
    newMsg = newMsgList[j];
    var elems = newMsg.elems[0]
    console.log(newMsg.getSession() ,'newMsg.getSession()')
    if (newMsg.getSession().id() == toAccount) {//为当前聊天对象的消息
      selSess = newMsg.getSession();
      //在聊天窗体中新增一条消息
      callbackaddMsgFunction && callbackaddMsgFunction(newMsg);
      if(elems.content.desc != 4){
        //消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(selSess, true, true);
        //手动上报已读数据
        var msg = onSendMsg(newMsg.random, true, 4, "");
        console.log("上报消息已读结果:",msg);
      }
    }else {// 不在聊天页面，弹出消息
      Dialog.alert({
        message: '有新消息'
      }).then(() => {
        // on close
        console.log(newMsg.fromAccount.split('_')[1])
        // router.replace({path: '/custom/message/message/', query:{clientId: newMsg.fromAccount.split('_')[1]}})
      });
    }
  }

}

//初始化最近会话的消息未读数
function initUnreadMsgCount() {
  var sess;
  var sessMap = webim.MsgStore.sessMap();

  for (var i in sessMap) {
    sess = sessMap[i];
    // console.log('toAccount', toAccount)
    console.log(sess.id(), '=', sess.unread())
    if (toAccount != sess.id()) { //更新其他聊天对象的未读消息数

    }
  }
}

//发送消息(文本或者表情)
// msgtosend 消息内容
//msgType  2语音 3楼盘信息 4消息已读上报 5动态信息
//audioTime语音时长 类型为语音的时候填写
// isSend 是否为自己发送
function onSendMsg(msgtosend, isSend, msgType, audioTime,) {
  //获取消息内容
  var msgLen = webim.Tool.getStrBytes(msgtosend);
  if (msgtosend.length < 1) {
    return "发送的消息不能为空!";
  }
  var selType = webim.SESSION_TYPE.C2C;
  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.C2C) {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    return errInfo;
  }
  var friendHeadUrl = '';
  if (!selSess) {
    selSess = new webim.Session(selType, toAccount, toAccount, friendHeadUrl, Math.round(new Date().getTime() / 1000));
  }
  // var isSend = true// isSend 是否为自己发送
  if (isSend == '' || isSend == null || isSend == undefined) {
    isSend = true;
  }
  var seq = -1;//消息序列，-1表示 SDK 自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
  var subType;//消息子类型
  if (selType == webim.SESSION_TYPE.C2C) {
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
  } else {
    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
  }

  var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, fromAccount, subType, fromAccount);

  var text_obj;
  // //解析文本和表情debugger
  if (msgType) {
    var desc = msgType
    var ext = audioTime
    var custom_obj = new webim.Msg.Elem.Custom(msgtosend+'', desc+'', ext+'');
    msg.addCustom(custom_obj);
  } else {
    text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);
  }

  webim.sendMsg(msg, function (resp) {
    var elems = msg.elems[0]
    if (resp.ActionStatus == "OK" && elems.content.desc != 4) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
      callbackaddMsgFunction&&callbackaddMsgFunction(msg);
    }
    webim.Tool.setCookie("tmpmsg_" + toAccount, '', 0);
  }, function (err) {
    console.log(err.ErrorInfo);
  });
}


//消息已读通知
function onMsgReaded(notify) {

  var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + notify.From_Account];
  if (sessMap) {
    var msgs = _.clone(sessMap.msgs());
    var rm_msgs = _.remove(msgs, function (m) {
      return m.time <= notify.LastReadTime
    });
    var unread = sessMap.unread() - rm_msgs.length;
    unread = unread > 0 ? unread : 0;
    //更新sess的未读数
    sessMap.unread(unread);
  }
}

//监听连接状态回调变化事件
function onConnNotify(resp) {
  var info;
  switch (resp.ErrorCode) {
    case webim.CONNECTION_STATUS.ON:
      webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
      console.log('建立连接成功: ' + resp.ErrorInfo)
      break;
    case webim.CONNECTION_STATUS.OFF:
      info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
      webim.Log.warn(info);
      console.log(info)
      break;
    case webim.CONNECTION_STATUS.RECONNECT:
      info = '连接状态恢复正常: ' + resp.ErrorInfo;
      webim.Log.warn(info);
      console.log(info)
      break;
    default:
      webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
      console.log('未知连接状态: =' + resp.ErrorInfo);
      break;
  }
}

function webimLogin(sdkAppID, identifier, accountType, userSig, isLog) {
  //设置发送的账号
  fromAccount = identifier;
  if (isLog){
    isLogOn = isLog;
  }
  //当前用户身份
  var loginInfo = {
    'sdkAppID': sdkAppID, //用户所属应用id,必填
    'identifier': identifier, //当前用户ID,必须是否字符串类型，必填
    'accountType': accountType, //用户所属应用帐号类型，必填
    'userSig': userSig,
    //当前用户身份凭证，必须是字符串类型，必填
    'identifierNick': '', //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
    'headurl': 'img/me.jpg' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
  };

  //初始化时，其他对象，选填
  var options = {
    'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
    'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
  }
  var onC2cEventNotifys = {
    "92": onMsgReaded, //消息已读通知,
  };
  //监听事件
  var listeners = {
    "onConnNotify": onConnNotify, //监听连接状态回调变化事件,必填
    "onMsgNotify": onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    "onC2cEventNotifys": onC2cEventNotifys, //监听C2C系统消息通道
  };
  webim.login(
    loginInfo, listeners, options,
    function (resp) {
      loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
      loginInfo.headurl = resp.headurl; //设置当前用户头像
    },
    function (err) {
      alert(err.ErrorInfo);
    }
  );
}

