<template>
  <div class="register-page">
    <div class="bg_img top-container" :style="{backgroundImage:'url(' + bgImg + ')'}">
      <div class="bg_img top-right" :style="{backgroundImage:'url(' + borderImg + ')'}"/>
      <p class="top-title">{{registerName ? registerName : 'AW大师'}}</p>
      <p class="top-text">全景看房 - AI拓客 - 裂变传播 - 监控意向</p>
      <p class="top-text top-desc">连接客户更简单</p>
      <div class="top-content" v-if="!registSuccess">
        <div class="box-shadow top-form-container">
          <div class="top-invite-info" v-if="registerType!=='40' && registerType !=='50'">
            <div class="bg_img invite-head" :style="{backgroundImage:'url(' + (referLogo || defaultLogo) + ')'}"/>
            <span class="invite-name">{{referName ? referName : registerName}}&nbsp;&nbsp;</span>
            <span class="invite-desc">邀请您加入</span>
          </div>
          <div class="channel-register" v-else>
            <b>{{qrCodeinfo.channelName || qrCodeinfo.linkerName}}</b>送您免费开通券，邀请您加入
          </div>
          <div class="top-phone-cell">
            <input
              class="phone-input"
              placeholder="请使用当前微信绑定手机号"
              type="tel"
              oninput="value=value.replace(/[^0-9]/g,'')"
              maxlength="11"
              v-model.trim="mobile"
              @focus="focusHandler"
              @blur="blurHandler"
              @input="inputHandler"
            >
          </div>
          <div class="top-code-cell">
            <div class="top-code-wrap">
              <input
                class="code-input"
                placeholder="请输入验证码"
                type="number"
                oninput="value=value.replace(/[^0-9]/g,'')"
                maxlength="6"
                v-model="code"
                @focus="focusHandler"
                @blur="blurHandler"
                @input="inputHandler"
              >
            </div>
            <div
              class="top-send-btn"
              :class="disabled&&'disabled'"
              @click="sendCodeHandler"
            >{{sendCodeText}}</div>
          </div>
          <div class="top-name-cell">
            <input
              class="name-input"
              placeholder="请输入你的昵称"
              type="text"
              v-model="name"
              @focus="focusHandler"
              @blur="blurHandler"
              @input="inputHandler"
            >
          </div>
          <div class="user-city" @click="popAreaHandler" v-show="registerType == 50 || registerType == 30">
            <p class="title">主营区域</p>
            <p class="value" :class="{'disable': !userRegistInfo.majorRegion}">{{userRegistInfo.majorRegion || '请选择'}} <van-icon name="arrow" /></p>
          </div>
        </div>
        <!-- <router-link :to="params"> -->
        <div class="reg-btn" :class="registDisabled&&'registDisabled'" @click="nextHandler">{{submitStr}}</div>
        <!-- </router-link> -->
        <p class="top-protocol">
          <span style="opacity:0.6">注册代表您同意&nbsp;&nbsp;</span>
          <router-link
            style="color:#fff;font-size:12px;font-weight:bold;"
            to="/register/agreement?name=AW大师"
          >{{registerName ? registerName : 'AW大师'}}注册协议</router-link>
        </p>
      </div>
      <div v-else class="box-shadow qrcode-content">
        <img class="bg_img register-qrcode" :src="qrcodeImg"></img>
        <div class="register-desc">提交成功，请扫描二维码 </div>
        <div class="register-desc">关注企业微信 即完成注册</div>
      </div>
    </div>
    <div class="info-container">
      <h5>我们是AW大师</h5>
      <div class="bottom-line"></div>
      <div class="items-container">
        <div class="item" v-for="info in data" :key="info.title">
          <div class="bg_img" :style="{backgroundImage:'url(' + info.icon + ')'}"/>
          <h5>{{info.title}}</h5>
          <p>{{info.desc}}</p>
        </div>
      </div>
    </div>
    <area-select :show.sync="areaShow" :code.sync="cityCode" :title="areaTitle" @cancel="cancelHandler" @confirm="confirmHandler" :areaList="areaList"></area-select>
  </div>
