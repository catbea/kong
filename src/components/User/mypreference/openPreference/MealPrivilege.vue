<template>
  <div class="meal-privilege-page">
    <p class="privilege">套餐特权</p>
    <ul>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+marketImg+')'}"></div>
        <div class="market-describe">
          <p>楼盘任选</p>
          <p>全楼盘随心选10个</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+enjoyImg+')'}"></div>
        <div class="market-describe">
          <p>优享体验</p>
          <p>1个月免费代理服务</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    marketImg: require('IMG/user/alreadyBuy/i1@2x.png'),
    enjoyImg: require('IMG/user/alreadyBuy/xx@2x.png')
  })
}
</script>
<style lang="less">
.meal-privilege-page {
  padding: 16px 0 0 16px;
  width: 359px;
  background: rgba(255, 255, 255, 1);
  margin: 10px 0 18px 0;
  .privilege {
    margin-bottom: 14px;
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
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        p:nth-child(2) {
          margin-top: 3px;
          width: 104px;
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
