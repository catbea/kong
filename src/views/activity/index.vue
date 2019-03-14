<template>
    <div class="activity-page">
      <div class="bg_img activity-wave" :style="{backgroundImage:'url(' + waveImg + ')'}"></div>
      <div class="activity-container">
        <div class="bg_img activity-logo" :style="{backgroundImage:'url(' + logoImg + ')'}"></div>
        <p class="activity-top">全景看房 - AI拓客 - 裂变传播 - 监控意向</p>
        <p class="activity-title">惠湾联盟试运营</p>
        <p class="activity-time">活动时间：2019年3月18日—2019年3月31日</p>
        <div class="activity-content" v-if="true">
          
        </div>
        <!-- <no-start class="activity-no-start"></no-start> -->
        <!-- <ended class="activity-ended"></ended> -->
      </div>
    </div>
</template>


<script>
import NoStart from 'COMP/Activity/NoStart'
import Ended from 'COMP/Activity/Ended'
export default {
  components: {
    NoStart,
    Ended
  },
  data: () => ({
    waveImg: require('IMG/activity/bg_wave.png'),
    logoImg: require('IMG/activity/activity_logo.png')
  }),
  created() {
    // this.$toast.fail({
    //   duration: 0,
    //   forbidClick: true,
    //   mask: true,
    //   message: '手机号码已经领取奖励请勿重复参加'
    // })
  }
}
</script>


<style lang="less" scoped>
.activity-page {
  width: 100%;
  height: 604px;
  background: linear-gradient(180deg,rgba(255,145,0,1) 0%,rgba(254,91,1,1) 38%,rgba(255,62,0,1) 73%,rgba(250,115,2,1) 100%);
  position: relative;
}
.activity-wave {
  width: 100%;
  height: 54px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.activity-container {
  text-align: center;
  > .activity-logo {
    width: 132px;
    height: 19px;
    margin: 0 auto;
    margin-top: 21px;
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

  > .activity-no-start, .activity-ended {
    margin: 0 auto;
    margin-top: 177px;
  }
}
</style>
