<template>
  <div class="Privilege-describe-page-pt">
    <p class="privilege">特权说明</p>
    <ol>
      <li>
        <div class="market-iconA bg_img" :style="{backgroundImage:'url('+marketImg+')'}"></div>
        <div class="market-describe">
          <p>楼盘任选：</p>
          <p>用户可以在套餐时间内，随时在全部可开通楼盘内任选十个楼盘进行开通</p>
        </div>
      </li>
      <li>
        <div class="market-icon bg_img" :style="{backgroundImage:'url('+welfareImg+')'}"></div>
        <div class="market-describe">
          <p>优享体验</p>
          <p>套餐从成功购买时间开始结算，套餐时间限制为一个月。使用套餐选盘只能在套餐下的选盘入口进入。开通后增加的开通时间以套餐的剩余时间结算；如开通已开通楼盘，会在现有开通时间基础上延长套餐的剩余时间</p>
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
.Privilege-describe-page-pt {
  padding: 16px 0 24px 16px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  .privilege {
    margin-bottom: 14px;
    font-size: 20px;
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
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        p:nth-child(2) {
          width: 308px;
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
