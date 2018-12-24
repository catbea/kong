<template>
  <div class="hint-tire-page" v-if="hintShow">
     <div class="operate-1">
          <div class="operate-share">
            <i class="icon iconfont icon-article_share"></i>
            分享
          </div>
        </div>
    <div class="hint-box">
      <p>快点击这里分享楼盘</p>
      <div class="line">
        <span class="one"></span>
        <span class="tow"></span>
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
    this.guidanceHandle()
  },
  data: () => ({
    enjoyImg: require('IMG/marketDetail/enjoy@2x.png'),
    hintShow: true
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    guidanceHandle() {
      //新手引导
      if (this.userInfo.isOne == 1) {
        this.hintShow = true
      } else {
        this.hintShow = false
      }
    },
    async knowHandle() {
      const res = await marketService.getMarketUpdateIsOne()
      this.hintShow = false
      // TODO 不是修改is_one
      this.$store.commit(types.IS_ONE, 0)
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
  z-index: 11;
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
    height: 194px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 5px 0 0 119px;
    p {
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-bottom: -10px;
    }
    .line {
      display: flex;
      width: 62px;
      height: 189px;
      border-right: dashed rgba(255, 255, 255, 1);
      border-bottom: dashed rgba(255, 255, 255, 1);
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
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
