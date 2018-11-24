<template>
  <div class="discover-Broadcast">
   <swipe :autoplay="3000">
    <swipe-item v-for="(image, index) in images" :key="index" class="Broadcast-img">
      <img v-lazy="image" class="imgs" :src="image"/>
    </swipe-item>
  </swipe>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload } from 'vant'
export default {
  components: {
    Swipe,
    SwipeItem,
    Lazyload
  },
  data() {
    return {
      current: 0,
      images: [
        require('IMG/user/usercard@2x.png'),
        require('IMG/user/person_icon.png'),
        require('IMG/user/usercard@2x.png'),
        require('IMG/user/person_icon.png')
      ]
    }
  },
  methods: {},
  mounted: function() {}
}
</script>
<style lang="less">
.van-swipe__indicator--active {
  background-color: #ffffff;
}
.discover-Broadcast {
  height: 206px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 45%,
    rgba(0, 0, 0, 0.3) 100%
  );
  box-shadow: 0px 5px 4px 0px rgba(55, 53, 94, 0.21);
}

.imgs {
  width: 100%;
  height: 206px;
  display: block;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.05) 45%,
    rgba(0, 0, 0, 0.3) 100%
  );
  box-shadow: 0px 5px 4px 0px rgba(55, 53, 94, 0.21);
  // padding: 30px 60px;
  box-sizing: border-box;
  background-color: #fff;
  pointer-events: none;
}
.dynamics-collect {
  .demo-swipe {
    padding-bottom: 30px;
    .van-swipe {
      cursor: pointer;
      &-item {
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 150px;
        &:nth-child(even) {
          background-color: #39a9ed;
        }
        &:nth-child(odd) {
          background-color: #66c6f2;
        }
      }
    }
    &--vertical {
      height: 200px;
      .van-swipe-item {
        line-height: 200px;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
