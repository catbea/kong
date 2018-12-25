<template>
  <div class="member-privilege-page">
    <p class="VIPprivilege">VIP会员特权</p>
    <ul>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+marketImg+')'}"></div>
        <div class="market-describe">
          <p>楼盘免费</p>
          <p>全楼盘免费开通</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+welfareImg+')'}"></div>
        <div class="market-describe">
          <p>专属福利</p>
          <p>不定期豪礼赠送</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+exaltedImg+')'}"></div>
        <div class="market-describe">
          <p>尊贵标识</p>
          <p>VIP尊贵标识</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+serviceImg+')'}"></div>
        <div class="market-describe">
          <p>专属客服</p>
          <p>VIP专属客服通道</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    marketImg: require('IMG/myMember/icon1@2x.png'),
    welfareImg: require('IMG/myMember/welfare1@2x.png'),
    exaltedImg: require('IMG/myMember/Oval 4 Copy.png'),
    serviceImg: require('IMG/myMember/Oval 4 Copy 3@2x.png')
  })
}
</script>
<style lang="less">
.member-privilege-page {
  padding: 16px 0 0 16px;
  // height:163px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  margin: 10px 0 18px 0;
  .VIPprivilege {
    margin-bottom: 14px;
    font-size: 20px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 343px;
    li {
      display: flex;
      margin-bottom: 17px;
      .market-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .market-describe {
        p:nth-child(1) {
          font-size: 15px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        p:nth-child(2) {
          width: 103px;
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
  }
}
</style>
