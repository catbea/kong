<template>
  <div class="massage-info-body">
    <div class="massage-info-list">
      <div class="header-nav">
          <div class="nav-item" @click="projectClick">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAGFBMVEVHcExmZmZlZWVnZ2dnZ2dlZWVmZmZmZmZofd2ZAAAAB3RSTlMA4knxrSbuMB2ZQwAAAGNJREFUOMtjYGBgYHUuRwCTAAY4CCtHBqkICXcUiRKEhDmKRDFCorycATuHdhIIz2BKQD2DRaIEl0QxDsuhIgMuoQh2pRCmhDhYopAECZxGjfp8VAKfhGI5NsAAC3BSJHAYBQC1QcgUK0H73AAAAABJRU5ErkJggg=="/>
            <span>发送楼盘</span>
          </div>
          <div class="nav-item" @click="sendWxAccount">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC/VBMVEVHcExqampiYmJmZmZdXV1gYGBmZmYAAACAgIBmZmZnZ2dmZmZoaGhlZWVmZmZmZmZmZmZlZWVmZmZlZWVnZ2dmZmZpaWlmZmZnZ2dmZmZnZ2eAgIBmZmZoaGhnZ2diYmJnZ2dtbW1nZ2dlZWVlZWVmZmZnZ2dnZ2djY2NkZGRkZGRhYWFlZWVmZmZmZmZnZ2dmZmZlZWVmZmZmZmZpaWlmZmZnZ2dmZmZnZ2dAQEBmZmZlZWVmZmZmZmZmZmZmZmZmZmZVVVVmZmZmZmZmZmZgYGBoaGhmZmZmZmZkZGRnZ2dmZmZmZmZlZWVmZmZmZmZmZmZxcXFmZmZmZmZmZmZmZmZoaGhmZmZmZmZmZmZmZmZnZ2dmZmZmZmZkZGRmZmZmZmZmZmZmZmZkZGRmZmZnZ2dmZmZmZmZlZWVra2tmZmZmZmZlZWVlZWVmZmZmZmZmZmZkZGRmZmZmZmZmZmZlZWVmZmZqamplZWVmZmZmZmZlZWVpaWlmZmZoaGhnZ2dmZmZnZ2dmZmZnZ2deXl5mZmZmZmZtbW1mZmZlZWVoaGhnZ2dmZmZnZ2dmZmZlZWVgYGBnZ2dmZmZlZWVlZWVjY2NmZmZmZmZlZWVmZmZlZWVlZWVnZ2dlZWVmZmZnZ2dmZmZmZmZmZmZmZmZnZ2dnZ2dmZmZnZ2dnZ2dmZmZlZWVnZ2dmZmZnZ2dmZmZqampmZmZoaGhhYWFnZ2dlZWVVVVVmZmZlZWXt7e1mZmbs7Ozm5uZqamqhoaHn5+fe3t6urq5ra2uBgYHZ2dnGxsZoaGjk5OTQ0NCRkZF+fn53d3d8fHxnZ2fj4+Po6Ohzc3Pr6+urq6uKiora2tqvr6/X19eYmJjHx8fc3Nxubm6goKDq6up/f3+amprBwcHg4OC+vr67u7twcHC3t7ekpKS8vLy6urpycnKMjIzl5eWbm5uNjY14eHioqKhtbW3Y2Njb29vS0tLPz8+WlpaioqKEhITJycmpqam5ubmVlZXp6emPj4/R0dF9fX11dXUhyikfAAAAuHRSTlMADA3SCwjlAQL9JeQb/gU34MmMeYEPEevC+U0E9yCLGp8HNO9TeKTiEiE4FUf105WgOqf0J6o+HmMEo+X+zKjUzQPQm0sQO+hzM0Ovek4o7EEJdenA8yzYUMt/7NnIF5b2lNdA50iAFK4ffeHgfvDRty6y2rxYximh7+6mPbFgWWe1yskTz4oOa1sxqdyu5oMYaqL5SSRpbkTqq7WcsN5e3+3yCjl8gpp5kVFStKbONdtCHcTHBvptIKeSDwAAA1NJREFUSMe9VmVcFEEUPySOlJYQFFBABKRLQQUJBUEkxe7u7u7u7u6OnQOUElQ6BLu7u/Xne7N3XC3HDz84X+bNP3bf7LyZWR7vvzaVPkZeMzvr9RxrZ+tdu1o1f/WS7kTcJrjqKtZHtiCyLa5x1fLlWwhH0+ihUoVetxmr0HKd6qbp49lr7cYdLDDMgVO/3oM+L2K3GFIPNqUOtXEcehtnpFomyMAn9OhLteX0s2k+c+W/o7EXEvp1ZXF3hPfgh60lBs+0x7yaIjVQRu/mD6ABBJ56/itFYIf4s+egCxwJnHN9acMmwALwtZshEC1WIiEWiDUKA7CelN5HA6DJGBkQohMlRE8TEsvHYDqwnaSmNx/nRaM6zZusEKEJcUnRNFA1AT5a0tAcgNZVl0B7nHdHSQRLiLtmomIijpvR1WvpHSiGNwDgyFG7kackq2r7ul0iJh6G8iXWRlm2EE22CSk1GMiuvvp+M5HuYkqlZVEdSgZAGC6Tzj5WUVL2Pl/AJL/99jGdjudQRyuIlkkbDlC6/CpT2fKLqUUfa2cBBIvVJfW+yBVWMFKt9DOi7kDPs4BgjITecSgAf0oZ5ldFkVD94YuAKShBR7AwJy1jsQEqhKRAOmWE/GT1Xwn5zjAFuUAEgWDNKgimVCZl3QCGaSD7DX02NVwhJO8Hw+TkARIKkr34LiuRwwkGb86DrJyQVwJquETIZeyfCSvXugs6hjdiDUMgvo10cnHqOzal568/XcD+HlCmqKk/CB32ltQwHsKHDGe7hocCFTkMRscA44b9eLz+EN3hNiQDtZPNYyGEFn0bEJ0mLlhET7gNF4BaKtzC0oWWym3IAmoWazCSNhQWcRpeAOXCGg6zQg8doeM+Z0ZYuE6sIYxWvKFSV3PbbjiJB3fl9YKXQGz1o/qTELYzVGLNmrgXMrLl9Dfwob6s5iBp11Z86tEJ3cqU1p+/hKgpn5W0lpDzeH4zkEtPS5bQZ+bSo1yb+2hRHU1nfj01C2uKuZmT9ugxArEjqrwc7UQ7+unljCuVu/qYghtv2kSOGyxc0R0ZYthbzhCj+FpVbWg1SoMK7ScF0f5I9Te9qqZNG0tYH755EhgSa/SXYH6UaCjVyME/pBxaw18Rfsi//MD8BQCD0GwX5idbAAAAAElFTkSuQmCC"/>
            <span>发送微信</span>
          </div>
          <div class="nav-item" @click="phoneCall">
            <img class="nav-cion" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABwlBMVEVHcExVVVVoaGhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZpaWlmZmZmZmZnZ2dra2tgYGBmZmZmZmZnZ2dlZWUAAABlZWVmZmZnZ2dmZmZnZ2dmZmZkZGRnZ2dkZGRmZmZmZmZmZmZkZGRmZmaAgIBkZGRlZWVmZmZlZWVqampoaGhlZWVmZmZqampoaGhmZmZmZmZiYmJmZmZnZ2dmZmZoaGhmZmZlZWVlZWVlZWVmZmZmZmZVVVVnZ2dmZmZmZmZmZmZqamplZWVnZ2dmZmZmZmZqampmZmZjY2NmZmZnZ2dmZmZmZmZnZ2dmZmZmZmZnZ2dlZWVlZWVmZmZlZWVmZmbt7e3s7Oze3t7p6eltbW2goKB2dnbn5+eBgYHY2NhoaGioqKi+vr5ra2vi4uLr6+uLi4vl5eV+fn5paWlwcHDb29uioqLd3d1nZ2eJiYnPz8+fn5/W1ta4uLh7e3ukpKSMjIzFxcXMzMzm5uaampqZmZlubm56enq0tLTq6upqampsbGxvb2+tra22trbj4+O5ubmlpaXExMTKysqcnJzc3NySkpLX19eurq6xsbF3d3dzc3PAwMCYmJjk5ORyIRU1AAAAVnRSTlMABjHY5w8K8fzz+ukn/QWVEwjm+/Z+ASbWvZm44SGpHNrs9BctAi5Oxv4kRzpkGGBp3w3kNNVA91azU96qA6u7jIIdvYtwpwyEEs5KeqV83dx5pnx49Cnhh9YAAALZSURBVEjHjZZnXxNBEIdJSEhCgFAFFGmCgIUiSrPQkWbXuwsQ0hNDF1Ca9I5I9/s6M5sLl8vlLvMCdmf/z2939mZmk5TEzNiZnFual5KUqDUZOLTkRwnqW1I5Zoa0hPRVop7jXj5IQF9hAeWsx/8bieoMTX1WAejcXp4X/iDRoQn0oGyfBwsswajmsYY+zQyqNZ7swAHjomfqQB9oLlcZwP9ww8ymqu9KB8k1L9oRzMwP1YBeUISECDCyAfN2NaAbBBf8rS3jFTxRAaywfiYB+DlwfFYBcmB9XAqcgMP0Oj5ggvUZKSCsg6c2PjAIy8cS/b8xvCddfMAG6zcRuX16FINuVYlhCNZHv4f1m9uUsqZ8FSAjGxTnTL/AUrxBr/qph0Fyxe4psAvjsq8ahTqA1eBhW2DA1kyt9O4Hle+UxeyDcbEW8BajCLJ02sMYnmoRdahaJGDLCcPm5xrAnUK82ikiXDswbizRIO5j3M4RIry43YvbwHW1SnlVj6p5dlO/iAjvkd9q5kzvFLL9DaoOWfL9xXEjxaE3sU/ZHlODxg/gnlhhRRdETTPcVUqD2N/MNnln0JeDe9LFCNqDK878hP/WGVIk7z5t2AwcdnYqioOzlsGfMeFkjmY1HbKe+B69P/0scu9O+CyUyMsbNK6W9d276AyFCZeTAdPskEdu6tTRvb3yFe3BTsVv7WFebdvFDueg1yD6/dDdQ6fDJVbf2C63GanFgyV6caJTP4uIyRVRFFiQFHuAentedBg6OtXEIa9kAr4fpbLLraTIufkRJcIPK7kxSfIFvwfnnFIAPBhEbFq1ldP9LwpyvXcW/J0Kqav/SMcKnkbr9/FTGIxK5WGk3OV8HknPXV1DV2pTnIqqtxBydR7ucML1Jelb4tdgYTiVbo5nxs8uQjSxVKnVeV02J7OCCo3u0/9NKs/pydJ8wAeGDaI8vS+xHyEZQ7ZBU461u7cr4voPQ6ViIF8+zUoAAAAASUVORK5CYII="/>
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
                        <div class="robot_z comm_style robot_keys">我是智能客服小蓝，你需要咨询的是以下问题吗</div>
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
      this.message = "我的微信号：" + this.wechatAccount;
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
  position: fixed;
  top:0;
  left:0;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  align-items: center;
  z-index: 20;
  background: #ededed;
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
  height: 56px;
  display: flex;
  align-items: center;
  text-align: center;
  // width: 100%;
  background: rgba(250, 250, 250, 1);
  
  padding: 8px 10px;
  z-index: 99;
  &::after{
    content:"";
    position: absolute;
    width: 200%;
    height: 1px;
    border-top: 1px solid #CFCFD9;
    transform-origin: left top;
    transform: scale(0.5);
    left: 0;
    top: 0;
  }
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
  line-height: 36px;
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
  background: #F0F2F5;
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
  margin-right: 8px;
  border-radius: 4px;
}

.info-data {
  flex: 1;
}
.info-name {
  margin-top: -4px;
  padding-top: 0px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  width: 100%;
  word-break: keep-all;
  max-width: 134px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.info-address {
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height:16px;
  margin-top: 8px;
  margin-bottom:4px;
  max-width: 134px;
  text-overflow: ellipsis;
  width: 100%;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
}

.info-Price {
  font-size: 14px;
  font-weight: 400;
  color: #666;
  line-height: 20px;
}

.info-Price span:first-child {
  color: rgba(234, 77, 46, 1);
  margin-right: 0.1rem;
}
</style>
