<template>
  <div id="share-prompt" v-if="sharePrompt">
    <div class="arrow-box">
      <img :src="arrowImg">
      <!-- <p>点击此处分享给好友</p> -->
    </div>
    <div class=" close-btn" @click="closeHandler"><img :src="knowImg" alt=""></div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  props: {
    value: { type: Boolean, default: false }
  },
  data: () => ({
    currentValue: false,
    arrowImg: require('IMG/discover/article_share.png'),
    knowImg:require('IMG/discover/article_btn.png')   
  }),
  methods: {
    closeHandler() {
      this.$store.commit(types.SHARE_PROMPT, false)
    }
  },
  computed: {
    ...mapGetters(['sharePrompt'])
  }
}
</script>
<style lang="less" scoped>
#share-prompt {
  position: fixed !important;
  background: rgba(0, 0, 0, 1);
  z-index: 9999;
  > .arrow-box {
    position: absolute;
    top: 5px;
    right: 20px;
    width: 291px;
    height: 194px;
    > img {
      object-fit: cover;
    }
    > p {
      color: #fff;
      font-size: 17px;
      font-weight: 400;
      word-break: keep-all;
      transform: translate(-240%, -100%);
    }
  }
  > .close-btn {
    position: absolute;
    transform: translateX(-50%);
    top: 254px;
    left: 50%;
    display: inline-block;
    // border-radius: 100px;
    font-size: 17px;
    color: #fff;
    font-weight: 400;
    padding: 4px 18px;
    // &::after {
    //   border-radius: 100px;
    //   color: #fff;
    // }
  }
}
</style>
