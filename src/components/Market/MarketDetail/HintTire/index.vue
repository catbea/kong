<template>
  <div class="hint-tire-page" v-if="!isOne&&!marketFirst">
     <div class="operate-1">
          <div class="operate-share">
            <i class="icon iconfont icon-article_share"></i>
            分享
          </div>
        </div>
    <div class="hint-box">
      <p>快点击这里分享楼盘</p>
      <div class="bg_img line" :style="{backgroundImage:'url('+labelImg+')'}">

      </div>
    </div>
    <div class="know-button" @click="knowHandle">
      知道了
    </div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
export default {
  created() {
    if (this.userInfo.isOne == 1) {
      this.isOne = false
    } else {
      this.isOne = true
    }
    this.marketFirst = this.guidance.marketFirst
  },
  data: () => ({
    isOne: false, //0：不是首次注册 1:首次注册 ,
    marketFirst: false, //true为已是老用户
    labelImg: require('IMG/marketDetail/yindao.png'),
    enjoyImg: require('IMG/marketDetail/enjoy@2x.png')
  }),
  computed: {
    ...mapGetters(['userInfo', 'guidance'])
  },
  methods: {
    async knowHandle() {
      const res = await marketService.getMarketUpdateIsOne()
      this.$store.commit(types.FIRST, true)
      this.marketFirst = true
      console.log(this.guidance, 'store数据')
    }
  }
}
</script>
<style lang="less">
.hint-tire-page {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 1);
  opacity: 0.65;
  z-index: 1000;
  .operate-1 {
    margin: 0 0 0 320px;
    display: flex;
    > div {
      padding: 10px;
      padding-bottom: 0px;
      font-size: 12px;
      color: #fff;
      > i {
        font-size: 24px;
        display: block;
      }
    }
  }
  .hint-box {
    width: 225px;
    height: 171px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 5px 0 0 119px;
    p {
      font-size: 17px;

      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-bottom: -10px;
    }
    .line {
      width: 69px;
      height: 171px;
      // border-style: dotted;
      position: relative;
      .one {
        width: 5px;
        height: 5px;
        position: absolute;
        right: -4.5px;
        top: -7px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
      }
      .tow {
        width: 5px;
        height: 5px;
        position: absolute;
        bottom: -4.5px;
        left: -6.5px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
      }
    }
  }
  .know-button {
    margin: 113px 0 0 140px;
    width: 95px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 16px;
    opacity: 0.6163000000000001;
    border: 1px solid rgba(255, 255, 255, 1);
    font-size: 17px;

    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
