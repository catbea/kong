<template>
  <div id="share-prompt" v-if="sharePrompt">
    <div class="arrow-box">
      <img :src="arrowImg">
      <p>点击此处分享给好友</p>
    </div>
    <div class="van-hairline--surround close-btn" @click="closeHandler">知道了</div>
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
    arrowImg: require('IMG/share/arrow.png')
  }),
  methods: {
    closeHandler() {
      this.sharePrompt=false
      console.log('999999999999999');
      console.log(this.sharePrompt);
      console.log('999999999999999');
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
  background: #000000;
  opacity: 0.85;
  z-index: 9999;
  > .arrow-box {
    position: absolute;
    top: 5px;
    right: 20px;
    width: 66px;
    height: 170px;
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
    top: 60%;
    left: 50%;
    display: inline-block;
    border-radius: 100px;
    font-size: 17px;
    color: #fff;
    font-weight: 400;
    padding: 4px 18px;
    &::after {
      border-radius: 100px;
      color: #fff;
    }
  }
}
</style>
