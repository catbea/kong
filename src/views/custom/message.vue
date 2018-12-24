<template>
  <div class="massage-info-body">
    <div class="massage-info-list" 　>
      <!--消息-->
      <div class=" " style="width: 100%; -webkit-overflow-scrolling: touch; position: absolute;bottom:38px;top:5px;left:0px; overflow-y: scroll">
        <van-pull-refresh
            v-model="loading"
            pulling-text="下拉加载下一页"
            loosing-text="释放加载下一页"
            @refresh="getmsgListnext">
          <div style="height: auto">
            <div class="massage-info-msg" v-for="(items,index) in msgList" v-bind:key="index">
              <div class="massage-info-msg-time">
                <span>{{items.timeStr}}</span>
              </div>
              <div v-for="(item,index) in items.msgList" v-bind:key="index">
                <div :id="item.id" class="massage-info-msg-customer" v-if="item.fromType == 1">
                  <img @click='goDetails' class="massage-info-msg-customer-img"
                       v-if="headImgUrl   !='' && headImgUrl !=null && headImgUrl !=undefined"
                       v-bind:src="headImgUrl"/>
                  <div class="msg-customer-con" v-if="item.msgType=='1'">
                    {{item.content}}
                  </div>
                  <div class="msg-customer-con-voice" v-if="item.msgType=='2'" @click="playVoice(item.content,item.id)">
                    <img v-if="isplay==item.id" class="left-voice-img" src="@/assets/img/message/left_voice.gif">
                    <img v-else class="left-voice-img" src="@/assets/img/message/Rectangle@3x.png"/>
                    <div class="left-voice-time">{{item.audioTime}}″</div>
                  </div>

                  <div class="msg_custom_house_info" v-if="item.msgType==3" @click="gomarket(item.content.linkerId,item.content.linkerName)">
                    <div class='info-img'><img v-bind:src="item.content.avatarMediaid"/></div>
                    <div>
                      <div class='info-name'>{{item.content.linkerName}}</div>
                      <div class='info-address'>{{item.content.address}}</div>
                      <div class='info-Price'>
                        <span>{{item.content.linkerPrice}}</span>
                        <span>{{item.content.building}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div :id="item.id" class="massage-info-msg-me" v-if="item.fromType == 2">
                  <img class="massage-info-msg-me-img" v-if="avatar !='' && avatar  !=null && avatar !=undefined" v-bind:src="avatar"/>
                  <div class="msg-customer-con-me" v-if="item.msgType=='1'">
                    {{item.content}}
                  </div>
                  <div class="msg-customer-con-me-voice" v-if="item.msgType=='2'" @click="playVoice(item.content,item.id)">
                    <div class="left-voice-time">{{item.audioTime}}″</div>
                    <img v-if="isplay==item.id" class="left-voice-img" src="@/assets/img/message/right_voice.gif">
                    <img v-else class="left-voice-img" src="@/assets/img/message/Path@3x.png"/>
                  </div>
                  <div class="msg_house_info" v-if="item.msgType==3" @click="gomarket(item.content.linkerId,item.content.linkerName)">
                    <div class='info-img'><img v-bind:src="item.content.avatarMediaid"/></div>
                    <div>
                      <div class='info-name'>{{item.content.linkerName}}</div>
                      <div class='info-address'>{{item.content.address}}</div>
                      <div class='info-Price'>
                        <span>{{item.content.linkerPrice}}</span>
                        <span>{{item.content.building}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="msg-customer-con-me-status">
                    <p v-if="item.msgStatus==1" style="color: #FF7878">未读</p>
                    <p v-else>已读</p>
                   </div>
                </div>
                
              </div>
            </div>
            <div v-if="isShowEmjie==false" id="pyzmao" style="height: 0.6rem"></div>
            <div v-else id="pyzmao" style="height: 4.6rem"></div>
          </div>
        </van-pull-refresh>
      </div>
      <div id="msg_end" style="height:0px; overflow:hidden"></div>
      <div class="list-lower"></div>
    </div>
    <div class="voiceInfo-div">
      <div class="voiceInfo" v-if="isvoice==1">
        <img src="@/assets/img/message/voice01.gif"/>
        <div>手指上划 取消发送</div>
      </div>
    </div>
    <div class="voiceInfo-div-cancel" v-if="isvoice==3">
      <div class="voiceInfo-cancel">
        <img src="@/assets/img/message/voice-cancel.png"/>
        <div>松开手指 取消发送</div>
      </div>
    </div>

    <div id="footer" ref="inputContent" :class="isShowEmjie || isShowOption?'massage-info-lower-emjie':'massage-info-lower'">
      <div class="massage-info-lower-left" @click="switchMsg">
        <img v-if="msgType==1" src="@/assets/img/message/Oval@3x.png"/>
        <img v-else src="@/assets/img/message/Oval_slices_text.png"/>
      </div>
      <div class="massage-info-lower-cen">
        <input type="textarea" autocomplete="off" v-on:keyup.enter="sendMessage('','')" v-model="message" id='message'
               v-if="msgType==1" v-on:focus="hideface()" placeholder="说点什么吧？"/>
        <button v-else :class="isvoice==1? 'msgContentvoice msgContentvoice-bg':'msgContentvoice'"
                @touchstart="startRecord" @touchend="stopRecord" @touchmove='touchmoveRecord'>{{def_btvalue}}
        </button>
      </div>
      <div class="massage-info-lower-right">
        <div class="lower-right-bnt">
          <img class="face" src="@/assets/img/message/Oval_bq.png" @click="displayface"/>
        </div>
        <div class="lower-right-bnt">
          <div class="send" v-if="message.length>0" @click="sendMessage('','')">发送</div>
          <img class="selTempl" v-else src="@/assets/img/message/Oval@3x_tpl.png" @click="displayOption"/>
        </div>
      </div>
    </div>

    <div class="msg-emjie" v-show="isShowEmjie">
        <span v-for="(itemone,emojikeyone) in emojiFactory"
            @click="emojiSelect(itemone.key)" style="font-size:0.5rem;margin:0.15rem;float:left;"
            :key="emojikeyone">{{getEmoji(itemone.tag)}}</span>
    </div>

    <div v-show="isShowOption" class="massage_temp_main">
        <div class="im-option-item" @click="defaultMsgClick">
            <div class="im-option-icon-item">
                <img :src="iMTempMsgIcon" />
            </div>
            <div class="im-option-lebal-item">常用语</div>
        </div>

        <div class="im-option-item">
            <div class="im-option-icon-item" @click="projectClick">
                <img :src="iMTempProjectIcon" />
            </div>
            <div class="im-option-lebal-item">楼盘</div>
        </div>

        <div class="im-option-item" v-show="clientMobile" @click="phoneCall">
            <div class="im-option-icon-item">
                <img :src="iMTempPhoneIcon" />
            </div>
            <div class="im-option-lebal-item">拨打电话</div>
        </div>

        <div class="im-option-item" @click="gotoReport">
            <div class="im-option-icon-item">
                <img :src="iMTempReportIcon" />
            </div>
            <div class="im-option-lebal-item">发起报备</div>
        </div>
    </div>

    <audio :src="nowVoiceUrl" ref='audio' id="myaudio" hidden="true" preload="auto" v-show="false"/>

    <van-popup 
        v-model="defaultMsgPopShow" 
        position="bottom" 
        class="default-msg-popup">
        <div class="default-msg-box">
            <div class="default-msg-title van-hairline--bottom">
                <span>常用语</span>
                <img :src="closeIcon" @click="closeDefaultMsg"/>
            </div>
            <div class="default-msg-item van-hairline--bottom" v-for="info in tempValue" @click="defaultMsgClickHandle(info)">
                {{info}}
            </div>
        </div>
    </van-popup>
  </div>

</template>
<script>
import emoji from '@/utils/emoji'
import { onSendMsg, initMsg, setToAccount } from '@/utils/im/receive_new_msg.js'
import { mapGetters } from 'vuex'
import commonService from 'SERVICE/commonService'
import customService from 'SERVICE/customService'
import userService from 'SERVICE/userService'
import * as types from '@/store/mutation-types'

export default {
  name: 'customerdetails',
  data() {
    return {
      customBaseInfo: null,
      defaultMsgPopShow: false,
      clientMobile: this.$route.query.clientMobile,
      loading: false,
      finished: false,
      emojiFactory: [],
      clientId: this.$route.query.clientId,
      nickName: this.$route.query.customerRemarkName,
      clientInfo: '',
      agentId: '',
      avatar: '',
      closeIcon: require('IMG/custom/close_icon.png'),
      iMTempMsgIcon: require('IMG/custom/im_icon_1.png'),
      iMTempPhoneIcon: require('IMG/custom/im_icon_phone.png'),
      iMTempProjectIcon: require('IMG/custom/im_icon_project.png'),
      iMTempReportIcon: require('IMG/custom/im_icon_report.png'),
      headImgUrl: this.$route.query.headImgUrl || 'https://720ljq2test-10037467.file.myqcloud.com/header/qrcode/8bbf60d0c71d4962b8466c914712452c.png',
      msgList: [],
      def_btvalue: '按住 说话',
      isvoice: 0, //1代表是正在发送语音,
      toAccount: this.$route.query.toAccount,
      headers: {},
      timeoutObj: '',
      stompClient: '',
      message: '',
      msgType: 1, //1文本输入2语音输入
      sourceType: 2, //来源类型2企业微信 1小程序
      audioTime: 10,
      posStart: 0, //初始化起点坐标
      posEnd: 0, //初始化终点坐标
      posMove: 0, //初始化滑动坐标
      isShowEmjie: false,
      isplay: 0, //正在播放的语音对象
      nowVoiceUrl: '', //正在播放的语音地址
      voiceUrl: '',
      pages: 1,
      current: 1,
      START: 0,
      END: 0,
      msgid: 0, //接收消息的id
      msgTimeStamp: '',
      tempValue: [
        '您好，请问有什么需要帮助？',
        '您是准备用来投资还是自己住呢?',
        '您看一下满意否，有合适的话我马上帮您约看',
        '您什么时候有时间，我这边好提前安排。',
        '非常抱歉，我现在不方便打字，您有任何事情都可以给我留言，我会在方便的时候第一时间给您回复。'
      ],
      isShowOption: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.$nextTick(() => {
      if (this.nickName != null && this.nickName != '' && this.nickName != undefined) {
        document.title = this.nickName
      } else {
        document.title = '聊天'
      }
      this.getCustomBaseInfo(this.clientId)

      this.agentId = this.userInfo.agentId
      this.avatar = this.userInfo.avatarUrl
      //加载emoji表情库
      this.emojiFactory = emoji.emojiFactory
      this.$_init()
      let myAuto = document.getElementById('myaudio')
      myAuto.addEventListener(
        'ended',
        () => {
          console.log('play ended ====================')
          this.isplay = 0
        },
        false
      )
    })
  },
  beforeDestroy: function() {
    setToAccount('')
  },
  methods: {
    /**
     * 客户基本信息以及购房意向度
     */
    async getCustomBaseInfo(id) {
      const result = await customService.getClientInfo(id)
      this.customBaseInfo = result
      this.clientMobile = this.customBaseInfo.clientMobile
      this.nickName = this.customBaseInfo.clientRemarkName
      this.headImgUrl = this.customBaseInfo.avatarUrl
    },
    defaultMsgClickHandle(info) {
      this.message = info
      this.defaultMsgPopShow = false
      this.isShowEmjie = false
      this.isShowOption = false
    },
    gotoReport() {
      let _reportAddInfo = {
        clientId: this.clientId,
        clientName: this.customBaseInfo.clientName,
        clientPhone: this.clientMobile,
        distributorId: this.customBaseInfo.distributorId,
        institutionId: this.customBaseInfo.institutionId
      }

      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.push('/user/myReport/addReport')
    },
    closeDefaultMsg() {
      this.defaultMsgPopShow = false
    },
    defaultMsgClick() {
      this.defaultMsgPopShow = true
    },
    phoneCall() {
      window.location.href = 'tel:' + this.clientMobile
    },

    // async getMyProjectList() {
    //     const res = await userService.getMyMarket(0)
    //     this.myProjectList = res.records
    //     console.log(this.myProjectList, 'this.myProjectList')
    // },

    projectClick() {
      this.$router.push('/custom/message/messageProjects')
    },

    getTime() {
      var that = this
      if (voiceUrl != '') {
        setTimeout(function() {
          var duration = document.getElementById('myaudio').duration
          if (isNaN(duration)) {
            that.getTime()
          }
        }, 10)
      }
    },
    $_init() {
      this.getmsgListnext()
      //初始化聊天
      initMsg('client_' + this.clientId, this.addmsgInfo)
      this.setMsgRead()
    }, //input获取焦点事件
    hideface(event) {
      //关闭表情
      this.isShowEmjie = false
      document.body.scrollTop = document.body.scrollHeight
      this.pyzmaoviwe()
    },

    //是否显示操作
    displayOption() {
      if (this.isShowOption == false && this.msgType == 1) {
        this.isShowOption = true
      } else {
        this.isShowOption = false
      }
      this.isShowEmjie = false
    },

    //是否显示表情
    displayface() {
      if (this.isShowEmjie == false && this.msgType == 1) {
        this.isShowEmjie = true
      } else {
        this.isShowEmjie = false
      }
      this.isShowOption = false
    }, //选中表情
    emojiSelect(key) {
      let str = emoji.getTagByKey(key)
      this.message += emoji.formartEmoji(str)
    },
    //初始化表情
    getEmoji(str) {
      return emoji.formartEmoji(str)
    },
    pyzmaoviwe() {
      var msgList = this.msgList
      var count = 0
      setTimeout(function() {
        document.getElementById('pyzmao').scrollIntoView(true)
      }, 500)
    },
    async mediaIdTransToMp3Url(mediaId) {
      let appId = this.userInfo.cropId
      console.log(mediaId + ' | ' + appId, 'mediaIdTransToMp3Url')
      let res = await customService.mediaIdTransToMp3Url(mediaId, appId)
      console.log(res, 'mediaIdTransToMp3Url')
      this.message = res.map3Url
      this.sendMessage(2, this.audioTime)
    },
    async setMsgRead() {
      let res = await customService.setMsgRead(this.clientId)
    },
    async getmsgList() {
      var params = {
        agentId: this.agentId,
        clientId: this.clientId,
        current: 1,
        size: 10
      }
      let res = await customService.appMsgDtlList(params)
      console.log(res)
    },
    //设置聊天记录的值
    setList(res) {
      var that = this
      if (res && res.records.length > 0) {
        let lists = []
        for (var key in res.records) {
          let dict = {}
          let msgLists = []
          var item = res.records[key]
          let msgList = item['msgList']
          dict['timeStr'] = item['timeStr']
          dict['timeLong'] = item['timeLong']
          for (var key in msgList) {
            let list = {}
            var msgItem = msgList[key]
            list.fromType = msgItem.From_Type
            list.msgStatus = msgItem.MsgStatus
            list.id = msgItem.Id
            var MsgContent = JSON.parse(msgItem.MsgContent)
            var MsgType = msgItem.MsgType

            if (MsgType == 'TIMTextElem') {
              list.msgType = 1
              list.content = MsgContent.Text
              msgLists.push(list)
            } else {
              if (MsgContent.Desc == 2) {
                let ext = JSON.parse(MsgContent.Ext)
                list.content = MsgContent.Data
                list.msgType = 2
                list.audioTime = ext.audioTime
                msgLists.push(list)
              } else if (MsgContent.Desc == 3) {
                list.content = JSON.parse(MsgContent.Data)
                list.msgType = 3
                msgLists.push(list)
              }
            }
          }
          if (msgLists.length > 0) {
            dict['msgList'] = msgLists
            lists.push(dict)
          }
        }

        var totalLists = lists.concat(that.msgList)
        that.msgList = totalLists
      }
    },
    async getmsgListnext() {
      var params = {
        clientId: this.clientId,
        current: this.current,
        size: 10
      }
      let res = await customService.appMsgDtlList(params)
      this.setList(res)
      this.loading = false
      if (this.current == 1) this.pyzmaoviwe()
      this.current++
    },

    touchmoveDefault: function(e) {
      e.preventDefault()
    },

    startRecord(event) {
      let _this = this
      _this.isvoice = 1
      _this.def_btvalue = '松开 发送'
      this.posStart = event.touches[0].pageY //获取起点坐标
      // 移动端 取消浏览器长按事件 （否则在录音时会有弹出框）
      document.oncontextmenu = _this.touchmoveDefault
      //禁止滑动事件 防止在长按时 下拉窗口不能触发stopRecord
      // document.body.addEventListener('touchmove', _this.touchmoveDefault, {passive: false})
      if (localStorage.rainAllowRecord != 'true') {
        //  首次进入 弹出是否授权框
        _this.isvoice = 0
        ;(_this.def_btvalue = '按住 说话'),
          wx.startRecord({
            success: () => {
              //  授权录音
              console.log('第一次录音')
              localStorage.rainAllowRecord = 'true'
              wx.stopRecord()
              return false
            },
            cancel: function() {
              alert('授权失败')
              document.body.removeEventListener('touchmove', _this.touchmoveDefault)
              return false
            }
          })
      }

      if (localStorage.rainAllowRecord === 'true') {
        this.START = new Date().getTime()
        wx.startRecord({
          success: function() {
            _this.start_speaking = true
            console.log('startRecord success')
            localStorage.rainAllowRecord = 'true'
          },
          cancel: function() {
            alert('授权失败。')
          }
        })
      }
    },
    touchmoveRecord(event) {
      let _this = this
      event.preventDefault() //阻止浏览器默认行为
      _this.posMove = event.targetTouches[0].pageY //获取滑动实时坐标
      if (_this.posStart - _this.posMove < 30) {
        _this.isvoice = 1
      } else {
        _this.isvoice = 3
      }
    },

    stopRecord(event) {
      let _this = this
      _this.toucuBg = '#fff'
      _this.def_btvalue = '按住 说话'
      if (_this.isvoice == 3) {
        _this.isvoice = 0
        return
      }
      _this.isvoice = 0
      _this.END = new Date().getTime()

      if (_this.END - _this.START < 300) {
        _this.END = 0
        _this.START = 0
        _this.$toast('说话时间太短请重新说话！')
      } else {
        _this.audioTime = Math.ceil((_this.END - _this.START) / 1000)
        wx.stopRecord({
          success: function(res) {
            _this.upRecord(res.localId)
            _this.start_speaking = false
          },
          fail: function(res) {
            _this.start_speaking = false
            console.log(JSON.stringify(res))
          }
        })
      }
    },
    upRecord(nowLocalId) {
      console.log(nowLocalId, 'nowLocalId')
      let _this = this
      wx.uploadVoice({
        localId: nowLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function(res) {
          let serverId = res.serverId // 返回音频的服务器端ID
          _this.messages_record = nowLocalId
          _this.sourceType = 2
          _this.mediaIdTransToMp3Url(serverId)
          console.log(serverId, 'serverId')
        }
      })
    }, //接收消息
    addmsgInfo(msg) {
      var elems = msg.elems[0]
      var sess = msg.sess
      var item
      if ('TIMCustomElem' == elems.type) {
        if (elems.content.desc == 4) {
          this.setMsgRead()
          var id = elems.content.data
          var lsits = this.msgList
          for (var key in lsits) {
            var item = lsits[key]
            let msgList = item['msgList']
            for (var key in msgList) {
              var msgItem = msgList[key]
              if (msgItem.msgStatus != 2) {
                msgItem.msgStatus = 2
              }
            }
          }
          return
        } else {
          let audioTime = ''
          let content = ''
          // console.log(elems.content ,'elems.content')
          if (elems.content.desc == 2) {
            let ext = JSON.parse(elems.content.ext)
            audioTime = ext.audioTime
            content = elems.content.data
          } else if (elems.content.desc == 3) {
            content = JSON.parse(elems.content.data)
          } else {
            content = elems.content.data
          }
          item = {
            msgStatus: 1, //未读
            content: content,
            msgType: elems.content.desc,
            audioTime: audioTime,
            id: msg.random,
            fromType: msg.isSend == true ? 2 : 1
          }
        }
      } else {
        item = {
          msgStatus: 1, //未读
          content: elems.content.text,
          msgType: 1,
          id: msg.random,
          fromType: msg.isSend == true ? 2 : 1
        }
      }

      var dats = new Date().getTime()
      var lists = this.msgList
      /*说明已经有记录*/
      if (lists && lists.length > 0) {
        var items = lists[lists.length - 1]
        /*如果大于5分钟*/
        if (dats - items.timeLong > 5 * 60 * 1000) {
          var dict = {}
          var listf = []
          var time = new Date(dats)
          var timeStr = time.getHours().toString() + ':' + time.getMinutes().toString()
          listf.push(item)
          dict['timeLong'] = dats
          dict['timeStr'] = timeStr
          dict['msgList'] = listf
          this.msgList.push(dict)
        } else {
          lists[lists.length - 1].msgList.push(item)
        }
      } else {
        var dict = {}
        var listf = []
        var time = new Date(dats)
        var timeStr = time.getHours().toString() + ':' + time.getMinutes().toString()
        listf.push(item)
        dict['timeLong'] = dats
        dict['timeStr'] = timeStr
        dict['msgList'] = listf
        this.msgList.push(dict)
      }

      this.message = ''
      this.pyzmaoviwe()
    },
    sendMessage(msgType01, audioTime01) {
      var msg = onSendMsg(this.message, true, msgType01, audioTime01)
      if (msg) {
        this.$toast(msg)
      }
    } /*  切换语音输入*/,
    switchMsg() {
      var msgType = this.msgType
      if (msgType == 1) {
        this.msgType = '2'
      } else {
        this.msgType = '1'
      }
      //关闭表情
      this.isShowEmjie = false
      this.isShowOption = false
    },
    /**
     * 播放语音
     */ playVoice(mateId, id) {
      let _this = this
      if (this.isplay == id) {
        this.nowVoiceUrl = ''
        this.stopVoice(mateId)
        return
      } else {
        this.isplay = id
      }
      this.nowVoiceUrl = mateId
      console.log('play start url：' + this.nowVoiceUrl)
      setTimeout(() => {
        this.$refs.audio.src = this.nowVoiceUrl
        this.$refs.audio.play()
      }, 200)
    },
    /**
     * 停止播放语音
     */ stopVoice(localId) {
      let _this = this
      wx.stopVoice({
        localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
      })
      this.isplay = 0
      console.log('play ended click====================')
    },
    //跳转客户详情
    goDetails() {
      this.$router.push('/custom/' + this.clientId)
    },
    gomarket(linkerId, linkerName) {
      this.$router.push('/market/' + linkerId)
    }
  }
}
</script>
<style lang="less" scoped>
.massage-info-body {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 100%;
    font-size: 13px;
    padding: 0;
    margin: 0;
}
.massage-info-list{
    width: 100%;
    height: 100%;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.project-msg-popup {
  height: 100%;
}

.default-msg-popup {
  height: 68%;
  background: #fff;
  .default-msg-box {
    .default-msg-item {
      margin: 0 15px;
      font-size: 15px;
      padding: 12px 0px;
      line-height: 21px;
    }
    .default-msg-title {
      height: 58px;
      display: flex;
      padding-top: 17px;
      padding-right: 16px;
      span {
        padding-left: 16px;
        text-align: left;
        font-size: 18px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        flex: 1;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}

/* 消息*/
.massage-info-msg {
  padding: 0 15px;
  .massage-info-msg-time {
    margin-top: 25px;
    margin-bottom: 19px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
  }
  .massage-info-msg-time span {
    width: 36px;
    height: 20px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    padding: 5px 10px;
  }
  .massage-info-msg-customer {
    display: flex;
    margin-top: 20px;
    text-align: left;
  }
  .massage-info-msg-customer-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    //margin-left: 0.44rem;
    margin-top: 10px;
  }
  .msg-customer-con {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
    margin-top: 10px;
    max-width: 60%;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    background: rgba(255, 255, 255, 1);
    position: relative;
    border-top-left-radius: 0px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #eee;
    padding: 10px;
  }
  .msg-customer-con-status {
    padding-top: 12px;
    position: relative;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 17px;
    width: 15%;
  }
  .msg-customer-con-status p {
    position: absolute;
    bottom: 0;
    padding-left: 10px;
  }

  .msg-customer-con-voice {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
    margin-top: 10px;
    max-width: 60%;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    background: #eee;
    position: relative;
    border-top-left-radius: 0px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px;
    padding-right: 25px;
    display: flex;
    .left-voice-img {
      width: 24px;
      height: 24px;
    }
    .left-voice-time {
      margin-left: 5px;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 23px;
    }
  }

  .msg-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 15px solid rgba(255, 255, 255, 1);
    border-bottom: 10px solid transparent;
    margin-top: 20px;
  }

  .massage-info-msg-me {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
  .massage-info-msg-me-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    //margin-right: 0.44rem;
    margin-left: 10px;
  }

  .msg-customer-con-me {
    max-width: 60%;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    position: relative;
    border-top-left-radius: 8px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px;
    background: #017fff;
    text-align: left;
  }
  .msg-customer-con-me-status {
    padding-top: 10px;
    position: relative;
    font-size: 12px;
    color: rgba(187, 187, 187, 1);
    width: 40px;
  }
  .msg-customer-con-me-status p {
    position: absolute;
    bottom: 0;
    padding-right: 10px;
  }

  .msg-customer-con-me-voice {
    max-width: 60%;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
    //margin-top: 0.2rem;
    position: relative;
    border-radius: 4px;
    padding: 10px;
    padding-left: 25px;
    background: rgba(1, 127, 255, 1);
    display: flex;
    .left-voice-img {
      width: 24px;
      height: 24px;
    }
    .left-voice-time {
      margin-right: 5px;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 23px;
    }
  }

  .msg-right {
    float: right;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 15px solid rgba(1, 127, 255, 1);
    border-bottom: 10px solid transparent;
    margin-top: 10px;
  }
}

/* 消息*/
/* 底部*/
.massage-info-lower-emjie {
  position: fixed;
  bottom: 190px;
  height: 49px;
  display: flex;
  text-align: center;
  width: 100%;
  background: rgba(250, 250, 250, 1);
  padding: 8px 10px;
}

.massage-info-lower {
//   position: fixed;
//   bottom: 0;
  height: 49px;
  display: flex;
  text-align: center;
  width: 100%;
  background: rgba(250, 250, 250, 1);
  padding: 8px 10px;
}

.massage-info-lower-cen {
  display: flex;
  width: 60%;
  margin-left: 15px;
  border: none;
  height: 36px;
}

.massage-info-lower-cen input {
  width: 100%;
  padding-left: 12px;
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);
  height: 36px;
}

.msgContentvoice {
  text-align: center;
  width: 100%;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);

  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

.msgContentvoice-bg {
  background: rgba(221, 221, 221, 1);
}

.massage-info-lower-left img {
  width: 32px;
  height: 32px;
}

.massage-info-lower-right {
  width: 30%;
  display: flex;
}

.lower-right-bnt .send {
  width: 47px;
  height: 32px;
  margin-left: 5px;
  line-height: 32px;
  background: #017fff;
  border-radius: 4px;
  color: white;
}
.lower-right-bnt .selTempl {
  width: 32px;
  height: 32px;
}

.lower-right-bnt {
  flex: 1;
}

.lower-right-bnt .quick {
  width: 32px;
  height: 32px;
  margin-left: 10px;
}

.lower-right-bnt .face {
  width: 32px;
  height: 32px;
  margin-left: 13px;
}

.list-lower {
  height: 55px;
}

/* 底部*/

.voiceInfo-div {
  position: fixed;
  width: 100%;
  //top: 2.8rem;
  top: 35%;
  z-index: 999;
}

.voiceInfo {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 4px;
  opacity: 0.6;
  padding-top: 5px;
}

.voiceInfo img {
  margin: 0 auto;
  width: 100px;
  height: 90px;
}

.voiceInfo div {
  font-size: 12px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.34rem;
}

.voiceInfo-div-cancel {
  position: fixed;
  width: 100%;
  top: 35%;
  z-index: 999;
}

.voiceInfo-cancel {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(255, 120, 120, 1);
  border-radius: 4px;
  opacity: 0.6;
  padding-top: 5px;
}

.voiceInfo-cancel img {
  margin: 0 auto;
  width: 49px;
  height: 68px;
  margin-top: 13px;
}

.voiceInfo-cancel div {
  font-size: 0.24rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  margin-top: 10px;
}

//表情库
.msg-emjie {
  height: 190px;
  overflow: scroll;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: 0;
  padding-left: 8px;
  background-color: #f4f4f6;
}

.massage_temp_main {
  display: flex;
  height: 190px;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: 0;
  padding-left: 11px;
  padding-top: 29px;
  background-color: #f4f4f6;
  .im-option-item {
    margin-left: 18px;
    width: 66px;
    height: 88px;
    .im-option-lebal-item {
      padding-top: 5px;
      font-size: 12px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
    }
    .im-option-icon-item {
      width: 66px;
      height: 66px;
      background: rgba(250, 251, 251, 1);
      border-radius: 15px;
      border: 1px solid rgba(220, 220, 221, 1);
      padding: 18px;
      img {
        width: 29px;
        height: 28px;
      }
    }
  }
}
.tpl-item {
  margin-bottom: 10px;
  line-height: 20px;
  font-size: 15px;
}

//楼盘信息

.msg_house_info {
  padding: 12px;
  background: #eee;
  border-top-left-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.msg_custom_house_info {
  padding: 12px;
  background: #eee;
  border-top-left-radius: 0px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.info-img img {
  width: 4.42rem;
  height: 2.5rem;
  margin-bottom: 0.22rem;
  border-radius: 0.08rem;
}

.info-name {
  font-size: 0.32rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 0.32rem;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
}

.info-address {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.24rem;
  margin-top: 0.24rem;
  margin-bottom: 0.24rem;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
}

.info-Price {
  font-size: 0.22rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #666;
  line-height: 0.22rem;
}

.info-Price span:first-child {
  color: rgba(234, 77, 46, 1);
  margin-right: 0.1rem;
}
</style>
