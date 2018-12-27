<template>
  <div class="all-else-market-box">
    <van-swipe :touchable="true" :width="172" :loop="false" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in linkerOtherList" :key="index" @click.native="itemClickHandler(item.linkerId)">
      <ul class="else-market-box">
        <li class="else-market-box-img bg_img" :style="{backgroundImage:'url('+item.headImgUrl+')'}">

        </li>
        <li class="else-market-box-top">{{item.linkerName}}</li>
        <li class="else-market-box-bottom">{{item.district}}</li>
      </ul>
       </van-swipe-item>
  </van-swipe>
    </div>
</template>
<script>
export default {
  props: {
    linkerOtherList: { type: Array }
  },
  data: () => ({
    // list: [1, 2, 3, 4]
  }),
  methods: {
    itemClickHandler(val) {
      this.$emit('itemClick', val)
    }
  }
}
</script>
<style lang="less">
.all-else-market-box {
  .else-market-box {
    width: 160px;
    margin: 0 12px 3px 0;
    .else-market-box-img {
      width: 160px;
      height: 90px;
      margin-bottom: 3px;
      border-radius: 4px;
    }
    .else-market-box-top {
      font-size: 16px;
      
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-top: 8px;
    }
    .else-market-box-bottom {
      font-size: 12px;
      
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 8px;
    }
  }
}
</style>