</template>
<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import { checkStrLength, checkStrType } from '@/utils/tool'
import RegisterService from 'SERVICE/registService'
import AreaSelect from 'COMP/AreaSelect'
import { fullArea } from '@/utils/fullArea'
export default {
  data: () => ({
    submitStr: '立即注册',
    bgImg: require('IMG/register/registerBg.png'),
    borderImg: require('IMG/register/register_border.png'),
    defaultLogo: require('IMG/system/default_logo.png'),
    data: [
      { title: '实拍全景', desc: '高保真分享不错过任何细节', icon: require('IMG/register/regIcon1.png') },
      { title: '提高转化率', desc: '改变传统分享被踢出群的尴尬', icon: require('IMG/register/regIcon2.png') },
      { title: '实时跟进', desc: '在合适的时间合适的地点做合适的事', icon: require('IMG/register/regIcon3.png') },
      { title: '大数据分析', desc: '分析客户真实购房需求, 快速形成用户标签', icon: require('IMG/register/regIcon4.png') },
      { title: '200万用户', desc: '与200万AW大师并肩作战', icon: require('IMG/register/regIcon5.png') },
      { title: '2元试用', desc: '您与快速成交的工具 只差两元', icon: require('IMG/register/regIcon6.png') }
    ],
    mobile: '',
    code: '',
    name: '',
    sendCodeText: '获取验证码',
    codeTime: 60,
    disabled: true, // 获取验证码是否可点击
    registDisabled: true, // 注册按钮是否可点击
    clickDisabled: false,  // 注册按钮防多次点击
    registSuccess: false, // 是否成功注册
    registerType: '',
    enterpriseId: '',
    parentUserId: '',
    distributorId: null,
    registerName: '',
    referLogo: '',
    referName: '',
    distributorName: '',
    institutionId: null,
    institutionName: '',
    majorRegion: '',
    params: null,
    query: null,
    areaShow: false,
    areaTitle: '请选择区域',
    areaCode: '440305',
    areaList: {},
    belong: '',
    belongGroup: '',
    linkerId: '',
    qrCodeinfo: {},
    isUnbindUser: false
  }),
  components: {
    AreaSelect
  },
  created() {
    this.query = this.$route.query
    // 10：经纪人推荐注册，20：分销商推荐注册,30:普通注册 （搜一搜跳转注册，公众号跳转注册，用户端小程序切换注册）40开发商注册 50渠道注册
    // registerType=10&parentUserId=4746&enterpriseId=90
    // registerType=20&enterpriseId=90&parentUserId=14469&distributorId=268
    // registerType=30&enterpriseId=90
    // registerType=40&parentUserId=4425&enterpriseId=90&belong=%d&belongGroup=%d&linkerId=%s  （40,50注册参数）
    // if (this.query.registerType == '30') {
    //   this.params = `/register/step1?${qs.stringify(this.$route.query)}`
    // } else {
    //   this.params = `/register/step3?${qs.stringify(this.$route.query)}`
    // }
    
    // 优惠券跳转公共注册
    let href = window.location.href
    if (href.indexOf('coupons') > -1) {
      this.$route.query.registerType = '30'
    }

    this.activityId = this.$route.query.activityId || ''
    this.enterpriseId = this.$route.query.enterpriseId || ''
    this.registerType = this.$route.query.registerType || ''
    this.parentUserId = this.$route.query.parentUserId || ''
    this.distributorId = this.$route.query.distributorId || ''
    this.belong = this.$route.query.belong || ''
    this.belongGroup = this.$route.query.belongGroup || ''
    this.linkerId = this.$route.query.linkerId || ''
    this.mobile = this.userRegistInfo.registerMobile || ''
    this.code = this.userRegistInfo.registerCode || ''
    this.name = this.userRegistInfo.name || ''
    this.disabled = this.userRegistInfo.disabled || ''
    this.registDisabled = this.userRegistInfo.registDisabled || ''
    this.queryByRegister(this.enterpriseId)
    // if (this.registerType === '10' || this.registerType === '20') {
    if (this.registerType === '10') {
      this.queryRegisterRecommendInfo()
    }
    if (this.registerType === '40' || this.registerType === '50') {
      this.getQrCodeInfo()
    }
    this.fullArea = fullArea
    this.getAreaList(fullArea)
  },
  computed: {
    ...mapGetters(['userInfo', 'userRegistInfo']),
    cityCode() {
      let codes = Object.keys(this.fullArea.city_list)
      let cityList = Object.values(this.fullArea.city_list)
      let i = ''
      cityList.forEach((el, index) => {
        if (el === this.userInfo.majorCity) {
          return (i = index)
        }
      })
      return codes[i] || ''
    }
  },
  watch: {
    mobile (newValue, oldValue) {
      let reg = /^1[3-9]\d{9}$/g
      if (reg.test(newValue)) {
        // 检测老用户
        this.checkUser(newValue)
      }
    }
  },
  methods: {
    // 查询楼盘和开发商信息
    getQrCodeInfo () {
      RegisterService.getQrCodeInfo({
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        belong: this.belong,
        linkerId: this.linkerId
      }).then(res => {
        this.qrCodeinfo = res
      })
    },
    // 检测老用户
    checkUser (phone) {
      RegisterService.checkUser({
        parentUserId: this.parentUserId,
        mobile: phone,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        belong: this.belong,
        belongGroup: this.belongGroup,
        linkerId: this.linkerId
      }).then(res => {
        if (res.isCouponEnd) {
          this.$router.push({path:'/register/invalid', query:{type:2}})
        }
        if (res.isQrCodeExpire) {
          this.$router.push({path:'/register/invalid', query:{type:1}})
        }
        //注册判断逻辑，如果已经注册过的用户，但是没有绑定当前渠道或者楼盘的，注册按钮文案变为立即绑定，继续注册绑定流程
        if (res.isOldUser) {
          this.$dialog.alert({
            title: '',
            message: '您已经是老用户，登录后即可免费开通楼盘！',
            confirmButtonText: '立即登录'
          }).then(() => {
            this.$toast('已免费开通，请到我的楼盘中查看')
            window.location.href = window.location.href.split('#')[0] + `?cropId=${res.corpId}`
          })
        } else {
            if(res.name) {
              if (this.registerType === '40' || this.registerType === '50') {// 只有40 50的时候，走绑定流程，其他时候是公共注册直接跳首页
                this.isUnbindUser = true
                this.name = res.name
                this.submitStr = '立即绑定'
              } else {
                this.$dialog.alert({
                  title: '',
                  message: '您已经是老用户，登录后即可免费开通楼盘！',
                  confirmButtonText: '立即登录'
                }).then(() => {
                  this.$toast('已免费开通，请到我的楼盘中查看')
                  window.location.href = window.location.href.split('#')[0] + `?cropId=${res.corpId}`
                })
                return
              }
            }
            this.registDisabled = false
        }
      }).catch()
    },
    // areaList 获取
    getAreaList () {
      let keys =  Object.keys(this.fullArea.city_list)
      let data = {}
      keys.forEach(ele => {
        data[ele] = '不限'
      })
      let county_list = Object.assign({},this.fullArea.county_list, data)
      this.areaList = Object.assign({},this.fullArea,{county_list: county_list})
    },
    confirmHandler(val) {
      this.areaShow = false
      if (val[2]) {
        this.majorRegion = val[0].name + '/' + val[1].name + '/' + val[2].name
        this.city = val[1].name
        this.area = val[2].name
      } else {
        this.majorRegion = val[0].name + '/' + val[1].name
        this.city = val[1].name
        this.area = ''
      }

      let _userRegistInfo = {
        majorRegion: this.majorRegion,
        city: this.city,
        area: this.area
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    },
    /**
     * 弹出主营区域选择框
     */
    popAreaHandler() {
      this.areaShow = !this.areaShow
    },
    cancelHandler(val) {
      this.areaShow = false
    },
    async queryByRegister(enterpriseId) {
      const result = await RegisterService.queryByRegister(enterpriseId)
      this.registerName = result.registerTitle
      this.qrcodeImg = result.qrCode
      let _userRegistInfo = {
        distributorId: result.defaultDistributorId,
        distributorName: result.defaultDistributorName,
        institutionId: result.defaultInstitutionId,
        institutionName: result.defaultInstitutionName
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    },
    async queryRegisterRecommendInfo() {
      const result = await RegisterService.queryRegisterRecommendInfo(this.enterpriseId, this.registerType, this.parentUserId)
      this.referLogo = result.logo
      this.referName = result.name
    },
    async register() {
      // let vo = {
      //   mobile: this.mobile,
      //   code: this.code,
      //   agentName: this.name,
      //   registerType: this.registerType,
      //   enterpriseId: this.enterpriseId,
      //   majorRegion: this.userRegistInfo.majorRegion,
      //   parentUserId: this.parentUserId,
      //   distributorId: this.userRegistInfo.distributorId,
      //   institutionId: this.userRegistInfo.institutionId,
      //   majorRegion: this.registerType === '30' || this.registerType === 'undefined' ? this.userRegistInfo.majorRegion : '',
      //   parentUserId: this.registerType === '10' || this.registerType === '20' ? this.parentUserId : '',
      //   distributorId: this.registerType === '30' || this.registerType === 'undefined' ? this.userRegistInfo.distributorId : '',
      //   institutionId: this.registerType === '30' || this.registerType === 'undefined' ? this.userRegistInfo.institutionId: ''
      // }
      let vo = {
        activityId: this.activityId,
        agentName: this.name,
        code: this.code,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        majorRegion: this.userRegistInfo.majorRegion,
        parentUserId: this.parentUserId,
        belong: this.belong,
        belongGroup: this.belongGroup,
        distributorId: this.userRegistInfo.distributorId,
        institutionId: this.userRegistInfo.institutionId,
        linkerId: this.linkerId,
        mobile: this.mobile,
        oldParentUserId: this.enterpriseId,
        registerType: this.registerType
      }
      const result = await RegisterService.register(vo)
      console.log(result)
      if (result.returnCode == 21103 || result.returnCode == 21105) {
        this.clickDisabled = false
        this.registSuccess = false
        this.$toast(result.msg)
      } else {
        if(this.isUnbindUser && result.isFollowQrCode) {
          window.location.href = window.location.href.split('#')[0] + `?cropId=${result.corpId}`
        } else {
          this.clickDisabled = true
          this.registSuccess = true
          if (this.registerType === '40' || this.registerType === '50') {
            this.$toast('已免费开通，请到我的楼盘中查看')
          }
        }
        
        // if (result.isFollowQrCode) {
        //   this.$router.push('/dynamics')
        // }
        // let params = {
        //   enterpriseId: this.enterpriseId
        // }
        // this.$router.push({ path: '/register/step2', query: params })
      }
    },
    focusHandler(val, $event) {
      let className = val.currentTarget.className
      var body = document.querySelector('.' + className)
      if (body.scrollHeight) {
        body.scrollTop = body.scrollHeight
      }
    },
    blurHandler(val, $event) {
      window.scroll(0, 0)
      let _userRegistInfo = {
        registerMobile: this.mobile,
        registerCode: this.code,
        name: this.name,
        disabled: this.disabled,
        registDisabled: this.registDisabled
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    },
    inputHandler() {
      if (this.mobile.length == 11) {
        this.disabled = this.codeTime === 60 ? false : true
      } else {
        this.disabled = true
      }
      if (this.mobile.length == 11 && this.code.length > 0 && this.name.length > 0) {
        this.registDisabled = false
      } else {
        this.registDisabled = true
      }
    },
    /**
     * 发送验证码
     */
    sendCodeHandler() {
      if (this.disabled == false) {
        this.disabled = !this.disabled
        const result = RegisterService.sendMsgRegister(this.mobile)
        this.countDown()
      }
    },
    countDown() {
      this.sendCodeText = '重新发送(' + this.codeTime + 's)'
      let timer = setInterval(() => {
        this.codeTime--
        this.sendCodeText = '重新发送(' + this.codeTime + 's)'
        if (this.codeTime < 0) {
          clearInterval(timer)
          this.sendCodeText = '重新发送'
          this.codeTime = 60
          this.disabled = false
        }
      }, 1000)
    },
    nextHandler() {
      if (this.registDisabled) return

      if (this.mobile.length == 0) {
        return this.$toast('请输入微信绑定手机号')
      }
      if (this.code.length == 0) {
        return this.$toast('请输入验证码')
      }
      if (!checkStrLength(this.name, 16)) {
        return this.$toast('昵称最多8个汉字(或16个字符)')
      }
      if (!checkStrType(this.name)) {
        return this.$toast('昵称只支持中文、英文和数字')
      }
      if ((this.registerType == 30 || this.registerType == 40) && !this.userRegistInfo.majorRegion) {
        if(!this.isUnbindUser) return this.$toast('请选择主营区域')
      }
      if (this.clickDisabled) {
        return
      }
      this.clickDisabled = true
      this.register()
    }
    
  }
}
</script>
<style lang="less">
.register-page {
  .top-container {
    position: relative;
    width: 100%;
    height: 600px;
    padding-left: 26px;
    padding-right: 26px;
    padding-top: 50px;
    .top-right {
      position: absolute;
      width: 56px;
      height: 266px;
      top: 20px;
      right: 0;
    }
    .top-title {
      color: #fff;
      font-size: 40px;
      height: 40px;
      line-height: 46px;
      // font-family: 'FZY4JW--GB1-0';
      margin-bottom: 10px;
    }
    .top-text {
      color: #fff;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
    .top-desc {
      margin-top: 6px;
    }
    .top-form-container {
      width: 324px;
      min-height: 260px;
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      margin-top: 24px;
      .phone-input,
      .code-input,
      .name-input {
        color: #445166;
        font-size: 16px;
        width: 90%;
        height: 44px;
        padding-left: 10px;
        border: none;
        background-color: transparent;
      }
      .phone-input::-webkit-input-placeholder,
      .code-input::-webkit-input-placeholder,
      .name-input::-webkit-input-placeholder {
        color: #969ea8;
        font-size: 16px;
      }
      .phone-input:-moz-placeholder,
      .code-input:-moz-placeholder,
      .name-input:-moz-placeholder {
        color: #969ea8;
        font-size: 16px;
      }
      .phone-input:-ms-input-placeholder,
      .code-input:-ms-input-placeholder,
      .name-input:-ms-input-placeholder {
        color: #969ea8;
        font-size: 16px;
      }

      > .top-invite-info {
        display: flex;
        align-items: center;
        > .invite-head {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 8px;
        }
        > .invite-name {
          color: #666;
          font-size: 14px;
          font-weight: bold;
          // width: 70px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
        > .invite-desc {
          color: #666;
          font-size: 14px;
        }
      }
      .channel-register{
        font-size: 14px;
        b{
          margin-right: 5px;
        }
      }
      > .top-phone-cell,
      > .top-name-cell {
        width: 100%;
        height: 44px;
        line-height: 20px;
        border: 1px solid rgba(150, 158, 168, 0.2);
        box-shadow: 0px 2px 4px 0px rgba(150, 158, 168, 0.15);
        margin-top: 20px;
        margin-bottom: 20px;
      }
      > .top-code-cell {
        position: relative;
        > .top-code-wrap {
          width: 174px;
          height: 44px;
          line-height: 20px;
          border: 1px solid rgba(150, 158, 168, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(150, 158, 168, 0.15);
        }
        > .top-send-btn {
          margin-left: 10px;
          background-color: #007ae6;
          width: 100px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          position: absolute;
          top: 0;
          right: 0;
          &.disabled {
            opacity: 0.5;
            background-color: #b6c0cc;
          }
        }
      }
      .user-city{
        font-size: 14px;
        display: flex;
        align-items: center;
        .title{
          width: 80px;
        }
        .value{
          flex: 1;
          text-align: right;
          vertical-align: middle;
          font-size: 14px;
          color: #445166;
          i{
            vertical-align: middle;
          }
          &.disable{
            color: #B8BFCC;
          }
        }
      }
    }

    .reg-btn {
      // position: absolute;
      width: 324px;
      height: 45px;
      border-radius: 8px;
      border: 0;
      color: #AC2A01;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
      // top: 482px;
      // left: 50%;
      // transform: translate(-50%, -50%);
      margin-top: 29px;
      background-color: #FEB757;
      font-weight: bold;
      &.registDisabled {
        opacity: 0.5;
        color: #fff;
        border: 1px solid #fff;
        background-color: transparent;
      }
    }
    .top-protocol {
      color: #fff;
      font-size: 12px;
      // position: absolute;
      // top: 514px;
      // left: 26px;
      margin-top: 8px;
    }
  }

  .qrcode-content {
    width: 324px;
    height: 324px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    margin-top: 24px;
    > .register-qrcode {
    margin-top: 50px;
    width: 200px;
    height: 200px;
    }
    > .register-desc {
    height: 24px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  }

  .info-container {
    padding-top: 30px;
    text-align: center;
    > h5 {
      line-height: 1;
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: -20px;
      padding-left: 10px;
    }
    .bottom-line {
      display: inline-block;
      width: 40px;
      height: 3px;
      background: rgba(0, 122, 230, 1);
      border-radius: 2px;
      margin-top: 25px;
    }
    .items-container {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        width: 40%;
        margin-bottom: 30px;
        line-height: 1;
        > div {
          display: inline-block;
          width: 48px;
          height: 48px;
        }
        > h5 {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 3px;
        }
        > p {
          width: 80%;
          margin: 0 10%;
          font-size: 12px;
          line-height: 1.3;
          font-weight: 400;
          color: rgba(102, 102, 102, 0.85);
        }
      }
    }
  }
}
</style>
