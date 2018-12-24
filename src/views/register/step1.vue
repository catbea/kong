<template>
  <div class="register-step1-page">
    <reg-step :step="1"></reg-step>
    <div class="van-hairline--top reg-container">
      <h5 class="title">请注册并完善资料</h5>
      <p class="desc">请仔细填写信息，一旦提交，无法更改</p>
      <div class="from-container">
        <div class="phone-cell">
          <div class="phone-tip" v-if="phoneFocus">请使用当前微信绑定号码进行注册</div>
          <material-input placeholder="请输入手机号" :type="'number'" :maxlength="11" v-model="mobile" @focus="focusHandler" @blur="blurHandler" @input="inputHandler"></material-input>
        </div>
        <div class="code-cell">
          <material-input placeholder="请输入验证码" :type="'number'" :maxlength="6" v-model="code" @blur="blurHandler"></material-input>
          <div class="send-btn" :class="disabled&&'disabled'" @click="sendCodeHandler">{{sendCodeText}}</div>
        </div>
        <div class="van-hairline--bottom form-cell" @click="popAreaHandler">
          <p class="title">主营区域</p>
          <p class="value">{{userRegistInfo.majorRegion}}
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="van-hairline--bottom form-cell" @click="seachCompanyHandler">
          <p class="title">所属公司</p>
          <p class="value">{{userRegistInfo.distributorName}}
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="van-hairline--bottom form-cell" @click="selectInstitutionHandler">
          <p class="title">所属机构</p>
          <p class="value">{{userRegistInfo.institutionName}}
            <van-icon name="arrow" />
          </p>
        </div>
      </div>
      <div class="next-step" @click="nextHandler">下一步</div>
      <p class="protocol">注册代表您同意 <router-link to="/register/agreement?name=AW大师">AW大师用户协议</router-link>
      </p>
    </div>
    <area-select :show.sync="areaShow" :code.sync="areaCode" :title="areaTitle" @cancel="cancelHandler" @confirm="confirmHandler"></area-select>
  </div>
</template>
<script>
import RegStep from 'COMP/Register/RegStep'
import MaterialInput from 'COMP/MaterialInput'
import AreaSelect from 'COMP/AreaSelect'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import RegisterService from 'SERVICE/registService'
export default {
  components: {
    RegStep,
    MaterialInput,
    AreaSelect
  },
  data: () => ({
    query: null,
    mobile: '',
    code: '',
    sendCodeText: '获取验证码',
    codeTime: 60,
    disabled: true,
    phoneFocus: false,
    areaShow: false,
    areaTitle: '请选择区域',
    areaCode: '440305',
    registerType: '',
    enterpriseId: '',
    majorRegion: '',
    city: '',
    area: ''
  }),
  created() {
    this.query = this.$route.query
    this.registerType = this.query.registerType
    this.enterpriseId = this.query.enterpriseId
    // registerType 10：经纪人推荐注册，20：分销商推荐注册,30:普通注册 （搜一搜跳转注册，公众号跳转注册，用户端小程序切换注册）
    this.majorRegion = this.userRegistInfo.majorRegion
    this.city = this.userRegistInfo.city
    this.area = this.userRegistInfo.area
    this.mobile = this.userRegistInfo.registerMobile
    this.code = this.userRegistInfo.registerCode
  },
  computed: {
    ...mapGetters(['userRegistInfo'])
  },
  methods: {
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
    inputHandler() {
      if (this.mobile.length == 11) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    focusHandler(focus) {
      this.phoneFocus = focus
    },
    blurHandler(focus) {
      this.phoneFocus = focus
      let _userRegistInfo = {
        registerMobile: this.mobile,
        registerCode: this.code
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    },
    /**
     * 弹出主营区域选择框
     */
    popAreaHandler() {
      this.areaShow = !this.areaShow
    },
    /**
     * 搜索公司
     */
    seachCompanyHandler() {
      let params = {
        enterpriseId: this.enterpriseId,
        city: this.city,
        area: this.area
      }
      this.$router.push({ path: '/register/searchCompany', query: params })
    },
    /**
     * 选择机构
     */
    selectInstitutionHandler() {
      let params = {
        enterpriseId: this.enterpriseId,
        distributorId: this.userRegistInfo.distributorId
      }
      this.$router.push({ path: '/user/edit/userMechanism', query: params })
    },
    nextHandler() {
      // let params = {
      //   enterpriseId: this.enterpriseId
      // }
      // this.$router.push({ path: '/register/step2', query: params })
      this.register()
    },
    async register() {
      let vo = {
        mobile: this.mobile,
        code: this.code,
        registerType: this.registerType,
        enterpriseId: this.enterpriseId,
        majorRegion: this.majorRegion,
        distributorId: this.userRegistInfo.distributorId,
        institutionId: this.userRegistInfo.institutionId
      }
      const result = await RegisterService.register(vo)
      if (JSON.stringify(result) != '{}') {
        let params = {
          enterpriseId: this.enterpriseId
        }
        this.$router.push({ path: '/register/step2', query: params })
        // location.href = '/?cropId=ww8f6801ba5fd2a112'
      }
    },
    cancelHandler(val) {
      this.areaShow = false
    },
    confirmHandler(val) {
      this.areaShow = false
      this.majorRegion = val[0].name + '/' + val[1].name + '/' + val[2].name
      this.city = val[1].name
      this.area = val[2].name
      let _userRegistInfo = {
        majorRegion: this.majorRegion,
        city: this.city,
        area: this.area
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
    }
  }
}
</script>
<style lang="less">
.material-input__component {
  margin-top: 0;
}
.register-step1-page {
  .reg-container {
    margin: 30px 15px 0;
    text-align: center;
    > .title {
      padding-top: 30px;
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 3px;
    }
    > .desc {
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    > .from-container {
      margin: 45px 15px 15px;
      .phone-cell {
        margin: 30px 15px 16px 15px;
        > .phone-tip {
          color: #969ea8;
          font-size: 12px;
          text-align: left;
          margin-left: 5px;
        }
      }
      .code-cell {
        position: relative;
        margin: 10px 15px;
        > .send-btn {
          position: absolute;
          width: 105px;
          height: 32px;
          background: rgba(0, 122, 230, 1);
          border-radius: 16px;
          font-size: 15px;
          font-weight: 400;
          line-height: 32px;
          right: -20%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255, 255, 255, 1);
          &.disabled {
            opacity: 0.5;
          }
        }
      }
      .form-cell {
        display: flex;
        margin: 35px 15px;
        justify-content: space-between;
        > .title {
          padding-left: 5px;
          font-size: 16px;
          font-weight: 600;
          color: #333333;
        }
        > .value {
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          vertical-align: middle;
        }
      }
    }
    > .next-step {
      width: 100%;
      background: #007ae6;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      padding: 10px 0;
    }
    > .protocol {
      margin: 10px;
      font-size: 12px;
      color: #666666;
      > a {
        color: #448ee3;
      }
    }
  }
}
</style>
