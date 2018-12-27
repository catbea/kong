<template>
  <div class="manual-swipes-container">
    
    <div class="manual-swipes">
      <van-swipe :touchable="true" :width="200" :loop="false" :show-indicators="false">
        <van-swipe-item> <img :src="backIcon" class="headline-title-img">
          <div class="manual-swipes-introduce">
            <p class="introduce-name">凯德公园1号</p>
            <p class="introduce-address">深圳-南山</p>
            <p class="introduce-price">120000元/㎡起</p>
          </div>
        </van-swipe-item>
        <van-swipe-item> <img :src="backIcon" class="headline-title-img"></van-swipe-item>
        <van-swipe-item> <img :src="backIcon" class="headline-title-img"></van-swipe-item>
        <van-swipe-item> <img :src="backIcon" class="headline-title-img"></van-swipe-item>

      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png')
    }
  }
}
</script>
<style lang="less">
.manual-swipes-container {
  background: #ffffff;
  // margin: 0 16px;
  > .manual-swipes {
    width: 342px;
    .headline-title-img {
      width: 166px;
      height: 93px;
      border-radius: 4px;
      margin-right: 12px;
    }
    .manual-swipes-introduce {
      margin-bottom: 19px;

      > .introduce-name {
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      > .introduce-address {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
      }
      > .introduce-price {
        font-size: 15px;
        font-weight: 500;
        color: rgba(234, 77, 46, 1);
        line-height: 15px;
      }
    }
  }
}
</style>
