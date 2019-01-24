<template>
  <div class="title-bar-page" v-if="isShow">
    <h5 class="title-text">{{conf.title}}</h5>
    <router-link :to="linkComputed" v-if="conf.linkText">
      <p class="link-text">{{`${conf.linkText}`}} 
        <span class="bg_img" :style="{backgroundImage:'url('+siteDetailImg+')'}"></span>
      </p>
      <!-- ${conf.link?'>':''} -->
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteDetailImg: require('IMG/marketDetail/arrow@2x.png')
    }
  },
  props: {
    conf: {
      type: Object,
      default: function() {
        return {
          title: '',
          linkText: '',
          link: ''
        }
      }
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    linkComputed() {
      return this.conf.link || '#'
    }
  }
}
</script> 
<style lang="less">
.title-bar-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px 3px;
  h5 {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    font-family: PingFangSC-Semibold;
    // padding-top: 10px;
  }
  .link-text {
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    display: flex;
    // align-items: center;
    span {
      // margin-left:4px;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
