<template>
    <div class="activity-page">
      <div class="activity-page-top">
        <div class="bg_img activity-wave" :style="{backgroundImage:'url(' + waveImg + ')'}"></div>
        <div class="activity-container">
        <div class="bg_img activity-logo" :style="{backgroundImage:'url(' + logoImg + ')'}"></div>
        <p class="activity-top">全景看房 - AI拓客 - 裂变传播 - 监控意向</p>
        <p class="activity-title">惠湾联盟试运营</p>
        <p class="activity-time">活动时间：2019年3月18日—2019年3月31日</p>
        <div class="activity-content">
          <div class="form-container">
            <div class="bg_img icon-girl" :style="{backgroundImage:'url(' + girlIconImg + ')'}"></div>
            <div class="bg_img activity-content-top" :style="{backgroundImage:'url(' + topIconImg + ')'}"></div>
            <div class="phone-cell">
              <!-- <div class="phone-tip" v-if="phoneFocus">请使用当前微信绑定号码进行注册</div> -->
              <input class="phone-input" placeholder="请使用当前微信绑定手机号" type="number" :maxlength="11" v-model="mobile" @focus="focusHandler" @blur="blurHandler" @input="inputHandler"></input>
              <div class="mobile-input-line"></div>
            </div>
            <div class="code-cell">
              <div class="code-wrap">
                <input class="code-input" placeholder="请输入验证码" type="number" :maxlength="6" v-model="code" @blur="blurHandler"></input>
                <div class="code-input-line"></div>
              </div>
              <div class="send-btn" :class="disabled&&'disabled'" @click="sendCodeHandler">{{sendCodeText}}</div>
            </div>
            <div class="bg_img form-bottom" :style="{backgroundImage:'url(' + btnBgImg + ')'}" @click="nextHandler">
              <div class="form-click-title">立即领取</div>
            </div>
            
            <div class="form-tip">填写信息参与活动领大奖</div>
          </div>
          <div class="activity-tip">*仅惠湾联盟下经纪人可参与</div>
        </div>
        <!-- 活动未开始 -->
        <!-- <no-start class="activity-no-start"></no-start> -->
        <!-- 活动结束 -->
        <!-- <ended class="activity-ended"></ended> -->

      </div>
      </div>
      <div class="activity-page-bottom" v-if="true">
        <!-- 楼盘列表 -->
          <div class="project-wrap">
            <div class="project-title">以下楼盘免费开通至3月31日</div>
            <div class="project-list">
              <build-card v-for="(item ,index) in buildList" :key="index" :data="item"></build-card>
            </div>
          </div>
      </div>
    </div>
</template>


