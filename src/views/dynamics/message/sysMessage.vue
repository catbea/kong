<template>
  <div class="sysMessage-page">
    <div class="sysMessage-container">
      <div class="sysMessage-time">
        2018/08/07 14:23
      </div>
      <div class="sysMessage-shadowBox">
        <shadow-box>
          <div slot="container">
            <div class="sys-shadowBox">
              <p class="sys-shadowBox-title">系统通知</p>
              <p class="sys-shadowBox-time">我们将于2018/11/7日 7：00 对企业微信进行更新，对您造成的不便敬请谅解</p>
              <p class="sys-shadowBox-remarks">本次主要更新内容有： 1.增加勿扰模式 2.VIP功能优化调整 3.我的楼盘增加关闭展示功能</p>
            </div>
          </div>
        </shadow-box>
      </div>
    </div>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    ShadowBox
  },
}
</script>
<style lang="less">
.sysMessage-page {
  > .sysMessage-container {
    margin: 16px;
    > .sysMessage-time {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(41, 46, 51, 1);
      line-height: 20px;
      margin: 20px 0 12px 0;
    }
    > .sysMessage-shadowBox {
    }
    .sys-shadowBox {
      padding: 16px;
      > .sys-shadowBox-title {
        font-size: 20px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: rgba(41, 46, 51, 1);
        line-height: 30px;
            padding-bottom: 8px;
      }
      > .sys-shadowBox-time {
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        padding-bottom: 18px;
      }
      > .sys-shadowBox-remarks {
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
}
</style>
