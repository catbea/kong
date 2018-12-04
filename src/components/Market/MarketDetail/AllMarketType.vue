<template>
  <div class="all-market-type-box">
    <van-swipe :touchable="true" :width="172" :loop="false" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in houseList" :key="index">
        <ol class="market-type-box"  @click="skipMarketFamilyList()">
          <li class="market-type-img bg_img" :style="{backgroundImage:'url('+item.houseTypeImgUrl+')'}">
          </li>
          <li class="market-type-box-top">{{item.householdDesc}}</li>
          <li class="market-type-box-middle">建面 {{item.area}} {{item.orientations}}</li>
          <li class="market-type-box-bottom">{{item.price}}</li>
        </ol>
      </van-swipe-item>
  </van-swipe>
     
    </div>
</template>
<script>
export default {
  props: {
    houseList: { type: Object },
  },
  data: () => ({
    list: [1, 2, 3, 4]
  }),
  methods:{
    skipMarketFamilyList(){
    this.$router.push('/marketDetail/FamilyList')
  }
  }
}
</script>
<style lang="less">
.all-market-type-box {
  .market-type-box {
    width: 160px;
    margin-right: 12px;
    .market-type-img {
      width: 160px;
      height: 120px;
      margin-bottom: 4px;
      border-radius:4px;
    }
    .market-type-box-top {
      height: 18px;
      font-size: 16px;
      font-weight: 500;
      font-family: PingFangSC-Medium;
      color: rgba(51, 51, 51, 1);
      margin-top: 7px;
    }
    .market-type-box-middle {
      height: 14px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 7px;
    }
    .market-type-box-bottom {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 7px;
    }
  }
}
</style>
