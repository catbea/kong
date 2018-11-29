<template>
  <div class="already-buy-page">
    <div class="already-buy-page-left">
      <span
        class="icon-already bg_img"
        :style="{backgroundImage:'url('+alreadyImg+')'}"
      ></span>
      <div class="left-num">
        <p>已购套餐1</p>
        <p>将于2018年10月15日到期</p>
      </div>
    </div>
    <div class="already-buy-page-right">
      待选楼盘 (8/10)
      <span
        class="icon-detail bg_img"
        :style="{backgroundImage:'url('+detailImg+')'}"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    alreadyImg: require('IMG/user/alreadyBuy/icontag@2x.png'),
    detailImg: require('IMG/user/alreadyBuy/arrow2@2x.png')
  })
}
</script>
<style lang="less">
.already-buy-page {
  height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:rgba(255,255,255,1);
  .already-buy-page-left{
    display: flex;
    font-size: 1222px;
    margin-left:16px;
    .icon-already {
      width: 44px;
      height: 44px;
    }
    .left-num {
      margin-left: 12px;
      p:nth-child(1) {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin-top:3px;
      }
    }
  }
  .already-buy-page-right {
    display: flex;
    font-size: 12px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    margin-right:16px;
    .icon-detail {
      width: 16px;
      height: 16px;
    }
  }
}
</style>

