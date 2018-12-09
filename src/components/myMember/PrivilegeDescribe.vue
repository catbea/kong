<template>
  <div class="Privilege-describe-page-vip">
    <p class="VIPprivilege">特权说明</p>
    <ol>
      <li>
        <div class="market-iconA bg_img" :style="{backgroundImage:'url('+marketImg+')'}"></div>
        <div class="market-describe">
          <p>楼盘免费:</p>
          <p>开通VIP后，可批量开通楼盘，开通截止日期为VIP截止日期；如已开通楼盘将在VIP截止日期基础上增加楼盘开通的剩余时间。如拥有VIP在楼盘列表页面点击开通，将会开通该楼盘至VIP截止日期。如已开通楼盘有剩余时间情况下开通VIP并点击续费，将在VIP截止日期的基础上延长相应楼盘的开通剩余时间。</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+welfareImg+')'}"></div>
        <div class="market-describe">
          <p>专属福利</p>
          <p>我们将提供不定期福利性活动，对会员进行优惠及赠送豪礼，详细内容以相应活动规则为准；</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+exaltedImg+')'}"></div>
        <div class="market-describe">
          <p>尊贵标识</p>
          <p>开通VIP后，将为用户带上VIP独有标识，区别于普通用户彰显尊贵身份；</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+serviceImg+')'}"></div>
        <div class="market-describe">
          <p>专属客服</p>
          <p>VIP用户进行问题反馈，我们将开通VIP专有的服务通道，第一时间为VIP用户解决或解答问题；</p>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data: () => ({
    marketImg: require('IMG/myMember/Group 3@2x.png'),
    welfareImg: require('IMG/myMember/welfare@2x.png'),
    exaltedImg: require('IMG/myMember/icon@2x.png'),
    serviceImg: require('IMG/myMember/kef@2x.png')
  })
}
</script>
<style lang="less">
.Privilege-describe-page-vip {
  padding: 16px 0 0 16px;
  width: 359px;
  background: rgba(255, 255, 255, 1);
  .VIPprivilege {
    margin-bottom: 14px;
  }
  ol {
    width: 343px;
    li {
      display: flex;
      margin-bottom: 17px;
      .market-iconA {
        width: 20px;
        height: 17px;
        margin-right: 10px;
      }
      .market-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      .market-describe {
        p:nth-child(1) {
          font-size: 15px;
          font-family: PingFang-SC-Medium;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        p:nth-child(2) {
          width: 308px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
      }
    }
  }
}
</style>
