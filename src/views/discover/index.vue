<template>
  <div class="discover-page">

    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
<<<<<<< HEAD
        <van-tab title="热门" />
        <van-tab title="房产" />
        <van-tab title="攻略" />
        <van-tab title="政策" />
        <van-tab title="娱乐" />
=======
        <van-tab title="热门"/>
        <van-tab title="房产"></van-tab>
        <van-tab title="攻略"></van-tab>
        <van-tab title="政策"></van-tab>
        <van-tab title="娱乐"></van-tab>
>>>>>>> 037ec04d10b9d197f44e86fa4872d51efec1ba53
      </van-tabs>
        <div class="tab-container-heigt"><discover-list></discover-list></div>
    </div>
    <automatic-swipes></automatic-swipes>
    <discover-list></discover-list>
  </div>
</template>
<script>
import AutomaticSwipes from 'COMP/Swipe/AutomaticSwipes'
import discoverList from 'COMP/Discover/discoverList'
import discoverService from 'SERVICE/discoverService'
export default {
  components: {
    AutomaticSwipes,
    discoverList
  },
  data: () => ({
<<<<<<< HEAD

  }),
  created () {
    this.getBaseInfo()
  },
  methods:{
    async getBaseInfo(){
      
    }
  }
=======
    activeIndex:0
  })
>>>>>>> 037ec04d10b9d197f44e86fa4872d51efec1ba53
}
</script>
<style lang="less">
.discover-page {
  background: #ffffff;
  width: 100%;
  > .tab-container {
    .van-tab--active {
      > span {
        font-size: 28px;
        font-weight: bolder;
      }
    }
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
  border-top: 0 solid #eee;
}
</style>
