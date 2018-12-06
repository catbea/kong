<template>
  <div class="register-step1-page">
    <reg-step :step="1"></reg-step>
    <div class="van-hairline--top reg-container">
      <h5 class="title">请注册并完善资料</h5>
      <p class="desc">请仔细填写信息，一旦提交，无法更改</p>
      <div class="from-container">
        <div class="phone-cell">
          <material-input placeholder="请输入手机号" :type="'number'" :maxlength="11" v-model="mobile"></material-input>
          <div class="send-btn" :disabled="disabled" @click="sendCodeHandler">获取验证码</div>
        </div>
        <div class="code-cell">
          <material-input placeholder="请输入验证码"></material-input>
        </div>
        <div class="van-hairline--bottom form-cell" @click="popAreaHandler">
          <p class="title">主营区域</p>
          <p class="value">广东/深圳
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="van-hairline--bottom form-cell" @click="seachCompanyHandler">
          <p class="title">所属公司</p>
          <p class="value">广东/深圳
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="van-hairline--bottom form-cell" @click="selectInstitutionHandler">
          <p class="title">所属机构</p>
          <p class="value">广东/深圳
            <van-icon name="arrow" />
          </p>
        </div>
      </div>
      <div class="next-step" @click="nextHandler">下一步</div>
      <p class="protocol">注册代表您同意 <router-link to="/">AW大师用户协议</router-link>
      </p>
    </div>
    <area-select :show.sync="areaShow" :code.sync="areaCode" @confirm="confirmHandler"></area-select>
  </div>
</template>
<script>
import RegStep from 'COMP/Register/RegStep'
import MaterialInput from 'COMP/MaterialInput'
import AreaSelect from 'COMP/AreaSelect'

import RegisterService from 'SERVICE/registService'
export default {
  components: {
    RegStep,
    MaterialInput,
    AreaSelect
  },
  data: () => ({
    form: {
      phone: '18612341234',
      code: '1234'
    },
    mobile: '',
    disabled: false,
    areaShow: false,
    areaCode: '120104'
  }),
  created () {

  },
  computed: {

  },
  methods: {
    /**
     * 发送验证码
     */
    sendCodeHandler () {
      // const result = RegisterService.sendMsgRegister(this.mobile)
      debugger
      this.disabled = true;
    },
    /**
     * 弹出主营区域选择框
     */
    popAreaHandler () {
      this.areaShow = !this.areaShow
    },
    /**
     * 搜索公司
     */
    seachCompanyHandler () {
      this.$router.push('/register/searchCompany')
    },
    /**
     * 选择机构
     */
    selectInstitutionHandler () {
      this.$router.push('/user/edit/userMechanism')
    },
    nextHandler () {
      this.$router.push('/register/step2')
    },
    confirmHandler(val) {
      console.log(val);
      
    }
  }
}
</script>
<style lang="less">
.register-step1-page {
  .reg-container {
    margin: 30px 15px 0;
    text-align: center;
    > .title {
      padding-top: 30px;
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    > .desc {
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    > .from-container {
      margin: 45px 15px 15px;
      .phone-cell {
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
      .code-cell {
        margin: 10px 15px;
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

