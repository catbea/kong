<template>
  <div class="discover-page">
    <automatic-swipes></automatic-swipes>
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="热门">
           <div class="tab-container-heigt"><discover-list></discover-list></div>
        </van-tab>
        <van-tab title="房产"></van-tab>
        <van-tab title="攻略"></van-tab>
        <van-tab title="政策"></van-tab>
        <van-tab title="娱乐"></van-tab>
      </van-tabs>
    </div>
   
  </div>
</template>
<script>
import AutomaticSwipes from 'COMP/Swipe/AutomaticSwipes'
import discoverList from 'COMP/Discover/discoverList'

export default {
  components: {
    AutomaticSwipes,
    discoverList
  }
}
</script>
<style lang="less">
.discover-page {
  width: 100%;
  > .tab-container {
    margin-top: 20px;
    margin-bottom: 20px;
    .tab-container-heigt {
      margin-top: 25px;
    }
  }
}
[class*='van-hairline']::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  pointer-events: none;
  /* box-sizing: border-box; */
  border-top: 0 solid #eee;
}
</style>
