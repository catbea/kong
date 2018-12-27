<template>
  <div class="title-bar-page" v-if="isShow">
    <h5 class="title-text">{{conf.title}}</h5>
    <router-link :to="linkComputed" v-if="conf.linkText">
      <p class="link-text">{{`${conf.linkText} ${conf.link?'>':''}`}}</p>
    </router-link>
  </div>
</template>
<script>
export default {
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
  padding: 10px 15px 3px;
  h5 {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    padding-top: 10px;
  }
  .link-text {
    font-size: 13px;
    font-weight: 400;
    color: #999999;
  }
}
</style>
