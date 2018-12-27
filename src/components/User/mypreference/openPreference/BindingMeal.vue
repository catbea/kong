<template>
  <div class="binding-meal-page">
    <div class="binding-meal-page-content">
    <div class="binding-meal-page-left">
      <span class="icon-already bg_img" :style="{backgroundImage:'url('+alreadyImg+')'}"></span>
      <div class="left-num">
        <p>楼盘捆绑套餐</p>
        <p>购买套餐可任选{{itemInfo.limitTotal}}个楼盘，优享{{itemInfo.timeNum}}个{{itemInfo.timeUnit===0 ? '天' : itemInfo.timeUnit===1 ? '月' : '年'}}免费代理服务</p>
      </div>
    </div>
    <div class="binding-meal-page-right">
      <i>¥</i>
      <i>{{itemInfo.price | priceFormart}}</i>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      default: function() {
        return {
          price: 0,
          timeNum: 0,
          limitTotal: 0,
          timeUnit: 0
        }
      }
    }
  },
  data: () => ({
    alreadyImg: require('IMG/user/alreadyBuy/icon@2x.png')
  })
}
</script>
<style lang="less">
.binding-meal-page {
  // margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  .binding-meal-page-content {
    width: 343px;
    height: 120px;
    background: rgba(192, 152, 106, 1);
    box-shadow: 0px 4px 2px 0px rgba(149, 155, 182, 0.2);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .binding-meal-page-left {
      display: flex;
      .left-num {
        p:nth-child(1) {
          width: 170px;
          font-size: 16px;
          
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        p:nth-child(2) {
          width: 170px;
          margin-top: 6px;
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
        }
      }
      .icon-already {
        width: 44px;
        height: 44px;
        margin: 0 12px 0 16px;
      }
    }
    .binding-meal-page-right {
      margin-right: 17px;
      i:nth-child(1) {
        font-style: normal;
        font-size: 11px;
        color: rgba(255, 255, 255, 1);
        line-height: 15px;
      }
      i:nth-child(2) {
        font-style: normal;
        font-size: 28px;
        
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
    }
  }
}
</style>
