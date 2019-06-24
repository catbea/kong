<template>
  <div class="massage-info-body">
    <div class="massage-info-list">
      <div class="header-nav">
          <div class="nav-item" @click="projectClick">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAGFBMVEVHcExmZmZlZWVnZ2dnZ2dlZWVmZmZmZmZofd2ZAAAAB3RSTlMA4knxrSbuMB2ZQwAAAGNJREFUOMtjYGBgYHUuRwCTAAY4CCtHBqkICXcUiRKEhDmKRDFCorycATuHdhIIz2BKQD2DRaIEl0QxDsuhIgMuoQh2pRCmhDhYopAECZxGjfp8VAKfhGI5NsAAC3BSJHAYBQC1QcgUK0H73AAAAABJRU5ErkJggg=="/>
            <span>发送楼盘</span>
          </div>
          <div class="nav-item" @click="sendWxAccount">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACnVBMVEVHcExqampoaGhiYmJdXV1gYGBmZmYAAACAgIBmZmZmZmZmZmZmZmZpaWlmZmZnZ2dmZmZlZWVmZmZoaGhlZWVmZmZmZmZmZmZmZmZmZmZlZWVnZ2dmZmZpaWlmZmZnZ2dnZ2dmZmZmZmaAgIBmZmZmZmZmZmZkZGRjY2NhYWFmZmZnZ2dnZ2dnZ2dnZ2dkZGRlZWVmZmZmZmZmZmZnZ2dlZWViYmJmZmZmZmZiYmJpaWlmZmZlZWVlZWVmZmZnZ2dnZ2dnZ2dlZWVAQEBiYmJmZmZmZmZlZWVmZmZmZmZmZmZmZmZmZmZVVVVmZmZmZmZmZmZmZmZkZGRgYGBmZmZmZmZnZ2doaGhmZmZlZWVmZmZmZmZmZmZmZmZlZWVmZmZmZmZxcXFmZmZmZmZoaGhlZWVmZmZmZmZmZmZmZmZmZmZlZWVmZmZmZmZmZmZmZmZqampnZ2dmZmZmZmZlZWVpaWlmZmZlZWVoaGhnZ2dmZmZlZWVkZGRmZmZmZmZkZGRmZmZlZWVlZWVnZ2dmZmZnZ2dlZWVnZ2dnZ2dmZmZlZWVmZmZoaGhjY2NlZWVmZmZlZWVlZWVmZmZnZ2dmZmZnZ2dmZmZqampoaGhnZ2dhYWFnZ2dlZWVmZmb////+/v5ra2v5+fn39/epqam4uLhsbGzf39+BgYGFhYXHx8f8/PyioqJoaGjo6Oj19fVubm6SkpJ5eXmAgIDu7u5nZ2f4+PiysrL09PTp6emdnZ11dXXV1dW1tbWPj4/W1ta6urqfn5+tra2oqKjCwsLs7Ozx8fHIyMjv7+9xcXHOzs6Dg4OXl5d0dHTKysr29vbT09Pg4OB7e3vr6+uYmJjExMSrq6v7+/uIiIjd3d3q6uqVlZXm5ubn5+d3d3f9/f1HGzCQAAAAnXRSTlMADA4NCwjlAQL9BdL6H/Al5P72G8mMeDfgqnmB6BHswk3u9wTq89g4EhVYn4uk4iHvgNsGNFMaHqMXJ8nloqBjlT46BBPTp0f0ac3UmwPM/tCoMxBzS0M7r7XP3ChRTnpBCXXALG3LUJayfeC3Z7HRKezGvK494aZgSLV+LsqUQN5EqzlrroOcfIJb5jEksIr5SQpekZrfNUKmHcTH1i8irgAAA0NJREFUSMe9luVfFEEYxw/kOE66O4WTkC4B6UbpFAFpu7u7u3OWDkFAOgTFbrFb/xafZ/aOqwU++MJ5M8/8nu9vd2bn2Z3l8f5rU9tmab5LZCZa724SOXNKWnDukAGRNp0w08n5ovlEsZXNnhgPOk04mnC32gS86TyW0AvbGqUbGLwncb89K6zx5OT3JdDr5R2QShrZttShvpaD96OLTSpXkK+a0ZsaKvExdD5nlJ+jqjkmjGYp6nEoH8UHO0Mq+pbgvOZiarkCH5UKojEEwWapoRJxiZNWBXTJyyBnECBvWAhaCt72CASSzRIR4oCasxWIc+T4QCFImzAyJkS/QKzeJMRRgMEqyK6TW95BXBeNrNNjEyVqeVllMQ34NpAvljWkg5A1cQmU4Lq9ZRUsIe6aKSjN89Giu5cUmSyVHUFw4ajdohuyVXW54rwk4wRD5RLL0FQsRJsL4pQ6DBR3X8NES8Ldrh63pFvTZAqEOQrTucQSI/ff9VcxtW2fBhvoOJ86FkB0WN5wkaZHfzHjrX+YWoywdo5DsEhDlg/H3NAYI9e+f0U1DkvSAQJXGd5FB4TfAwzTePePmP52r4qpGUFHtnhOeqpSA1QIqf7JMPcJ+cHyfYQMMkxNFyTSADh1FoLV45Py9YJhPWBN0LdTQychPV/gjj2g5AJyDO/lJnHEw6CjBrBRQt5XUcNHQpqwvyOuXN8QdKx0Zg07IG7FdO9w3Qd2Sm/7Pndj/wZStsgEbEaHhzY1hEL4iOFsj/GjQCHPFejQVvWP4fE2QvSC21ALKSd2HichdPD2IvqxEVhEt7gNzyB1QvwKyxdaHbdhDFIhrMFS3jDUwmlohVQEa9jOggn6YgfnnLqxcONZgxWteAuVIDuTpbiI50+U+Srchr3RlL/O4qxZF9+F5nYl/iFeNJxlConNYulXjy7oZZs8X/MKVVsBi2TJ4DxeNF1RQ32tDD/QRT/lhtyfFv4GuvKOurFehFsa6x88RcFx54SHo7vkjX7d1Nw5/lZfmeTEc7XnOMFyJjsjMy2slAylkx+rfH83HyEFPbak0f7a1Cc9X9cvQxv2R2BXCQbRtP4S7PKJUGVaDkGhZu40f0UEmf/yA/MXRvxord78ozMAAAAASUVORK5CYII="/>
            <span>发送微信</span>
          </div>
          <div class="nav-item" @click="phoneCall">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABzlBMVEVHcExVVVVoaGhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZpaWlmZmZmZmZnZ2dra2tgYGBmZmZmZmZnZ2dlZWUAAABlZWVmZmZnZ2dmZmZnZ2dmZmZkZGRnZ2dkZGRmZmZmZmZmZmZkZGRmZmaAgIBkZGRlZWVmZmZlZWVqampoaGhlZWVmZmZqampoaGhmZmZmZmZiYmJmZmZnZ2dmZmZoaGhmZmZlZWVlZWVlZWVmZmZmZmZVVVVnZ2dmZmZmZmZmZmZqamplZWVnZ2dmZmZmZmZqampmZmZjY2NmZmZnZ2dmZmZmZmZnZ2dmZmZmZmZnZ2dlZWVlZWVmZmZlZWVmZmb////+/v5vb2/ExMSoqKju7u7Kysrz8/Po6Oj7+/tra2v8/PxoaGh5eXnm5uaQkJD29vaRkZFpaWnt7e2ioqLBwcH09PRnZ2egoKD4+Pitra1ubm5+fn739/eFhYW+vr63t7fd3d3R0dFycnLa2tqjo6P6+vqxsbF4eHjs7OyqqqpxcXFtbW2np6dsbGz5+fnv7++YmJh9fX3X19eEhISsrKzr6+uysrKOjo79/f3S0tLMzMx1dXW8vLy4uLifn5+CgoKBgYH19fVkCdjmAAAAVnRSTlMABjHY5w8K8fzz+ukn/QWVEwjm+/Z+ASbWvZm44SGpHNrs9BctAi5Oxv4kRzpkGGBp3w3kNNVA91azU96qA6u7jIIdvYtwpwyEEs5KeqV83dx5pnx49Cnhh9YAAALdSURBVEjHjZZnXxNBEIdJSEgDAgQEFBEQBCwUUZqFjjS73l16IUG6gBQBpQsC0pt+W2dmU4/LXeZFsjv7f367szs7e0lJzLRtydlFOSlJiVq9hkNLvp+gvtHIMdOkJqQvD+k57tndBPSlBlBOHrq+IlGRrqjPzAPdoJPnhR9ItCoCnSgb58F8w9CqfKCgT9WDaownm/BDu+CxPNANGv8sA/jvg9Azy+rb00ByyodsGnr6e3JAFyiuhDDwcxf6LXJABwjO+Yid4BY8lAFMMB6IAvgjcHyQASwwvh0N7IFD9yI+oIPx0WhAsIKnKj7QB8OLUfp/dtwnVXzADOOXYbljfQaDbpKJoR/GrV+C+nkvpawuVwZIzwLFBdMHWIrXqmWPegAkZ1MEHG9Au/iTwkXtxduwwqbAgE0ZSundAyrvGgE7v6BdqAS8wiiGWDotYAyPlIhqVNkI8O1Ds+GJAnAjH7f2gAj3JrTr7igQtzHuOQ8RTpzuaSRwVZVUXtWgaovt1B8ignPkNuk53WuJbH8ZCUP4je06ikOtY0fZcu0Oat+Ce2SZCM8Qahpgr1JqQ/VNbxZXBnUJuJfcjKA5uMKM9/hnZUiBuPo0YzFYdbBVURycqRh+7MLeEfUqW0U18Q16v7lY5M7N4FpmMJFPdqldIaq7N9H5N0i49xmwzmrJ9CBV6tjaXvac5mCr4n0LmFdeR6jC+ek1iH0/VLfQueoOanbsG9x8+C5ODNOLE5v6mUQsLYdEx9H1x0e1PSc2DBWtasTGS5mA70eRaHPLKHJuyyNFuGAk+1qSfMTz4OYOJIBDDOJ6WjWX0PnaBLHeOQn+NonUVb+jZQ2txerH8Sg0WqnroaXc5bwrUxH57Bi6jPVxblSNgZCzi2CFE07p3IyN8e9gPssM6+Xi6Hbg/Io6hnK5e16dxYksr1Sh+vR8jpZbOjMVH/DeAU1Intad2EdIer+5T2cxdXS1h13/AV1AY59pTROZAAAAAElFTkSuQmCC"/>
            <span>拨打电话</span>
          </div>
          <div class="nav-item" @click="gotoReport">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAVFBMVEVHcExnZ2dmZmZlZWVlZWVlZWVnZ2eAgIBmZmZmZmZhYWFtbW1mZmZlZWVmZmZlZWVmZmZmZmZnZ2dmZmZnZ2dpaWlmZmZdXV1mZmZoaGhkZGRmZma9I+bqAAAAG3RSTlMA8e7+JkmtAv3iHQ7INbw/9yM5bEMn5AuYICElV+vtAAAAsElEQVRIx+2W2Q7CIBBFh0LR6b5bnf//TyUm6qShMLF9sZ4HHiCHXNYMwBNjFa2grAGGSShAwg1LQSwTXB599qJdKia4KTLwkrnxhQArHEeoa6FQVRKh7GeiuS+jhXFyfdMYH6ltiJpWsIb8cYF0LhC6YhiKTiBcXs2h7tIuQoqfHwWmQQH514LbC+JIv3UO7wXHbivuI4gj/V/c5sL15OW2EFS4ElDflQ7i4iS+/LkDh55I/nVhxSQAAAAASUVORK5CYII="/>
            <span>报备客户</span>
          </div>
      </div>
      <!--消息-->
      <div class="msg-box" style="width: 100%; -webkit-overflow-scrolling: touch; position: absolute;bottom:38px;top:31px;left:0px; overflow-y: scroll">
        <van-pull-refresh v-model="loading" pulling-text="下拉加载下一页" loosing-text="释放加载下一页" @refresh="getmsgListnext">
          <div style="height: auto">
            <div class="massage-info-msg" v-for="(items,index) in msgList" v-bind:key="index">
              <div class="massage-info-msg-time">
                <span>{{items.timeStr}}</span>
              </div>
              <div v-for="(item,index) in items.msgList" v-bind:key="index">
                <div :id="item.id" class="massage-info-msg-customer" v-if="item.fromType == 1">
                  <img @click="goDetails" class="massage-info-msg-customer-img" v-if="headImgUrl   !='' && headImgUrl !=null && headImgUrl !=undefined" v-bind:src="headImgUrl">
                  <div class="msg-customer-con" v-if="item.msgType=='1'">{{item.content}}</div>
                  <div class="msg-customer-con-voice" v-if="item.msgType=='2'" @click="playVoice(item.content,item.id)">
                    <img v-if="isplay==item.id" class="left-voice-img" src="@/assets/img/message/left_voice.gif">
                    <img v-else class="left-voice-img" src="@/assets/img/message/Rectangle@3x.png">
                    <div class="left-voice-time">{{item.audioTime}}″</div>
                  </div>

                  <div class="msg_custom_house_info" v-if="item.msgType==3" @click="gomarket(item.content.linkerId,item.content.linkerName)">
                    <div class="info-img">
                      <img v-bind:src="item.content.avatarMediaid">
                    </div>
                    <div class="info-data">
                      <div class="info-name">{{item.content.linkerName}}</div>
                      <div class="info-address">{{item.content.address}}</div>
                      <div class="info-Price">
                        <span>{{item.content.linkerPrice}}</span>
                        <span>{{item.content.building}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div :id="item.id" class="massage-info-msg-me" v-if="item.fromType == 2">
                  <img class="massage-info-msg-me-img" v-if="avatar !='' && avatar  !=null && avatar !=undefined" v-bind:src="item.avatar">
                  <div class="msg-customer-con-me" v-if="item.msgType=='1'" v-html="item.content"></div>
                  <div class="msg-customer-con-me" v-if="item.msgType=='7'">
                      <div v-if="item.content.type=='ARRAY'">
                        <div class="robot_keys comm_style">红树湾</div>
                        <div class="robot_z comm_style robot_keys">我是智能客服小Z，你需要咨询的是以下问题吗</div>
                        <div class="robot-answer robot_keys" v-for="(item2,index) in item.content.answer" :key="index">{{item2}}</div>                     
                        <div class="robot_suffix comm_style">如果没有您需要的问题，可尝试更准确的关键字，例如：<span style="font-weight:bold;">“装修标准”</span></div>
                      </div>
                      <div v-else class="robot-answer">{{item.content.answer}}</div>
                    <!-- 是吧{{item.content.answer}} -->
                  </div>
                  <div class="msg-customer-con-me-voice" v-if="item.msgType=='2'" @click="playVoice(item.content,item.id)">
                    <div class="left-voice-time">{{item.audioTime}}″</div>
                    <img v-if="isplay==item.id" class="left-voice-img" src="@/assets/img/message/right_voice.gif">
                    <img v-else class="left-voice-img" src="@/assets/img/message/Path@3x.png">
                  </div>
                  <div class="msg_house_info" v-if="item.msgType==3" @click="gomarket(item.content.linkerId,item.content.linkerName)">
                    <div class="info-img">
                      <img v-bind:src="item.content.avatarMediaid">
                    </div>
                    <div>
                      <div class="info-name">{{item.content.linkerName}}</div>
                      <div class="info-address">{{item.content.address}}</div>
                      <div class="info-Price">
                        <span>{{item.content.linkerPrice}}</span>
                        <span>{{item.content.building}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="msg-customer-con-me-status" v-show="!item.cardDelFlag">
                  <p v-if="item.msgStatus==1" style="color: #333">未读</p>
                  <p v-else>{{item.fromType==2 ? '已读' : ''}}</p>
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
        <img src="@/assets/img/message/voice01.gif">
        <div>手指上划 取消发送</div>
      </div>
    </div>
    <div class="voiceInfo-div-cancel" v-if="isvoice==3">
      <div class="voiceInfo-cancel">
        <img src="@/assets/img/message/voice-cancel.png">
        <div>松开手指 取消发送</div>
      </div>
    </div>
    <div id="footer" ref="inputContent" :class="isShowEmjie || isShowOption?'massage-info-lower-emjie':'massage-info-lower'">
      <div class="massage-info-lower-left" @click="switchMsg">
        <img v-if="msgType==1" src="@/assets/img/message/icon_yy.png">
        <img v-else src="@/assets/img/message/iocn_jp.png">
      </div>
      <div class="massage-info-lower-cen">
        <input type="textarea" autocomplete="off" v-on:keyup.enter="sendMessage(1,'')" v-model="message" id="message" v-if="msgType==1" v-on:focus="hideface()" placeholder="说点什么吧？" @blur="blur">
        <button v-else :class="isvoice==1? 'msgContentvoice msgContentvoice-bg':'msgContentvoice'" @touchstart="startRecord" @touchend="stopRecord" @touchmove="touchmoveRecord">{{def_btvalue}}</button>
      </div>
      <div class="massage-info-lower-right">
        <div class="lower-right-bnt">
          <img class="face" src="@/assets/img/message/icon_bq.png" @click="displayface">
        </div>
        <div class="lower-right-bnt">
          <div class="send" v-if="message.length>0" @click="sendMessage(1,'')">发送</div>
          <img class="selTempl" v-else src="@/assets/img/message/icon_chang.png" @click="displayOption">
        </div>
      </div>
    </div>
    <div class="msg-emjie" v-show="isShowEmjie">
      <span v-for="(itemone,emojikeyone) in emojiFactory" @click="emojiSelect(itemone.key)" style="font-size:0.5rem;margin:0.15rem;float:left;" :key="emojikeyone">{{getEmoji(itemone.tag)}}</span>
    </div>
    <div v-show="isShowOption" class="massage_temp_main">
      <div class="massage-item" v-for="(item,index) in massageItem" :key="index" @click="defaultMsgClickHandle(item.content)">
        {{item.content}}
      </div>
      <!-- <div class="im-option-item" @click="defaultMsgClick">
        <div class="im-option-icon-item">
          <img :src="iMTempMsgIcon">
        </div>
        <div class="im-option-lebal-item">常用语</div>
      </div>

      <div class="im-option-item">
        <div class="im-option-icon-item" @click="projectClick">
          <img :src="iMTempProjectIcon">
        </div>
        <div class="im-option-lebal-item">楼盘</div>
      </div>

      <div class="im-option-item" v-show="clientMobile" @click="phoneCall">
        <div class="im-option-icon-item">
          <img :src="iMTempPhoneIcon">
        </div>
        <div class="im-option-lebal-item">拨打电话</div>
      </div>

      <div class="im-option-item" @click="gotoReport">
        <div class="im-option-icon-item">
          <img :src="iMTempReportIcon">
        </div>
        <div class="im-option-lebal-item">发起报备</div>
      </div> -->
    </div>
    <audio :src="nowVoiceUrl" ref="audio" id="myaudio" hidden="true" preload="auto" v-show="false"/>
    <van-popup v-model="defaultMsgPopShow" position="bottom" class="default-msg-popup">
      <div class="default-msg-box">
        <div class="default-msg-title van-hairline--bottom">
          <span>常用语</span>
          <img :src="closeIcon" @click="closeDefaultMsg">
        </div>
        <div class="default-msg-item van-hairline--bottom" v-for="(info,index) in tempValue" :key="index" @click="defaultMsgClickHandle(info)">{{info}}</div>
      </div>
    </van-popup>
    <div class="error-dialog" v-show="isSHowErroDialog">
      <img :src="imgUrl" alt="">
      <p>{{errContent}}</p>
    </div>
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
      isSHowErroDialog:false,
      imgUrl:require('IMG/custom/message_err.png'),
      errContent:"未添加微信号，请前往设置微信号",
      massageItem:[
        {
          content:"您好，请问有什么需要帮助？",
        },
        {
          content:"您是准备用来投资还是自己住呢?",
        },
        {
          content:"您看一下满意否，有合适的话我马上帮您约看",
        },
        {
          content:"您什么时候有时间，我这边好提前安排",
        },
        {
          content:"非常抱歉，我现在不方便打字，您有任何事情都可以给我留言，我会在方便的时候第一时间给您回复。",
        },
      ],
      wechatAccount:"", //微信号
      noFocusWx:false,//发送微信不拉起输入框
      cardDelFlag: 0,
      customBaseInfo: null,
      defaultMsgPopShow: false,
      clientMobile: this.$route.query.clientMobile,
      loading: false,
      emojiFactory: [],
      clientId: this.$route.query.clientId,
      nickName: this.$route.query.customerRemarkName,
      clientInfo: '',
      agentId: '',
      avatar: '',
      robot_avatar:require('IMG/custom/robot_avator.png'),
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
      message: '',
      msgType: 1, //1文本输入2语音输入
      sourceType: 2, //来源类型2企业微信 1小程序
      audioTime: 10,
      posStart: 0, //初始化起点坐标
      posMove: 0, //初始化滑动坐标
      isShowEmjie: false,
      isplay: 0, //正在播放的语音对象
      nowVoiceUrl: '', //正在播放的语音地址
      voiceUrl: '',
      current: 1,
      START: 0,
      END: 0,
      tempValue: [
        '您好，请问有什么需要帮助？',
        '您是准备用来投资还是自己住呢?',
        '您看一下满意否，有合适的话我马上帮您约看',
        '您什么时候有时间，我这边好提前安排。',
        '非常抱歉，我现在不方便打字，您有任何事情都可以给我留言，我会在方便的时候第一时间给您回复。'
      ],
      isShowOption: false,
      isSendding: false,
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
      this.wechatAccount = this.userInfo.wechatAccount
      this.avatar = this.userInfo.avatarUrl
      //加载emoji表情库
      this.emojiFactory = emoji.emojiFactory
      this.$_init()
      let myAuto = document.getElementById('myaudio')
      myAuto.addEventListener(
        'ended',
        () => {
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
    //发送微信号
    sendWxAccount(){
      if(!this.wechatAccount){
        this.isSHowErroDialog = true;
        this.errContent = "未添加微信号，请前往设置微信号";
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.isSHowErroDialog = false;
        }, 2000);
        return ;
      }
      this.message = "我的微信号：<span style='color:#007AE6'>" + this.wechatAccount +"</span>";
      this.noFocusWx = true;
      this.sendMessage(1,'')
    },
    blur() {
      // document.activeElement.scrollIntoViewIfNeeded(true)
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    },
    /**
     * 客户基本信息以及购房意向度
     */
    async getCustomBaseInfo(id) {
      const result = await customService.getClientInfo(id)
      this.customBaseInfo = result
      this.clientMobile = this.customBaseInfo.clientMobile||"18018733546"
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
      if(!this.clientMobile){
        this.$toast("无法获取客户手机号");
        return ;
      }
      window.location.href = 'tel:' + this.clientMobile
    },
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
      // 关闭option
      this.isShowOption = false
      document.querySelector('.massage-info-list').style.bottom = 0

      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
      }, 1000)
      this.pyzmaoviwe()
    },

    //是否显示操作
    displayOption() {
      if (this.isShowOption == false && this.msgType == 1) {
        this.isShowOption = true
        document.querySelector('.massage-info-list').style.bottom='200px'
        document.querySelector('.msg-box').scrollTop += 200
      } else {
        this.isShowOption = false
        document.querySelector('.massage-info-list').style.bottom='0'
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
      let res = await customService.mediaIdTransToMp3Url(mediaId, appId)
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
    },
    //设置聊天记录的值
    setList(res) {
      this.cardDelFlag = res.cardDelFlag
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
              list.avatar = this.userInfo.avatarUrl;
              msgLists.push(list)
            } else {
              if (MsgContent.Desc == 2) {
                list.avatar = this.userInfo.avatarUrl;
                try {
                  //兼容以前老的消息格式
                  let ext = JSON.parse(MsgContent.Ext)
                  list.content = MsgContent.Data
                  list.msgType = 2
                  list.audioTime = ext.audioTime || ext
                  msgLists.push(list)
                } catch (e) {
                  let ext = MsgContent.Ext
                  list.content = MsgContent.Data
                  list.msgType = 2
                  list.audioTime = ext
                  msgLists.push(list)
                }
              } else if (MsgContent.Desc == 3) {
                list.avatar = this.userInfo.avatarUrl;
                list.content = JSON.parse(MsgContent.Data)
                list.msgType = 3
                msgLists.push(list)
              } else if (MsgContent.Desc == 1) {
                list.avatar = this.userInfo.avatarUrl;
                list.content = MsgContent.Data
                list.msgType = 1
                msgLists.push(list)
              } else if (MsgContent.Desc == 7) {
                list.avatar = this.robot_avatar;
                list.content = JSON.parse(MsgContent.Data)
                list.msgType = 7
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
          }
        })
      }
    },
    upRecord(nowLocalId) {
      let _this = this
      wx.uploadVoice({
        localId: nowLocalId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function(res) {
          let serverId = res.serverId // 返回音频的服务器端ID
          _this.messages_record = nowLocalId
          _this.sourceType = 2
          _this.mediaIdTransToMp3Url(serverId)
        }
      })
    }, //接收消息
    addmsgInfo(msg) {
      if (msg.code && msg.code == 500) {
        this.$toast(msg.msg)
        return
      }
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
          if (elems.content.desc == 2) {
            let ext = JSON.parse(elems.content.ext)
            audioTime = ext.audioTime
            content = elems.content.data
          } 
          else if (elems.content.desc == 3) {
            content = JSON.parse(elems.content.data)
          } 
          else if (elems.content.desc == "7") {
            content = JSON.parse(elems.content.data)
          } 
          else {
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
      if(item.msgType == 7){
        item.avatar = this.robot_avatar;
      }else{
        item.avatar = this.userInfo.avatarUrl;
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
          let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours().toString()
          let m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString()
          var timeStr = h + ':' + m
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

        let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours().toString()
        let m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString()
        var timeStr = h + ':' + m
        // var timeStr = time.getHours().toString() + ':' + time.getMinutes().toString()

        listf.push(item)
        dict['timeLong'] = dats
        dict['timeStr'] = timeStr
        dict['msgList'] = listf
        this.msgList.push(dict)
      }

      this.message = ''
      this.isSendding = false
      this.pyzmaoviwe()
    },
    sendMessage(msgType01, audioTime01) {
      if(this.isSendding) return
      this.isSendding = true
      if (this.cardDelFlag == 1) {
        // 小程序端经纪人已经删除
        let obj = {}
        obj.content = this.customBaseInfo.clientName + '删除了您的名片，您还不是他（她）的经纪人。需要对方添加您的名片后，才能聊天'
        obj.msgType = 1
        obj.fromType = 2
        obj.msgStatus = 2
        obj.cardDelFlag = true
        obj.id = this.msgList[this.msgList.length - 1].msgList[0].id
        this.msgList[this.msgList.length - 1].msgList = this.msgList[this.msgList.length - 1].msgList.concat([obj])
        this.message = ''
        this.pyzmaoviwe()
        return
      }

      let _userInfo = {
        nickName: this.userInfo.name,
        avatarUrl: this.userInfo.avatarUrl,
        gender: this.userInfo.gender
      }

      let msg = onSendMsg(this.message, true, msgType01, audioTime01, _userInfo)
      if (msg) {
        this.$toast(msg)
      } else {
        this.message = ''
        // this.isSendding = false
      }

      if(!this.noFocusWx){
        document.getElementById('message').focus()
      }
      this.noFocusWx = false;

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
.error-dialog{
  position: absolute;
  top: 182px;
  left:50%;
  margin-left: -110px;
  width: 220px;
  height: 146px;
  border-radius: 12px;
  background: #000;   
  padding: 24px 32px; 
  text-align: center;
  img{
    width: 44px;
    height: 44px;
  }
  p{
    margin-top: 12px;
    font-size: 15px;
    color: #fff;
    line-height: 21px;
  }
}
.header-nav{
  width: 100vw;
  height: 54px;
  padding-top: 5px;
  position: relative;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  align-items: center;
  z-index: 20;
  background: #F9FAF9;
  .nav-item{  
    flex: 1;
    height: 42px;
    display:flex;
    flex-direction:column;
    align-items:center;
    &:last-child{
      margin-right: 0;
    }
    .nav-cion{
      display: block;
      width:24px;
      height:24px;
      margin-bottom: 4px;
    }
    span{
      font-size: 10px;
      color: #666666;
    }
  } 
}
.massage-info-body {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 13px;
  > .massage-info-list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 45px;
    // height: 100%;
    // -webkit-box-flex: 1;
    // -webkit-flex: 1;
    // flex: 1;
  }
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
    margin-top: 36px;
    margin-bottom: 12px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    height: 26px;
  }
  .massage-info-msg-time span {
    display: inline-block;
    height: 26x;
    line-height: 26px;
    color: #666;
    border-radius: 2px;
    padding: 0 10px;
  }
  .massage-info-msg-customer {
    display: flex;
    // margin-top: 20px;
    text-align: left;
  }
  .massage-info-msg-customer + .msg-customer-con-me-status p {
    text-align: left;
    padding-left: 50px;
    color: #999;
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

    font-weight: 400;
    color: #fff;
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
    background: #017fff;
    padding: 10px;
  }
  .msg-customer-con-status {
    padding-top: 12px;
    position: relative;
    font-size: 12px;

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

    font-weight: 400;
    color: #333;
    line-height: 21px;
    position: relative;
    border-top-left-radius: 8px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px;
    background: #eee;
    text-align: left;
    .comm_style{
        font-size: 16px;
        line-height: 24px;
        color:#333;    
      }
      .robot_keys{
        margin-bottom: 16px;
      }
      .robot-answer{
        color: #007AE6;
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
      }
  }
  .msg-customer-con-me-status {
    padding-top: 10px;
    position: relative;
    font-size: 12px;
    padding-right: 40px;
  }
  .msg-customer-con-me-status p {
    text-align: right;
    padding-right: 10px;
    color: #999;
  }

  .msg-customer-con-me-voice {
    max-width: 60%;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 15px;

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
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  // position: fixed;
  // bottom: 0;
  height: 50px;
  display: flex;
  text-align: center;
  // width: 100%;
  background: rgba(250, 250, 250, 1);
  padding: 8px 10px;
  z-index: 99;
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
  // border: 1px solid rgba(221, 221, 221, 1);
  border: none;
  height: 36px;
  position: relative;
  font-size: 16px;
}
.massage-info-lower-cen input:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid #000;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.msgContentvoice {
  text-align: center;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
  border-radius: 4px;
  border: none;
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 5px #eee;

  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

.msgContentvoice:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid #000;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
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
  height: 190px;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 16px 0;
  background-color: #fff;
  overflow-y: auto;
  .massage-item{
    position: relative;
    padding: 16px 0;
    font-size: 16px;
    line-height: 24px;
    color: #333;
    &::after{
      content: "";
      width: 200%;
      height: 1px;
      border-bottom: 1px solid #E4E6F0;
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: left bottom;
      transform: scale(0.5);
    }
    &:last-child::after{
      display: none;
    }
  }
  .im-option-item {
    margin-left: 18px;
    width: 66px;
    height: 88px;
    .im-option-lebal-item {
      padding-top: 5px;
      font-size: 12px;
      text-align: center;

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
  display: flex;
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
  width: 80px;
  height: 64px;
  margin-right: 5px;
  border-radius: 4px;
}

.info-data {
  flex: 1;
}
.info-name {
  padding-top: 8px;
  font-size: 0.32rem;
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

  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  // line-height: 0.24rem;
  margin-top: 0.24rem;
  margin-bottom: 0.24rem;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
}

.info-Price {
  font-size: 0.22rem;

  font-weight: 400;
  color: #666;
  line-height: 0.22rem;
}

.info-Price span:first-child {
  color: rgba(234, 77, 46, 1);
  margin-right: 0.1rem;
}
</style>