<script>
import MaterialInput from 'COMP/MaterialInput'
import NoStart from 'COMP/Activity/NoStart'
import Ended from 'COMP/Activity/Ended'
import BuildCard from 'COMP/Activity/BuildCard'
export default {
  components: {
    MaterialInput,
    NoStart,
    Ended,
    BuildCard
  },
  data: () => ({
    waveImg: require('IMG/activity/bg_wave.png'),
    logoImg: require('IMG/activity/activity_logo.png'),
    girlIconImg: require('IMG/activity/activity_girl.png'),
    topIconImg: require('IMG/activity/activity_top.png'),
    btnBgImg: require('IMG/activity/activity_bg_btn.png'),
    mobile: '',
    code: '',
    sendCodeText: '获取验证码',
    codeTime: 60,
    disabled: true,
    clickDisabled: false,
    buildList: [
      {
        buidlingNanme: '碧桂园·百禧庄园99',
        price: '3800元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·千禧庄园',
        price: '3900元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·万禧庄园',
        price: '4000元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·亿禧庄园',
        price: '4100元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·兆禧庄园',
        price: '4200元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·兆禧庄园',
        price: '4200元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·兆禧庄园',
        price: '4200元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·兆禧庄园',
        price: '4200元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      },
      {
        buidlingNanme: '碧桂园·兆禧庄园',
        price: '4200元/㎡起',
        buildImg: require('IMG/easyPhoto/middleImg.png')
      }
    ]
  }),
  created() {
    // this.$toast.fail({
    //   duration: 0,
    //   forbidClick: true,
    //   mask: true,
    //   message: '手机号码已经领取奖励请勿重复参加'
    // })
  },
  methods: {
    focusHandler() {},
    blurHandler() {},
    inputHandler() {
      if (this.mobile.length == 11) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    /**
     * 发送验证码
     */
    sendCodeHandler() {
      if (this.disabled == false) {
        this.disabled = !this.disabled
        // const result = RegisterService.sendMsgRegister(this.mobile)
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
      /*
      if (this.mobile.length == 0) {
        return this.$toast('请输入微信绑定手机号')
      }
      if (this.code.length == 0) {
        return this.$toast('请输入验证码')
      }
      if (this.clickDisabled) {
        return
      }
      this.clickDisabled = true
      */   
     this.$router.push({ path: '/huiwan-activity/qrcode', query: {} })
    },
  }
}
</script>


<style lang="less" scoped>
.activity-page {
  > .activity-page-top {
  width: 100%;
  height: 604px;
  background: linear-gradient(180deg,rgba(255,145,0,1) 0%,rgba(254,91,1,1) 38%,rgba(255,62,0,1) 73%,rgba(250,115,2,1) 100%);
  position: relative;
  > .activity-wave {
    width: 100%;
    height: 54px;
    position: absolute;
    bottom: 0;
    left: 0;
    }
  }
}

.activity-page-bottom {
  width: 100%;
  height: 700px;
  background: #FFA200;
  position: relative;
}

.activity-container {
  text-align: center;
  padding-top: 21px;
  > .activity-logo {
    width: 132px;
    height: 19px;
    margin: 0 auto;
    margin-bottom: 26px;
  }
  > .activity-top {
    color: #ffffff;
    font-size: 14px;
    height: 20px;
  }
  > .activity-title {
    color: #ffffff;
    font-size: 44px;
    font-weight: 400;
    height: 62px;
    line-height: 62px;
    text-shadow: 0px 0px 6px rgba(254,52,0,1);
  }
  > .activity-time {
    color: #ffffff;
    font-size: 12px;
    height: 17px;
    margin-top: 8px;
  }

  
}
.activity-no-start, .activity-ended {
    margin: 0 auto;
    margin-top: 10px;
  }

.activity-content {
  margin-top: 10px;
  text-align: center;
  > .form-container {
    width: 310px;
    height: 291px;
    background: linear-gradient(180deg, rgba(253, 245, 225, 1) 0%, rgba(253, 245, 225, 1) 100%);
    box-shadow: 0px 0px 6px 0px rgba(253, 83, 1, 0.75);
    border-radius: 8px;
    margin: 0 auto;
    padding-top: 26px;
    position: relative;
    .phone-input, .code-input {
      border: 0;
      background-color: transparent;
      padding-bottom: 8px;
      color: #EB5D2A;
      // font-size: 16px;
    }
    .phone-input::-webkit-input-placeholder, .code-input::-webkit-input-placeholder {
      color: #F67931;
      font-size: 16px;
    }
    .phone-input:-moz-placeholder, .code-input::-webkit-input-placeholder {
      color: #F67931;
      font-size: 16px;
    }
    .phone-input:-ms-input-placeholder, .code-input::-webkit-input-placeholder {
      color: #F67931;
      font-size: 16px;
    }
    // margin-top: 20px;
    > .icon-girl {
    position: absolute;
    width: 30px;
    height: 71px;
    left: 12px;
    top: -36px;
    }
  > .activity-content-top {
    width: 172px;
    height: 26px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
    
    .mobile-input-line {
      margin: 0 auto;
      width: 270px;
      height: 1px;
      background-color: #F67931;
    }
    .code-input-line {
      width: 100%;
      height: 1px;
      background-color: #F67931;
    }

    > .phone-cell {
        margin: 20px 15px;
        
      }
    > .code-cell {
        position: relative;
        margin: 10px 15px;
        > .code-wrap {
          width: 140px;
          margin-left: 4px;
          > .code-input {
            width: 100%;
            padding-left: 10px;
          }
        }
        
        > .send-btn {
          position: absolute;
          width: 120px;
          height: 32px;
          // background: #F79A60;
          border: 1px solid rgba(247,154,96,1);
          border-radius: 16px;
          font-size: 15px;
          font-weight: 400;
          line-height: 32px;
          right: -19%;
          top: 60%;
          transform: translate(-50%, -50%);
          color: rgba(246,121,49,1);
          &.disabled {
            opacity: 0.5;
          }
        }
      }
      > .form-bottom {
        width: 280px;
        height: 60px;
        margin: 0 auto;
        margin-top: 30px;
        > .form-click-title {
        color: #ffffff;
        font-size: 15px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 220px;
        }
      }
      
      > .form-tip {
        color: #F98731;
        font-size: 12px;
      }
  }
  > .activity-tip {
    color: #FF9100;
    font-size: 12px;
    margin-top: 10px;
  }
}
.project-wrap {
    width: 310px;
    height: 748px;
    overflow-y: scroll;
    background: linear-gradient(137deg,rgba(255,170,45,1) 0%,rgba(255,113,20,1) 100%);
    border-radius: 8px;
    // margin-top: 10px;
    padding: 25px 8px 0 0;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 285px;
    text-align: center;
    > .project-title {
      color: #ffffff;
      font-size: 16px;
      margin-bottom: 25px;
    }
    > .project-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
